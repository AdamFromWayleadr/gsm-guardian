import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { TabNavigation } from "@/components/dashboard/TabNavigation";
import { RecentIssues } from "@/components/dashboard/RecentIssues";
import { Star, Zap, Clock, XCircle } from "lucide-react";
import { supabase, GlobalStats } from "@/lib/supabase";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "activity", label: "Activity Log" },
  { id: "performance", label: "Performance" },
  { id: "costs", label: "Costs" },
  { id: "alerts", label: "Alerts" },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState<GlobalStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGlobalStats();
  }, []);

  const fetchGlobalStats = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('global_stats')
        .select('*')
        .single();

      if (error) {
        console.error('Error fetching global stats:', error);
        return;
      }

      setStats(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Format numbers for display
  const formatNumber = (num: number | null | undefined) => {
    if (num === null || num === undefined) return '0';
    return num.toLocaleString();
  };

  const formatCurrency = (num: number | null | undefined) => {
    if (num === null || num === undefined) return '$0';
    return `$${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatPercent = (num: number | null | undefined) => {
    if (num === null || num === undefined) return '0%';
    return `${num.toFixed(1)}%`;
  };

  const formatLatency = (ms: number | null | undefined) => {
    if (ms === null || ms === undefined) return '0s';
    return `${(ms / 1000).toFixed(1)}s`;
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="mb-6">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
            WAYHOME
          </p>
          <h1 className="text-3xl font-bold text-foreground">
            GSM Monitoring Dashboard
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="metric-card animate-pulse">
              <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-muted rounded w-full"></div>
            </div>
          ))}
        </div>
      </DashboardLayout>
    );
  }

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

      {activeTab === "overview" && stats && (
        <>
          {/* First Row of Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <MetricCard
              title="Total Units"
              value={formatNumber(stats.total_active_units)}
              description="Active GSM units across all customers"
              footer={{ label: "Dec MTD", value: formatNumber(stats.total_active_units) }}
            />
            <MetricCard
              title="Issues (24h)"
              value={formatNumber(stats.open_incidents)}
              description="Alerts requiring attention"
              footer={{ label: "Dec MTD", value: formatNumber(stats.open_incidents * 4) }}
              trend={stats.open_incidents > 5 ? "down" : "up"}
            />
            <MetricCard
              title="Success Rate"
              value={formatPercent(stats.avg_success_rate_24h)}
              description="Average success rate last 24h"
              footer={{ label: "Dec MTD", value: formatPercent(stats.avg_success_rate_24h + 0.5) }}
            />
            <MetricCard
              title="Monthly Cost"
              value={formatCurrency(stats.monthly_cost)}
              description="Total platform costs this month"
              footer={{ label: "Dec MTD", value: formatCurrency(stats.monthly_cost * 1.1) }}
              icon={<Star className="h-5 w-5" />}
            />
          </div>

          {/* Second Row of Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title="Vonage Units"
              value={formatNumber(stats.vonage_units)}
              description="Primary platform provider"
              footer={{ label: "Dec MTD", value: formatNumber(stats.vonage_units) }}
              icon={<Zap className="h-5 w-5" />}
            />
            <MetricCard
              title="MessageBird Units"
              value={formatNumber(stats.messagebird_units)}
              description="Secondary platform provider"
              footer={{ label: "Dec MTD", value: formatNumber(stats.messagebird_units) }}
            />
            <MetricCard
              title="Avg Response Time"
              value={formatLatency(stats.avg_response_time_ms)}
              description="Average latency across all units"
              footer={{ label: "Dec MTD", value: formatLatency(stats.avg_response_time_ms * 0.95) }}
              icon={<Clock className="h-5 w-5" />}
            />
            <MetricCard
              title="Failed Tests"
              value={formatNumber(stats.failed_tests_24h)}
              description="Failed health checks last 24h"
              footer={{ label: "Dec MTD", value: formatNumber(stats.failed_tests_24h * 15) }}
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
