import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { Factory, ClipboardList, Box, Clock, CheckCircle } from 'lucide-react';

const productionData = [
  { name: 'T2', value: 120 },
  { name: 'T3', value: 145 },
  { name: 'T4', value: 138 },
  { name: 'T5', value: 165 },
  { name: 'T6', value: 142 },
  { name: 'T7', value: 95 },
  { name: 'CN', value: 0 },
];

const shiftData = [
  { name: 'Ca sáng', value: 45 },
  { name: 'Ca chiều', value: 38 },
  { name: 'Ca đêm', value: 22 },
];

export default function ProductionDashboard() {
  return (
    <DashboardLayout allowedRoles={['production']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Sản xuất</h1>
          <p className="text-muted-foreground">Theo dõi tiến độ sản xuất</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            title="Phiếu sản xuất"
            value="12"
            change="Được giao hôm nay"
            changeType="neutral"
            icon={ClipboardList}
          />
          <StatCard
            title="Đang thực hiện"
            value="5"
            change="Đúng tiến độ"
            changeType="positive"
            icon={Factory}
            iconColor="bg-warning/10 text-warning"
          />
          <StatCard
            title="Lô thành phẩm"
            value="8"
            change="Hoàn thành hôm nay"
            changeType="positive"
            icon={Box}
            iconColor="bg-success/10 text-success"
          />
          <StatCard
            title="NVL chờ cấp"
            value="3"
            change="Yêu cầu đang chờ"
            changeType="negative"
            icon={Clock}
            iconColor="bg-destructive/10 text-destructive"
          />
          <StatCard
            title="Hoàn thành tuần"
            value="45"
            change="+15% so với tuần trước"
            changeType="positive"
            icon={CheckCircle}
            iconColor="bg-accent/10 text-accent"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Sản lượng theo ngày"
            type="bar"
            data={productionData}
          />
          <ChartCard
            title="Sản lượng theo ca"
            type="pie"
            data={shiftData}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Phiếu sản xuất hôm nay</h3>
            <div className="space-y-3">
              {[
                { id: 'PX-001', product: 'Sữa hạt điều 500ml', qty: 500, status: 'Đang làm' },
                { id: 'PX-002', product: 'Sữa hạt óc chó 250ml', qty: 300, status: 'Chờ NVL' },
                { id: 'PX-003', product: 'Sữa hạt macca 1L', qty: 200, status: 'Hoàn thành' },
              ].map((order, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer">
                  <div>
                    <div className="font-medium text-foreground">{order.id}</div>
                    <div className="text-xs text-muted-foreground">{order.product}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-foreground">{order.qty} sp</div>
                    <span className={
                      order.status === 'Hoàn thành' ? 'badge-success' : 
                      order.status === 'Đang làm' ? 'badge-warning' : 
                      'badge-primary'
                    }>{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">NVL đã cấp hôm nay</h3>
            <div className="space-y-3">
              {[
                { name: 'Hạt điều rang', qty: 50, unit: 'kg', time: '08:30' },
                { name: 'Đường cát', qty: 20, unit: 'kg', time: '09:15' },
                { name: 'Bao bì 500ml', qty: 500, unit: 'cái', time: '10:00' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                  <div>
                    <div className="font-medium text-foreground">{item.name}</div>
                    <div className="text-xs text-muted-foreground">Cấp lúc {item.time}</div>
                  </div>
                  <div className="font-medium text-foreground">{item.qty} {item.unit}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
