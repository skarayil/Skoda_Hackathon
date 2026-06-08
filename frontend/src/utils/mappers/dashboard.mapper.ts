/**
 * Dashboard Mapper
 * Transforms dashboard backend responses to UI-friendly formats
 */

import type { DashboardOverviewResponse } from '../types/schemas/dashboard';

/**
 * UI-friendly dashboard metrics
 */
export interface DashboardMetrics {
  teamMembers: { value: number; change: string; trend: 'up' | 'down' | 'neutral' };
  skillCoverage: { value: string; change: string; trend: 'up' | 'down' | 'neutral' };
  qualificationsDue: { value: number; change: string; trend: 'up' | 'down' | 'neutral' };
  aiRecommendations: { value: number; change: string; trend: 'up' | 'down' | 'neutral' };
}

/**
 * Skill readiness data for bar chart
 */
export interface SkillReadinessData {
  skill: string;
  current: number;
  target: number;
}

/**
 * Radar chart data
 */
export interface RadarChartData {
  skill: string;
  A: number;
  fullMark: number;
}

/**
 * Map dashboard overview to UI metrics
 */
export function mapDashboardMetrics(
  data: DashboardOverviewResponse
): DashboardMetrics {
  const overallScore = data.unified_score.overall_score;
  const avgSkillScore =
    Object.values(data.unified_score.skill_scores).reduce((a, b) => a + b, 0) /
    (Object.keys(data.unified_score.skill_scores).length || 1);

  return {
    teamMembers: {
      value: data.total_employees,
      change: '+0',
      trend: 'neutral',
    },
    skillCoverage: {
      value: `${Math.round(avgSkillScore)}%`,
      change: `${overallScore >= 80 ? '+' : ''}${overallScore - 75}%`,
      trend: overallScore >= 80 ? 'up' : overallScore >= 70 ? 'neutral' : 'down',
    },
    qualificationsDue: {
      value: 0, // Not available in backend response
      change: '0',
      trend: 'neutral',
    },
    aiRecommendations: {
      value: data.unified_score.ai_skill_recommendations_count || 0,
      change: 'New',
      trend: 'neutral',
    },
  };
}

/**
 * Map dashboard data to skill readiness chart data
 */
export function mapSkillReadinessData(
  data: DashboardOverviewResponse
): SkillReadinessData[] {
  const skillScores = data.unified_score.skill_scores;
  const gapScores = data.unified_score.gap_scores;

  return Object.entries(skillScores).map(([skill, current]) => {
    // Calculate target as current + gap (if gap exists)
    const gap = gapScores[skill] || 0;
    const target = Math.min(100, current + (100 - current) * 0.2); // Target is 20% improvement

    return {
      skill,
      current,
      target: Math.round(target),
    };
  });
}

/**
 * Map dashboard data to radar chart data
 */
export function mapRadarChartData(
  data: DashboardOverviewResponse
): RadarChartData[] {
  const score = data.unified_score;

  return [
    {
      skill: 'Technical',
      A: score.skill_scores['Technical'] || score.overall_score,
      fullMark: 100,
    },
    {
      skill: 'Leadership',
      A: score.role_fit_score,
      fullMark: 100,
    },
    {
      skill: 'Communication',
      A: score.next_role_readiness,
      fullMark: 100,
    },
    {
      skill: 'Innovation',
      A: score.ai_readiness || score.overall_score,
      fullMark: 100,
    },
    {
      skill: 'Compliance',
      A: 100 - score.risk_score, // Inverse of risk
      fullMark: 100,
    },
    {
      skill: 'Digital',
      A: score.overall_score,
      fullMark: 100,
    },
  ];
}

/**
 * Map departments to UI-friendly format
 */
export function mapDepartments(data: DashboardOverviewResponse) {
  return data.departments.map((dept) => ({
    name: dept.name,
    employeeCount: dept.employee_count,
    totalSkills: dept.total_skills,
  }));
}

