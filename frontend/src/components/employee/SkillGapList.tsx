/**
 * Skill Gap List Component
 * Displays current skills with gaps and targets
 */

import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import type { SkillAnalysisPublic } from '../../schemas/skills';

interface SkillGapListProps {
  skillAnalysis?: SkillAnalysisPublic;
}

export function SkillGapList({ skillAnalysis }: SkillGapListProps) {
  if (!skillAnalysis) {
    return (
      <Card className="p-6 border-[hsl(var(--border))]">
        <div className="text-center text-[hsl(var(--muted-foreground))]">
          No skill analysis available
        </div>
      </Card>
    );
  }

  const analysis = skillAnalysis.analysis_json;
  const currentSkills = analysis.current_skills || [];
  const missingSkills = analysis.missing_skills || [];
  const strengths = analysis.strengths || [];

  return (
    <Card className="p-6 border-[hsl(var(--border))]">
      <div className="mb-5">
        <h3>Skills & Gaps</h3>
        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
          Current skills and development areas
        </p>
      </div>

      <div className="space-y-4">
        {/* Current Skills */}
        {currentSkills.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              Current Skills ({currentSkills.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {currentSkills.map((skill, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="border-[hsl(var(--skoda-green))] text-[hsl(var(--skoda-green))]"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Strengths */}
        {strengths.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-3">Key Strengths</h4>
            <div className="space-y-2">
              {strengths.map((strength, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Progress value={85} className="flex-1 h-2" />
                  <span className="text-xs text-[hsl(var(--muted-foreground))] w-20 text-right">
                    {strength}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Missing Skills */}
        {missingSkills.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-orange-600" />
              Skill Gaps ({missingSkills.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {missingSkills.map((skill, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="border-orange-500 text-orange-700"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {currentSkills.length === 0 && missingSkills.length === 0 && (
          <div className="text-center text-[hsl(var(--muted-foreground))] py-8">
            No skill data available
          </div>
        )}
      </div>
    </Card>
  );
}

