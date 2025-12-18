import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  footer?: {
    label: string;
    value: string | number;
  };
  icon?: ReactNode;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export function MetricCard({
  title,
  value,
  description,
  footer,
  icon,
  trend,
  className,
}: MetricCardProps) {
  return (
    <div className={cn("metric-card animate-fade-in", className)}>
      <div className="flex items-start justify-between">
        <p className="metric-label">{title}</p>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      
      <p className={cn(
        "metric-value mt-2",
        trend === "up" && "text-success",
        trend === "down" && "text-destructive"
      )}>
        {value}
      </p>
      
      {description && (
        <p className="metric-description">{description}</p>
      )}
      
      {footer && (
        <div className="metric-footer">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Dec</span>
            <span className="px-2 py-0.5 bg-muted rounded text-xs font-medium">MTD</span>
          </div>
          <span className="font-semibold text-foreground">{footer.value}</span>
        </div>
      )}
    </div>
  );
}
