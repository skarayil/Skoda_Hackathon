/**
 * Skills Schemas
 * Schemas for skill analysis, forecasting, and role-fit
 */

import { z } from 'zod';

/**
 * SkillAnalysisRequest - Request schema for skill analysis endpoint
 */
export const SkillAnalysisRequestSchema = z.object({
  employee_id: z.string(),
  role_requirements: z
    .object({
      required_skills: z.array(z.string()).optional(),
      preferred_skills: z.array(z.string()).optional(),
    })
    .nullable()
    .optional(),
});

export type SkillAnalysisRequest = z.infer<typeof SkillAnalysisRequestSchema>;

/**
 * SkillAnalysisPublic - Public schema for skill analysis
 */
export const SkillAnalysisPublicSchema = z.object({
  id: z.string().uuid(),
  employee_id: z.string(),
  analysis_json: z.object({
    current_skills: z.array(z.string()).optional(),
    missing_skills: z.array(z.string()).optional(),
    gap_score: z.number().int().min(0).max(100).optional(),
    strengths: z.array(z.string()).optional(),
    recommended_roles: z.array(z.string()).optional(),
    development_path: z.array(z.string()).optional(),
    analysis_summary: z.string().optional(),
  }),
  recommendations_json: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime(),
});

export type SkillAnalysisPublic = z.infer<typeof SkillAnalysisPublicSchema>;

/**
 * RoleFitRequest - Request schema for role-fit calculation
 */
export const RoleFitRequestSchema = z.object({
  employee_id: z.string(),
  role_definition: z.object({
    mandatory_skills: z.array(z.string()).optional(),
    preferred_skills: z.array(z.string()).optional(),
  }),
  skill_importance: z.record(z.unknown()).nullable().optional(),
});

export type RoleFitRequest = z.infer<typeof RoleFitRequestSchema>;

