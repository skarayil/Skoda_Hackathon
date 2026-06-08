/**
 * Employees Hooks
 * React Query hooks for employee learning history
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createLearningHistory,
  getLearningHistory,
} from '../services/employees.service';
import type {
  LearningHistoryCreate,
  LearningHistoryPublic,
} from '../types/schemas/employees';

/**
 * Hook to get learning history for an employee
 */
export function useLearningHistory(employeeId: string) {
  return useQuery({
    queryKey: ['employees', employeeId, 'learning-history'],
    queryFn: () => getLearningHistory(employeeId),
    enabled: !!employeeId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Hook to create a learning history record
 */
export function useCreateLearningHistory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      employeeId,
      data,
    }: {
      employeeId: string;
      data: LearningHistoryCreate;
    }) => createLearningHistory(employeeId, data),
    onSuccess: (data, variables) => {
      // Invalidate learning history for this employee
      queryClient.invalidateQueries({
        queryKey: ['employees', variables.employeeId, 'learning-history'],
      });
      // Invalidate analytics for this employee
      queryClient.invalidateQueries({
        queryKey: ['analytics', 'employees', variables.employeeId],
      });
    },
  });
}
