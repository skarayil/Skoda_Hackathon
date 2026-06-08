/**
 * Employee Intelligence Hooks
 * React Query hooks for AI-powered employee intelligence
 */

import { useQuery } from '@tanstack/react-query';
import { getEmployeeIntel } from '../services/employee-intel.service';
import type { EmployeeIntelResponse } from '../services/employee-intel.service';

/**
 * Hook to get AI-powered employee intelligence summary
 */
export function useEmployeeIntel(
  employeeId: string,
  language?: 'en' | 'cz'
) {
  return useQuery({
    queryKey: ['ai', 'employee-intel', employeeId, language],
    queryFn: () => getEmployeeIntel(employeeId, language),
    enabled: !!employeeId,
    staleTime: 5 * 60 * 1000, // 5 minutes (AI responses change slowly)
  });
}

