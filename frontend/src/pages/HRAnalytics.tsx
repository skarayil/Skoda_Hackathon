import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, Cell, ComposedChart } from "recharts";
import { TrendingUp, TrendingDown, AlertTriangle, Target, Calendar, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { ForecastAreaChart } from "../components/analytics/ForecastAreaChart";
import { ShortageBarChart } from "../components/analytics/ShortageBarChart";
import { EmergingDecliningPanel } from "../components/analytics/EmergingDecliningPanel";
import { DepartmentFilter } from "../components/analytics/DepartmentFilter";
import { useTrends } from "../hooks/useDashboard";
import { usePredictedShortages, useGlobalAnalytics, useDepartmentAnalytics, useForecast } from "../hooks/useAnalytics";

export function HRAnalytics() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");

  // Fetch analytics data
  const { data: forecastData, isLoading: forecastLoading } = useForecast(6);
  const { data: shortagesData, isLoading: shortagesLoading } = usePredictedShortages(
    selectedDepartment !== "all" ? selectedDepartment : "Engineering",
    6
  );
  const { data: globalData, isLoading: globalLoading } = useGlobalAnalytics();
  const { data: trendsData, isLoading: trendsLoading } = useTrends(144); // 12 years = 144 months
  const { data: departmentData } = useDepartmentAnalytics(
    selectedDepartment !== "all" ? selectedDepartment : "Engineering"
  );

  const isLoading = forecastLoading || shortagesLoading || globalLoading || trendsLoading;
  
  // Transform trends data for 12-year chart or provide mock data
  const skillTrendData = Array.isArray(trendsData?.trends) && trendsData.trends.length > 0
    ? trendsData.trends.slice(0, 12).map((trend: any, idx: number) => ({
        year: new Date(2024 - (11 - idx), 0).getFullYear().toString(),
        cloud: trend.cloud_skills || 0,
        ai: trend.ai_skills || 0,
        mobile: trend.mobile_skills || 0,
        legacy: trend.legacy_skills || 0,
      }))
    : Array.from({ length: 12 }).map((_, idx) => {
        const year = 2013 + idx;
        return {
          year: year.toString(),
          cloud: 10 + idx * 5 + Math.random() * 5,
          ai: year < 2018 ? 0 : (year - 2018) * 12 + Math.random() * 10,
          mobile: year < 2015 ? 15 : 40 + idx * 2 + Math.random() * 5,
          legacy: Math.max(10, 80 - idx * 6 - Math.random() * 5),
        };
      });

  // Qualification compliance from department data
  const qualificationComplianceData = globalData?.departments?.map((dept: any) => ({
    department: dept.name,
    compliance: dept.qualification_compliance || 0,
    trend: 0, // TODO: Calculate trend from historical data
  })) || [];

  // Job transitions - placeholder (not in current backend schema)
  const jobTransitions = [
    { from: "Developer", to: "Senior Developer", count: 28, avgTime: "2.3 years" },
    { from: "Senior Developer", to: "Tech Lead", count: 12, avgTime: "3.1 years" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-[hsl(var(--skoda-green))]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1>HR Predictive Analytics</h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-1">
            Organization-wide skill intelligence · 12-year historical trends · 6-month forecast
          </p>
        </div>
        <div className="flex gap-2">
          <DepartmentFilter
            value={selectedDepartment}
            onValueChange={setSelectedDepartment}
            placeholder="All Departments"
          />
          <Button variant="outline" size="sm">
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-5 border-[hsl(var(--border))]">
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Total Employees</p>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <h3 className="mb-1">{globalData?.total_employees || 0}</h3>
          <p className="text-xs text-green-600">+0 YoY</p>
        </Card>

        <Card className="p-5 border-[hsl(var(--border))]">
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Skill Coverage</p>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <h3 className="mb-1">{globalData?.unified_score?.overall_score || 0}%</h3>
          <p className="text-xs text-green-600">+0% YoY</p>
        </Card>

        <Card className="p-5 border-[hsl(var(--border))]">
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Qualification Rate</p>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <h3 className="mb-1">{globalData?.qualification_compliance || 0}%</h3>
          <p className="text-xs text-green-600">+0% YoY</p>
        </Card>

        <Card className="p-5 border-[hsl(var(--border))]">
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Critical Shortages</p>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </div>
          <h3 className="mb-1">
            {shortagesData?.predicted_shortages?.filter((s: any) => s.severity === 'critical').length || 0}
          </h3>
          <p className="text-xs text-red-600">vs Q3 2024</p>
        </Card>
      </div>

      {/* 12-Year Skill Evolution */}
      <Card className="p-6 border-[hsl(var(--border))]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3>12-Year Skill Evolution</h3>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
              Skill adoption rates across organization (2013-2024)
            </p>
          </div>
          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[hsl(var(--skoda-green))]"></div>
              <span>Cloud Computing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>AI/ML</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span>Mobile</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              <span>Legacy Systems</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={skillTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="year" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} label={{ value: 'Adoption %', angle: -90, position: 'insideLeft', style: { fontSize: 11 } }} />
            <Tooltip />
            <Line type="monotone" dataKey="cloud" stroke="hsl(var(--skoda-green))" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="ai" stroke="#3b82f6" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="mobile" stroke="#a855f7" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="legacy" stroke="#9ca3af" strokeWidth={2} strokeDasharray="5 5" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        {/* 6-Month Forecast */}
        <ForecastAreaChart forecastData={forecastData} />

        {/* Qualification Compliance */}
        <Card className="p-6 border-[hsl(var(--border))]">
          <div className="mb-5">
            <h3>Qualification Compliance by Department</h3>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
              Mandatory certification completion rates
            </p>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={qualificationComplianceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fontSize: 11 }} domain={[0, 100]} />
              <YAxis type="category" dataKey="department" tick={{ fontSize: 11 }} width={100} />
              <Tooltip />
              <Bar dataKey="compliance" radius={[0, 4, 4, 0]}>
                {qualificationComplianceData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.compliance >= 90 ? "hsl(var(--skoda-green))" : entry.compliance >= 80 ? "#f59e0b" : "#ef4444"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Emerging vs Declining Skills */}
      <EmergingDecliningPanel trendsData={trendsData} />

      {/* Job Family Transitions */}
      <Card className="p-6 border-[hsl(var(--border))]">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3>Job Family Transition Patterns</h3>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
              Most common career progressions and average time to promotion
            </p>
          </div>
        </div>
        <div className="space-y-2">
          {jobTransitions.map((transition, idx) => (
            <div key={idx} className="flex items-center p-4 bg-[hsl(var(--skoda-gray-50))] rounded-lg border border-[hsl(var(--border))]">
              <div className="flex items-center gap-3 flex-1">
                <div className="px-4 py-2 bg-white rounded border border-[hsl(var(--border))]">
                  <p className="text-sm font-medium">{transition.from}</p>
                </div>
                <div className="flex-1 h-px bg-[hsl(var(--border))] relative">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[hsl(var(--skoda-gray-50))] px-2">
                    <Target className="w-4 h-4 text-[hsl(var(--skoda-green))]" />
                  </div>
                </div>
                <div className="px-4 py-2 bg-[hsl(var(--skoda-green))] text-white rounded">
                  <p className="text-sm font-medium">{transition.to}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 ml-6">
                <div className="text-right">
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">Transitions</p>
                  <p className="font-medium">{transition.count}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">Avg Time</p>
                  <p className="font-medium">{transition.avgTime}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Predicted Shortages */}
      <ShortageBarChart shortagesData={shortagesData} />
    </div>
  );
}
