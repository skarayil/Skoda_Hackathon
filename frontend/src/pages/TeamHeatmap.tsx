import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Search, Filter, Download, TrendingUp, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { useHeatmap } from "../hooks/useDashboard";
import { useSkillMap } from "../hooks/useDashboard";
import { mapHeatmapData } from "../utils/mappers/heatmap.mapper";

export function TeamHeatmap() {
  const [selectedDepartment, setSelectedDepartment] = useState<string | undefined>();
  const { data: heatmapData, isLoading: heatmapLoading, error: heatmapError } = useHeatmap(selectedDepartment);
  const { data: skillMapData, isLoading: skillMapLoading } = useSkillMap();

  // Extract skills from skill map or use default
  const skills = skillMapData?.ontology?.skills?.slice(0, 8) || [
    "React/Frontend",
    "Backend APIs",
    "Cloud (AWS/Azure)",
    "Database Design",
    "DevOps/CI-CD",
    "Security",
    "Agile/Scrum",
    "Leadership",
  ];

  // Map heatmap data to UI format
  const heatmapMapped = heatmapData ? mapHeatmapData(heatmapData, skills) : null;
  const employees = heatmapMapped?.employees || [];
  const teamAvg = skills.map((_, idx) => {
    if (employees.length === 0) return "0.0";
    const sum = employees.reduce((acc, emp) => acc + (emp.skills[idx] || 0), 0);
    return (sum / employees.length).toFixed(1);
  });

  const isLoading = heatmapLoading || skillMapLoading;
  const hasError = heatmapError;

  const getColorClass = (level: number) => {
    if (level === 5) return "bg-[hsl(var(--skoda-green-dark))] text-white";
    if (level === 4) return "bg-[hsl(var(--skoda-green))] text-white";
    if (level === 3) return "bg-[hsl(var(--skoda-green-light))]/40 text-[hsl(var(--skoda-navy))]";
    if (level === 2) return "bg-orange-200 text-orange-900";
    return "bg-red-200 text-red-900";
  };

  const getSkillLevel = (level: number) => {
    const labels = ["Novice", "Basic", "Intermediate", "Advanced", "Expert"];
    return labels[level - 1] || "Unknown";
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
          <p className="text-red-700">Error loading heatmap data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1>Team Skills Heatmap</h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-1">
            Competency matrix · {selectedDepartment || "All Departments"} · {employees.length} employees
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Search and Legend */}
      <div className="flex items-center justify-between">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[hsl(var(--skoda-gray-400))]" />
          <Input
            placeholder="Search employee or skill..."
            className="pl-10 bg-white"
          />
        </div>
        <div className="flex items-center gap-4">
          <p className="text-xs text-[hsl(var(--muted-foreground))]">Skill Levels:</p>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((level) => (
              <div key={level} className="flex items-center gap-1">
                <div className={`w-8 h-6 rounded text-xs flex items-center justify-center ${getColorClass(level)}`}>
                  {level}
                </div>
                <span className="text-xs text-[hsl(var(--muted-foreground))]">{getSkillLevel(level)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Heatmap */}
      <Card className="p-6 border-[hsl(var(--border))] overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[hsl(var(--border))]">
              <th className="text-left py-3 pr-6 min-w-[200px]">
                <p className="text-sm">Employee</p>
              </th>
              {skills.map((skill, idx) => (
                <th key={idx} className="text-center px-3 py-3 min-w-[120px]">
                  <p className="text-xs">{skill}</p>
                </th>
              ))}
              <th className="text-center px-3 py-3 min-w-[80px]">
                <p className="text-xs">Trend</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((emp, empIdx) => (
              <tr
                key={empIdx}
                className="border-b border-[hsl(var(--border))] hover:bg-[hsl(var(--skoda-gray-50))] transition-colors"
              >
                <td className="py-4 pr-6">
                  <p className="font-medium text-sm">{emp.name}</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">{emp.role}</p>
                </td>
                {emp.skills.map((level, skillIdx) => (
                  <td key={skillIdx} className="px-3 py-4 text-center">
                    <div className="flex justify-center">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClass(level)} transition-all hover:scale-110 cursor-pointer`}>
                        {level}
                      </div>
                    </div>
                  </td>
                ))}
                <td className="px-3 py-4 text-center">
                  {emp.trend === "up" && (
                    <div className="flex items-center justify-center gap-1 text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-xs">+12%</span>
                    </div>
                  )}
                  {emp.trend === "down" && (
                    <div className="flex items-center justify-center gap-1 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-xs">-5%</span>
                    </div>
                  )}
                  {emp.trend === "stable" && (
                    <div className="flex items-center justify-center">
                      <span className="text-xs text-[hsl(var(--muted-foreground))]">Stable</span>
                    </div>
                  )}
                </td>
              </tr>
              ))
            ) : (
              <tr>
                <td colSpan={skills.length + 2} className="py-8 text-center text-[hsl(var(--muted-foreground))]">
                  No heatmap data available
                </td>
              </tr>
            )}
            {/* Team Average Row */}
            {employees.length > 0 && (
              <tr className="bg-[hsl(var(--skoda-green))]/5 border-t-2 border-[hsl(var(--skoda-green))]">
                <td className="py-4 pr-6">
                  <p className="font-medium text-sm">Team Average</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">Aggregated skill level</p>
                </td>
                {teamAvg.map((avg, idx) => (
                  <td key={idx} className="px-3 py-4 text-center">
                    <p className="text-sm">{avg}</p>
                  </td>
                ))}
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>

      {/* Insights */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-5 border-[hsl(var(--border))] bg-[hsl(var(--skoda-green))]/5">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4>Strongest Skills</h4>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Team-wide proficiency</p>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Backend APIs</span>
              <Badge className="bg-[hsl(var(--skoda-green))] text-white border-0">4.0 avg</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">React/Frontend</span>
              <Badge className="bg-[hsl(var(--skoda-green))] text-white border-0">3.9 avg</Badge>
            </div>
          </div>
        </Card>

        <Card className="p-5 border-[hsl(var(--border))] bg-red-50">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4>Critical Gaps</h4>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Below target threshold</p>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Security</span>
              <Badge className="bg-red-100 text-red-700 border-0">3.0 avg</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Cloud (AWS/Azure)</span>
              <Badge className="bg-orange-100 text-orange-700 border-0">3.3 avg</Badge>
            </div>
          </div>
        </Card>

        <Card className="p-5 border-[hsl(var(--border))]">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4>Top Performers</h4>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Highest skill coverage</p>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Jan Horáček</span>
              <Badge variant="outline" className="border-[hsl(var(--skoda-green))] text-[hsl(var(--skoda-green))]">4.8 avg</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Martin Černý</span>
              <Badge variant="outline" className="border-[hsl(var(--skoda-green))] text-[hsl(var(--skoda-green))]">4.0 avg</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
