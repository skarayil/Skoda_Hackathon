/**
 * Config Service
 * Handles UI contract and configuration
 */

import apiClient, { ApiSuccessResponse, extractData } from './api';

/**
 * UI Contract Response
 */
export interface UIContractResponse {
  version: string;
  endpoints: Record<string, string>;
  supported_file_types: string[];
  response_format: Record<string, unknown>;
  tone_format: {
    enabled: boolean;
    validation_mode: boolean;
  };
}

/**
 * Get UI contract (metadata for frontend)
 */
export async function getUIContract(): Promise<UIContractResponse> {
  const response = await apiClient.get<ApiSuccessResponse<UIContractResponse>>(
    '/config/ui-contract'
  );

  return extractData(response);
}

