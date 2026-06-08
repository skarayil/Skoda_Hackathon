/**
 * Data Ingestion Component
 * System UX for dataset ingestion and management
 */

import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Progress } from "../components/ui/progress";
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2, Database, Download } from "lucide-react";
import { useState, useRef } from "react";
import { useIngestDataset, useDatasets, useLoadEmployees } from "../hooks/useIngestion";
import { toast } from "sonner";

export function DataIngestion() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDatasetId, setSelectedDatasetId] = useState<string | null>(null);

  const { data: datasets, isLoading: datasetsLoading } = useDatasets();
  const ingestMutation = useIngestDataset();
  const loadEmployeesMutation = useLoadEmployees();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }

    try {
      const result = await ingestMutation.mutateAsync(selectedFile);
      toast.success(`Dataset ingested successfully! ID: ${result.dataset_id}`);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setSelectedDatasetId(result.dataset_id);
    } catch (error: any) {
      toast.error(error?.message || "Failed to ingest dataset");
    }
  };

  const handleLoadEmployees = async (datasetId: string) => {
    try {
      const result = await loadEmployeesMutation.mutateAsync({
        datasetId,
        params: {
          update_existing: true,
        },
      });
      toast.success(
        `Loaded ${result.total_loaded} employees (${result.created} created, ${result.updated} updated)`
      );
    } catch (error: any) {
      toast.error(error?.message || "Failed to load employees");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>Data Ingestion</h1>
        <p className="text-[hsl(var(--muted-foreground))] mt-1">
          Upload and process employee datasets · CSV, Excel, JSON, TXT, DOCX supported
        </p>
      </div>

      {/* Upload Section */}
      <Card className="p-6 border-[hsl(var(--border))]">
        <div className="mb-6">
          <h3 className="flex items-center gap-2 mb-2">
            <Upload className="w-5 h-5 text-[hsl(var(--skoda-green))]" />
            Upload Dataset
          </h3>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Select a file to ingest. The system will normalize, validate, and analyze the data.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.json,.txt,.docx"
              onChange={handleFileSelect}
              className="flex-1"
            />
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || ingestMutation.isPending}
              className="bg-[hsl(var(--skoda-green))] hover:bg-[hsl(var(--skoda-green-dark))]"
            >
              {ingestMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </>
              )}
            </Button>
          </div>

          {selectedFile && (
            <div className="p-4 bg-[hsl(var(--skoda-gray-50))] rounded-lg border border-[hsl(var(--border))]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[hsl(var(--skoda-green))]" />
                  <div>
                    <p className="font-medium text-sm">{selectedFile.name}</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedFile(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                >
                  Remove
                </Button>
              </div>
            </div>
          )}

          {ingestMutation.isPending && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[hsl(var(--muted-foreground))]">Processing dataset...</span>
                <span className="text-[hsl(var(--muted-foreground))]">This may take a few moments</span>
              </div>
              <Progress value={undefined} className="h-2" />
            </div>
          )}
        </div>
      </Card>

      {/* Datasets List */}
      <Card className="p-6 border-[hsl(var(--border))]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="flex items-center gap-2 mb-2">
              <Database className="w-5 h-5 text-[hsl(var(--skoda-green))]" />
              Ingested Datasets
            </h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              {datasetsLoading ? "Loading..." : `${datasets?.length || 0} datasets available`}
            </p>
          </div>
        </div>

        {datasetsLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[hsl(var(--skoda-green))]" />
          </div>
        ) : datasets && datasets.length > 0 ? (
          <div className="space-y-3">
            {datasets.map((dataset) => (
              <div
                key={dataset.id}
                className="p-4 bg-white rounded-lg border border-[hsl(var(--border))] hover:border-[hsl(var(--skoda-green))] transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                      <p className="font-medium">{dataset.dataset_id}</p>
                      {dataset.dq_score !== null && dataset.dq_score !== undefined && (
                        <Badge
                          className={
                            dataset.dq_score >= 80
                              ? "bg-green-100 text-green-700 border-0"
                              : dataset.dq_score >= 60
                              ? "bg-orange-100 text-orange-700 border-0"
                              : "bg-red-100 text-red-700 border-0"
                          }
                        >
                          DQ: {dataset.dq_score}%
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2">
                      Created: {new Date(dataset.created_at).toLocaleDateString()}
                    </p>
                    {dataset.metadata && typeof dataset.metadata === "object" && "row_count" in dataset.metadata && (
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">
                        Rows: {(dataset.metadata as any).row_count || "N/A"}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleLoadEmployees(dataset.dataset_id)}
                      disabled={loadEmployeesMutation.isPending}
                    >
                      {loadEmployeesMutation.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Database className="w-4 h-4 mr-2" />
                          Load Employees
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <FileText className="w-12 h-12 mx-auto mb-4 text-[hsl(var(--muted-foreground))]" />
            <p className="text-[hsl(var(--muted-foreground))]">No datasets ingested yet</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
              Upload a file to get started
            </p>
          </div>
        )}
      </Card>

      {/* Info Section */}
      <Card className="p-6 border-[hsl(var(--border))] bg-[hsl(var(--skoda-green))]/5">
        <div className="flex items-start gap-4">
          <CheckCircle2 className="w-5 h-5 text-[hsl(var(--skoda-green))] mt-0.5" />
          <div>
            <h4 className="mb-2">Supported File Formats</h4>
            <ul className="text-sm text-[hsl(var(--muted-foreground))] space-y-1">
              <li>• CSV (.csv) - Comma-separated values</li>
              <li>• Excel (.xlsx) - Microsoft Excel files</li>
              <li>• JSON (.json) - JavaScript Object Notation</li>
              <li>• Text (.txt) - Plain text files</li>
              <li>• Word (.docx) - Microsoft Word documents</li>
            </ul>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-4">
              After ingestion, datasets are normalized, validated, and analyzed for data quality. You can then load
              employee records into the database for skill analysis.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

