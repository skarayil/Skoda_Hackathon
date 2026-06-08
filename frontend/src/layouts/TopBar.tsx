import { Bell, Search, Globe } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export function TopBar() {
  return (
    <div className="h-16 bg-white border-b border-[hsl(var(--border))] px-6 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[hsl(var(--skoda-gray-400))]" />
          <Input
            placeholder="Search employees, skills, departments..."
            className="pl-10 bg-[hsl(var(--skoda-gray-50))] border-[hsl(var(--skoda-gray-200))]"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Select defaultValue="en">
          <SelectTrigger className="w-24 border-[hsl(var(--skoda-gray-200))]">
            <Globe className="w-4 h-4 mr-1" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">EN</SelectItem>
            <SelectItem value="cs">CZ</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-[hsl(var(--skoda-gray-600))]" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[hsl(var(--skoda-green))] text-white text-xs">
            3
          </Badge>
        </Button>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-[hsl(var(--skoda-gray-100))] rounded-lg">
          <div className="w-2 h-2 bg-[hsl(var(--skoda-green))] rounded-full animate-pulse"></div>
          <span className="text-xs text-[hsl(var(--skoda-gray-600))]">AI Active</span>
        </div>
      </div>
    </div>
  );
}
