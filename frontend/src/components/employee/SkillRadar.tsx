/**
 * Skill Radar Component
 * Displays employee skills in radar chart format
 */

import { Card } from '../ui/card';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { SkillAnalysisPublic } from '../../schemas/skills';

interface SkillRadarProps {
  skillAnalysis?: SkillAnalysisPublic;
}

export function SkillRadar({ skillAnalysis }: SkillRadarProps) {
  if (!skillAnalysis) {
    return (
      <Card className="p-6 border-[hsl(var(--border))]">
        <div className="h-[300px] flex items-center justify-center text-[hsl(var(--muted-foreground))]">
          No skill data available
        </div>
      </Card>
    );
  }

  const analysis = skillAnalysis.analysis_json;
  const currentSkills = analysis.current_skills || [];
  const missingSkills = analysis.missing_skills || [];

  // Create radar data from skills
  const radarData = [
    ...currentSkills.slice(0, 6).map((skill) => ({
      skill,
      current: 75, // Default level, could be enhanced with actual levels
      target: 85,
    })),
  ];

  if (radarData.length === 0) {
    return (
      <Card className="p-6 border-[hsl(var(--border))]">
        <div className="h-[300px] flex items-center justify-center text-[hsl(var(--muted-foreground))]">
          No skills to display
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 border-[hsl(var(--border))]">
      <div className="mb-4">
        <h3>Skill Profile</h3>
        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
          Current vs Target Competency Levels
        </p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={radarData}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11 }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
          <Radar
            name="Current"
            dataKey="current"
            stroke="hsl(var(--skoda-green))"
            fill="hsl(var(--skoda-green))"
            fillOpacity={0.5}
          />
          <Radar
            name="Target"
            dataKey="target"
            stroke="hsl(var(--skoda-navy))"
            fill="hsl(var(--skoda-navy))"
            fillOpacity={0.2}
          />
          <Legend wrapperStyle={{ fontSize: '11px' }} />
        </RadarChart>
      </ResponsiveContainer>
    </Card>
  );
}

