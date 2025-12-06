import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  iconClassName?: string;
}

export function StatCard({ title, value, icon: Icon, trend, className, iconClassName }: StatCardProps) {
  return (
    <div className={cn("stat-card", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value.toLocaleString()}</p>
          {trend && (
            <p className={cn("text-xs mt-2", trend.isPositive ? "text-success" : "text-destructive")}>
              {trend.isPositive ? "+" : ""}{trend.value}% so với tháng trước
            </p>
          )}
        </div>
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center bg-primary/10", iconClassName)}>
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
    </div>
  );
}
