import { Clock } from 'lucide-react';

interface Activity {
  id: string;
  time: string;
  module: string;
  action: string;
  user: string;
}

const activities: Activity[] = [
  { id: '1', time: '10:30', module: 'Kho', action: 'Tạo phiếu nhập #PN001', user: 'Trần Văn A' },
  { id: '2', time: '10:15', module: 'Mua hàng', action: 'Duyệt đơn mua #DM045', user: 'Nguyễn Thị B' },
  { id: '3', time: '09:45', module: 'Sản xuất', action: 'Hoàn thành lô #LO123', user: 'Lê Văn C' },
  { id: '4', time: '09:30', module: 'NVL', action: 'Cập nhật giá SKU-001', user: 'Admin' },
  { id: '5', time: '09:00', module: 'Kho', action: 'Kiểm kê định kỳ', user: 'Phạm Văn D' },
];

export function RecentActivity() {
  return (
    <div className="stat-card p-0">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Hoạt động gần đây</h3>
      </div>
      <div className="divide-y divide-border">
        {activities.map((activity) => (
          <div key={activity.id} className="px-6 py-4 flex items-start gap-4 hover:bg-secondary/50 transition-colors">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {activity.action}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="badge-primary">{activity.module}</span>
                <span className="text-xs text-muted-foreground">{activity.user}</span>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
