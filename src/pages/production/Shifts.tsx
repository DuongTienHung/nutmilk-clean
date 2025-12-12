import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { 
  Factory,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react';

const shiftData = [
  { name: 'Ca sáng', value: 450 },
  { name: 'Ca chiều', value: 380 },
  { name: 'Ca đêm', value: 220 },
];

const shifts = [
  { 
    name: 'Ca sáng',
    time: '06:00 - 14:00',
    target: 500,
    achieved: 450,
    defect: 5,
    percent: 90,
    note: 'Thiếu NVL 30 phút',
  },
  { 
    name: 'Ca chiều',
    time: '14:00 - 22:00',
    target: 400,
    achieved: 380,
    defect: 8,
    percent: 95,
    note: '',
  },
  { 
    name: 'Ca đêm',
    time: '22:00 - 06:00',
    target: 300,
    achieved: 220,
    defect: 3,
    percent: 73,
    note: 'Máy hỏng 1 tiếng',
  },
];

export default function Shifts() {
  return (
    <DashboardLayout allowedRoles={['production']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tiến độ ca sản xuất</h1>
          <p className="text-muted-foreground">Theo dõi sản lượng theo ca</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Sản lượng hôm nay"
            value="1,050"
            change="+12% so với hôm qua"
            changeType="positive"
            icon={Factory}
          />
          <StatCard
            title="Đạt mục tiêu"
            value="87%"
            change="Trung bình"
            changeType="neutral"
            icon={CheckCircle}
            iconColor="bg-success/10 text-success"
          />
          <StatCard
            title="Tỷ lệ lỗi"
            value="1.5%"
            change="Trong ngưỡng"
            changeType="positive"
            icon={AlertTriangle}
            iconColor="bg-warning/10 text-warning"
          />
          <StatCard
            title="Hiệu suất"
            value="92%"
            change="+3% so với tuần trước"
            changeType="positive"
            icon={TrendingUp}
            iconColor="bg-primary/10 text-primary"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="stat-card p-0 overflow-hidden">
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-semibold text-foreground">Chi tiết theo ca</h3>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="table-header">Ca</TableHead>
                    <TableHead className="table-header">Mục tiêu</TableHead>
                    <TableHead className="table-header">Đạt</TableHead>
                    <TableHead className="table-header">%</TableHead>
                    <TableHead className="table-header">Lỗi</TableHead>
                    <TableHead className="table-header">Ghi chú</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shifts.map((shift) => (
                    <TableRow key={shift.name}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">{shift.name}</div>
                          <div className="text-xs text-muted-foreground">{shift.time}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{shift.target}</TableCell>
                      <TableCell className="font-medium text-foreground">{shift.achieved}</TableCell>
                      <TableCell>
                        <div className="space-y-1 w-24">
                          <Progress value={shift.percent} className="h-2" />
                          <span className={`text-xs font-medium ${shift.percent >= 90 ? 'text-success' : shift.percent >= 80 ? 'text-warning' : 'text-destructive'}`}>
                            {shift.percent}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-destructive">{shift.defect}</TableCell>
                      <TableCell className="text-muted-foreground text-sm max-w-[150px] truncate">
                        {shift.note || '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <ChartCard
            title="Sản lượng theo ca"
            type="pie"
            data={shiftData}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
