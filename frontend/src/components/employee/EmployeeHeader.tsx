/**
 * Employee Header Component
 * Displays employee basic information with avatar and key metrics
 */

import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { TrendingUp } from 'lucide-react';
import type { EmployeeIntelResponse } from '../../services/employee-intel.service';

interface EmployeeHeaderProps {
  employeeId: string;
  employeeIntel?: EmployeeIntelResponse;
  skillCoverage?: number;
  mandatoryCompliance?: number;
}

export function EmployeeHeader({
  employeeId,
  employeeIntel,
  skillCoverage = 0,
  mandatoryCompliance = 0,
}: EmployeeHeaderProps) {
  const initials = employeeId
    .split(/[-_]/)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const name = employeeIntel?.summary
    ? employeeIntel.summary.split(' ').slice(0, 2).join(' ') || employeeId
    : employeeId;

  const careerLevel = employeeIntel?.next_role_readiness || 'L4 → L5 Ready';

  return (
    <Card className="p-6 border-[hsl(var(--border))]">
      <div className="flex items-start gap-6">
        <Avatar className="w-20 h-20 border-4 border-[hsl(var(--skoda-green))]">
          <AvatarFallback className="bg-[hsl(var(--skoda-navy))] text-white text-xl">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="mb-1">{name}</h2>
              <p className="text-[hsl(var(--muted-foreground))]">
                {employeeIntel?.career_trajectory || 'Employee'}
              </p>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                {employeeId} · {employeeIntel?.detected_language === 'cz' ? 'Česká republika' : 'Employee'}
              </p>
            </div>
            <Badge className="bg-[hsl(var(--skoda-green))] text-white border-0">
              {careerLevel}
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-6">
            <div>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2">Skill Coverage</p>
              <div className="flex items-center gap-3">
                <Progress value={skillCoverage} className="flex-1 h-2" />
                <span className="font-medium">{skillCoverage}%</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2">Mandatory Compliance</p>
              <div className="flex items-center gap-3">
                <Progress value={mandatoryCompliance} className="flex-1 h-2" />
                <span className="font-medium">{mandatoryCompliance}%</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2">Career Readiness</p>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-600">
                  {employeeIntel?.readiness_score || 0}% Ready
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

