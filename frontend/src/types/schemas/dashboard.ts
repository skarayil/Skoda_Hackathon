/**
 * Dashboard Schemas
 * Schemas for dashboard responses
 */

import { z } from 'zod';
import { UnifiedScoreModelSchema } from './common';

/**
 * DashboardOverviewResponse - Response schema for dashboard overview
 */
export const DashboardOverviewResponseSchema = z.object({
  total_employees: z.number().int().min(0),
  total_departments: z.number().int().min(0),
  departments: z.array(
    z.object({
      name: z.string(),
      employee_count: z.number().int().min(0),
      total_skills: z.number().int().min(0),
    })
  ),
  global_analytics: z.object({
    total_skills: z.number().int().min(0),
    skill_frequency: z.record(z.number().int().min(0)),
  }),
  unified_score: UnifiedScoreModelSchema,
});

export type DashboardOverviewResponse = z.infer<typeof DashboardOverviewResponseSchema>;

/**
 * SkillMapResponse - Response schema for skill map
 */
export const SkillMapResponseSchema = z.object({
  ontology: z.object({
    skills: z.array(z.string()),
    clusters: z.array(z.unknown()),
    normalized_mapping: z.record(z.string()),
    department_skill_map: z.record(z.array(z.string())),
  }),
  employee_distribution: z.record(z.number().int().min(0)),
  unified_score: UnifiedScoreModelSchema,
});

export type SkillMapResponse = z.infer<typeof SkillMapResponseSchema>;

/**
 * SkillHeatmapResponse - Response schema for skill heatmap
 */
export const SkillHeatmapResponseSchema = z.object({
  heatmap_data: z.record(z.unknown()),
  unified_score: UnifiedScoreModelSchema,
});

export type SkillHeatmapResponse = z.infer<typeof SkillHeatmapResponseSchema>;

/**
 * SkillTrendsResponse - Response schema for skill trends
 */
export const SkillTrendsResponseSchema = z.object({
  trends: z.object({
    period_months: z.number().int().min(0).optional(),
    top_growing_skills: z.array(z.string()).optional(),
    top_declining_skills: z.array(z.string()).optional(),
  }),
  unified_score: UnifiedScoreModelSchema,
});

export type SkillTrendsResponse = z.infer<typeof SkillTrendsResponseSchema>;

