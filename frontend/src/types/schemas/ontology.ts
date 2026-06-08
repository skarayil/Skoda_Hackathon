/**
 * Ontology Schemas
 * Schemas for skill ontology responses
 */

import { z } from 'zod';

/**
 * OntologyResponse - Response schema for skill ontology
 */
export const OntologyResponseSchema = z.object({
  skills: z.array(z.string()),
  clusters: z.array(z.record(z.unknown())),
  normalized_mapping: z.record(z.string()),
  department_skill_map: z.record(z.array(z.string())),
});

export type OntologyResponse = z.infer<typeof OntologyResponseSchema>;

