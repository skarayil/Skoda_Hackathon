/**
 * Ingestion Hooks
 * React Query hooks for dataset ingestion
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ingestDataset,
  getDatasets,
  loadEmployees,
  analyzeDataRepair,
  type LoadEmployeesParams,
  type DataRepairRequest,
} from '../services/ingestion.service';
import type { IngestionResponse, DatasetRecordPublic } from '../types/schemas/ingestion';

/**
 * Hook to ingest a dataset file
 */
export function useIngestDataset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => ingestDataset(file),
    onSuccess: () => {
      // Invalidate datasets list after successful ingestion
      queryClient.invalidateQueries({ queryKey: ['datasets'] });
    },
  });
}

/**
 * Hook to get all ingested datasets
 */
export function useDatasets() {
  return useQuery({
    queryKey: ['datasets'],
    queryFn: () => getDatasets(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to load employees from a dataset
 */
export function useLoadEmployees() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      datasetId,
      params,
    }: {
      datasetId: string;
      params?: LoadEmployeesParams;
    }) => loadEmployees(datasetId, params),
    onSuccess: () => {
      // Invalidate employee-related queries after loading
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });
}

/**
 * Hook to analyze data repair suggestions
 */
export function useAnalyzeDataRepair() {
  return useMutation({
    mutationFn: (request: DataRepairRequest) => analyzeDataRepair(request),
  });
}

