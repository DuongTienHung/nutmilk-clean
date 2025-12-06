import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { dashboardStats, chartData, products, suppliers } from "@/lib/dummy-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { FileText, Download, Package, Truck, Users, TrendingUp } from "lucide-react";

export default function Reports() {
  const reportCards = [
    {
      title: "Báo cáo tồn kho",
      description: "Tổng quan số lượng tồn theo sản phẩm",
      icon: Package,
      value: `${dashboardStats.totalStock} sản phẩm`,
    },
    {
      title: "Báo cáo nhập xuất",
      description: "Thống kê nhập xuất theo thời gian",
      icon: TrendingUp,
      value: `${dashboardStats.todayImport + dashboardStats.todayExport} hôm nay`,
    },
    {
      title: "Báo cáo nhà cung cấp",
      description: "Thống kê giao dịch theo NCC",
      icon: Truck,
      value: `${suppliers.length} nhà cung cấp`,
    },
    {
      title: "Báo cáo nhân viên kho",
      description: "Hoạt động của nhân viên",
      icon: Users,
      value: `${dashboardStats.totalEmployees} nhân viên`,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="page-header">
          <h1 className="page-title">Báo cáo</h1>
          <p className="page-subtitle">Thống kê và phân tích dữ liệu</p>
        </div>

        <div className="flex items-center gap-3">
          <Select defaultValue="month">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Khoảng thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Tuần này</SelectItem>
              <SelectItem value="month">Tháng này</SelectItem>
              <SelectItem value="quarter">Quý này</SelectItem>
              <SelectItem value="year">Năm nay</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportCards.map((report) => (
          <Card key={report.title} className="p-5 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <report.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-sm">{report.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{report.description}</p>
                <p className="text-lg font-semibold mt-2">{report.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Xu hướng nhập xuất</h3>
            <Button variant="ghost" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Chi tiết
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData.stockFlow}>
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
              <Line type="monotone" dataKey="import" name="Nhập" stroke="hsl(199, 89%, 48%)" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="export" name="Xuất" stroke="hsl(172, 66%, 50%)" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Tồn kho theo sản phẩm</h3>
            <Button variant="ghost" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Chi tiết
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={products.slice(0, 5)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis dataKey="name" type="category" width={120} stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="stock" name="Tồn kho" fill="hsl(199, 89%, 48%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
