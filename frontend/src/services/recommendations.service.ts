/**
 * Recommendations Service
 * Handles skill recommendations, training paths, role recommendations, and interventions
 */

import apiClient, { ApiSuccessResponse, extractData } from './api';
import type {
  RecommendationsResponse,
  TrainingPathRequest,
  NextRoleRequest,
} from '../types/schemas/recommendations';

/**
 * Get skill recommendations for an employee
 */
export async function getSkillRecommendations(
  employeeId: string
): Promise<RecommendationsResponse> {
  const response = await apiClient.get<ApiSuccessResponse<RecommendationsResponse>>(
    `/skills/recommendations/skills/${employeeId}`
  );

  return extractData(response);
}

/**
 * Get training path for acquiring target skills
 */
export interface TrainingPathResponse {
  training_path: unknown[];
  estimated_time: string;
  resources: unknown[];
}

export async function getTrainingPath(
  request: TrainingPathRequest
): Promise<TrainingPathResponse> {
  const response = await apiClient.post<ApiSuccessResponse<TrainingPathResponse>>(
    '/skills/recommendations/training-path',
    request
  );

  return extractData(response);
}

/**
 * Get next role recommendations for an employee
 */
export interface NextRoleRecommendation {
  role: string;
  readiness_score: number;
  missing_skills: string[];
  recommendation: string;
}

export interface NextRoleResponse {
  recommendations: NextRoleRecommendation[];
}

export async function getNextRoleRecommendations(
  request: NextRoleRequest
): Promise<NextRoleResponse> {
  const response = await apiClient.post<ApiSuccessResponse<NextRoleResponse>>(
    '/skills/recommendations/next-role',
    request
  );

  return extractData(response);
}

/**
 * Get department-wide intervention recommendations
 */
export interface DepartmentInterventionsResponse {
  interventions: unknown[];
  priority: string[];
  impact: Record<string, unknown>;
}

export async function getDepartmentInterventions(
  departmentName: string
): Promise<DepartmentInterventionsResponse> {
  const response = await apiClient.get<ApiSuccessResponse<DepartmentInterventionsResponse>>(
    `/skills/recommendations/department-interventions/${departmentName}`
  );

  return extractData(response);
}

/**
 * Get mentor recommendations for an employee
 */
export interface MentorRecommendation {
  employee_id: string;
  match_score: number;
  reasoning: string;
}

export interface MentorRecommendationsResponse {
  mentors: MentorRecommendation[];
}

export async function getMentorRecommendations(
  employeeId: string,
  maxRecommendations: number = 10
): Promise<MentorRecommendationsResponse> {
  const response = await apiClient.get<ApiSuccessResponse<MentorRecommendationsResponse>>(
    `/recommendations/mentor/${employeeId}`,
    {
      params: { max_recommendations: maxRecommendations },
    }
  );

  return extractData(response);
}

