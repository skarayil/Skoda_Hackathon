/**
 * Analytics Service
 * Handles employee, department, global analytics, succession, and forecasting
 */

import apiClient, { ApiSuccessResponse, extractData } from './api';
import type {
  EmployeeAnalyticsResponse,
  DepartmentAnalyticsResponse,
  GlobalAnalyticsResponse,
  SuccessionRadarResponse,
  DepartmentNarrativeResponse,
} from '../types/schemas/analytics';

/**
 * Get employee-level analytics
 */
export async function getEmployeeAnalytics(
  employeeId: string
): Promise<EmployeeAnalyticsResponse> {
  const response = await apiClient.get<ApiSuccessResponse<EmployeeAnalyticsResponse>>(
    `/analytics/employees/${employeeId}`
  );

  return extractData(response);
}

/**
 * Get department-level analytics
 */
export async function getDepartmentAnalytics(
  departmentName: string
): Promise<DepartmentAnalyticsResponse> {
  const response = await apiClient.get<ApiSuccessResponse<DepartmentAnalyticsResponse>>(
    `/analytics/departments/${departmentName}`
  );

  return extractData(response);
}

/**
 * Get global analytics across all employees
 */
export async function getGlobalAnalytics(): Promise<GlobalAnalyticsResponse> {
  const response = await apiClient.get<ApiSuccessResponse<GlobalAnalyticsResponse>>(
    '/analytics/global'
  );

  return extractData(response);
}

/**
 * Get succession readiness rankings for a department
 */
export async function getSuccessionRadar(
  departmentName: string
): Promise<SuccessionRadarResponse> {
  const response = await apiClient.get<ApiSuccessResponse<SuccessionRadarResponse>>(
    `/analytics/succession/${departmentName}`
  );

  return extractData(response);
}

/**
 * Get deterministic AI narrative for a department
 */
export async function getDepartmentNarrative(
  departmentName: string
): Promise<DepartmentNarrativeResponse> {
  const response = await apiClient.get<ApiSuccessResponse<DepartmentNarrativeResponse>>(
    `/analytics/narrative/${departmentName}`
  );

  return extractData(response);
}

/**
 * Get skill demand forecast
 */
export interface ForecastResponse {
  forecast_horizon: string;
  demand_forecast: Record<string, unknown>;
  skill_trends: unknown[];
  recommendations: unknown[];
}

export async function getForecast(months: number = 6): Promise<ForecastResponse> {
  const response = await apiClient.get<ApiSuccessResponse<ForecastResponse>>(
    '/analytics/forecast',
    {
      params: { months },
    }
  );

  return extractData(response);
}

/**
 * Predicted Shortages Response
 */
export interface PredictedShortagesResponse {
  department: string;
  forecast_months: number;
  predicted_shortages: Array<{
    skill: string;
    current_count: number;
    predicted_need: number;
    shortage: number;
    severity: 'critical' | 'high' | 'medium' | 'low';
    timeframe: string;
  }>;
  recommendations: string[];
}

/**
 * Get predicted skill shortages for a department
 */
export async function getPredictedShortages(
  department: string,
  forecastMonths: number = 6
): Promise<PredictedShortagesResponse> {
  const response = await apiClient.get<ApiSuccessResponse<PredictedShortagesResponse>>(
    `/analytics/predicted-shortages/${department}`,
    {
      params: { forecast_months: forecastMonths },
    }
  );

  return extractData(response);
}

/**
 * Get cross-team skill similarity analysis
 */
export interface TeamSimilarityResponse {
  similarity_matrix: Record<string, unknown>;
  clusters: unknown[];
  insights: unknown[];
}

export async function getTeamSimilarity(): Promise<TeamSimilarityResponse> {
  const response = await apiClient.get<ApiSuccessResponse<TeamSimilarityResponse>>(
    '/analytics/team-similarity'
  );

  return extractData(response);
}

/**
 * Simulate a what-if scenario
 */
export interface ScenarioSimulationRequest {
  scenario_type: 'employee_loss' | 'training_completion' | 'skill_mandatory';
  scenario_params: Record<string, unknown>;
}

export interface ScenarioSimulationResponse {
  scenario_type: string;
  impact: Record<string, unknown>;
  recommendations: unknown[];
}

export async function simulateScenario(
  request: ScenarioSimulationRequest
): Promise<ScenarioSimulationResponse> {
  const response = await apiClient.post<ApiSuccessResponse<ScenarioSimulationResponse>>(
    '/analytics/simulate',
    request
  );

  return extractData(response);
}

