import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  Calendar,
  FileText,
  BarChart3,
  PieChart,
  TrendingUp,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const stockEndData = [
  { name: 'NL Chính', value: 5200 },
  { name: 'Phụ gia', value: 1500 },
  { name: 'Bao bì', value: 8500 },
  { name: 'Khác', value: 1200 },
];

const inOutData = [
  { name: 'Tuần 1', nhap: 450, xuat: 380 },
  { name: 'Tuần 2', nhap: 520, xuat: 420 },
  { name: 'Tuần 3', nhap: 380, xuat: 450 },
  { name: 'Tuần 4', nhap: 600, xuat: 380 },
];

const valueData = [
  { name: 'Th7', value: 2.1 },
  { name: 'Th8', value: 2.3 },
  { name: 'Th9', value: 2.0 },
  { name: 'Th10', value: 2.4 },
  { name: 'Th11', value: 2.2 },
  { name: 'Th12', value: 2.5 },
];

const reportTypes = [
  { id: 'stock-end', name: 'Báo cáo tồn cuối kỳ', icon: FileText, description: 'Tổng hợp tồn kho theo nhóm NVL' },
  { id: 'in-out', name: 'Báo cáo nhập-xuất-tồn', icon: BarChart3, description: 'Chi tiết nhập xuất theo thời gian' },
  { id: 'value', name: 'Báo cáo giá trị kho', icon: TrendingUp, description: 'Giá trị tồn kho theo thời gian' },
  { id: 'batch', name: 'Báo cáo theo lô', icon: PieChart, description: 'Tồn kho chi tiết theo lô' },
  { id: 'alert', name: 'Báo cáo cảnh báo', icon: FileText, description: 'NVL dưới tồn tối thiểu' },
  { id: 'expiry', name: 'Báo cáo hết hạn', icon: Calendar, description: 'Lô sắp hết hạn và đã hết hạn' },
];

export default function Reports() {
  const [timeFilter, setTimeFilter] = useState('month');
  const [groupFilter, setGroupFilter] = useState('all');

  return (
    <DashboardLayout allowedRoles={['warehouse_manager']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Báo cáo kho</h1>
            <p className="text-muted-foreground">Báo cáo và thống kê kho hàng</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-40">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Tuần này</SelectItem>
                <SelectItem value="month">Tháng này</SelectItem>
                <SelectItem value="quarter">Quý này</SelectItem>
                <SelectItem value="year">Năm nay</SelectItem>
              </SelectContent>
            </Select>
            <Select value={groupFilter} onValueChange={setGroupFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Nhóm NVL" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="main">NL Chính</SelectItem>
                <SelectItem value="additive">Phụ gia</SelectItem>
                <SelectItem value="packaging">Bao bì</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Report Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTypes.map((report) => (
            <div key={report.id} className="stat-card group cursor-pointer hover:border-primary/50">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <report.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{report.name}</h3>
                    <p className="text-xs text-muted-foreground">{report.description}</p>
                  </div>
                </div>
                <Button size="icon" variant="ghost">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Tồn cuối kỳ theo nhóm"
            type="pie"
            data={stockEndData}
          />
          <ChartCard
            title="Nhập - Xuất theo tuần"
            type="bar"
            data={inOutData}
            dataKey="nhap"
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <ChartCard
            title="Giá trị tồn kho theo tháng (tỷ đồng)"
            type="line"
            data={valueData}
          />
        </div>

        {/* Export buttons */}
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Xuất báo cáo</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Xuất PDF
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Xuất Excel
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Xuất CSV
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
