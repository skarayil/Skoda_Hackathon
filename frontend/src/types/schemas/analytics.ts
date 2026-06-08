/**
 * Analytics Schemas
 * Schemas for employee, department, global analytics, succession, and narratives
 */

import { z } from 'zod';
import { UnifiedScoreModelSchema } from './common';

/**
 * EmployeeAnalyticsResponse - Employee-level analytics
 */
export const EmployeeAnalyticsResponseSchema = z.object({
  employee_id: z.string(),
  skill_count: z.number().int().min(0),
  skill_distribution: z.record(z.unknown()),
  growth_trajectory: z.array(z.unknown()),
  recommendations: z.array(z.unknown()),
});

export type EmployeeAnalyticsResponse = z.infer<typeof EmployeeAnalyticsResponseSchema>;

/**
 * DepartmentAnalyticsResponse - Department-level analytics
 */
export const DepartmentAnalyticsResponseSchema = z.object({
  department: z.string(),
  employee_count: z.number().int().min(0),
  skill_coverage: z.record(z.unknown()),
  team_skill_heatmap: z.record(z.unknown()),
  gaps: z.array(z.unknown()),
});

export type DepartmentAnalyticsResponse = z.infer<typeof DepartmentAnalyticsResponseSchema>;

/**
 * GlobalAnalyticsResponse - Global analytics across all employees
 */
export const GlobalAnalyticsResponseSchema = z.object({
  total_employees: z.number().int().min(0),
  total_skills: z.number().int().min(0),
  skill_frequency: z.record(z.unknown()),
  department_distribution: z.record(z.unknown()),
  trends: z.record(z.unknown()),
});

export type GlobalAnalyticsResponse = z.infer<typeof GlobalAnalyticsResponseSchema>;

/**
 * SuccessionCandidate - Represents a single employee in the succession radar
 */
export const SuccessionCandidateSchema = z.object({
  employee_id: z.string(),
  name: z.string(),
  department: z.string(),
  readiness_score: z.number().int().min(0).max(100),
  next_role_readiness: z.number().int().min(0).max(100),
  risk_score: z.number().int().min(0).max(100),
  skill_strengths: z.array(z.string()),
  skill_gaps: z.array(z.string()),
  unified_score: UnifiedScoreModelSchema,
  metadata: z.record(z.string()).nullable().optional(),
  ai_metadata: z.record(z.unknown()).nullable().optional(),
});

export type SuccessionCandidate = z.infer<typeof SuccessionCandidateSchema>;

/**
 * SuccessionPipelineSummary - Pipeline readiness summary
 */
export const SuccessionPipelineSummarySchema = z.object({
  ready_now: z.number().int().min(0),
  ready_soon: z.number().int().min(0),
  developing: z.number().int().min(0),
  narrative: z.string(),
  risk_outlook: z.enum(['low', 'medium', 'high']),
});

export type SuccessionPipelineSummary = z.infer<typeof SuccessionPipelineSummarySchema>;

/**
 * SuccessionRadarResponse - Response schema for the succession radar feature
 */
export const SuccessionRadarResponseSchema = z.object({
  department: z.string(),
  generated_at: z.string().datetime(),
  candidate_count: z.number().int().min(0),
  pipeline_summary: SuccessionPipelineSummarySchema,
  unified_score: UnifiedScoreModelSchema,
  candidates: z.array(SuccessionCandidateSchema),
});

export type SuccessionRadarResponse = z.infer<typeof SuccessionRadarResponseSchema>;

/**
 * DepartmentNarrativeResponse - Template-based AI narrative summarizing department health
 */
export const DepartmentNarrativeResponseSchema = z.object({
  department: z.string(),
  risk_level: z.enum(['low', 'medium', 'high']),
  risk_score: z.number().int().min(0).max(100),
  narrative: z.string(),
  strengths: z.array(z.string()),
  shortages: z.array(z.string()),
  insights: z.array(z.string()),
  risks: z.array(z.string()),
  numeric_references: z.array(z.string()),
  readiness_summary: z.string(),
  succession_summary: z.string(),
  generated_at: z.string().datetime(),
  unified_score: UnifiedScoreModelSchema,
  ai_mode: z.string().nullable().optional(),
  ai_provider: z.string().nullable().optional(),
  ai_used: z.boolean().nullable().optional(),
  error: z.string().nullable().optional(),
});

export type DepartmentNarrativeResponse = z.infer<typeof DepartmentNarrativeResponseSchema>;

