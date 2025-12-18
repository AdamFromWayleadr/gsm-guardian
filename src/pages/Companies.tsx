import { useState } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { TabNavigation } from "@/components/dashboard/TabNavigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download } from "lucide-react";

const companies: Record<string, { name: string; units: number; successRate: number; issues: number; cost: number }> = {
  acme: { name: "Acme Corp", units: 342, successRate: 96.2, issues: 5, cost: 4250 },
  techstart: { name: "TechStart Inc", units: 186, successRate: 91.8, issues: 12, cost: 2180 },
  globalcom: { name: "GlobalCom", units: 428, successRate: 94.5, issues: 8, cost: 5120 },
  nexgen: { name: "NexGen Solutions", units: 328, successRate: 97.1, issues: 3, cost: 3890 },
};

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "timeseries", label: "Time Series" },
  { id: "activity", label: "Activity Log" },
  { id: "units", label: "Unit Details" },
];

export default function Companies() {
  const { companyId } = useParams<{ companyId: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  
  const company = companyId ? companies[companyId] : companies.acme;
  const companyName = company?.name || "Acme Corp";

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
            COMPANIES / {companyName.toUpperCase()}
          </p>
          <h1 className="text-3xl font-bold text-foreground">{companyName}</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          
          <Select defaultValue={companyId || "acme"}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select company" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(companies).map(([id, comp]) => (
                <SelectItem key={id} value={id}>{comp.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {activeTab === "overview" && company && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Active Units"
            value={company.units}
            description="Currently monitored GSM units"
            footer={{ label: "Dec MTD", value: company.units + 12 }}
          />
          <MetricCard
            title="Success Rate"
            value={`${company.successRate}%`}
            description="7-day average success rate"
            footer={{ label: "Dec MTD", value: `${(company.successRate + 0.5).toFixed(1)}%` }}
          />
          <MetricCard
            title="Issues This Week"
            value={company.issues}
            description="Alerts requiring attention"
            footer={{ label: "Dec MTD", value: company.issues * 4 }}
            trend={company.issues > 10 ? "down" : "up"}
          />
          <MetricCard
            title="Monthly Cost"
            value={`$${company.cost.toLocaleString()}`}
            description="Estimated platform costs"
            footer={{ label: "Dec MTD", value: `$${(company.cost * 1.1).toLocaleString()}` }}
          />
        </div>
      )}

      {activeTab !== "overview" && (
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <p className="text-muted-foreground">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} view coming soon...
          </p>
        </div>
      )}
    </DashboardLayout>
  );
}
