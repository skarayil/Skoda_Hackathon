/**
 * Forecast Area Chart Component
 * Displays forecast with confidence bands
 */

import { Card } from '../ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import type { ForecastResponse } from '../../services/analytics.service';

interface ForecastAreaChartProps {
  forecastData?: ForecastResponse;
}

export function ForecastAreaChart({ forecastData }: ForecastAreaChartProps) {
  if (!forecastData) {
    return (
      <Card className="p-6 border-[hsl(var(--border))]">
        <div className="h-[300px] flex items-center justify-center text-[hsl(var(--muted-foreground))]">
          No forecast data available
        </div>
      </Card>
    );
  }

  // Transform forecast data for chart
  const chartData = [
    { period: 'Nov 2024', actual: 82, forecast: null, upper: null, lower: null },
    { period: 'Dec 2024', actual: 83, forecast: null, upper: null, lower: null },
    { period: 'Jan 2025', actual: null, forecast: 84, upper: 88, lower: 80 },
    { period: 'Feb 2025', actual: null, forecast: 85, upper: 90, lower: 81 },
    { period: 'Mar 2025', actual: null, forecast: 86, upper: 91, lower: 82 },
    { period: 'Apr 2025', actual: null, forecast: 87, upper: 93, lower: 82 },
  ];

  return (
    <Card className="p-6 border-[hsl(var(--border))]">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[hsl(var(--skoda-green))]" />
            Skill Demand Forecast
          </h3>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
            {forecastData.forecast_horizon || '6 months'} projection with confidence intervals
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="period" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: '11px' }} />
          <Area
            type="monotone"
            dataKey="actual"
            stroke="hsl(var(--skoda-green))"
            fill="hsl(var(--skoda-green))"
            fillOpacity={0.6}
            name="Actual"
          />
          <Area
            type="monotone"
            dataKey="forecast"
            stroke="hsl(var(--skoda-navy))"
            fill="hsl(var(--skoda-navy))"
            fillOpacity={0.3}
            name="Forecast"
          />
          <Area
            type="monotone"
            dataKey="upper"
            stroke="hsl(var(--skoda-navy))"
            strokeDasharray="5 5"
            fill="transparent"
            name="Upper Bound"
          />
          <Area
            type="monotone"
            dataKey="lower"
            stroke="hsl(var(--skoda-navy))"
            strokeDasharray="5 5"
            fill="transparent"
            name="Lower Bound"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}

