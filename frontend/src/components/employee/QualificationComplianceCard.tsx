/**
 * Qualification Compliance Card Component
 * Displays qualifications and compliance status
 */

import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { CheckCircle2, XCircle, AlertCircle, Award } from 'lucide-react';
import type { EmployeeIntelResponse } from '../../services/employee-intel.service';

interface QualificationComplianceCardProps {
  employeeIntel?: EmployeeIntelResponse;
}

interface Qualification {
  name: string;
  status: 'obtained' | 'expired' | 'missing';
  expiry: string;
  mandatory: boolean;
}

export function QualificationComplianceCard({
  employeeIntel,
}: QualificationComplianceCardProps) {
  // Mock qualifications - in real implementation, this would come from employeeIntel or a separate endpoint
  const qualifications: Qualification[] = [
    { name: 'AWS Solutions Architect', status: 'obtained', expiry: 'Jun 2025', mandatory: true },
    { name: 'Scrum Master Certified', status: 'obtained', expiry: 'No expiry', mandatory: false },
    { name: 'ISO 27001 Security Training', status: 'expired', expiry: 'Expired Oct 2024', mandatory: true },
    { name: 'Leadership Foundations', status: 'missing', expiry: 'Required for L5', mandatory: true },
  ];

  const getStatusIcon = (status: string) => {
    if (status === 'obtained') return <CheckCircle2 className="w-4 h-4 text-green-600" />;
    if (status === 'expired') return <XCircle className="w-4 h-4 text-red-600" />;
    return <AlertCircle className="w-4 h-4 text-orange-600" />;
  };

  const mandatoryCount = qualifications.filter((q) => q.mandatory).length;
  const obtainedCount = qualifications.filter((q) => q.status === 'obtained' && q.mandatory).length;
  const complianceRate = mandatoryCount > 0 ? Math.round((obtainedCount / mandatoryCount) * 100) : 100;

  return (
    <Card className="p-6 border-[hsl(var(--border))]">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[hsl(var(--skoda-green))]" />
            Qualifications & Certifications
          </h3>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
            Compliance: {complianceRate}% ({obtainedCount}/{mandatoryCount} mandatory)
          </p>
        </div>
        <Button variant="outline" size="sm">
          View All Courses
        </Button>
      </div>

      <div className="space-y-3">
        {qualifications.map((qual, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-lg border ${
              qual.status === 'expired' || qual.status === 'missing'
                ? 'bg-red-50 border-red-200'
                : 'bg-white border-[hsl(var(--border))]'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                {getStatusIcon(qual.status)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sm">{qual.name}</p>
                    {qual.mandatory && (
                      <Badge
                        variant="outline"
                        className="text-xs border-[hsl(var(--skoda-navy))] text-[hsl(var(--skoda-navy))]"
                      >
                        Mandatory
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">{qual.expiry}</p>
                </div>
              </div>
              <Badge
                className={
                  qual.status === 'obtained'
                    ? 'bg-green-100 text-green-700 border-0'
                    : qual.status === 'expired'
                    ? 'bg-red-100 text-red-700 border-0'
                    : 'bg-orange-100 text-orange-700 border-0'
                }
              >
                {qual.status === 'obtained'
                  ? 'Active'
                  : qual.status === 'expired'
                  ? 'Expired'
                  : 'Missing'}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

