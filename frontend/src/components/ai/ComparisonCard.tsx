/**
 * Comparison Card Component
 * Displays employee or department comparison results
 */

import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Users, TrendingUp, AlertCircle } from 'lucide-react';
import type { CompareEmployeesResponse, DepartmentComparisonResponse } from '../../services/ai.service';

interface ComparisonCardProps {
  comparison?: CompareEmployeesResponse | DepartmentComparisonResponse;
  type?: 'employees' | 'departments';
}

export function ComparisonCard({ comparison, type = 'employees' }: ComparisonCardProps) {
  if (!comparison) {
    return (
      <Card className="p-6 border-[hsl(var(--border))]">
        <div className="text-center text-[hsl(var(--muted-foreground))]">
          No comparison data available
        </div>
      </Card>
    );
  }

  const isDepartmentComparison = 'department1_strengths' in comparison;

  return (
    <Card className="p-6 border-[hsl(var(--border))]">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[hsl(var(--skoda-green))]" />
            {isDepartmentComparison ? 'Department' : 'Employee'} Comparison
          </h3>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
            AI-powered analysis
          </p>
        </div>
        <Badge variant="outline" className="border-[hsl(var(--skoda-green))] text-[hsl(var(--skoda-green))]">
          {comparison.ai_mode === 'featherless' ? 'AI Powered' : 'Heuristic'}
        </Badge>
      </div>

      {/* Summary */}
      {comparison.summary && (
        <div className="p-4 bg-[hsl(var(--skoda-gray-50))] rounded-lg mb-5">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">{comparison.summary}</p>
        </div>
      )}

      {/* Strengths Comparison */}
      {isDepartmentComparison && (
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <h4 className="text-sm font-medium mb-2">Department 1 Strengths</h4>
            <div className="space-y-1">
              {comparison.department1_strengths.map((strength, idx) => (
                <Badge key={idx} className="bg-green-100 text-green-700 border-0 mr-1 mb-1">
                  {strength}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Department 2 Strengths</h4>
            <div className="space-y-1">
              {comparison.department2_strengths.map((strength, idx) => (
                <Badge key={idx} className="bg-green-100 text-green-700 border-0 mr-1 mb-1">
                  {strength}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Skill Overlap */}
      {'skill_overlap' in comparison && comparison.skill_overlap.length > 0 && (
        <div className="mb-5">
          <h4 className="text-sm font-medium mb-2">Skill Overlap</h4>
          <div className="flex flex-wrap gap-2">
            {comparison.skill_overlap.map((skill, idx) => (
              <Badge key={idx} variant="outline" className="border-[hsl(var(--skoda-green))] text-[hsl(var(--skoda-green))]">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {comparison.recommendations && comparison.recommendations.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[hsl(var(--skoda-green))]" />
            Recommendations
          </h4>
          <ul className="space-y-2">
            {comparison.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <span className="text-[hsl(var(--skoda-green))] mt-1">•</span>
                <span className="text-[hsl(var(--muted-foreground))]">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}

