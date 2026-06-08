/**
 * Heatmap Hooks
 * React Query hooks for skill heatmap data
 * 
 * Note: This is a convenience wrapper around useHeatmap from useDashboard
 * Kept for backward compatibility with existing components
 */

import { useHeatmap } from './useDashboard';

/**
 * Hook to get heatmap data
 * @deprecated Use useHeatmap from useDashboard instead
 */
export function useHeatmapData(departmentName?: string) {
  return useHeatmap(departmentName);
}

/**
 * Hook to get heatmap insights
 * @deprecated Use useHeatmap from useDashboard instead
 */
export function useHeatmapInsights() {
  return useHeatmap();
}
