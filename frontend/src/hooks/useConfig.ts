/**
 * Config Hooks
 * React Query hooks for UI contract and configuration
 */

import { useQuery } from '@tanstack/react-query';
import { getUIContract } from '../services/config.service';
import type { UIContractResponse } from '../services/config.service';

/**
 * Hook to get UI contract (metadata for frontend)
 */
export function useUIContract() {
  return useQuery({
    queryKey: ['config', 'ui-contract'],
    queryFn: () => getUIContract(),
    staleTime: 30 * 60 * 1000, // 30 minutes (config rarely changes)
  });
}

