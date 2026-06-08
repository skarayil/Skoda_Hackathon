/**
 * Shortage Bar Chart Component
 * Displays predicted skill shortages by department
 */

import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { AlertTriangle } from 'lucide-react';
import type { PredictedShortagesResponse } from '../../services/analytics.service';

interface ShortageBarChartProps {
  shortagesData?: PredictedShortagesResponse;
}

export function ShortageBarChart({ shortagesData }: ShortageBarChartProps) {
  if (!shortagesData || !shortagesData.predicted_shortages || shortagesData.predicted_shortages.length === 0) {
    return (
      <Card className="p-6 border-[hsl(var(--border))]">
        <div className="h-[300px] flex items-center justify-center text-[hsl(var(--muted-foreground))]">
          No shortage data available
        </div>
      </Card>
    );
  }

  const chartData = shortagesData.predicted_shortages.map((shortage) => ({
    skill: shortage.skill,
    shortage: shortage.shortage,
    current: shortage.current_count,
    predicted: shortage.predicted_need,
    severity: shortage.severity,
  }));

  const getSeverityColor = (severity: string) => {
    if (severity === 'critical') return '#ef4444';
    if (severity === 'high') return '#f97316';
    if (severity === 'medium') return '#eab308';
    return '#84cc16';
  };

  return (
    <Card className="p-6 border-[hsl(var(--border))]">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Predicted Skill Shortages
          </h3>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
            {shortagesData.department} · {shortagesData.forecast_months} months forecast
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis type="number" tick={{ fontSize: 11 }} />
          <YAxis dataKey="skill" type="category" tick={{ fontSize: 11 }} width={150} />
          <Tooltip />
          <Bar dataKey="shortage" name="Shortage" radius={[0, 4, 4, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getSeverityColor(entry.severity)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 flex flex-wrap gap-2">
        {shortagesData.predicted_shortages.map((shortage, idx) => (
          <Badge
            key={idx}
            className={
              shortage.severity === 'critical'
                ? 'bg-red-100 text-red-700 border-0'
                : shortage.severity === 'high'
                ? 'bg-orange-100 text-orange-700 border-0'
                : shortage.severity === 'medium'
                ? 'bg-yellow-100 text-yellow-700 border-0'
                : 'bg-green-100 text-green-700 border-0'
            }
          >
            {shortage.skill}: {shortage.shortage} shortage ({shortage.timeframe})
          </Badge>
        ))}
      </div>
    </Card>
  );
}

