/**
 * Skills Service
 * Handles skill ontology, analysis, and role-fit calculations
 */

import apiClient, { ApiSuccessResponse, extractData } from './api';
import type { OntologyResponse } from '../types/schemas/ontology';
import type {
  SkillAnalysisPublic,
  SkillAnalysisRequest,
} from '../types/schemas/skills';

/**
 * Build skill ontology from dataset
 */
export async function buildOntology(datasetId?: string): Promise<OntologyResponse> {
  const response = await apiClient.post<ApiSuccessResponse<OntologyResponse>>(
    '/skills/ontology',
    null,
    {
      params: datasetId ? { dataset_id: datasetId } : undefined,
    }
  );

  return extractData(response);
}

/**
 * Analyze employee skills using AI
 */
export async function analyzeSkills(
  request: SkillAnalysisRequest
): Promise<SkillAnalysisPublic> {
  const response = await apiClient.post<ApiSuccessResponse<SkillAnalysisPublic>>(
    '/skills/analysis',
    request
  );

  return extractData(response);
}

/**
 * Get latest skill analysis for an employee
 */
export async function getSkillAnalysis(employeeId: string): Promise<SkillAnalysisPublic> {
  const response = await apiClient.get<ApiSuccessResponse<SkillAnalysisPublic>>(
    `/skills/analysis/${employeeId}`
  );

  return extractData(response);
}

/**
 * Calculate role-fit score for an employee
 */
export interface RoleFitRequestParams {
  role_title: string;
  required_skills: string[];
  preferred_skills?: string[];
  department?: string;
}

export interface RoleFitResponse {
  role_fit_score: number;
  required_skills_match: number;
  preferred_skills_match: number;
  missing_required: string[];
  missing_preferred: string[];
  recommendation: string;
}

export async function calculateRoleFit(
  employeeId: string,
  params: RoleFitRequestParams
): Promise<RoleFitResponse> {
  const response = await apiClient.post<ApiSuccessResponse<RoleFitResponse>>(
    `/skills/role-fit/${employeeId}`,
    {
      role_title: params.role_title,
      required_skills: params.required_skills,
      preferred_skills: params.preferred_skills || [],
      department: params.department,
    }
  );

  return extractData(response);
}

/**
 * Get automated skill taxonomy
 */
export interface SkillTaxonomyResponse {
  taxonomy: Record<string, unknown>;
  categories: string[];
  hierarchies: unknown[];
}

export async function getTaxonomy(): Promise<SkillTaxonomyResponse> {
  const response = await apiClient.get<ApiSuccessResponse<SkillTaxonomyResponse>>(
    '/skills/taxonomy'
  );

  return extractData(response);
}

