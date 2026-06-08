/**
 * Common Schemas
 * Shared schemas matching backend Pydantic models
 */

import { z } from 'zod';

/**
 * UnifiedScoreModel - Standard scoring envelope returned by analytics endpoints
 */
export const UnifiedScoreModelSchema = z.object({
  overall_score: z.number().int().min(0).max(100),
  skill_scores: z.record(z.string(), z.number().int().min(0).max(100)),
  gap_scores: z.record(z.string(), z.number().int().min(0).max(100)),
  role_fit_score: z.number().int().min(0).max(100),
  next_role_readiness: z.number().int().min(0).max(100),
  risk_score: z.number().int().min(0).max(100),
  ai_gap_score: z.number().int().min(0).max(100).nullable().optional(),
  ai_readiness: z.number().int().min(0).max(100).nullable().optional(),
  ai_risk_signal: z.number().int().min(0).max(100).nullable().optional(),
  ai_skill_recommendations_count: z.number().int().min(0).nullable().optional(),
  ai_mode: z.string().nullable().optional(), // 'featherless' | 'heuristic'
});

export type UnifiedScoreModel = z.infer<typeof UnifiedScoreModelSchema>;

/**
 * ErrorResponse - Shared error response payload
 */
export const ErrorResponseSchema = z.object({
  error: z.string(),
  detail: z.string(),
  details: z.record(z.string(), z.string()).nullable().optional(),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

