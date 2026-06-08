/**
 * Ingestion Service
 * Handles dataset ingestion, listing, and employee loading
 */

import apiClient, { ApiSuccessResponse, extractData } from './api';
import type {
  IngestionResponse,
  DatasetRecordPublic,
  DatasetSummary,
} from '../types/schemas/ingestion';

/**
 * Upload and ingest a dataset file
 */
export async function ingestDataset(file: File): Promise<IngestionResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post<ApiSuccessResponse<IngestionResponse>>(
    '/ingestion/ingest',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return extractData(response);
}

/**
 * List all ingested datasets
 */
export async function getDatasets(): Promise<DatasetRecordPublic[]> {
  const response = await apiClient.get<ApiSuccessResponse<DatasetRecordPublic[]>>(
    '/ingestion/datasets'
  );

  return extractData(response);
}

/**
 * Load employee records from an ingested dataset
 */
export interface LoadEmployeesParams {
  employee_id_column?: string;
  department_column?: string;
  skills_column?: string;
  update_existing?: boolean;
}

export interface LoadEmployeesResponse {
  total_loaded: number;
  created: number;
  updated: number;
  skipped: number;
}

export async function loadEmployees(
  datasetId: string,
  params?: LoadEmployeesParams
): Promise<LoadEmployeesResponse> {
  const response = await apiClient.post<ApiSuccessResponse<LoadEmployeesResponse>>(
    `/ingestion/load-employees/${datasetId}`,
    null,
    {
      params: {
        employee_id_column: params?.employee_id_column || 'employee_id',
        department_column: params?.department_column || 'department',
        skills_column: params?.skills_column,
        update_existing: params?.update_existing ?? true,
      },
    }
  );

  return extractData(response);
}

/**
 * Analyze data and propose repair suggestions
 */
export interface DataRepairRequest {
  dataset_id: string;
  dataset_name: string;
}

export interface DataRepairResponse {
  repair_suggestions: unknown[];
  data_quality_issues: unknown[];
}

export async function analyzeDataRepair(
  request: DataRepairRequest
): Promise<DataRepairResponse> {
  const response = await apiClient.post<ApiSuccessResponse<DataRepairResponse>>(
    '/ingestion/data-repair',
    request
  );

  return extractData(response);
}

