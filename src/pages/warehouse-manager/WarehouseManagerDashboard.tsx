import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { Package, TrendingUp, TrendingDown, AlertTriangle, Clock } from 'lucide-react';

const inventoryData = [
  { name: 'T2', value: 1200 },
  { name: 'T3', value: 1350 },
  { name: 'T4', value: 1180 },
  { name: 'T5', value: 1420 },
  { name: 'T6', value: 1290 },
  { name: 'T7', value: 1100 },
  { name: 'CN', value: 950 },
];

const stockMovementData = [
  { name: 'Nhập', value: 450 },
  { name: 'Xuất', value: 380 },
  { name: 'Chuyển kho', value: 120 },
  { name: 'Hủy', value: 25 },
];

export default function WarehouseManagerDashboard() {
  return (
    <DashboardLayout allowedRoles={['warehouse_manager']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Kho</h1>
          <p className="text-muted-foreground">Tổng quan tình trạng kho hàng</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            title="Tổng tồn kho"
            value="12,458"
            change="+5.2% so với tuần trước"
            changeType="positive"
            icon={Package}
          />
          <StatCard
            title="Nhập hôm nay"
            value="156"
            change="+23 phiếu"
            changeType="positive"
            icon={TrendingUp}
            iconColor="bg-success/10 text-success"
          />
          <StatCard
            title="Xuất hôm nay"
            value="89"
            change="15 phiếu"
            changeType="neutral"
            icon={TrendingDown}
            iconColor="bg-accent/10 text-accent"
          />
          <StatCard
            title="Sắp hết hạn"
            value="23"
            change="Trong 7 ngày"
            changeType="negative"
            icon={AlertTriangle}
            iconColor="bg-warning/10 text-warning"
          />
          <StatCard
            title="Dưới tồn tối thiểu"
            value="8"
            change="Cần nhập thêm"
            changeType="negative"
            icon={Clock}
            iconColor="bg-destructive/10 text-destructive"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Biến động tồn kho"
            type="line"
            data={inventoryData}
          />
          <ChartCard
            title="Phân loại giao dịch"
            type="pie"
            data={stockMovementData}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>
          
          <div className="space-y-4">
            <div className="stat-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Lô sắp hết hạn</h3>
              <div className="space-y-3">
                {[
                  { name: 'Bột mì #L001', date: '15/12/2024' },
                  { name: 'Hương vani #L045', date: '18/12/2024' },
                  { name: 'Sữa bột #L089', date: '20/12/2024' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-warning/10">
                    <span className="text-sm font-medium text-foreground">{item.name}</span>
                    <span className="text-xs text-warning font-medium">{item.date}</span>
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
