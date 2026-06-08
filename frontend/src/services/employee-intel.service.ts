/**
 * Employee Intelligence Service
 * Handles AI-powered employee intelligence endpoints
 */

import apiClient, { ApiSuccessResponse, extractData } from './api';

/**
 * Employee Intelligence Response
 */
export interface EmployeeIntelResponse {
  summary: string;
  strengths: string[];
  development_areas: string[];
  readiness_score: number;
  next_role_readiness: string;
  recommended_actions: string[];
  risk_signals: string[];
  career_trajectory: string;
  insights: string[];
  warnings: string[];
  scores: Record<string, number>;
  detected_language: string;
  ai_mode: string;
}

/**
 * Get AI-powered employee intelligence summary
 */
export async function getEmployeeIntel(
  employeeId: string,
  language?: 'en' | 'cz'
): Promise<EmployeeIntelResponse> {
  const response = await apiClient.get<ApiSuccessResponse<EmployeeIntelResponse>>(
    `/ai/employee-intel/${employeeId}`,
    {
      params: language ? { language } : undefined,
    }
  );

  return extractData(response);
}

