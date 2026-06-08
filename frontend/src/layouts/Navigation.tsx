import { LayoutDashboard, Users, UserCircle, Target, TrendingUp, Sparkles, Settings, Presentation } from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";

interface NavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Navigation({ activeView, onViewChange }: NavigationProps) {
  const navItems = [
    { id: "manager", icon: LayoutDashboard, label: "Manager Dashboard" },
    { id: "heatmap", icon: Users, label: "Team Skills Heatmap" },
    { id: "employee", icon: UserCircle, label: "Employee Profile" },
    { id: "succession", icon: Target, label: "Succession & Readiness" },
    { id: "analytics", icon: TrendingUp, label: "HR Analytics" },
    { id: "ai", icon: Sparkles, label: "AI Assistant" },
    { id: "presentation", icon: Presentation, label: "Project Presentation", isExternal: true, href: "/Skoda_Hackathon/presentation.html" },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-[hsl(var(--skoda-navy))] border-r border-[hsl(var(--skoda-navy-lighter))] flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-[hsl(var(--skoda-navy-lighter))]">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 bg-[hsl(var(--skoda-green))] rounded flex items-center justify-center">
            <span className="text-white">Š</span>
          </div>
          <div>
            <h3 className="text-white">Skill Coach</h3>
            <p className="text-[hsl(var(--skoda-gray-400))] text-xs">AI-Powered Talent Intelligence</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          if (item.isExternal) {
            return (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-[hsl(var(--skoda-gray-300))] hover:bg-[hsl(var(--skoda-navy-light))] hover:text-white"
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </a>
            );
          }
          
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                isActive
                  ? "bg-[hsl(var(--skoda-green))] text-white shadow-lg"
                  : "text-[hsl(var(--skoda-gray-300))] hover:bg-[hsl(var(--skoda-navy-light))] hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-[hsl(var(--skoda-navy-lighter))]">
        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9 border-2 border-[hsl(var(--skoda-green))]">
            <AvatarFallback className="bg-[hsl(var(--skoda-navy-light))] text-white">MK</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm truncate">Martin Kovář</p>
            <p className="text-[hsl(var(--skoda-gray-400))] text-xs">Engineering Manager</p>
          </div>
          <Settings className="w-4 h-4 text-[hsl(var(--skoda-gray-400))] hover:text-white cursor-pointer transition-colors" />
        </div>
      </div>
    </div>
  );
}
