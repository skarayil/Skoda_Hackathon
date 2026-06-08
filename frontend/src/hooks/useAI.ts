/**
 * AI Hooks
 * React Query hooks for AI-powered features: career chat, training plans, what-if scenarios, comparisons
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  careerChat,
  generateTrainingPlan,
  runWhatIfScenario,
  compareEmployees,
  compareDepartments,
  type CareerChatRequest,
  type TrainingPlanRequest,
  type WhatIfScenarioRequest,
  type CompareEmployeesRequest,
  type CareerChatResponse,
  type TrainingPlanResponse,
  type WhatIfScenarioResponse,
  type CompareEmployeesResponse,
  type DepartmentComparisonResponse,
} from '../services/ai.service';

/**
 * Hook to send career chat message
 */
export function useCareerChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CareerChatRequest) => careerChat(request),
    onSuccess: (data, variables) => {
      // Invalidate employee-related queries if employee_id provided
      if (variables.employee_id) {
        queryClient.invalidateQueries({
          queryKey: ['ai', 'employee-intel', variables.employee_id],
        });
        queryClient.invalidateQueries({
          queryKey: ['analytics', 'employees', variables.employee_id],
        });
      }
    },
  });
}

/**
 * Hook to generate AI training plan
 */
export function useTrainingPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: TrainingPlanRequest) => generateTrainingPlan(request),
    onSuccess: (data, variables) => {
      // Invalidate employee-related queries if employee_id provided
      if (variables.employee_id) {
        queryClient.invalidateQueries({
          queryKey: ['ai', 'employee-intel', variables.employee_id],
        });
        queryClient.invalidateQueries({
          queryKey: ['recommendations', 'skills', variables.employee_id],
        });
      }
    },
  });
}

/**
 * Hook to run what-if scenario
 */
export function useWhatIfScenario() {
  return useMutation({
    mutationFn: (request: WhatIfScenarioRequest) => runWhatIfScenario(request),
  });
}

/**
 * Hook to compare employees
 */
export function useCompareEmployees() {
  return useMutation({
    mutationFn: (request: CompareEmployeesRequest) => compareEmployees(request),
  });
}

/**
 * Hook to compare two departments
 */
export function useCompareDepartments(
  department1: string,
  department2: string,
  language?: 'en' | 'cz',
  enabled: boolean = true
) {
  return useQuery({
    queryKey: ['ai', 'compare-departments', department1, department2, language],
    queryFn: () => compareDepartments(department1, department2, language),
    enabled: enabled && !!department1 && !!department2,
    staleTime: 10 * 60 * 1000, // 10 minutes (comparisons change slowly)
  });
}

