/**
 * Training Plan Card Component
 * Displays AI-generated training plan
 */

import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { BookOpen, Calendar, Target, AlertTriangle } from 'lucide-react';
import type { TrainingPlanResponse } from '../../services/ai.service';

interface TrainingPlanCardProps {
  trainingPlan?: TrainingPlanResponse;
}

export function TrainingPlanCard({ trainingPlan }: TrainingPlanCardProps) {
  if (!trainingPlan) {
    return (
      <Card className="p-6 border-[hsl(var(--border))]">
        <div className="text-center text-[hsl(var(--muted-foreground))]">
          No training plan available
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 border-[hsl(var(--border))]">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[hsl(var(--skoda-green))]" />
            AI Training Plan
          </h3>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
            {trainingPlan.time_to_readiness} weeks to readiness
          </p>
        </div>
        <Badge variant="outline" className="border-[hsl(var(--skoda-green))] text-[hsl(var(--skoda-green))]">
          {trainingPlan.ai_mode === 'featherless' ? 'AI Powered' : 'Heuristic'}
        </Badge>
      </div>

      {/* Overview */}
      {trainingPlan.plan_overview && (
        <div className="p-4 bg-[hsl(var(--skoda-gray-50))] rounded-lg mb-5">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">{trainingPlan.plan_overview}</p>
        </div>
      )}

      {/* Weekly Breakdown */}
      {trainingPlan.weekly_breakdown && trainingPlan.weekly_breakdown.length > 0 && (
        <div className="mb-5">
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Weekly Breakdown
          </h4>
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {trainingPlan.weekly_breakdown.slice(0, 4).map((week, idx) => (
              <div key={idx} className="p-3 bg-white rounded-lg border border-[hsl(var(--border))]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Week {week.week}</span>
                </div>
                <div className="space-y-1">
                  {week.focus_skills.length > 0 && (
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                      <strong>Focus:</strong> {week.focus_skills.join(', ')}
                    </p>
                  )}
                  {week.courses.length > 0 && (
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                      <strong>Courses:</strong> {week.courses.join(', ')}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Courses */}
      {trainingPlan.courses && trainingPlan.courses.length > 0 && (
        <div className="mb-5">
          <h4 className="text-sm font-medium mb-3">Recommended Courses</h4>
          <div className="space-y-2">
            {trainingPlan.courses.slice(0, 3).map((course, idx) => (
              <div key={idx} className="p-3 bg-white rounded-lg border border-[hsl(var(--border))]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{course.name}</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                      {course.provider} · {course.duration_hours}h · {course.type}
                    </p>
                  </div>
                  <Badge
                    className={
                      course.priority === 'high'
                        ? 'bg-red-100 text-red-700 border-0'
                        : course.priority === 'medium'
                        ? 'bg-orange-100 text-orange-700 border-0'
                        : 'bg-green-100 text-green-700 border-0'
                    }
                  >
                    {course.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Risks */}
      {trainingPlan.risks && trainingPlan.risks.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-600" />
            Risk Factors
          </h4>
          <div className="space-y-2">
            {trainingPlan.risks.map((risk, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border ${
                  risk.severity === 'high'
                    ? 'bg-red-50 border-red-200'
                    : risk.severity === 'medium'
                    ? 'bg-orange-50 border-orange-200'
                    : 'bg-yellow-50 border-yellow-200'
                }`}
              >
                <p className="text-sm font-medium mb-1">{risk.risk}</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">{risk.mitigation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}

