/**
 * Employee Picker Component
 * Dropdown/selector for choosing an employee
 */

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useGlobalAnalytics } from '../../hooks/useAnalytics';

interface EmployeePickerProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export function EmployeePicker({
  value,
  onValueChange,
  placeholder = 'Select employee...',
}: EmployeePickerProps) {
  const { data: globalData } = useGlobalAnalytics();

  // In a real implementation, we'd fetch a list of employees
  // For now, using a placeholder that can be enhanced
  const employees = [
    { id: 'EMP-001', name: 'Employee 001' },
    { id: 'EMP-002', name: 'Employee 002' },
    { id: 'EMP-003', name: 'Employee 003' },
  ];

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {employees.map((emp) => (
          <SelectItem key={emp.id} value={emp.id}>
            {emp.name} ({emp.id})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

