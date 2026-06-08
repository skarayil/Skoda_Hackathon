const validUnifiedScore = {
  overall_score: 81,
  skill_scores: { "React": 85, "Python": 75, "AWS": 60, "Docker": 90, "Figma": 70, "Technical": 80 },
  gap_scores: { "AWS": 20, "Python": 10 },
  role_fit_score: 85,
  next_role_readiness: 65,
  risk_score: 14,
  ai_gap_score: 15,
  ai_readiness: 75,
  ai_risk_signal: 10,
  ai_skill_recommendations_count: 3,
  ai_mode: 'featherless'
};

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
    unified_score: validUnifiedScore
  },
  '/dashboard/trends': {
    trends: {
      period_months: 6,
      top_growing_skills: ["React", "TypeScript", "AWS", "Machine Learning"],
      top_declining_skills: ["jQuery", "Angular", "PHP"]
    },
    unified_score: validUnifiedScore
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
    trends: {},
    unified_score: validUnifiedScore
  },
  '/dashboard/skill-map': {
      ontology: { skills: ["React", "Python"], clusters: [], normalized_mapping: {}, department_skill_map: {} },
      employee_distribution: { "React": 10 },
      unified_score: validUnifiedScore
  },
  '/dashboard/heatmap': {
      heatmap_data: { "Engineering": { "React": 80, "Python": 70 }, "Design": { "Figma": 90 } },
      unified_score: validUnifiedScore
  },
  '/analytics/employees': {
    employee_id: "EMP123",
    skill_count: 5,
    skill_distribution: { "React": 90, "Python": 85 },
    growth_trajectory: [],
    recommendations: [],
    unified_score: validUnifiedScore
  },
  '/analytics/succession': {
    department: "Engineering",
    generated_at: new Date().toISOString(),
    candidate_count: 1,
    pipeline_summary: {
      ready_now: 1,
      ready_soon: 2,
      developing: 3,
      narrative: "Strong pipeline for engineering management.",
      risk_outlook: "low"
    },
    candidates: [
      {
        employee_id: "EMP1",
        name: "Alice",
        department: "Engineering",
        readiness_score: 85,
        next_role_readiness: 80,
        risk_score: 10,
        skill_strengths: ["Python", "AWS"],
        skill_gaps: ["Management"],
        unified_score: validUnifiedScore
      }
    ],
    unified_score: validUnifiedScore
  },
  '/analytics/narrative': {
    department: "Engineering",
    risk_level: "low",
    risk_score: 15,
    narrative: "The engineering department shows strong growth in cloud technologies.",
    strengths: ["AWS", "Python"],
    shortages: ["Kubernetes"],
    insights: ["Cloud adoption is accelerating."],
    risks: ["Key person dependency on DevOps."],
    numeric_references: ["15% risk score"],
    readiness_summary: "Ready for Q3 projects.",
    succession_summary: "Pipeline is healthy.",
    generated_at: new Date().toISOString(),
    unified_score: validUnifiedScore
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
  '/employee-intel': {
    employee_id: "EMP123",
    summary: "John Doe is a Senior Engineer with a focus on web development.",
    career_trajectory: "Senior Engineer → Engineering Manager",
    readiness_score: 85,
    next_role_readiness: "L4 → L5 Ready",
    detected_language: "en",
    unified_score: validUnifiedScore
  },
  '/skills/analysis': {
    employee_id: "EMP123",
    analysis_json: {
      current_skills: ["React", "Python", "AWS", "TypeScript"],
      missing_skills: ["Kubernetes", "GraphQL"],
      recommendation: "Focus on Kubernetes for the next quarter to improve cloud native readiness."
    },
    unified_score: validUnifiedScore
  },
  '/recommendations': {
    recommendations: [
      { title: "Advanced Kubernetes", type: "Course", description: "Learn container orchestration.", url: "#" },
      { title: "GraphQL API Design", type: "Article", description: "Best practices for GraphQL.", url: "#" }
    ]
  },
  '/learning-history': [
    { course_name: "React Advanced Patterns", completion_date: "2024-05-12", status: "completed" },
    { course_name: "AWS Solutions Architect", completion_date: "2024-01-20", status: "completed" }
  ],
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
      unified_score: validUnifiedScore
    } 
  };
}
