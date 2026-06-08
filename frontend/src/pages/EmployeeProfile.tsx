import { Card } from "../components/ui/card";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { EmployeeHeader } from "../components/employee/EmployeeHeader";
import { SkillRadar } from "../components/employee/SkillRadar";
import { SkillGapList } from "../components/employee/SkillGapList";
import { RoleFitCard } from "../components/employee/RoleFitCard";
import { AIInsightsCard } from "../components/employee/AIInsightsCard";
import { QualificationComplianceCard } from "../components/employee/QualificationComplianceCard";
import { EmployeePicker } from "../components/employee/EmployeePicker";
import { useEmployeeIntel } from "../hooks/useEmployeeIntel";
import { useSkillAnalysis } from "../hooks/useSkills";
import { useSkillRecommendations } from "../hooks/useRecommendations";
import { useLearningHistory } from "../hooks/useEmployees";
import { useRoleFit } from "../hooks/useSkills";

export function EmployeeProfile() {
  // Get employeeId from URL params or use default
  const [employeeId, setEmployeeId] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('employeeId') || 'EMP-001';
  });

  // Fetch employee data
  const { data: employeeIntel, isLoading: intelLoading, error: intelError } = useEmployeeIntel(employeeId);
  const { data: skillAnalysis, isLoading: skillLoading } = useSkillAnalysis(employeeId);
  const { data: skillRecommendations, isLoading: recLoading } = useSkillRecommendations(employeeId);
  const { data: learningHistory, isLoading: historyLoading } = useLearningHistory(employeeId);
  
  const roleFitMutation = useRoleFit(employeeId);

  useEffect(() => {
    // Update URL when employeeId changes
    const params = new URLSearchParams(window.location.search);
    params.set('employeeId', employeeId);
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  }, [employeeId]);

  const isLoading = intelLoading || skillLoading || recLoading || historyLoading;
  const hasError = intelError;

  // Calculate skill coverage from skill analysis
  const skillCoverage = skillAnalysis?.unified_score?.overall_score || 0;
  const mandatoryCompliance = 87; // TODO: Calculate from qualifications

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-[hsl(var(--skoda-green))]" />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="space-y-6">
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">Error loading employee data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Employee Picker */}
      <div className="flex items-center justify-between">
        <h1>Employee Intelligence Profile</h1>
        <EmployeePicker value={employeeId} onValueChange={setEmployeeId} />
      </div>

      {/* Header Profile Card */}
      <EmployeeHeader
        employeeId={employeeId}
        employeeIntel={employeeIntel}
        skillCoverage={skillCoverage}
        mandatoryCompliance={mandatoryCompliance}
      />

      {/* Qualifications Compliance */}
      <QualificationComplianceCard employeeIntel={employeeIntel} />

      <div className="grid grid-cols-2 gap-6">
        {/* Skills Radar */}
        <SkillRadar skillAnalysis={skillAnalysis} />

        {/* Skills Gap List */}
        <SkillGapList skillAnalysis={skillAnalysis} />

        {/* Role Fit Card */}
        <RoleFitCard
          roleFitScore={skillAnalysis?.unified_score?.role_fit_score}
          recommendation={skillAnalysis?.analysis_json?.recommendation}
        />
      </div>

      {/* AI Insights */}
      <AIInsightsCard employeeIntel={employeeIntel} />

      {/* Learning History */}
      {learningHistory && learningHistory.length > 0 && (
        <Card className="p-6 border-[hsl(var(--border))]">
          <div className="mb-5">
            <h3>Learning History</h3>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
              Recent training and certifications
            </p>
          </div>
          <div className="space-y-3">
            {learningHistory.slice(0, 5).map((record, idx) => (
              <div key={idx} className="p-3 bg-[hsl(var(--skoda-gray-50))] rounded-lg">
                <p className="text-sm font-medium">{record.course_name || record.training_name || 'Training'}</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  {record.completion_date || record.date || 'Date not available'}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
