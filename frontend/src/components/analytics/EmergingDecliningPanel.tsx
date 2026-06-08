/**
 * Emerging vs Declining Skills Panel
 * Displays skills that are emerging vs declining
 */

import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { SkillTrendsResponse } from '../../schemas/dashboard';

interface EmergingDecliningPanelProps {
  trendsData?: SkillTrendsResponse;
}

export function EmergingDecliningPanel({ trendsData }: EmergingDecliningPanelProps) {
  // Mock data - in real implementation, extract from trendsData
  const emergingSkills = [
    { skill: 'AI/ML Engineering', growth: '+45%', trend: 'up' },
    { skill: 'Cloud Architecture', growth: '+32%', trend: 'up' },
    { skill: 'DevSecOps', growth: '+28%', trend: 'up' },
  ];

  const decliningSkills = [
    { skill: 'Legacy Systems', growth: '-15%', trend: 'down' },
    { skill: 'On-Premise Infrastructure', growth: '-22%', trend: 'down' },
    { skill: 'Traditional Waterfall', growth: '-18%', trend: 'down' },
  ];

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Emerging Skills */}
      <Card className="p-6 border-[hsl(var(--border))] bg-green-50">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <h3>Emerging Skills</h3>
        </div>
        <div className="space-y-3">
          {emergingSkills.map((skill, idx) => (
            <div
              key={idx}
              className="p-3 bg-white rounded-lg border border-green-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{skill.skill}</span>
                <Badge className="bg-green-100 text-green-700 border-0">
                  {skill.growth}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Declining Skills */}
      <Card className="p-6 border-[hsl(var(--border))] bg-red-50">
        <div className="flex items-center gap-2 mb-4">
          <TrendingDown className="w-5 h-5 text-red-600" />
          <h3>Declining Skills</h3>
        </div>
        <div className="space-y-3">
          {decliningSkills.map((skill, idx) => (
            <div
              key={idx}
              className="p-3 bg-white rounded-lg border border-red-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{skill.skill}</span>
                <Badge className="bg-red-100 text-red-700 border-0">
                  {skill.growth}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

