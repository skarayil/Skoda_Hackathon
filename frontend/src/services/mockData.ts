export const mockDataMap: Record<string, any> = {
  '/dashboard/overview': {
    total_employees: 142,
    total_departments: 6,
    departments: [
      { name: "Engineering", employee_count: 45, total_skills: 120 },
      { name: "Design", employee_count: 12, total_skills: 45 },
      { name: "Product", employee_count: 8, total_skills: 30 },
      { name: "Marketing", employee_count: 24, total_skills: 65 },
      { name: "Sales", employee_count: 35, total_skills: 80 },
      { name: "HR", employee_count: 18, total_skills: 40 }
    ],
    global_analytics: {
      total_skills: 450,
      skill_frequency: { "React": 35, "Python": 42, "AWS": 28, "Figma": 15, "Docker": 20 }
    },
    unified_score: {
      skill_coverage: 78,
      skill_readiness: 82,
      learning_agility: 85,
      succession_readiness: 72,
      risk_score: 14,
      overall_score: 81,
      confidence: 92
    }
  },
  '/dashboard/trends': {
    trends: {
      period_months: 6,
      top_growing_skills: ["React", "TypeScript", "AWS", "Machine Learning"],
      top_declining_skills: ["jQuery", "Angular", "PHP"]
    },
    unified_score: {
      skill_coverage: 78,
      skill_readiness: 82,
      learning_agility: 85,
      succession_readiness: 72,
      risk_score: 14,
      overall_score: 81,
      confidence: 92
    }
  },
  '/analytics/forecast': {
    forecast_horizon: "6 months",
    demand_forecast: { "React": 50, "Python": 60, "Cloud Architecture": 40 },
    skill_trends: [],
    recommendations: []
  },
  '/analytics/global': {
    total_employees: 142,
    total_skills: 450,
    skill_frequency: { "React": 35, "Python": 42, "AWS": 28 },
    department_distribution: { "Engineering": 45, "Design": 12 },
    unified_score: {
      skill_coverage: 78,
      skill_readiness: 82,
      learning_agility: 85,
      succession_readiness: 72,
      risk_score: 14,
      overall_score: 81,
      confidence: 92
    }
  },
  '/dashboard/skill-map': {
      ontology: { skills: ["React", "Python"], clusters: [], normalized_mapping: {}, department_skill_map: {} },
      employee_distribution: { "React": 10 },
      unified_score: { skill_coverage: 78, skill_readiness: 82, learning_agility: 85, succession_readiness: 72, risk_score: 14, overall_score: 81, confidence: 92 }
  },
  '/dashboard/heatmap': {
      heatmap_data: { "Engineering": { "React": 80, "Python": 70 }, "Design": { "Figma": 90 } },
      unified_score: { skill_coverage: 78, skill_readiness: 82, learning_agility: 85, succession_readiness: 72, risk_score: 14, overall_score: 81, confidence: 92 }
  },
  '/analytics/employees': {
    employee_id: "EMP123",
    name: "John Doe",
    role: "Senior Engineer",
    department: "Engineering",
    skills: { "React": 90, "Python": 85, "TypeScript": 80 },
    unified_score: { skill_coverage: 78, skill_readiness: 82, learning_agility: 85, succession_readiness: 72, risk_score: 14, overall_score: 81, confidence: 92 }
  },
  '/analytics/succession': {
    department: "Engineering",
    succession_pipeline: [
      { role: "Engineering Manager", candidates: [{ name: "Alice", readiness: 85 }] }
    ],
    unified_score: { skill_coverage: 78, skill_readiness: 82, learning_agility: 85, succession_readiness: 72, risk_score: 14, overall_score: 81, confidence: 92 }
  },
  '/analytics/narrative': {
    narrative: "The engineering department shows strong growth in cloud technologies.",
    unified_score: { skill_coverage: 78, skill_readiness: 82, learning_agility: 85, succession_readiness: 72, risk_score: 14, overall_score: 81, confidence: 92 }
  },
  '/analytics/predicted-shortages': {
    department: "Engineering",
    forecast_months: 6,
    predicted_shortages: [
      { skill: "AWS", current_count: 10, predicted_need: 15, shortage: 5, severity: "high", timeframe: "Q3" }
    ],
    recommendations: ["Hire 2 AWS engineers"]
  },
  '/employees/search': {
    results: [
      { id: "E1", name: "Alice", role: "Developer" },
      { id: "E2", name: "Bob", role: "Designer" }
    ]
  },
  '/ai/ask': {
    answer: "Based on the team's skills, you should focus on AWS training. There is a predicted shortage in Q3."
  }
};

export function getMockData(url: string) {
  for (const key of Object.keys(mockDataMap)) {
    if (url.includes(key)) {
      return { success: true, data: mockDataMap[key] };
    }
  }
  // Generic fallback to prevent crashing pages
  return { 
    success: true, 
    data: {
      unified_score: { skill_coverage: 78, skill_readiness: 82, learning_agility: 85, succession_readiness: 72, risk_score: 14, overall_score: 81, confidence: 92 }
    } 
  };
}
