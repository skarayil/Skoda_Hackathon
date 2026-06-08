import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from "recharts";
import { AlertTriangle, TrendingUp, Users, Target, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { useSuccessionRadar, useDepartmentNarrative } from "../hooks/useAnalytics";
import { mapSuccessionCandidates, mapKeyRoles, mapPipelineSummary } from "../utils/mappers/succession.mapper";

export function SuccessionReadiness() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("Engineering");
  
  const { data: successionData, isLoading: successionLoading, error: successionError } = useSuccessionRadar(selectedDepartment);
  const { data: narrativeData } = useDepartmentNarrative(selectedDepartment);

  // Map data to UI format
  const candidates = successionData ? mapSuccessionCandidates(successionData) : [];
  const keyRoles = successionData ? mapKeyRoles(successionData) : [];
  const pipelineSummary = successionData ? mapPipelineSummary(successionData) : null;

  // Create radar data from unified score
  const radarData = successionData
    ? [
        { skill: "Technical Excellence", current: successionData.unified_score.overall_score, target: 90 },
        { skill: "Leadership", current: successionData.unified_score.role_fit_score, target: 85 },
        { skill: "Strategic Thinking", current: successionData.unified_score.next_role_readiness, target: 80 },
        { skill: "Stakeholder Mgmt", current: 100 - successionData.unified_score.risk_score, target: 85 },
        { skill: "Innovation", current: successionData.unified_score.ai_readiness || successionData.unified_score.overall_score, target: 85 },
        { skill: "Team Development", current: successionData.unified_score.overall_score, target: 85 },
      ]
    : [];

  const isLoading = successionLoading;
  const hasError = successionError;

  const getRiskColor = (risk: string) => {
    if (risk === "High") return "bg-red-100 text-red-700 border-0";
    if (risk === "Medium") return "bg-orange-100 text-orange-700 border-0";
    return "bg-green-100 text-green-700 border-0";
  };

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
          <p className="text-red-700">Error loading succession data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>Succession Planning & Readiness</h1>
        <p className="text-[hsl(var(--muted-foreground))] mt-1">
          {selectedDepartment} · {pipelineSummary?.totalCandidates || 0} candidates · {pipelineSummary?.riskOutlook || "Unknown"} risk
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-5 border-[hsl(var(--border))]">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-[hsl(var(--skoda-green))]/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-[hsl(var(--skoda-green))]" />
            </div>
            <Badge className="bg-green-100 text-green-700 border-0">Good</Badge>
          </div>
          <h3 className="mb-1">{keyRoles.length}</h3>
          <p className="text-[hsl(var(--muted-foreground))] text-xs">Key Roles Tracked</p>
        </Card>

        <Card className="p-5 border-[hsl(var(--border))]">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-[hsl(var(--skoda-green))]/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-[hsl(var(--skoda-green))]" />
            </div>
            <Badge className="bg-green-100 text-green-700 border-0">+{pipelineSummary?.readySoon || 0}</Badge>
          </div>
          <h3 className="mb-1">{pipelineSummary?.readyNow || 0}</h3>
          <p className="text-[hsl(var(--muted-foreground))] text-xs">Ready Successors</p>
        </Card>

        <Card className="p-5 border-[hsl(var(--border))]">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <Badge className="bg-red-100 text-red-700 border-0">Urgent</Badge>
          </div>
          <h3 className="mb-1">{keyRoles.filter(r => r.risk === "High").length}</h3>
          <p className="text-[hsl(var(--muted-foreground))] text-xs">High-Risk Roles</p>
        </Card>

        <Card className="p-5 border-[hsl(var(--border))]">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-[hsl(var(--skoda-green))]/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[hsl(var(--skoda-green))]" />
            </div>
            <Badge className="bg-green-100 text-green-700 border-0">+{pipelineSummary?.developing || 0}</Badge>
          </div>
          <h3 className="mb-1">{successionData?.unified_score.overall_score || 0}%</h3>
          <p className="text-[hsl(var(--muted-foreground))] text-xs">Pipeline Strength</p>
        </Card>
      </div>

      {/* Key Roles Table */}
      <Card className="p-6 border-[hsl(var(--border))]">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3>Critical Role Coverage</h3>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Succession risk and bench strength</p>
          </div>
          <Button variant="outline" size="sm">View All Roles</Button>
        </div>

        <div className="space-y-3">
          {keyRoles.length > 0 ? (
            keyRoles.map((role, idx) => (
            <div key={idx} className="p-4 bg-[hsl(var(--skoda-gray-50))] rounded-lg border border-[hsl(var(--border))]">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4>{role.role}</h4>
                    <Badge className={getRiskColor(role.risk)}>{role.risk} Risk</Badge>
                  </div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    Current: {role.incumbent} · Est. Vacancy: {new Date(role.retirementDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2">Ready Now</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      role.readyCandidates > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {role.readyCandidates}
                    </div>
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">candidates</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2">In Pipeline</p>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                      {role.pipelineCandidates}
                    </div>
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">developing</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2">Bench Strength</p>
                  <Progress
                    value={(role.readyCandidates / 3) * 100}
                    className="h-2 mt-3"
                  />
                </div>
              </div>
            </div>
            ))
          ) : (
            <div className="p-4 text-center text-[hsl(var(--muted-foreground))] text-sm">
              No key roles data available
            </div>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-6">
        {/* Readiness Radar */}
        <Card className="col-span-1 p-6 border-[hsl(var(--border))]">
          <div className="mb-4">
            <h3>Successor Readiness Profile</h3>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Average across top candidates</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 9 }} />
              <Radar name="Current" dataKey="current" stroke="hsl(var(--skoda-green))" fill="hsl(var(--skoda-green))" fillOpacity={0.5} />
              <Radar name="Target" dataKey="target" stroke="hsl(var(--skoda-navy))" fill="hsl(var(--skoda-navy))" fillOpacity={0.2} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        {/* Successor Candidates */}
        <Card className="col-span-2 p-6 border-[hsl(var(--border))]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3>High-Potential Successors</h3>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Candidates for critical roles</p>
            </div>
          </div>

          <div className="space-y-3">
            {candidates.length > 0 ? (
              candidates.map((candidate, idx) => (
              <div key={idx} className="p-4 bg-white rounded-lg border border-[hsl(var(--border))] hover:border-[hsl(var(--skoda-green))] transition-colors">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12 border-2 border-[hsl(var(--skoda-green))]">
                    <AvatarFallback className="bg-[hsl(var(--skoda-navy))] text-white">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium">{candidate.name}</p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">
                          {candidate.currentRole} → {candidate.targetRole}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 justify-end mb-1">
                          <span className="text-sm">{candidate.readiness}%</span>
                          <div className={`w-3 h-3 rounded-full ${
                            candidate.readiness >= 85 ? "bg-green-500" : "bg-orange-400"
                          }`}></div>
                        </div>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">{candidate.timeline}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      {candidate.strengths.map((strength, sIdx) => (
                        <Badge key={sIdx} variant="outline" className="text-xs border-[hsl(var(--skoda-green))] text-[hsl(var(--skoda-green))]">
                          {strength}
                        </Badge>
                      ))}
                    </div>

                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                      <strong>Gap:</strong> {candidate.gap}
                    </p>

                    <Progress value={candidate.readiness} className="h-1.5 mt-2" />
                  </div>
                </div>
              </div>
              ))
            ) : (
              <div className="p-4 text-center text-[hsl(var(--muted-foreground))] text-sm">
                No candidates available
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* AI Recommendation */}
      <Card className="p-6 border-[hsl(var(--border))] bg-gradient-to-r from-[hsl(var(--skoda-green))]/5 to-white">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-[hsl(var(--skoda-green))] flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="mb-2">AI Risk Alert: DevOps Lead Succession</h4>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
              High succession risk detected for DevOps Lead role. No ready candidates identified for expected vacancy in Dec 2025. 
              Recommend accelerated development program for Tomáš Novák (67% ready) and external recruitment as backup strategy.
            </p>
            <div className="flex gap-2">
              <Button size="sm" className="bg-[hsl(var(--skoda-green))] hover:bg-[hsl(var(--skoda-green-dark))]">
                Create Development Plan
              </Button>
              <Button size="sm" variant="outline">
                Explore Candidates
              </Button>
              <Button size="sm" variant="outline">
                Initiate Recruitment
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
