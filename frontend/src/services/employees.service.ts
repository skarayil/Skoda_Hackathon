/**
 * Employees Service
 * Handles learning history for employees
 */

import apiClient, { ApiSuccessResponse, extractData } from './api';
import type {
  LearningHistoryPublic,
  LearningHistoryCreate,
} from '../types/schemas/employees';

/**
 * Create a learning history record
 */
export async function createLearningHistory(
  employeeId: string,
  data: LearningHistoryCreate
): Promise<LearningHistoryPublic> {
  const response = await apiClient.post<ApiSuccessResponse<LearningHistoryPublic>>(
    `/employees/${employeeId}/learning-history`,
    data
  );

  return extractData(response);
}

/**
 * Get learning history for an employee
 */
export async function getLearningHistory(
  employeeId: string
): Promise<LearningHistoryPublic[]> {
  const response = await apiClient.get<ApiSuccessResponse<LearningHistoryPublic[]>>(
    `/employees/${employeeId}/learning-history`
  );

  return extractData(response);
}

