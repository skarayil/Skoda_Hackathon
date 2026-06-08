import { useState } from "react";
import { Navigation } from "./layouts/Navigation";
import { TopBar } from "./layouts/TopBar";
import { ManagerDashboard } from "./pages/ManagerDashboard";
import { TeamHeatmap } from "./pages/TeamHeatmap";
import { EmployeeProfile } from "./pages/EmployeeProfile";
import { SuccessionReadiness } from "./pages/SuccessionReadiness";
import { HRAnalytics } from "./pages/HRAnalytics";
import { AIAssistant } from "./pages/AIAssistant";
import { DataIngestion } from "./pages/DataIngestion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function App() {
  const [activeView, setActiveView] = useState("manager");

  const renderView = () => {
    switch (activeView) {
      case "manager":
        return <ManagerDashboard />;
      case "heatmap":
        return <TeamHeatmap />;
      case "employee":
        return <EmployeeProfile />;
      case "succession":
        return <SuccessionReadiness />;
      case "analytics":
        return <HRAnalytics />;
      case "ai":
        return <AIAssistant />;
      case "ingestion":
        return <DataIngestion />;
      default:
        return <ManagerDashboard />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-[hsl(var(--skoda-gray-50))]">
        <Navigation activeView={activeView} onViewChange={setActiveView} />
        
        <div className="ml-64">
          <TopBar />
          
          <main className="p-8">
            {renderView()}
          </main>
        </div>
        
        <Toaster position="top-right" />
      </div>
    </QueryClientProvider>
  );
}
