/**
 * Analytics Mapper
 * Transforms analytics backend responses to UI-friendly formats
 */

import type {
  EmployeeAnalyticsResponse,
  DepartmentAnalyticsResponse,
  GlobalAnalyticsResponse,
  SuccessionRadarResponse,
  DepartmentNarrativeResponse,
} from '../types/schemas/analytics';

/**
 * Risk employee data for UI
 */
export interface RiskEmployee {
  name: string;
  role: string;
  risk: 'High' | 'Medium' | 'Low';
  reason: string;
  skills: number;
}

/**
 * Predicted gap data for UI
 */
export interface PredictedGap {
  month: string;
  gap: string;
  impact: string;
  severity: 'high' | 'medium' | 'low';
}

/**
 * Map employee analytics to risk employees list
 */
export function mapRiskEmployees(
  data: EmployeeAnalyticsResponse[]
): RiskEmployee[] {
  return data.map((emp) => {
    const riskScore = (emp as any).risk_score || 50; // Fallback if not in response
    const riskLevel =
      riskScore >= 70 ? 'High' : riskScore >= 40 ? 'Medium' : 'Low';

    return {
      name: emp.employee_id, // Use employee_id as name if name not available
      role: (emp as any).department || 'Unknown',
      risk: riskLevel,
      reason: `Risk score: ${riskScore}`,
      skills: emp.skill_count,
    };
  });
}

/**
 * Map forecast data to predicted gaps
 */
export function mapPredictedGaps(forecastData: any): PredictedGap[] {
  if (!forecastData || !forecastData.recommendations) {
    return [];
  }

  return forecastData.recommendations.slice(0, 5).map((rec: any, idx: number) => {
    const months = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];
    const currentMonth = new Date().getMonth();
    const targetMonth = (currentMonth + idx + 1) % 12;
    const year = new Date().getFullYear() + Math.floor((currentMonth + idx + 1) / 12);

    return {
      month: `${months[targetMonth]} ${year}`,
      gap: rec.skill || rec.gap || 'Unknown',
      impact: rec.impact || 'Project impact',
      severity: rec.severity || 'medium',
    };
  });
}

/**
 * Map succession radar to candidate list
 */
export function mapSuccessionCandidates(data: SuccessionRadarResponse) {
  return data.candidates.map((candidate) => ({
    name: candidate.name,
    currentRole: candidate.department,
    targetRole: 'Next Role', // Could be enhanced with actual target role
    readiness: candidate.readiness_score,
    gap: candidate.skill_gaps.join(', ') || 'No major gaps',
    timeline: '6-12 months', // Estimated from readiness score
    strengths: candidate.skill_strengths,
  }));
}

/**
 * Map succession radar to key roles
 */
export function mapKeyRoles(data: SuccessionRadarResponse) {
  const summary = data.pipeline_summary;

  return [
    {
      role: 'Leadership Role',
      incumbent: 'Current Leader',
      risk: summary.risk_outlook === 'high' ? 'High' : summary.risk_outlook === 'medium' ? 'Medium' : 'Low',
      retirementDate: 'N/A',
      readyCandidates: summary.ready_now,
      pipelineCandidates: summary.ready_soon + summary.developing,
    },
  ];
}

/**
 * Map department narrative to insights
 */
export function mapDepartmentInsights(data: DepartmentNarrativeResponse) {
  return {
    narrative: data.narrative,
    strengths: data.strengths,
    shortages: data.shortages,
    risks: data.risks,
    readinessSummary: data.readiness_summary,
    successionSummary: data.succession_summary,
    riskLevel: data.risk_level,
    riskScore: data.risk_score,
  };
}

/**
 * Map global analytics to chart data
 */
export function mapGlobalAnalyticsChart(data: GlobalAnalyticsResponse) {
  const skillFrequency = data.skill_frequency as Record<string, number>;

  return Object.entries(skillFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([skill, count]) => ({
      skill,
      count,
    }));
}

