/**
 * Analytics Hooks
 * React Query hooks for employee, department, global analytics, succession, and forecasting
 */

import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getEmployeeAnalytics,
  getDepartmentAnalytics,
  getGlobalAnalytics,
  getSuccessionRadar,
  getDepartmentNarrative,
  getForecast,
  getTeamSimilarity,
  simulateScenario,
  getPredictedShortages,
  type ScenarioSimulationRequest,
  type PredictedShortagesResponse,
} from '../services/analytics.service';
import type {
  EmployeeAnalyticsResponse,
  DepartmentAnalyticsResponse,
  GlobalAnalyticsResponse,
  SuccessionRadarResponse,
  DepartmentNarrativeResponse,
} from '../types/schemas/analytics';

/**
 * Hook to get employee-level analytics
 */
export function useEmployeeAnalytics(employeeId: string) {
  return useQuery({
    queryKey: ['analytics', 'employees', employeeId],
    queryFn: () => getEmployeeAnalytics(employeeId),
    enabled: !!employeeId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Hook to get department-level analytics
 */
export function useDepartmentAnalytics(departmentName: string) {
  return useQuery({
    queryKey: ['analytics', 'departments', departmentName],
    queryFn: () => getDepartmentAnalytics(departmentName),
    enabled: !!departmentName,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to get global analytics across all employees
 */
export function useGlobalAnalytics() {
  return useQuery({
    queryKey: ['analytics', 'global'],
    queryFn: () => getGlobalAnalytics(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // Refetch every 10 minutes
  });
}

/**
 * Hook to get succession readiness rankings for a department
 */
export function useSuccessionRadar(departmentName: string) {
  return useQuery({
    queryKey: ['analytics', 'succession', departmentName],
    queryFn: () => getSuccessionRadar(departmentName),
    enabled: !!departmentName,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to get deterministic AI narrative for a department
 */
export function useDepartmentNarrative(departmentName: string) {
  return useQuery({
    queryKey: ['analytics', 'narrative', departmentName],
    queryFn: () => getDepartmentNarrative(departmentName),
    enabled: !!departmentName,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to get skill demand forecast
 */
export function useForecast(months: number = 6) {
  return useQuery({
    queryKey: ['analytics', 'forecast', months],
    queryFn: () => getForecast(months),
    staleTime: 10 * 60 * 1000, // 10 minutes (forecasts change slowly)
  });
}

/**
 * Hook to get cross-team skill similarity analysis
 */
export function useTeamSimilarity() {
  return useQuery({
    queryKey: ['analytics', 'team-similarity'],
    queryFn: () => getTeamSimilarity(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to simulate a what-if scenario
 */
export function useSimulateScenario() {
  return useMutation({
    mutationFn: (request: ScenarioSimulationRequest) => simulateScenario(request),
  });
}

/**
 * Hook to get predicted skill shortages for a department
 */
export function usePredictedShortages(
  department: string,
  forecastMonths: number = 6
) {
  return useQuery({
    queryKey: ['analytics', 'predicted-shortages', department, forecastMonths],
    queryFn: () => getPredictedShortages(department, forecastMonths),
    enabled: !!department,
    staleTime: 10 * 60 * 1000, // 10 minutes (shortages change slowly)
  });
}
