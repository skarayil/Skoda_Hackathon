/**
 * Employees Schemas
 * Schemas for employee records and learning history
 */

import { z } from 'zod';

/**
 * EmployeeRecordPublic - Public schema for employee records
 */
export const EmployeeRecordPublicSchema = z.object({
  id: z.string().uuid(),
  employee_id: z.string(),
  department: z.string(),
  skills: z.array(z.string()).nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type EmployeeRecordPublic = z.infer<typeof EmployeeRecordPublicSchema>;

/**
 * LearningHistoryCreate - Schema for creating a learning history record
 */
export const LearningHistoryCreateSchema = z.object({
  course_name: z.string(),
  provider: z.string().nullable().optional(),
  start_date: z.string().datetime().nullable().optional(),
  end_date: z.string().datetime().nullable().optional(),
  hours: z.number().min(0).nullable().optional(),
  completion_status: z.enum(['completed', 'in_progress', 'cancelled']).default('in_progress'),
  skills_covered: z.array(z.string()).nullable().optional(),
  certificate_url: z.string().url().nullable().optional(),
});

export type LearningHistoryCreate = z.infer<typeof LearningHistoryCreateSchema>;

/**
 * LearningHistoryPublic - Public schema for learning history records
 */
export const LearningHistoryPublicSchema = z.object({
  id: z.string().uuid(),
  employee_id: z.string(),
  course_name: z.string(),
  provider: z.string().nullable().optional(),
  start_date: z.string().datetime().nullable().optional(),
  end_date: z.string().datetime().nullable().optional(),
  hours: z.number().min(0).nullable().optional(),
  completion_status: z.string(),
  skills_covered: z.array(z.string()).nullable().optional(),
  certificate_url: z.string().url().nullable().optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type LearningHistoryPublic = z.infer<typeof LearningHistoryPublicSchema>;

