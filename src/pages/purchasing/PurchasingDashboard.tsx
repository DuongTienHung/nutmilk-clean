import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { ShoppingCart, FileText, Truck, Clock, CheckCircle } from 'lucide-react';

const orderData = [
  { name: 'Th1', value: 45 },
  { name: 'Th2', value: 52 },
  { name: 'Th3', value: 38 },
  { name: 'Th4', value: 65 },
  { name: 'Th5', value: 48 },
  { name: 'Th6', value: 58 },
];

const statusData = [
  { name: 'Chờ duyệt', value: 12 },
  { name: 'Đã duyệt', value: 28 },
  { name: 'Đang giao', value: 15 },
  { name: 'Hoàn thành', value: 45 },
];

export default function PurchasingDashboard() {
  return (
    <DashboardLayout allowedRoles={['purchasing']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Mua hàng</h1>
          <p className="text-muted-foreground">Quản lý đơn đặt hàng và nhà cung cấp</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            title="Đơn mua tháng này"
            value="58"
            change="+12% so với tháng trước"
            changeType="positive"
            icon={ShoppingCart}
          />
          <StatCard
            title="Yêu cầu mua (PR)"
            value="15"
            change="Chờ xử lý"
            changeType="neutral"
            icon={FileText}
            iconColor="bg-warning/10 text-warning"
          />
          <StatCard
            title="Đang giao hàng"
            value="23"
            change="Từ 8 NCC"
            changeType="neutral"
            icon={Truck}
            iconColor="bg-accent/10 text-accent"
          />
          <StatCard
            title="Chờ duyệt"
            value="7"
            change="Cần xử lý"
            changeType="negative"
            icon={Clock}
            iconColor="bg-destructive/10 text-destructive"
          />
          <StatCard
            title="Hoàn thành"
            value="45"
            change="Tháng này"
            changeType="positive"
            icon={CheckCircle}
            iconColor="bg-success/10 text-success"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Đơn mua theo tháng"
            type="bar"
            data={orderData}
          />
          <ChartCard
            title="Trạng thái đơn hàng"
            type="pie"
            data={statusData}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Đơn hàng cần xử lý</h3>
            <div className="space-y-3">
              {[
                { id: 'PO-2024-001', supplier: 'Công ty ABC', value: '25.000.000đ', status: 'Chờ duyệt' },
                { id: 'PO-2024-002', supplier: 'NCC XYZ', value: '18.500.000đ', status: 'Chờ duyệt' },
                { id: 'PO-2024-003', supplier: 'Đại lý DEF', value: '32.000.000đ', status: 'Cần báo giá' },
              ].map((order, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer">
                  <div>
                    <div className="font-medium text-foreground">{order.id}</div>
                    <div className="text-xs text-muted-foreground">{order.supplier}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-foreground">{order.value}</div>
                    <span className="badge-warning">{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Gợi ý nhập hàng</h3>
            <div className="space-y-3">
              {[
                { name: 'Bột mì loại 1', current: 50, min: 100, unit: 'kg' },
                { name: 'Đường tinh luyện', current: 30, min: 80, unit: 'kg' },
                { name: 'Bao bì PE', current: 100, min: 500, unit: 'cái' },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-lg bg-destructive/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">{item.name}</span>
                    <span className="text-xs text-destructive font-medium">Dưới tồn tối thiểu</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tồn: {item.current} {item.unit}</span>
                    <span className="text-muted-foreground">Tối thiểu: {item.min} {item.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
