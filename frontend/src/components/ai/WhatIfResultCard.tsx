/**
 * What-If Result Card Component
 * Displays what-if scenario simulation results
 */

import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { WhatIfScenarioResponse } from '../../services/ai.service';

interface WhatIfResultCardProps {
  whatIfResult?: WhatIfScenarioResponse;
  scenarioType?: string;
}

export function WhatIfResultCard({ whatIfResult, scenarioType }: WhatIfResultCardProps) {
  if (!whatIfResult) {
    return (
      <Card className="p-6 border-[hsl(var(--border))]">
        <div className="text-center text-[hsl(var(--muted-foreground))]">
          No scenario results available
        </div>
      </Card>
    );
  }

  const impactScore = whatIfResult.impact_score || 0;
  const isPositive = impactScore > 0;

  return (
    <Card className="p-6 border-[hsl(var(--border))]">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[hsl(var(--skoda-green))]" />
            What-If Scenario Results
          </h3>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
            {scenarioType || 'Scenario Analysis'}
          </p>
        </div>
        <Badge
          className={
            isPositive
              ? 'bg-green-100 text-green-700 border-0'
              : 'bg-red-100 text-red-700 border-0'
          }
        >
          Impact: {impactScore > 0 ? '+' : ''}{impactScore}
        </Badge>
      </div>

      {/* Impact Summary */}
      {whatIfResult.impact_summary && (
        <div className="p-4 bg-[hsl(var(--skoda-gray-50))] rounded-lg mb-5">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            {whatIfResult.impact_summary}
          </p>
        </div>
      )}

      {/* Metrics Comparison */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <h4 className="text-sm font-medium mb-2">Before</h4>
          <div className="p-3 bg-white rounded-lg border border-[hsl(var(--border))]">
            <pre className="text-xs text-[hsl(var(--muted-foreground))] whitespace-pre-wrap">
              {JSON.stringify(whatIfResult.before_metrics, null, 2)}
            </pre>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2">After</h4>
          <div className="p-3 bg-white rounded-lg border border-[hsl(var(--border))]">
            <pre className="text-xs text-[hsl(var(--muted-foreground))] whitespace-pre-wrap">
              {JSON.stringify(whatIfResult.after_metrics, null, 2)}
            </pre>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {whatIfResult.recommendations && whatIfResult.recommendations.length > 0 && (
        <div className="mb-5">
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            Recommendations
          </h4>
          <ul className="space-y-2">
            {whatIfResult.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <span className="text-[hsl(var(--skoda-green))] mt-1">•</span>
                <span className="text-[hsl(var(--muted-foreground))]">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Risks & Opportunities */}
      <div className="grid grid-cols-2 gap-4">
        {whatIfResult.risks && whatIfResult.risks.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-red-600" />
              Risks
            </h4>
            <div className="space-y-1">
              {whatIfResult.risks.map((risk, idx) => (
                <div key={idx} className="p-2 bg-red-50 rounded text-xs text-red-700">
                  {risk}
                </div>
              ))}
            </div>
          </div>
        )}
        {whatIfResult.opportunities && whatIfResult.opportunities.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              Opportunities
            </h4>
            <div className="space-y-1">
              {whatIfResult.opportunities.map((opp, idx) => (
                <div key={idx} className="p-2 bg-green-50 rounded text-xs text-green-700">
                  {opp}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

