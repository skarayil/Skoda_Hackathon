/**
 * Recommendations Hooks
 * React Query hooks for skill recommendations, training paths, and role recommendations
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getSkillRecommendations,
  getTrainingPath,
  getNextRoleRecommendations,
  getDepartmentInterventions,
  getMentorRecommendations,
  type TrainingPathRequest,
  type NextRoleRequest,
} from '../services/recommendations.service';
import type { RecommendationsResponse } from '../types/schemas/recommendations';

/**
 * Hook to get skill recommendations for an employee
 */
export function useSkillRecommendations(employeeId: string) {
  return useQuery({
    queryKey: ['recommendations', 'skills', employeeId],
    queryFn: () => getSkillRecommendations(employeeId),
    enabled: !!employeeId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to get training path for acquiring target skills
 */
export function useTrainingPath() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: TrainingPathRequest) => getTrainingPath(request),
    onSuccess: (data, variables) => {
      // Invalidate recommendations for this employee
      queryClient.invalidateQueries({
        queryKey: ['recommendations', 'skills', variables.employee_id],
      });
    },
  });
}

/**
 * Hook to get next role recommendations for an employee
 */
export function useNextRoleRecommendations() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: NextRoleRequest) => getNextRoleRecommendations(request),
    onSuccess: (data, variables) => {
      // Invalidate analytics for this employee
      queryClient.invalidateQueries({
        queryKey: ['analytics', 'employees', variables.employee_id],
      });
    },
  });
}

/**
 * Hook to get department-wide intervention recommendations
 */
export function useDepartmentInterventions(departmentName: string) {
  return useQuery({
    queryKey: ['recommendations', 'interventions', departmentName],
    queryFn: () => getDepartmentInterventions(departmentName),
    enabled: !!departmentName,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to get mentor recommendations for an employee
 */
export function useMentorRecommendations(
  employeeId: string,
  maxRecommendations: number = 10
) {
  return useQuery({
    queryKey: ['recommendations', 'mentor', employeeId, maxRecommendations],
    queryFn: () => getMentorRecommendations(employeeId, maxRecommendations),
    enabled: !!employeeId,
    staleTime: 10 * 60 * 1000, // 10 minutes (mentor matches change slowly)
  });
}

