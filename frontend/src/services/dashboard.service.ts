/**
 * Dashboard Service
 * Handles dashboard overview, skill map, heatmap, and trends
 */

import apiClient, { ApiSuccessResponse, extractData } from './api';
import type {
  DashboardOverviewResponse,
  SkillMapResponse,
  SkillHeatmapResponse,
  SkillTrendsResponse,
} from '../types/schemas/dashboard';

/**
 * Get dashboard overview data
 */
export async function getDashboardOverview(): Promise<DashboardOverviewResponse> {
  const response = await apiClient.get<ApiSuccessResponse<DashboardOverviewResponse>>(
    '/dashboard/overview'
  );

  return extractData(response);
}

/**
 * Get skill map visualization data
 */
export async function getSkillMap(): Promise<SkillMapResponse> {
  const response = await apiClient.get<ApiSuccessResponse<SkillMapResponse>>(
    '/dashboard/skill-map'
  );

  return extractData(response);
}

/**
 * Get skill heatmap data
 */
export async function getHeatmap(departmentName?: string): Promise<SkillHeatmapResponse> {
  const response = await apiClient.get<ApiSuccessResponse<SkillHeatmapResponse>>(
    '/dashboard/heatmap',
    {
      params: departmentName ? { department_name: departmentName } : undefined,
    }
  );

  return extractData(response);
}

/**
 * Get skill trends over time
 */
export async function getTrends(periodMonths: number = 6): Promise<SkillTrendsResponse> {
  const response = await apiClient.get<ApiSuccessResponse<SkillTrendsResponse>>(
    '/dashboard/trends',
    {
      params: { period_months: periodMonths },
    }
  );

  return extractData(response);
}

