import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Sparkles, TrendingUp, Users, Target, AlertCircle, ChevronRight, Clock, Loader2 } from "lucide-react";
import { useState } from "react";
import { ChatPanel } from "../components/ai/ChatPanel";
import { TrainingPlanCard } from "../components/ai/TrainingPlanCard";
import { WhatIfResultCard } from "../components/ai/WhatIfResultCard";
import { ComparisonCard } from "../components/ai/ComparisonCard";
import { useCareerChat, useTrainingPlan, useWhatIfScenario, useCompareEmployees } from "../hooks/useAI";
import type { CareerChatResponse, TrainingPlanResponse, WhatIfScenarioResponse, CompareEmployeesResponse } from "../services/ai.service";

export function AIAssistant() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | undefined>();
  const [trainingPlanResult, setTrainingPlanResult] = useState<TrainingPlanResponse | undefined>();
  const [whatIfResult, setWhatIfResult] = useState<WhatIfScenarioResponse | undefined>();
  const [comparisonResult, setComparisonResult] = useState<CompareEmployeesResponse | undefined>();

  const careerChatMutation = useCareerChat();
  const trainingPlanMutation = useTrainingPlan();
  const whatIfMutation = useWhatIfScenario();
  const compareMutation = useCompareEmployees();

  const suggestedQueries = [
    {
      category: "Team Analysis",
      icon: Users,
      queries: [
        "What are the critical skill gaps in Engineering team?",
        "Show me employees at risk of qualification expiry",
        "Which team members are ready for promotion?",
      ],
    },
    {
      category: "Predictions",
      icon: TrendingUp,
      queries: [
        "Forecast skill needs for Q2 2025",
        "Predict attrition risk in next 6 months",
        "What skills will be obsolete by 2026?",
      ],
    },
    {
      category: "Comparisons",
      icon: Target,
      queries: [
        "Compare Engineering vs Manufacturing skill coverage",
        "Benchmark our AI/ML skills against industry",
        "Show department skill heatmap comparison",
      ],
    },
  ];

  const recentInsights = [
    {
      title: "Cloud Architecture Shortage Detected",
      insight: "12 positions short of Q1 2025 requirements. 3 employees in pipeline.",
      severity: "high",
      department: "Engineering",
      timestamp: "2 hours ago",
    },
    {
      title: "Leadership Development Opportunity",
      insight: "Jana Nováková is 85% ready for Engineering Manager role. Recommend leadership training.",
      severity: "medium",
      department: "Engineering",
      timestamp: "5 hours ago",
    },
    {
      title: "Qualification Compliance Alert",
      insight: "8 mandatory certifications expiring in next 30 days across all departments.",
      severity: "high",
      department: "All",
      timestamp: "1 day ago",
    },
  ];

  const deepDiveTopics = [
    { title: "Succession Risk Analysis", description: "Identify vulnerable key roles" },
    { title: "Skill Atrophy Detection", description: "Find underutilized competencies" },
    { title: "Training ROI Analysis", description: "Measure course effectiveness" },
    { title: "Career Path Simulation", description: "Model employee progressions" },
  ];

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    try {
      const response = await careerChatMutation.mutateAsync({
        employee_id: selectedEmployeeId,
        user_message: message,
      });

      // Response is handled by ChatPanel component
      return response;
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-[hsl(var(--skoda-green))]" />
          AI Assistant
        </h1>
        <p className="text-[hsl(var(--muted-foreground))] mt-1">
          Ask anything about skills, teams, gaps, predictions, and candidates
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="col-span-2">
          <ChatPanel
            employeeId={selectedEmployeeId}
            onSendMessage={handleSendMessage}
            isLoading={careerChatMutation.isPending}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Suggested Queries */}
          <Card className="p-5 border-[hsl(var(--border))]">
            <h4 className="mb-4">Suggested Queries</h4>
            <div className="space-y-4">
              {suggestedQueries.map((category, idx) => {
                const Icon = category.icon;
                return (
                  <div key={idx}>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-[hsl(var(--skoda-green))]" />
                      <p className="text-xs font-medium text-[hsl(var(--muted-foreground))]">{category.category}</p>
                    </div>
                    <div className="space-y-1">
                      {category.queries.map((query, qIdx) => (
                        <button
                          key={qIdx}
                          onClick={() => handleSendMessage(query)}
                          className="w-full text-left text-xs p-2 rounded bg-[hsl(var(--skoda-gray-50))] hover:bg-[hsl(var(--skoda-green))]/10 hover:text-[hsl(var(--skoda-green))] transition-colors"
                        >
                          {query}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Deep Dive Topics */}
          <Card className="p-5 border-[hsl(var(--border))]">
            <h4 className="mb-4">Deep Dive Analysis</h4>
            <div className="space-y-2">
              {deepDiveTopics.map((topic, idx) => (
                <button
                  key={idx}
                  className="w-full text-left p-3 rounded-lg bg-[hsl(var(--skoda-gray-50))] hover:bg-[hsl(var(--skoda-green))]/10 border border-transparent hover:border-[hsl(var(--skoda-green))] transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium group-hover:text-[hsl(var(--skoda-green))]">{topic.title}</p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{topic.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[hsl(var(--skoda-gray-400))] group-hover:text-[hsl(var(--skoda-green))] transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Result Cards */}
      {trainingPlanResult && (
        <TrainingPlanCard trainingPlan={trainingPlanResult} />
      )}
      {whatIfResult && (
        <WhatIfResultCard whatIfResult={whatIfResult} />
      )}
      {comparisonResult && (
        <ComparisonCard comparison={comparisonResult} type="employees" />
      )}

      {/* Recent AI Insights */}
      <Card className="p-6 border-[hsl(var(--border))]">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3>Recent AI Insights</h3>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
              Proactive alerts and recommendations generated by the system
            </p>
          </div>
          <Button variant="outline" size="sm">View All Insights</Button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {recentInsights.map((insight, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border ${
                insight.severity === "high"
                  ? "bg-red-50 border-red-200"
                  : "bg-orange-50 border-orange-200"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <AlertCircle
                  className={`w-5 h-5 ${
                    insight.severity === "high" ? "text-red-600" : "text-orange-600"
                  }`}
                />
                <Badge variant="outline" className="text-xs">
                  {insight.department}
                </Badge>
              </div>
              <h4 className="mb-2">{insight.title}</h4>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mb-3">{insight.insight}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))]">
                  <Clock className="w-3 h-3" />
                  {insight.timestamp}
                </div>
                <Button size="sm" variant="ghost" className="h-7 text-xs">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
