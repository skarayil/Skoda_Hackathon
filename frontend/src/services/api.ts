import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { getMockData } from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

/**
 * Unified API Response Format
 * Backend returns: { success: true, data: {...}, message?: string }
 * or: { success: false, error: { type, message, details } }
 */
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    type: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Axios client with unified response handling
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor for logging (dev only)
apiClient.interceptors.request.use(
  (config) => {
    // ALWAYS use mock data adapter for GitHub Pages demonstration
    config.adapter = async () => {
      // Simulate slight network latency
      await new Promise(resolve => setTimeout(resolve, 400));
      const mockResponse = getMockData(config.url || '');
      return {
        data: mockResponse,
        status: 200,
        statusText: 'OK',
        headers: {} as any,
        config: config,
        request: {}
      };
    };

    if (import.meta.env.DEV) {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`, config.data || config.params);
    }
    return config;
  },
  (error) => {
    console.error('[API] Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for unified response format
apiClient.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<unknown>>) => {
    // Backend already returns unified format, just pass through
    // Extract data if backend wraps it
    if (response.data && typeof response.data === 'object' && 'success' in response.data) {
      if (response.data.success === false) {
        // Transform error response to throw
        const errorResponse = response.data as ApiErrorResponse;
        const error = new Error(errorResponse.error.message);
        (error as any).type = errorResponse.error.type;
        (error as any).details = errorResponse.error.details;
        return Promise.reject(error);
      }
      // Success response - extract data
      return response.data as ApiSuccessResponse<unknown>;
    }
    // Fallback for non-unified responses
    return { success: true, data: response.data };
  },
  (error: AxiosError) => {
    // Handle network errors, 4xx, 5xx
    if (error.response) {
      const response = error.response.data as ApiErrorResponse | unknown;
      if (response && typeof response === 'object' && 'error' in response) {
        const errorResponse = response as ApiErrorResponse;
        const apiError = new Error(errorResponse.error.message);
        (apiError as any).type = errorResponse.error.type;
        (apiError as any).details = errorResponse.error.details;
        return Promise.reject(apiError);
      }
    }
    // Network error or other axios error
    const networkError = new Error(error.message || 'Network error');
    (networkError as any).type = 'NetworkError';
    return Promise.reject(networkError);
  }
);

/**
 * Helper to extract data from unified response
 */
export function extractData<T>(response: ApiSuccessResponse<T>): T {
  return response.data;
}

export default apiClient;
