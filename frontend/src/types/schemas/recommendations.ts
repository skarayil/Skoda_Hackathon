/**
 * Recommendations Schemas
 * Schemas for skill and role recommendations
 */

import { z } from 'zod';
import { UnifiedScoreModelSchema } from './common';

/**
 * RecommendationsResponse - Response schema for skill recommendations
 */
export const RecommendationsResponseSchema = z.object({
  recommended_skills: z.array(
    z.object({
      skill: z.string(),
      priority: z.string(),
      reason: z.string().optional(),
    })
  ),
  reasoning: z.string(),
  priority: z.array(z.string()),
  unified_score: UnifiedScoreModelSchema,
  ai_used: z.boolean(),
  ai_mode: z.string(),
});

export type RecommendationsResponse = z.infer<typeof RecommendationsResponseSchema>;

/**
 * TrainingPathRequest - Request schema for training path generation
 */
export const TrainingPathRequestSchema = z.object({
  employee_id: z.string(),
  target_skills: z.array(z.string()),
});

export type TrainingPathRequest = z.infer<typeof TrainingPathRequestSchema>;

/**
 * NextRoleRequest - Request schema for next role recommendations
 */
export const NextRoleRequestSchema = z.object({
  employee_id: z.string(),
  available_roles: z.array(
    z.object({
      title: z.string(),
      required_skills: z.array(z.string()),
      department: z.string().optional(),
    })
  ),
});

export type NextRoleRequest = z.infer<typeof NextRoleRequestSchema>;

