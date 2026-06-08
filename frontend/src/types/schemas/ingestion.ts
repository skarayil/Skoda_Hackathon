/**
 * Ingestion Schemas
 * Schemas for dataset ingestion and management
 */

import { z } from 'zod';

/**
 * IngestionResponse - Response schema for dataset ingestion
 */
export const IngestionResponseSchema = z.object({
  dataset_id: z.string(),
  filename: z.string(),
  stored_path: z.string(),
  normalized_path: z.string(),
  metadata: z.object({
    row_count: z.number().int().min(0),
    column_count: z.number().int().min(0),
    columns: z.array(z.string()),
    skill_fields: z.array(z.string()),
  }),
  dq_report_path: z.string().nullable().optional(),
  summary_path: z.string(),
});

export type IngestionResponse = z.infer<typeof IngestionResponseSchema>;

/**
 * DatasetRecordPublic - Public schema for dataset records
 */
export const DatasetRecordPublicSchema = z.object({
  id: z.string().uuid(),
  dataset_id: z.string(),
  metadata: z.record(z.unknown()),
  summary: z.record(z.unknown()).nullable().optional(),
  dq_score: z.number().int().min(0).max(100).nullable().optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type DatasetRecordPublic = z.infer<typeof DatasetRecordPublicSchema>;

/**
 * DatasetSummary - Schema for dataset summary
 */
export const DatasetSummarySchema = z.object({
  dataset_id: z.string(),
  dataset_name: z.string(),
  row_count: z.number().int().min(0),
  column_count: z.number().int().min(0),
  skill_fields: z.array(z.string()),
  data_quality_score: z.number().int().min(0).max(100),
  generated_at: z.string().datetime(),
});

export type DatasetSummary = z.infer<typeof DatasetSummarySchema>;

