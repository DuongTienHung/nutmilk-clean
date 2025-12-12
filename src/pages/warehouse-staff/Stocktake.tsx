import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Plus, ClipboardList, TrendingUp, TrendingDown, Save, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const inventoryItems = [
  { sku: 'NVL001', name: 'Bột mì loại 1', unit: 'kg', systemQty: 500, actualQty: 498, diff: -2, reason: 'Hao hụt tự nhiên' },
  { sku: 'NVL002', name: 'Đường tinh luyện', unit: 'kg', systemQty: 300, actualQty: 300, diff: 0, reason: '' },
  { sku: 'NVL003', name: 'Bao bì PE 500g', unit: 'cái', systemQty: 5000, actualQty: 4985, diff: -15, reason: 'Hư hỏng' },
  { sku: 'NVL004', name: 'Hương vani', unit: 'lít', systemQty: 25, actualQty: 25.5, diff: 0.5, reason: 'Chênh lệch cân' },
  { sku: 'NVL005', name: 'Hạt điều rang', unit: 'kg', systemQty: 150, actualQty: 148, diff: -2, reason: 'Hao hụt' },
  { sku: 'NVL006', name: 'Sữa bột', unit: 'kg', systemQty: 80, actualQty: 80, diff: 0, reason: '' },
  { sku: 'NVL007', name: 'Nhãn in màu', unit: 'cuộn', systemQty: 50, actualQty: 52, diff: 2, reason: 'Chưa nhập hệ thống' },
];

export default function Stocktake() {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState(inventoryItems);

  const handleActualQtyChange = (sku: string, value: number) => {
    setItems(prev => prev.map(item => {
      if (item.sku === sku) {
        const diff = value - item.systemQty;
        return { ...item, actualQty: value, diff };
      }
      return item;
    }));
  };

  const handleReasonChange = (sku: string, value: string) => {
    setItems(prev => prev.map(item => {
      if (item.sku === sku) {
        return { ...item, reason: value };
      }
      return item;
    }));
  };

  const totalItems = items.length;
  const diffUp = items.filter(i => i.diff > 0).reduce((sum, i) => sum + i.diff, 0);
  const diffDown = items.filter(i => i.diff < 0).reduce((sum, i) => sum + Math.abs(i.diff), 0);

  const handleSave = () => {
    toast.success('Đã lưu kết quả kiểm kê');
  };

  const handleComplete = () => {
    const itemsWithDiff = items.filter(i => i.diff !== 0 && !i.reason);
    if (itemsWithDiff.length > 0) {
      toast.error('Vui lòng nhập lý do cho các mặt hàng có chênh lệch');
      return;
    }
    toast.success('Đã hoàn thành kiểm kê và cập nhật tồn kho');
  };

  return (
    <DashboardLayout allowedRoles={['warehouse_staff']}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Kiểm kê kho</h1>
            <p className="text-muted-foreground">Đối chiếu và điều chỉnh tồn kho thực tế</p>
          </div>
          <Button className="btn-primary gap-2">
            <Plus className="w-4 h-4" />
            Tạo phiên kiểm kê
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Tổng NVL kiểm kê"
            value={totalItems.toString()}
            icon={ClipboardList}
          />
          <StatCard
            title="Chênh lệch tăng"
            value={`+${diffUp}`}
            icon={TrendingUp}
            iconColor="bg-success/10 text-success"
          />
          <StatCard
            title="Chênh lệch giảm"
            value={`-${diffDown}`}
            icon={TrendingDown}
            iconColor="bg-destructive/10 text-destructive"
          />
          <StatCard
            title="Khớp số liệu"
            value={items.filter(i => i.diff === 0).length.toString()}
            icon={CheckCircle}
            iconColor="bg-accent/10 text-accent"
          />
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Tìm theo SKU, tên NVL..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
        </div>

        <div className="stat-card p-0 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="table-header">SKU</TableHead>
                <TableHead className="table-header">Tên NVL</TableHead>
                <TableHead className="table-header">Đơn vị</TableHead>
                <TableHead className="table-header">Tồn hệ thống</TableHead>
                <TableHead className="table-header">Tồn thực tế</TableHead>
                <TableHead className="table-header">Chênh lệch</TableHead>
                <TableHead className="table-header">Lý do</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.sku}>
                  <TableCell className="font-mono text-sm text-primary">{item.sku}</TableCell>
                  <TableCell className="font-medium text-foreground">{item.name}</TableCell>
                  <TableCell className="text-muted-foreground">{item.unit}</TableCell>
                  <TableCell className="text-foreground">{item.systemQty}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={item.actualQty}
                      onChange={(e) => handleActualQtyChange(item.sku, parseFloat(e.target.value) || 0)}
                      className="w-24 h-8"
                    />
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${
                      item.diff > 0 ? 'text-success' : 
                      item.diff < 0 ? 'text-destructive' : 
                      'text-muted-foreground'
                    }`}>
                      {item.diff > 0 ? '+' : ''}{item.diff}
                    </span>
                  </TableCell>
                  <TableCell>
                    {item.diff !== 0 ? (
                      <Input
                        placeholder="Nhập lý do..."
                        value={item.reason}
                        onChange={(e) => handleReasonChange(item.sku, e.target.value)}
                        className="w-40 h-8"
                      />
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleSave} className="gap-2">
            <Save className="w-4 h-4" />
            Lưu tạm
          </Button>
          <Button onClick={handleComplete} className="btn-primary gap-2">
            <CheckCircle className="w-4 h-4" />
            Hoàn thành kiểm kê
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
