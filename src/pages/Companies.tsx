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
  "acacia-point": { name: "Acacia Point", units: 3, successRate: 96.2, issues: 0, cost: 135 },
  "alstom": { name: "Alstom", units: 1, successRate: 94.1, issues: 1, cost: 45 },
  "annie-e-casey": { name: "Annie E. Casey Foundation", units: 1, successRate: 97.8, issues: 0, cost: 45 },
  "avalon-bay": { name: "Avalon Bay", units: 42, successRate: 98.2, issues: 2, cost: 1890 },
  "bazaarvoice": { name: "BazaarVoice", units: 1, successRate: 95.3, issues: 0, cost: 45 },
  "belfast-city-council": { name: "Belfast City Council", units: 1, successRate: 91.2, issues: 1, cost: 45 },
  "bunnings": { name: "Bunnings", units: 2, successRate: 96.7, issues: 0, cost: 90 },
  "carbogen": { name: "Carbogen", units: 1, successRate: 97.1, issues: 0, cost: 45 },
  "ebay": { name: "eBay", units: 4, successRate: 95.8, issues: 1, cost: 180 },
  "ericsson": { name: "Ericsson", units: 1, successRate: 93.4, issues: 1, cost: 45 },
  "fanatics": { name: "Fanatics", units: 1, successRate: 96.9, issues: 0, cost: 45 },
  "film-factory": { name: "Film Factory", units: 1, successRate: 98.1, issues: 0, cost: 45 },
  "genesys": { name: "Genesys", units: 1, successRate: 94.7, issues: 0, cost: 45 },
  "google": { name: "Google", units: 3, successRate: 99.1, issues: 0, cost: 135 },
  "housing-agency": { name: "Housing Agency", units: 1, successRate: 92.8, issues: 1, cost: 45 },
  "hpra": { name: "HPRA", units: 1, successRate: 95.6, issues: 0, cost: 45 },
  "indeed": { name: "Indeed", units: 1, successRate: 96.3, issues: 0, cost: 45 },
  "kennedy-wilson": { name: "Kennedy Wilson", units: 1, successRate: 94.9, issues: 0, cost: 45 },
  "mapp": { name: "MAPP", units: 1, successRate: 97.4, issues: 0, cost: 45 },
  "motors": { name: "Motors", units: 1, successRate: 93.2, issues: 1, cost: 45 },
  "novartis": { name: "Novartis", units: 2, successRate: 98.5, issues: 0, cost: 90 },
  "ntma": { name: "NTMA", units: 1, successRate: 95.1, issues: 0, cost: 45 },
  "on-ag": { name: "ON AG", units: 1, successRate: 94.3, issues: 0, cost: 45 },
  "openai": { name: "OpenAI", units: 4, successRate: 99.2, issues: 0, cost: 180 },
  "prestilux": { name: "Prestilux", units: 1, successRate: 96.0, issues: 0, cost: 45 },
  "qtectic": { name: "Qtectic", units: 1, successRate: 93.7, issues: 1, cost: 45 },
  "reece": { name: "Reece", units: 2, successRate: 95.9, issues: 0, cost: 90 },
  "sanderson": { name: "Sanderson Solutions Group Plc", units: 1, successRate: 94.5, issues: 0, cost: 45 },
  "sanofi": { name: "Sanofi", units: 4, successRate: 97.8, issues: 0, cost: 180 },
  "sodexo": { name: "Sodexo", units: 1, successRate: 92.3, issues: 1, cost: 45 },
  "sothebys": { name: "Sothebys", units: 1, successRate: 96.5, issues: 0, cost: 45 },
  "sxsw": { name: "SXSW", units: 1, successRate: 95.4, issues: 0, cost: 45 },
  "thales-edisoft": { name: "Thales & Edisoft", units: 2, successRate: 94.8, issues: 0, cost: 90 },
  "uber": { name: "Uber", units: 6, successRate: 98.3, issues: 1, cost: 270 },
  "ukri": { name: "UKRI", units: 1, successRate: 95.7, issues: 0, cost: 45 },
  "university-cambridge": { name: "University of Cambridge", units: 1, successRate: 96.8, issues: 0, cost: 45 },
  "university-sunderland": { name: "University of Sunderland", units: 1, successRate: 93.9, issues: 1, cost: 45 },
  "version-1": { name: "Version 1", units: 1, successRate: 97.2, issues: 0, cost: 45 },
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
  
  const company = companyId ? companies[companyId] : companies["avalon-bay"];
  const companyName = company?.name || "Avalon Bay";

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
          
          <Select defaultValue={companyId || "avalon-bay"}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select company" />
            </SelectTrigger>
            <SelectContent className="max-h-96">
              {Object.entries(companies)
                .sort((a, b) => a[1].name.localeCompare(b[1].name))
                .map(([id, comp]) => (
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
            footer={{ label: "Dec MTD", value: company.units }}
          />
          <MetricCard
            title="Success Rate"
            value={`${company.successRate}%`}
            description="7-day average success rate"
            footer={{ label: "Dec MTD", value: `${(company.successRate - 0.3).toFixed(1)}%` }}
          />
          <MetricCard
            title="Issues This Week"
            value={company.issues}
            description="Alerts requiring attention"
            footer={{ label: "Dec MTD", value: company.issues * 3 }}
            trend={company.issues > 0 ? "down" : "up"}
          />
          <MetricCard
            title="Monthly Cost"
            value={`$${company.cost.toLocaleString()}`}
            description="Estimated platform costs"
            footer={{ label: "Dec MTD", value: `$${(company.cost * 1.1).toFixed(0)}` }}
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
