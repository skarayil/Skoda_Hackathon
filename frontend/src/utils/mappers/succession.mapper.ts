/**
 * Succession Mapper
 * Transforms succession backend responses to UI-friendly formats
 */

import type { SuccessionRadarResponse } from '../types/schemas/analytics';

/**
 * Succession candidate for UI
 */
export interface SuccessionCandidateUI {
  name: string;
  currentRole: string;
  targetRole: string;
  readiness: number;
  gap: string;
  timeline: string;
  strengths: string[];
}

/**
 * Key role for UI
 */
export interface KeyRoleUI {
  role: string;
  incumbent: string;
  risk: 'High' | 'Medium' | 'Low';
  retirementDate: string;
  readyCandidates: number;
  pipelineCandidates: number;
}

/**
 * Map succession radar to UI candidates
 */
export function mapSuccessionCandidates(
  data: SuccessionRadarResponse
): SuccessionCandidateUI[] {
  return data.candidates.map((candidate) => {
    // Estimate timeline based on readiness score
    let timeline = '12+ months';
    if (candidate.readiness_score >= 85) {
      timeline = '0-3 months';
    } else if (candidate.readiness_score >= 75) {
      timeline = '3-6 months';
    } else if (candidate.readiness_score >= 65) {
      timeline = '6-12 months';
    }

    return {
      name: candidate.name,
      currentRole: candidate.department,
      targetRole: 'Next Role', // Could be enhanced with actual target role from metadata
      readiness: candidate.readiness_score,
      gap: candidate.skill_gaps.length > 0 ? candidate.skill_gaps.join(', ') : 'No major gaps',
      timeline,
      strengths: candidate.skill_strengths,
    };
  });
}

/**
 * Map succession radar to key roles
 */
export function mapKeyRoles(data: SuccessionRadarResponse): KeyRoleUI[] {
  const summary = data.pipeline_summary;

  // Group candidates by potential target role (if available in metadata)
  const roleGroups = new Map<string, typeof data.candidates>();
  
  data.candidates.forEach((candidate) => {
    const targetRole = (candidate.metadata?.target_role as string) || 'Leadership Role';
    if (!roleGroups.has(targetRole)) {
      roleGroups.set(targetRole, []);
    }
    roleGroups.get(targetRole)!.push(candidate);
  });

  return Array.from(roleGroups.entries()).map(([role, candidates]) => {
    const readyCount = candidates.filter((c) => c.readiness_score >= 80).length;
    const pipelineCount = candidates.length - readyCount;
    const avgRisk = candidates.reduce((sum, c) => sum + c.risk_score, 0) / candidates.length;

    return {
      role,
      incumbent: 'Current Incumbent', // Not available in backend response
      risk: avgRisk >= 70 ? 'High' : avgRisk >= 40 ? 'Medium' : 'Low',
      retirementDate: 'N/A', // Not available in backend response
      readyCandidates: readyCount,
      pipelineCandidates: pipelineCount,
    };
  });
}

/**
 * Map succession pipeline summary to UI format
 */
export function mapPipelineSummary(data: SuccessionRadarResponse) {
  const summary = data.pipeline_summary;

  return {
    readyNow: summary.ready_now,
    readySoon: summary.ready_soon,
    developing: summary.developing,
    riskOutlook: summary.risk_outlook,
    narrative: summary.narrative,
    totalCandidates: data.candidate_count,
  };
}

