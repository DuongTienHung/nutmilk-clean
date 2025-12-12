import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { Truck, Box, Users, ArrowRightLeft, ClipboardCheck } from 'lucide-react';

const barChartData = [
  { name: 'T2', value: 45 },
  { name: 'T3', value: 52 },
  { name: 'T4', value: 38 },
  { name: 'T5', value: 65 },
  { name: 'T6', value: 48 },
  { name: 'T7', value: 35 },
  { name: 'CN', value: 20 },
];

const lineChartData = [
  { name: 'Th1', value: 120 },
  { name: 'Th2', value: 150 },
  { name: 'Th3', value: 180 },
  { name: 'Th4', value: 165 },
  { name: 'Th5', value: 200 },
  { name: 'Th6', value: 185 },
];

const pieChartData = [
  { name: 'Admin', value: 3 },
  { name: 'Quản lý kho', value: 5 },
  { name: 'Mua hàng', value: 8 },
  { name: 'Sản xuất', value: 12 },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout allowedRoles={['admin']}>
      <div className="space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Tổng quan hệ thống NutMilk ERP</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            title="Nhà cung cấp"
            value="156"
            change="+12 tháng này"
            changeType="positive"
            icon={Truck}
          />
          <StatCard
            title="Nguyên vật liệu"
            value="1,234"
            change="+45 mới"
            changeType="positive"
            icon={Box}
            iconColor="bg-accent/10 text-accent"
          />
          <StatCard
            title="Người dùng"
            value="28"
            change="5 đang online"
            changeType="neutral"
            icon={Users}
            iconColor="bg-warning/10 text-warning"
          />
          <StatCard
            title="Giao dịch kho"
            value="892"
            change="+156 tuần này"
            changeType="positive"
            icon={ArrowRightLeft}
            iconColor="bg-success/10 text-success"
          />
          <StatCard
            title="Đơn chờ duyệt"
            value="7"
            change="Cần xử lý"
            changeType="negative"
            icon={ClipboardCheck}
            iconColor="bg-destructive/10 text-destructive"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartCard
            title="Giao dịch kho theo ngày"
            type="bar"
            data={barChartData}
          />
          <ChartCard
            title="Giá trị mua hàng theo tháng"
            type="line"
            data={lineChartData}
          />
          <ChartCard
            title="Phân bố vai trò"
            type="pie"
            data={pieChartData}
          />
        </div>

        {/* Quick lists & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>
          
          {/* Quick Stats */}
          <div className="space-y-4">
            <div className="stat-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">NCC mới tạo</h3>
              <div className="space-y-3">
                {['Công ty TNHH ABC', 'NCC Thực phẩm XYZ', 'Đại lý Minh Phát'].map((name, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                    <span className="text-sm text-foreground">{name}</span>
                    <span className="text-xs text-muted-foreground">Hôm nay</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="stat-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">NVL sắp hết</h3>
              <div className="space-y-3">
                {[
                  { name: 'Bột mì loại 1', qty: '50kg' },
                  { name: 'Đường tinh luyện', qty: '30kg' },
                  { name: 'Bao bì PE', qty: '100 cái' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-warning/10">
                    <span className="text-sm text-foreground">{item.name}</span>
                    <span className="text-xs text-warning font-medium">{item.qty}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
