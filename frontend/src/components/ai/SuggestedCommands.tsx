/**
 * Suggested Commands Component
 * Quick action buttons for common queries
 */

import { Button } from '../ui/button';
import { Users, TrendingUp, Target } from 'lucide-react';

interface SuggestedCommandsProps {
  onSelectQuery: (query: string) => void;
}

export function SuggestedCommands({ onSelectQuery }: SuggestedCommandsProps) {
  const suggestedQueries = [
    {
      category: 'Team Analysis',
      icon: Users,
      queries: [
        'What are the critical skill gaps in Engineering team?',
        'Show me employees at risk of qualification expiry',
        'Which team members are ready for promotion?',
      ],
    },
    {
      category: 'Predictions',
      icon: TrendingUp,
      queries: [
        'Forecast skill needs for Q2 2025',
        'Predict attrition risk in next 6 months',
        'What skills will be obsolete by 2026?',
      ],
    },
    {
      category: 'Comparisons',
      icon: Target,
      queries: [
        'Compare Engineering vs Manufacturing skill coverage',
        'Benchmark our AI/ML skills against industry',
        'Show department skill heatmap comparison',
      ],
    },
  ];

  return (
    <div className="space-y-4">
      {suggestedQueries.map((category, catIdx) => {
        const Icon = category.icon;
        return (
          <div key={catIdx}>
            <div className="flex items-center gap-2 mb-2">
              <Icon className="w-4 h-4 text-[hsl(var(--skoda-green))]" />
              <h4 className="text-sm font-medium">{category.category}</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.queries.map((query, queryIdx) => (
                <Button
                  key={queryIdx}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => onSelectQuery(query)}
                >
                  {query}
                </Button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

