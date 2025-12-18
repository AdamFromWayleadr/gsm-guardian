import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { TabNavigation } from "@/components/dashboard/TabNavigation";
import { RecentIssues } from "@/components/dashboard/RecentIssues";
import { Star, Zap, Clock, XCircle } from "lucide-react";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "activity", label: "Activity Log" },
  { id: "performance", label: "Performance" },
  { id: "costs", label: "Costs" },
  { id: "alerts", label: "Alerts" },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
          WAYHOME
        </p>
        <h1 className="text-3xl font-bold text-foreground">
          GSM Monitoring Dashboard
        </h1>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {activeTab === "overview" && (
        <>
          {/* First Row of Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <MetricCard
              title="Total Units"
              value="1,284"
              description="Active GSM units across all customers"
              footer={{ label: "Dec MTD", value: "1,312" }}
            />
            <MetricCard
              title="Issues (24h)"
              value="23"
              description="Alerts requiring attention"
              footer={{ label: "Dec MTD", value: "156" }}
              trend="down"
            />
            <MetricCard
              title="Success Rate"
              value="94.7%"
              description="Average success rate vs last month"
              footer={{ label: "Dec MTD", value: "95.2%" }}
            />
            <MetricCard
              title="Monthly Cost"
              value="$12,847"
              description="Total platform costs this month"
              footer={{ label: "Dec MTD", value: "$14,200" }}
              icon={<Star className="h-5 w-5" />}
            />
          </div>

          {/* Second Row of Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title="Vonage Units"
              value="742"
              description="Primary platform provider"
              footer={{ label: "Dec MTD", value: "756" }}
              icon={<Zap className="h-5 w-5" />}
            />
            <MetricCard
              title="MessageBird Units"
              value="542"
              description="Secondary platform provider"
              footer={{ label: "Dec MTD", value: "556" }}
            />
            <MetricCard
              title="Avg Response Time"
              value="2.4s"
              description="Average latency across all units"
              footer={{ label: "Dec MTD", value: "2.1s" }}
              icon={<Clock className="h-5 w-5" />}
            />
            <MetricCard
              title="Failed Tests"
              value="47"
              description="Failed health checks this month"
              footer={{ label: "Dec MTD", value: "52" }}
              icon={<XCircle className="h-5 w-5" />}
              trend="down"
            />
          </div>

          {/* Recent Issues */}
          <RecentIssues />
        </>
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
};

export default Index;
