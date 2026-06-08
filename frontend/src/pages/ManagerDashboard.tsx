import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { TrendingUp, TrendingDown, AlertTriangle, Users, Target, Award, Brain, Loader2 } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell } from "recharts";
import { useDashboardOverview, useTrends } from "../hooks/useDashboard";
import { useGlobalAnalytics, useForecast } from "../hooks/useAnalytics";
import { mapDashboardMetrics, mapSkillReadinessData, mapRadarChartData } from "../utils/mappers/dashboard.mapper";
import { mapPredictedGaps } from "../utils/mappers/analytics.mapper";

export function ManagerDashboard() {
  // Fetch dashboard data
  const { data: dashboardData, isLoading: dashboardLoading, error: dashboardError } = useDashboardOverview();
  const { data: trendsData, isLoading: trendsLoading } = useTrends(6);
  const { data: forecastData, isLoading: forecastLoading } = useForecast(6);
  const { data: globalData } = useGlobalAnalytics();

  // Map data to UI format
  const metrics = dashboardData ? mapDashboardMetrics(dashboardData) : null;
  const teamStats = dashboardData
    ? [
        {
          label: "Team Members",
          value: dashboardData.total_employees.toString(),
          change: "+0",
          trend: "neutral" as const,
          icon: Users,
        },
        {
          label: "Avg Skill Coverage",
          value: metrics?.skillCoverage.value || "0%",
          change: metrics?.skillCoverage.change || "+0%",
          trend: metrics?.skillCoverage.trend || "neutral",
          icon: Target,
        },
        {
          label: "Qualifications Due",
          value: metrics?.qualificationsDue.value.toString() || "0",
          change: metrics?.qualificationsDue.change || "0",
          trend: metrics?.qualificationsDue.trend || "neutral",
          icon: Award,
        },
        {
          label: "AI Recommendations",
          value: metrics?.aiRecommendations.value.toString() || "0",
          change: metrics?.aiRecommendations.change || "New",
          trend: metrics?.aiRecommendations.trend || "neutral",
          icon: Brain,
        },
      ]
    : [];

  const skillReadinessData = dashboardData ? mapSkillReadinessData(dashboardData) : [];
  const radarData = dashboardData ? mapRadarChartData(dashboardData) : [];
  const upcomingGaps = forecastData ? mapPredictedGaps(forecastData) : [];

  // Mock risk employees (not available in backend yet)
  const riskEmployees = [
    { name: "Employee 1", role: "Developer", risk: "High" as const, reason: "High risk score", skills: 67 },
    { name: "Employee 2", role: "Team Lead", risk: "Medium" as const, reason: "Medium risk score", skills: 74 },
  ];

  const isLoading = dashboardLoading || trendsLoading || forecastLoading;
  const hasError = dashboardError;

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
          <p className="text-red-700">Error loading dashboard data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>Manager Dashboard</h1>
        <p className="text-[hsl(var(--muted-foreground))] mt-1">
          {dashboardData?.total_departments || 0} Departments · {dashboardData?.total_employees || 0} Employees
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        {teamStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-5 border-[hsl(var(--border))]">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-[hsl(var(--skoda-green))]/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[hsl(var(--skoda-green))]" />
                </div>
                {stat.trend === "up" && (
                  <Badge className="bg-green-100 text-green-700 border-0">{stat.change}</Badge>
                )}
                {stat.trend === "down" && (
                  <Badge className="bg-red-100 text-red-700 border-0">{stat.change}</Badge>
                )}
              </div>
              <h3 className="mb-1">{stat.value}</h3>
              <p className="text-[hsl(var(--muted-foreground))] text-xs">{stat.label}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Team Skill Readiness */}
        <Card className="col-span-2 p-6 border-[hsl(var(--border))]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3>Team Skill Readiness</h3>
              <p className="text-[hsl(var(--muted-foreground))] text-xs mt-1">Current vs Target Competency Levels</p>
            </div>
            <Badge variant="outline" className="border-[hsl(var(--skoda-green))] text-[hsl(var(--skoda-green))]">
              {skillReadinessData.length} skills tracked
            </Badge>
          </div>
          {skillReadinessData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skillReadinessData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="skill" tick={{ fontSize: 11 }} angle={-20} textAnchor="end" height={80} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="current" fill="hsl(var(--skoda-green))" name="Current" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" fill="hsl(var(--skoda-gray-300))" name="Target" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-[hsl(var(--muted-foreground))]">
              No skill data available
            </div>
          )}
        </Card>

        {/* Team Capability Radar */}
        <Card className="p-6 border-[hsl(var(--border))]">
          <div className="mb-6">
            <h3>Team Capability Profile</h3>
            <p className="text-[hsl(var(--muted-foreground))] text-xs mt-1">Aggregate team strengths</p>
          </div>
          {radarData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar name="Team" dataKey="A" stroke="hsl(var(--skoda-green))" fill="hsl(var(--skoda-green))" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-[hsl(var(--muted-foreground))]">
              No capability data available
            </div>
          )}
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* High-Risk Employees */}
        <Card className="p-6 border-[hsl(var(--border))]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                High-Priority Interventions
              </h3>
              <p className="text-[hsl(var(--muted-foreground))] text-xs mt-1">Employees requiring immediate attention</p>
            </div>
          </div>
          <div className="space-y-4">
            {riskEmployees.length > 0 ? (
              riskEmployees.map((emp, idx) => (
              <div key={emp.name} className="p-4 bg-[hsl(var(--skoda-gray-50))] rounded-lg border border-[hsl(var(--border))]">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium">{emp.name}</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">{emp.role}</p>
                  </div>
                  <Badge className={emp.risk === "High" ? "bg-red-100 text-red-700 border-0" : "bg-orange-100 text-orange-700 border-0"}>
                    {emp.risk} Risk
                  </Badge>
                </div>
                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2">{emp.reason}</p>
                <div className="flex items-center gap-2">
                  <Progress value={emp.skills} className="flex-1 h-2" />
                  <span className="text-xs text-[hsl(var(--muted-foreground))]">{emp.skills}%</span>
                </div>
              </div>
              ))
            ) : (
              <div className="p-4 text-center text-[hsl(var(--muted-foreground))] text-sm">
                No high-risk employees identified
              </div>
            )}
          </div>
        </Card>

        {/* Predicted Skill Gaps */}
        <Card className="p-6 border-[hsl(var(--border))]">
          <div className="mb-5">
            <h3 className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-[hsl(var(--skoda-green))]" />
              AI-Predicted Skill Gaps
            </h3>
            <p className="text-[hsl(var(--muted-foreground))] text-xs mt-1">Forecast based on project pipeline & attrition</p>
          </div>
          <div className="space-y-3">
            {upcomingGaps.length > 0 ? (
              upcomingGaps.map((gap, idx) => (
              <div key={idx} className="p-4 bg-white rounded-lg border border-[hsl(var(--border))] hover:border-[hsl(var(--skoda-green))] transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-sm">{gap.gap}</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{gap.month}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${gap.severity === "high" ? "bg-red-500" : "bg-orange-400"}`}></div>
                </div>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Impact: {gap.impact}</p>
              </div>
              ))
            ) : (
              <div className="p-4 text-center text-[hsl(var(--muted-foreground))] text-sm">
                No predicted gaps available
              </div>
            )}
          </div>

          <div className="mt-6 p-4 bg-[hsl(var(--skoda-green))]/5 rounded-lg border border-[hsl(var(--skoda-green))]/20">
            <p className="text-xs mb-3">
              <strong className="text-[hsl(var(--skoda-green))]">AI Recommendation:</strong>
            </p>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2">
              Enroll 4 team members in "AWS Cloud Architect" course by Dec 15 to prevent Q1 2025 bottleneck. Estimated cost: 24,000 CZK.
            </p>
            <div className="flex gap-2 mt-3">
              <button className="px-3 py-1.5 bg-[hsl(var(--skoda-green))] text-white rounded text-xs hover:bg-[hsl(var(--skoda-green-dark))] transition-colors">
                Schedule Training
              </button>
              <button className="px-3 py-1.5 border border-[hsl(var(--border))] rounded text-xs hover:bg-[hsl(var(--skoda-gray-50))] transition-colors">
                View Details
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
