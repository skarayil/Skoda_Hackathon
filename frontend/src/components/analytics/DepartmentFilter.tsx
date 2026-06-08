/**
 * Department Filter Component
 * Dropdown for selecting department
 */

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useGlobalAnalytics } from '../../hooks/useAnalytics';

interface DepartmentFilterProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export function DepartmentFilter({
  value,
  onValueChange,
  placeholder = 'Select department...',
}: DepartmentFilterProps) {
  const { data: globalData } = useGlobalAnalytics();

  // Extract departments from global analytics or use defaults
  const departments = globalData?.departments?.map((d) => d.name) || [
    'Engineering',
    'Manufacturing',
    'Quality',
    'R&D',
    'IT',
    'Supply Chain',
  ];

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {departments.map((dept) => (
          <SelectItem key={dept} value={dept}>
            {dept}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

