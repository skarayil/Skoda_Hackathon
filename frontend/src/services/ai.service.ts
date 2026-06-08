/**
 * AI Service
 * Handles AI-powered endpoints: career chat, training plan, what-if scenarios, employee comparison
 */

import apiClient, { ApiSuccessResponse, extractData } from './api';

/**
 * Career Chat Request
 */
export interface CareerChatRequest {
  employee_id?: string;
  user_message: string;
  skills?: string[];
  career_goals?: string;
  department?: string;
}

/**
 * Career Chat Response
 */
export interface CareerChatResponse {
  assistant: string;
  summary: {
    next_role: string;
    readiness_score: number;
    time_to_readiness_months: number;
    risk_score: number;
    recommended_skills: string[];
    recommended_training: string[];
  };
  ai_mode: string;
}

/**
 * AI Career Coach Chat
 */
export async function careerChat(request: CareerChatRequest): Promise<CareerChatResponse> {
  const response = await apiClient.post<ApiSuccessResponse<CareerChatResponse>>(
    '/ai/career-chat',
    request
  );

  return extractData(response);
}

/**
 * Training Plan Request
 */
export interface TrainingPlanRequest {
  employee_id?: string;
  skills: string[];
  gaps: string[];
  desired_role: string;
}

/**
 * Training Plan Response
 */
export interface TrainingPlanResponse {
  plan_overview: string;
  weekly_breakdown: Array<{
    week: number;
    focus_skills: string[];
    courses: string[];
    practice_tasks: string[];
    milestones: string[];
  }>;
  courses: Array<{
    name: string;
    provider: string;
    duration_hours: number;
    type: string;
    priority: 'high' | 'medium' | 'low';
    skoda_academy: boolean;
  }>;
  skill_progression_map: Array<{
    skill: string;
    current_level: string;
    target_level: string;
    weeks_to_master: number;
    dependencies: string[];
  }>;
  mentors: Array<{
    name: string;
    expertise: string[];
    availability: string;
    recommended_for: string[];
  }>;
  risks: Array<{
    risk: string;
    severity: 'high' | 'medium' | 'low';
    mitigation: string;
  }>;
  time_to_readiness: number;
  internal_modules: Array<{
    module: string;
    department: string;
    duration: string;
    prerequisites: string[];
  }>;
  practice_tasks: Array<{
    task: string;
    skill: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimated_hours: number;
  }>;
  ai_mode: string;
}

/**
 * Generate AI Training Plan
 */
export async function generateTrainingPlan(
  request: TrainingPlanRequest
): Promise<TrainingPlanResponse> {
  const response = await apiClient.post<ApiSuccessResponse<TrainingPlanResponse>>(
    '/ai/training-plan',
    request
  );

  return extractData(response);
}

/**
 * What-If Scenario Request
 */
export interface WhatIfScenarioRequest {
  scenario_type: 'remove_employee' | 'add_skill' | 'remove_skill' | 'complete_course' | 'move_department';
  employee_id?: string;
  department?: string;
  changes: Record<string, unknown>;
}

/**
 * What-If Scenario Response
 */
export interface WhatIfScenarioResponse {
  impact_summary: string;
  before_metrics: Record<string, unknown>;
  after_metrics: Record<string, unknown>;
  impact_score: number;
  recommendations: string[];
  risks: string[];
  opportunities: string[];
  ai_mode?: string;
}

/**
 * Run What-If Scenario
 */
export async function runWhatIfScenario(
  request: WhatIfScenarioRequest
): Promise<WhatIfScenarioResponse> {
  // Note: Backend uses query params, not body
  const response = await apiClient.post<ApiSuccessResponse<WhatIfScenarioResponse>>(
    '/ai/what-if',
    null,
    {
      params: {
        scenario_type: request.scenario_type,
        employee_id: request.employee_id,
        department: request.department,
        ...request.changes,
      },
    }
  );

  return extractData(response);
}

/**
 * Compare Employees Request
 */
export interface CompareEmployeesRequest {
  employee_ids: string[];
}

/**
 * Compare Employees Response
 */
export interface CompareEmployeesResponse {
  comparison_summary: string;
  employee1_strengths: string[];
  employee2_strengths: string[];
  skill_overlap: string[];
  talent_transfer_opportunities: string[];
  risk_comparison: Record<string, number>;
  recommendations: string[];
  relative_performance: Record<string, number>;
  summary: string;
  insights: string[];
  warnings: string[];
  scores: Record<string, number>;
  recommended_actions: string[];
  detected_language: string;
  ai_mode: string;
}

/**
 * Compare Employees
 * Note: This endpoint may not exist in backend. 
 * Fallback: Use employee analytics to compare manually or use department comparison.
 */
export async function compareEmployees(
  request: CompareEmployeesRequest
): Promise<CompareEmployeesResponse> {
  // TODO: Verify if /ai/compare-employees exists in backend
  // If not, we may need to use /ai/compare/{dep1}/{dep2} or manual comparison
  // For now, attempting the endpoint as specified
  try {
    const response = await apiClient.post<ApiSuccessResponse<CompareEmployeesResponse>>(
      '/ai/compare-employees',
      request
    );
    return extractData(response);
  } catch (error: any) {
    // If endpoint doesn't exist, return a structured error response
    throw new Error(
      `Employee comparison endpoint may not be available: ${error?.message || 'Unknown error'}`
    );
  }
}

/**
 * Department Comparison Response (matches AIDepartmentComparison schema)
 */
export interface DepartmentComparisonResponse {
  comparison_summary: string;
  department1_strengths: string[];
  department2_strengths: string[];
  skill_overlap: string[];
  talent_transfer_opportunities: string[];
  risk_comparison: Record<string, number>;
  recommendations: string[];
  relative_performance: Record<string, number>;
  summary: string;
  insights: string[];
  warnings: string[];
  scores: Record<string, number>;
  recommended_actions: string[];
  detected_language: string;
  ai_mode: string;
}

/**
 * Compare Two Departments
 */
export async function compareDepartments(
  department1: string,
  department2: string,
  language?: 'en' | 'cz'
): Promise<DepartmentComparisonResponse> {
  const response = await apiClient.get<ApiSuccessResponse<DepartmentComparisonResponse>>(
    `/ai/compare/${department1}/${department2}`,
    {
      params: language ? { language } : undefined,
    }
  );

  return extractData(response);
}

