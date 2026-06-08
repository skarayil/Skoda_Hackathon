/**
 * Heatmap Mapper
 * Transforms heatmap backend responses to UI-friendly formats
 */

import type { SkillHeatmapResponse } from '../types/schemas/dashboard';

/**
 * Heatmap employee data for UI
 */
export interface HeatmapEmployee {
  name: string;
  role: string;
  skills: number[]; // Skill levels (1-5)
  trend: 'up' | 'down' | 'stable';
}

/**
 * Heatmap skill list
 */
export interface HeatmapSkill {
  name: string;
  average: number;
}

/**
 * Map heatmap data to UI format
 */
export function mapHeatmapData(
  data: SkillHeatmapResponse,
  skills: string[] = []
): {
  employees: HeatmapEmployee[];
  skills: HeatmapSkill[];
} {
  const heatmapData = data.heatmap_data as Record<string, Record<string, number>>;

  // Extract unique skills from heatmap data
  const allSkills = new Set<string>();
  Object.values(heatmapData).forEach((deptData) => {
    Object.keys(deptData).forEach((skill) => allSkills.add(skill));
  });

  const skillList = skills.length > 0 ? skills : Array.from(allSkills);

  // Map employees (departments) to heatmap format
  const employees: HeatmapEmployee[] = Object.entries(heatmapData).map(
    ([deptName, deptSkills]) => {
      const skillLevels = skillList.map((skill) => {
        // Normalize skill count to 1-5 scale
        const count = deptSkills[skill] || 0;
        if (count === 0) return 1;
        if (count <= 2) return 2;
        if (count <= 5) return 3;
        if (count <= 10) return 4;
        return 5;
      });

      return {
        name: deptName,
        role: deptName, // Use department name as role
        skills: skillLevels,
        trend: 'stable', // Could be enhanced with trend data
      };
    }
  );

  // Calculate skill averages
  const skillAverages: HeatmapSkill[] = skillList.map((skill) => {
    const counts = employees.map((emp) => {
      const skillIdx = skillList.indexOf(skill);
      return emp.skills[skillIdx] || 0;
    });
    const average = counts.reduce((a, b) => a + b, 0) / counts.length;

    return {
      name: skill,
      average: Math.round(average * 10) / 10,
    };
  });

  return {
    employees,
    skills: skillAverages,
  };
}

/**
 * Map heatmap data to matrix format for visualization
 */
export function mapHeatmapMatrix(
  data: SkillHeatmapResponse
): Array<Array<{ value: number; color: string }>> {
  const heatmapData = data.heatmap_data as Record<string, Record<string, number>>;

  const departments = Object.keys(heatmapData);
  const skills = new Set<string>();
  Object.values(heatmapData).forEach((deptData) => {
    Object.keys(deptData).forEach((skill) => skills.add(skill));
  });

  const skillArray = Array.from(skills);

  return departments.map((dept) => {
    return skillArray.map((skill) => {
      const value = heatmapData[dept]?.[skill] || 0;
      // Normalize to 0-100 for color mapping
      const normalized = Math.min(100, (value / 10) * 100);

      // Color mapping based on value
      let color = 'bg-red-200';
      if (normalized >= 80) color = 'bg-green-600';
      else if (normalized >= 60) color = 'bg-green-400';
      else if (normalized >= 40) color = 'bg-yellow-300';
      else if (normalized >= 20) color = 'bg-orange-300';

      return {
        value: normalized,
        color,
      };
    });
  });
}

