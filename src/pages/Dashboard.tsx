import { StatCard } from "@/components/ui/stat-card";
import { Package, AlertTriangle, ArrowDownToLine, ArrowUpFromLine, Truck, Users } from "lucide-react";
import { dashboardStats, chartData, notifications } from "@/lib/dummy-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { cn } from "@/lib/utils";

const COLORS = ["hsl(199, 89%, 48%)", "hsl(172, 66%, 50%)", "hsl(222, 47%, 31%)", "hsl(38, 92%, 50%)", "hsl(142, 76%, 36%)"];

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Tổng quan hoạt động kho và nhân sự</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Tổng tồn kho"
          value={dashboardStats.totalStock}
          icon={Package}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Sắp hết hạn"
          value={dashboardStats.expiringProducts}
          icon={AlertTriangle}
          iconClassName="bg-warning/10"
        />
        <StatCard
          title="Nhập hôm nay"
          value={dashboardStats.todayImport}
          icon={ArrowDownToLine}
          iconClassName="bg-success/10"
        />
        <StatCard
          title="Xuất hôm nay"
          value={dashboardStats.todayExport}
          icon={ArrowUpFromLine}
          iconClassName="bg-accent/10"
        />
        <StatCard
          title="Nhà cung cấp"
          value={dashboardStats.totalSuppliers}
          icon={Truck}
        />
        <StatCard
          title="Nhân viên"
          value={dashboardStats.totalEmployees}
          icon={Users}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stock Flow Chart */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold mb-4">Nhập - Xuất theo tháng</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData.stockFlow}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="import" name="Nhập" fill="hsl(199, 89%, 48%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="export" name="Xuất" fill="hsl(172, 66%, 50%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold mb-4">Top sản phẩm tồn kho</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={chartData.topProducts}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.topProducts.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {chartData.topProducts.slice(0, 3).map((product, index) => (
              <div key={product.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-muted-foreground">{product.name}</span>
                </div>
                <span className="font-medium">{product.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-semibold mb-4">Thông báo mới</h3>
        <div className="space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={cn(
                "flex items-start gap-4 p-4 rounded-lg border",
                !notif.read && "bg-primary/5 border-primary/20"
              )}
            >
              <div
                className={cn(
                  "w-2 h-2 rounded-full mt-2",
                  notif.type === "warning" && "bg-warning",
                  notif.type === "alert" && "bg-destructive",
                  notif.type === "success" && "bg-success",
                  notif.type === "info" && "bg-primary"
                )}
              />
              <div className="flex-1">
                <p className="font-medium text-sm">{notif.title}</p>
                <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
              </div>
              <span className="text-xs text-muted-foreground">{notif.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
