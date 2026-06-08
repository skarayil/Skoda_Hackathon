/**
 * Skills Mapper
 * Transforms skill analysis backend responses to UI-friendly formats
 */

import type { SkillAnalysisPublic } from '../types/schemas/skills';

/**
 * Skill profile data for UI
 */
export interface SkillProfile {
  currentSkills: Array<{ skill: string; level: number }>;
  missingSkills: string[];
  strengths: string[];
  gapScore: number;
  recommendations: string[];
}

/**
 * Map skill analysis to skill profile
 */
export function mapSkillProfile(data: SkillAnalysisPublic): SkillProfile {
  const analysis = data.analysis_json;

  return {
    currentSkills: (analysis.current_skills || []).map((skill: string) => ({
      skill,
      level: 3, // Default level, could be enhanced with actual levels
    })),
    missingSkills: analysis.missing_skills || [],
    strengths: analysis.strengths || [],
    gapScore: analysis.gap_score || 0,
    recommendations: analysis.recommended_roles || analysis.development_path || [],
  };
}

/**
 * Map skill recommendations to UI format
 */
export function mapSkillRecommendations(recommendations: any) {
  if (!recommendations || !recommendations.recommended_skills) {
    return [];
  }

  return recommendations.recommended_skills.map((rec: any) => ({
    skill: rec.skill || rec,
    priority: rec.priority || 'medium',
    reason: rec.reason || recommendations.reasoning || '',
  }));
}

/**
 * Map training path to UI format
 */
export function mapTrainingPath(trainingPath: any) {
  if (!trainingPath || !trainingPath.training_path) {
    return [];
  }

  return trainingPath.training_path.map((step: any, idx: number) => ({
    step: idx + 1,
    title: step.title || step.name || `Step ${idx + 1}`,
    description: step.description || '',
    duration: step.duration || '2-4 weeks',
    resources: step.resources || [],
  }));
}

