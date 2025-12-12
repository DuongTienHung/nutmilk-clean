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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Search, FileCheck, Clock, CheckCircle, Package, Check } from 'lucide-react';
import { toast } from 'sonner';

const pendingReceipts = [
  {
    id: 'PN-2024-045',
    supplier: 'Công ty TNHH Thực phẩm ABC',
    date: '12/12/2024',
    expectedTime: '09:00',
    items: [
      { sku: 'NVL001', name: 'Bột mì loại 1', unit: 'kg', ordered: 100, received: 0, batch: '', expiry: '' },
      { sku: 'NVL002', name: 'Đường tinh luyện', unit: 'kg', ordered: 50, received: 0, batch: '', expiry: '' },
    ],
    status: 'pending',
  },
  {
    id: 'PN-2024-046',
    supplier: 'NCC Bao bì XYZ',
    date: '12/12/2024',
    expectedTime: '10:30',
    items: [
      { sku: 'NVL003', name: 'Bao bì PE 500g', unit: 'cái', ordered: 1000, received: 0, batch: '', expiry: '' },
    ],
    status: 'pending',
  },
  {
    id: 'PN-2024-047',
    supplier: 'Đại lý Nguyên liệu DEF',
    date: '12/12/2024',
    expectedTime: '14:00',
    items: [
      { sku: 'NVL004', name: 'Hương vani', unit: 'lít', ordered: 10, received: 0, batch: '', expiry: '' },
      { sku: 'NVL005', name: 'Hạt điều rang', unit: 'kg', ordered: 50, received: 0, batch: '', expiry: '' },
    ],
    status: 'pending',
  },
];

export default function ReceiveGoods() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState<typeof pendingReceipts[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [receiveData, setReceiveData] = useState<{[key: string]: { received: number; batch: string; expiry: string }}>({});

  const handleOpenDetail = (receipt: typeof pendingReceipts[0]) => {
    setSelectedReceipt(receipt);
    // Initialize receive data
    const data: typeof receiveData = {};
    receipt.items.forEach(item => {
      data[item.sku] = { received: item.ordered, batch: `L${Date.now().toString().slice(-6)}`, expiry: '' };
    });
    setReceiveData(data);
    setIsDetailOpen(true);
  };

  const handleReceiveChange = (sku: string, field: 'received' | 'batch' | 'expiry', value: string | number) => {
    setReceiveData(prev => ({
      ...prev,
      [sku]: { ...prev[sku], [field]: value }
    }));
  };

  const handleConfirmReceive = () => {
    toast.success('Đã ghi nhận hàng nhập thành công');
    setIsDetailOpen(false);
  };

  return (
    <DashboardLayout allowedRoles={['warehouse_staff']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Ghi nhận hàng nhập</h1>
          <p className="text-muted-foreground">Xác nhận và ghi nhận hàng từ NCC</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Chờ ghi nhận"
            value="5"
            icon={Clock}
            iconColor="bg-warning/10 text-warning"
          />
          <StatCard
            title="Đã nhận hôm nay"
            value="12"
            change="+3 so với hôm qua"
            changeType="positive"
            icon={CheckCircle}
            iconColor="bg-success/10 text-success"
          />
          <StatCard
            title="Tổng NVL nhập"
            value="156"
            icon={Package}
            iconColor="bg-primary/10 text-primary"
          />
          <StatCard
            title="Phiếu hoàn thành"
            value="8"
            icon={FileCheck}
            iconColor="bg-accent/10 text-accent"
          />
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Tìm theo mã phiếu, NCC..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
        </div>

        <div className="stat-card p-0 overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Phiếu chờ ghi nhận</h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="table-header">Mã phiếu</TableHead>
                <TableHead className="table-header">Nhà cung cấp</TableHead>
                <TableHead className="table-header">Số mặt hàng</TableHead>
                <TableHead className="table-header">Ngày</TableHead>
                <TableHead className="table-header">Giờ dự kiến</TableHead>
                <TableHead className="table-header">Trạng thái</TableHead>
                <TableHead className="table-header w-32"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingReceipts.map((receipt) => (
                <TableRow key={receipt.id}>
                  <TableCell className="font-mono font-medium text-primary">{receipt.id}</TableCell>
                  <TableCell className="font-medium text-foreground">{receipt.supplier}</TableCell>
                  <TableCell className="text-foreground">{receipt.items.length}</TableCell>
                  <TableCell className="text-muted-foreground">{receipt.date}</TableCell>
                  <TableCell className="text-muted-foreground">{receipt.expectedTime}</TableCell>
                  <TableCell>
                    <span className="badge-warning">Chờ ghi nhận</span>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" onClick={() => handleOpenDetail(receipt)} className="gap-2">
                      <Check className="w-4 h-4" />
                      Ghi nhận
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <SheetContent className="w-[600px] sm:w-[700px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Ghi nhận hàng nhập - {selectedReceipt?.id}</SheetTitle>
            </SheetHeader>
            {selectedReceipt && (
              <div className="mt-6 space-y-6">
                <div className="p-4 bg-secondary rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Nhà cung cấp</div>
                      <div className="font-medium text-foreground">{selectedReceipt.supplier}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Ngày / Giờ</div>
                      <div className="font-medium text-foreground">{selectedReceipt.date} - {selectedReceipt.expectedTime}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Chi tiết NVL</h3>
                  {selectedReceipt.items.map((item) => (
                    <div key={item.sku} className="p-4 border border-border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-mono text-sm text-primary">{item.sku}</span>
                          <span className="mx-2 text-muted-foreground">-</span>
                          <span className="font-medium text-foreground">{item.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">Đặt: {item.ordered} {item.unit}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="text-xs text-muted-foreground">SL nhận thực tế</label>
                          <Input
                            type="number"
                            value={receiveData[item.sku]?.received || 0}
                            onChange={(e) => handleReceiveChange(item.sku, 'received', parseFloat(e.target.value))}
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">Mã lô</label>
                          <Input
                            value={receiveData[item.sku]?.batch || ''}
                            onChange={(e) => handleReceiveChange(item.sku, 'batch', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">Hạn sử dụng</label>
                          <Input
                            type="date"
                            value={receiveData[item.sku]?.expiry || ''}
                            onChange={(e) => handleReceiveChange(item.sku, 'expiry', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button variant="outline" onClick={() => setIsDetailOpen(false)} className="flex-1">
                    Hủy
                  </Button>
                  <Button onClick={handleConfirmReceive} className="flex-1 btn-primary gap-2">
                    <Check className="w-4 h-4" />
                    Xác nhận ghi nhận
                  </Button>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </DashboardLayout>
  );
}
