import { AlertTriangle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Issue {
  id: string;
  type: "error" | "warning";
  message: string;
  location: string;
  timestamp: string;
}

const mockIssues: Issue[] = [
  {
    id: "1",
    type: "error",
    message: "Connection timeout after 30s",
    location: "Unit +1-555-0123 (Acme Corp)",
    timestamp: "2 min ago",
  },
  {
    id: "2",
    type: "warning",
    message: "High latency detected (>5s)",
    location: "Unit +44-20-7946-0958 (TechStart)",
    timestamp: "15 min ago",
  },
  {
    id: "3",
    type: "error",
    message: "SMS delivery failed",
    location: "Unit +49-30-123456 (GlobalCom)",
    timestamp: "32 min ago",
  },
  {
    id: "4",
    type: "warning",
    message: "Success rate below threshold (85%)",
    location: "Unit +33-1-42-68-53-00 (NexGen)",
    timestamp: "1 hour ago",
  },
];

export function RecentIssues() {
  return (
    <div className="bg-card rounded-lg border border-border p-6 animate-fade-in">
      <h3 className="text-lg font-semibold text-foreground mb-4">Recent Issues</h3>
      
      <div className="space-y-3">
        {mockIssues.map((issue) => (
          <div
            key={issue.id}
            className="flex items-start gap-3 p-3 rounded-lg bg-background hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <div className={cn(
              "mt-0.5 p-1.5 rounded-full",
              issue.type === "error" ? "bg-destructive/10" : "bg-warning/10"
            )}>
              {issue.type === "error" ? (
                <AlertCircle className="h-4 w-4 text-destructive" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-warning" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{issue.message}</p>
              <p className="text-sm text-muted-foreground truncate">{issue.location}</p>
            </div>
            
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {issue.timestamp}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
