import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
          CONFIGURATION
        </p>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
      </div>

      <div className="max-w-2xl space-y-8">
        {/* General Settings */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">General</h2>
          
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="refresh">Auto-refresh interval (seconds)</Label>
              <Input id="refresh" type="number" defaultValue="30" className="max-w-32" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Real-time updates</Label>
                <p className="text-sm text-muted-foreground">
                  Enable live data streaming for dashboards
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        <Separator />

        {/* Notification Settings */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Notifications</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Receive critical alerts via email
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Slack integration</Label>
                <p className="text-sm text-muted-foreground">
                  Post alerts to Slack channels
                </p>
              </div>
              <Switch />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="threshold">Success rate alert threshold (%)</Label>
              <Input id="threshold" type="number" defaultValue="90" className="max-w-32" />
            </div>
          </div>
        </div>

        <Separator />

        {/* API Settings */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">API Configuration</h2>
          
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="supabase-url">Supabase Project URL</Label>
              <Input id="supabase-url" placeholder="https://your-project.supabase.co" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="anon-key">Supabase Anon Key</Label>
              <Input id="anon-key" type="password" placeholder="••••••••••••" />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button>Save Changes</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
