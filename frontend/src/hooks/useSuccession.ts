/**
 * Succession Hooks
 * React Query hooks for succession planning
 * 
 * Note: This is a convenience wrapper around useSuccessionRadar from useAnalytics
 * Kept for backward compatibility with existing components
 */

import { useSuccessionRadar } from './useAnalytics';

/**
 * Hook to get succession readiness for a department
 * @deprecated Use useSuccessionRadar from useAnalytics instead
 */
export function useSuccessionReadiness(departmentName: string) {
  return useSuccessionRadar(departmentName);
}

/**
 * Hook to get key roles
 * @deprecated Use useSuccessionRadar from useAnalytics instead
 */
export function useKeyRoles() {
  // This endpoint doesn't exist in the backend
  // Return empty query for backward compatibility
  return useSuccessionRadar('');
}

/**
 * Hook to get successors
 * @deprecated Use useSuccessionRadar from useAnalytics instead
 */
export function useSuccessors() {
  // This endpoint doesn't exist in the backend
  // Return empty query for backward compatibility
  return useSuccessionRadar('');
}
