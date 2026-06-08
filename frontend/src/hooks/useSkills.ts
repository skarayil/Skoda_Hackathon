/**
 * Skills Hooks
 * React Query hooks for skill ontology, analysis, and role-fit
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  buildOntology,
  analyzeSkills,
  getSkillAnalysis,
  calculateRoleFit,
  getTaxonomy,
  type RoleFitRequestParams,
} from '../services/skills.service';
import type {
  SkillAnalysisRequest,
  SkillAnalysisPublic,
  OntologyResponse,
} from '../types/schemas/skills';

/**
 * Hook to build skill ontology from dataset
 */
export function useBuildOntology(datasetId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => buildOntology(datasetId),
    onSuccess: () => {
      // Invalidate skill-related queries after building ontology
      queryClient.invalidateQueries({ queryKey: ['skills', 'ontology'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'skill-map'] });
    },
  });
}

/**
 * Hook to get skill ontology (if already built)
 */
export function useOntology() {
  return useQuery({
    queryKey: ['skills', 'ontology'],
    queryFn: () => buildOntology(),
    enabled: false, // Only fetch when explicitly called via mutation
  });
}

/**
 * Hook to analyze employee skills
 */
export function useAnalyzeSkills() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: SkillAnalysisRequest) => analyzeSkills(request),
    onSuccess: (data, variables) => {
      // Invalidate skill analysis for this employee
      queryClient.invalidateQueries({
        queryKey: ['skills', 'analysis', variables.employee_id],
      });
      queryClient.invalidateQueries({
        queryKey: ['analytics', 'employees', variables.employee_id],
      });
    },
  });
}

/**
 * Hook to get skill analysis for an employee
 */
export function useSkillAnalysis(employeeId: string) {
  return useQuery({
    queryKey: ['skills', 'analysis', employeeId],
    queryFn: () => getSkillAnalysis(employeeId),
    enabled: !!employeeId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Hook to calculate role-fit score
 */
export function useRoleFit(employeeId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: RoleFitRequestParams) =>
      calculateRoleFit(employeeId, params),
    onSuccess: () => {
      // Invalidate analytics for this employee
      queryClient.invalidateQueries({
        queryKey: ['analytics', 'employees', employeeId],
      });
    },
  });
}

/**
 * Hook to get skill taxonomy
 */
export function useTaxonomy() {
  return useQuery({
    queryKey: ['skills', 'taxonomy'],
    queryFn: () => getTaxonomy(),
    staleTime: 10 * 60 * 1000, // 10 minutes (taxonomy changes infrequently)
  });
}

