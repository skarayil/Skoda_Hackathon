/**
 * AI Insights Card Component
 * Displays AI-generated insights and recommendations
 */

import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Sparkles, AlertTriangle, TrendingUp, Target } from 'lucide-react';
import type { EmployeeIntelResponse } from '../../services/employee-intel.service';

interface AIInsightsCardProps {
  employeeIntel?: EmployeeIntelResponse;
}

export function AIInsightsCard({ employeeIntel }: AIInsightsCardProps) {
  if (!employeeIntel) {
    return (
      <Card className="p-6 border-[hsl(var(--border))]">
        <div className="text-center text-[hsl(var(--muted-foreground))]">
          No AI insights available
        </div>
      </Card>
    );
  }

  const strengths = employeeIntel.strengths || [];
  const developmentAreas = employeeIntel.development_areas || [];
  const recommendedActions = employeeIntel.recommended_actions || [];
  const riskSignals = employeeIntel.risk_signals || [];
  const insights = employeeIntel.insights || [];

  return (
    <Card className="p-6 border-[hsl(var(--border))] bg-gradient-to-r from-[hsl(var(--skoda-green))]/5 to-white">
      <div className="flex items-center gap-2 mb-5">
        <Sparkles className="w-5 h-5 text-[hsl(var(--skoda-green))]" />
        <h3>AI Insights & Recommendations</h3>
        <Badge variant="outline" className="ml-auto border-[hsl(var(--skoda-green))] text-[hsl(var(--skoda-green))]">
          {employeeIntel.ai_mode === 'featherless' ? 'AI Powered' : 'Heuristic'}
        </Badge>
      </div>

      <div className="space-y-4">
        {/* Summary */}
        {employeeIntel.summary && (
          <div className="p-4 bg-white rounded-lg border border-[hsl(var(--border))]">
            <p className="text-sm text-[hsl(var(--muted-foreground))]">{employeeIntel.summary}</p>
          </div>
        )}

        {/* Strengths */}
        {strengths.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <h4 className="text-sm font-medium">Key Strengths</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {strengths.map((strength, idx) => (
                <Badge
                  key={idx}
                  className="bg-green-100 text-green-700 border-0"
                >
                  {strength}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Development Areas */}
        {developmentAreas.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-orange-600" />
              <h4 className="text-sm font-medium">Development Areas</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {developmentAreas.map((area, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="border-orange-500 text-orange-700"
                >
                  {area}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Risk Signals */}
        {riskSignals.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <h4 className="text-sm font-medium">Risk Signals</h4>
            </div>
            <div className="space-y-2">
              {riskSignals.map((risk, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-red-50 rounded-lg border border-red-200"
                >
                  <p className="text-sm text-red-700">{risk}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Actions */}
        {recommendedActions.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Recommended Actions</h4>
            <ul className="space-y-2">
              {recommendedActions.map((action, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span className="text-[hsl(var(--skoda-green))] mt-1">•</span>
                  <span className="text-[hsl(var(--muted-foreground))]">{action}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Insights */}
        {insights.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Additional Insights</h4>
            <div className="space-y-2">
              {insights.map((insight, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[hsl(var(--skoda-gray-50))] rounded-lg"
                >
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

