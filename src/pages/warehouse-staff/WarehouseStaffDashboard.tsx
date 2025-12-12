import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { FileCheck, FileText, Package, AlertTriangle, Clock } from 'lucide-react';

export default function WarehouseStaffDashboard() {
  return (
    <DashboardLayout allowedRoles={['warehouse_staff']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Nhân viên Kho</h1>
          <p className="text-muted-foreground">Công việc kho hàng hôm nay</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            title="Phiếu nhập chờ"
            value="5"
            change="Cần ghi nhận"
            changeType="neutral"
            icon={FileCheck}
          />
          <StatCard
            title="Phiếu xuất chờ"
            value="8"
            change="Cần chuẩn bị"
            changeType="neutral"
            icon={FileText}
            iconColor="bg-accent/10 text-accent"
          />
          <StatCard
            title="Hoàn thành hôm nay"
            value="12"
            change="Phiếu nhập/xuất"
            changeType="positive"
            icon={Package}
            iconColor="bg-success/10 text-success"
          />
          <StatCard
            title="Kiểm kê"
            value="2"
            change="Đang thực hiện"
            changeType="neutral"
            icon={Clock}
            iconColor="bg-warning/10 text-warning"
          />
          <StatCard
            title="Hủy hàng chờ"
            value="1"
            change="Cần xử lý"
            changeType="negative"
            icon={AlertTriangle}
            iconColor="bg-destructive/10 text-destructive"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Phiếu nhập chờ ghi nhận</h3>
            <div className="space-y-3">
              {[
                { id: 'PN-2024-045', supplier: 'Công ty ABC', items: 5, time: '08:30' },
                { id: 'PN-2024-046', supplier: 'NCC XYZ', items: 3, time: '09:15' },
                { id: 'PN-2024-047', supplier: 'Đại lý DEF', items: 8, time: '10:00' },
              ].map((receipt, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer">
                  <div>
                    <div className="font-medium text-foreground">{receipt.id}</div>
                    <div className="text-sm text-muted-foreground">{receipt.supplier}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-foreground">{receipt.items} mặt hàng</div>
                    <div className="text-xs text-muted-foreground">Dự kiến: {receipt.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="stat-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Phiếu xuất cần chuẩn bị</h3>
            <div className="space-y-3">
              {[
                { id: 'PX-2024-089', dept: 'Sản xuất', items: 12, priority: 'Cao' },
                { id: 'PX-2024-090', dept: 'Sản xuất', items: 5, priority: 'Trung bình' },
                { id: 'PX-2024-091', dept: 'Bán hàng', items: 20, priority: 'Thấp' },
              ].map((issue, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer">
                  <div>
                    <div className="font-medium text-foreground">{issue.id}</div>
                    <div className="text-sm text-muted-foreground">{issue.dept}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-foreground">{issue.items} mặt hàng</div>
                    <span className={
                      issue.priority === 'Cao' ? 'px-2 py-0.5 rounded text-xs font-medium bg-destructive/10 text-destructive' :
                      issue.priority === 'Trung bình' ? 'badge-warning' :
                      'badge-primary'
                    }>{issue.priority}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Công việc gần đây</h3>
          <div className="space-y-3">
            {[
              { action: 'Ghi nhận nhập kho PN-2024-044', time: '30 phút trước', status: 'success' },
              { action: 'Xuất kho PX-2024-088', time: '1 giờ trước', status: 'success' },
              { action: 'Kiểm kê kho A1 hoàn thành', time: '2 giờ trước', status: 'success' },
              { action: 'Hủy lô hàng hết hạn L-089', time: '3 giờ trước', status: 'warning' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-success' : 'bg-warning'
                  }`} />
                  <span className="text-sm text-foreground">{activity.action}</span>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
