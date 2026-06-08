/**
 * Dashboard Hooks
 * React Query hooks for dashboard data
 */

import { useQuery } from '@tanstack/react-query';
import {
  getDashboardOverview,
  getSkillMap,
  getHeatmap,
  getTrends,
} from '../services/dashboard.service';
import type {
  DashboardOverviewResponse,
  SkillMapResponse,
  SkillHeatmapResponse,
  SkillTrendsResponse,
} from '../types/schemas/dashboard';

/**
 * Hook to get dashboard overview data
 */
export function useDashboardOverview() {
  return useQuery({
    queryKey: ['dashboard', 'overview'],
    queryFn: () => getDashboardOverview(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
}

/**
 * Hook to get skill map visualization data
 */
export function useSkillMap() {
  return useQuery({
    queryKey: ['dashboard', 'skill-map'],
    queryFn: () => getSkillMap(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to get skill heatmap data
 */
export function useHeatmap(departmentName?: string) {
  return useQuery({
    queryKey: ['dashboard', 'heatmap', departmentName],
    queryFn: () => getHeatmap(departmentName),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Hook to get skill trends over time
 */
export function useTrends(periodMonths: number = 6) {
  return useQuery({
    queryKey: ['dashboard', 'trends', periodMonths],
    queryFn: () => getTrends(periodMonths),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
