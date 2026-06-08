/**
 * Role Fit Card Component
 * Displays role-fit score and analysis
 */

import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Target, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface RoleFitCardProps {
  roleFitScore?: number;
  requiredSkillsMatch?: number;
  preferredSkillsMatch?: number;
  missingRequired?: string[];
  missingPreferred?: string[];
  recommendation?: string;
  roleTitle?: string;
}

export function RoleFitCard({
  roleFitScore = 0,
  requiredSkillsMatch = 0,
  preferredSkillsMatch = 0,
  missingRequired = [],
  missingPreferred = [],
  recommendation = '',
  roleTitle = 'Target Role',
}: RoleFitCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-700 border-0';
    if (score >= 60) return 'bg-orange-100 text-orange-700 border-0';
    return 'bg-red-100 text-red-700 border-0';
  };

  return (
    <Card className="p-6 border-[hsl(var(--border))]">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="flex items-center gap-2">
            <Target className="w-5 h-5 text-[hsl(var(--skoda-green))]" />
            Role Fit Analysis
          </h3>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
            {roleTitle}
          </p>
        </div>
        <Badge className={getScoreBadgeColor(roleFitScore)}>
          {roleFitScore}% Fit
        </Badge>
      </div>

      <div className="space-y-4">
        {/* Overall Score */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Overall Fit Score</span>
            <span className={`text-sm font-medium ${getScoreColor(roleFitScore)}`}>
              {roleFitScore}%
            </span>
          </div>
          <Progress value={roleFitScore} className="h-2" />
        </div>

        {/* Required Skills Match */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Required Skills Match</span>
            <span className="text-sm font-medium">{requiredSkillsMatch} skills</span>
          </div>
          <Progress value={(requiredSkillsMatch / 10) * 100} className="h-2" />
        </div>

        {/* Preferred Skills Match */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Preferred Skills Match</span>
            <span className="text-sm font-medium">{preferredSkillsMatch} skills</span>
          </div>
          <Progress value={(preferredSkillsMatch / 10) * 100} className="h-2" />
        </div>

        {/* Missing Required Skills */}
        {missingRequired.length > 0 && (
          <div className="pt-3 border-t border-[hsl(var(--border))]">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium">Missing Required Skills</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {missingRequired.map((skill, idx) => (
                <Badge key={idx} variant="outline" className="border-red-500 text-red-700">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Missing Preferred Skills */}
        {missingPreferred.length > 0 && (
          <div className="pt-3 border-t border-[hsl(var(--border))]">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium">Missing Preferred Skills</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {missingPreferred.map((skill, idx) => (
                <Badge key={idx} variant="outline" className="border-orange-500 text-orange-700">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Recommendation */}
        {recommendation && (
          <div className="pt-3 border-t border-[hsl(var(--border))]">
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              <strong>Recommendation:</strong> {recommendation}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}

