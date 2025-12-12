import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Search, Eye } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

const deliveries = [
  { 
    id: 'PO-2024-087',
    supplier: 'Đại lý Nguyên liệu DEF',
    material: 'Bột mì loại 1',
    ordered: 500,
    received: 300,
    percent: 60,
    dueDate: '12/12/2024',
    status: 'ontime',
  },
  { 
    id: 'PO-2024-086',
    supplier: 'Công ty CP Phụ gia GHI',
    material: 'Hương vani',
    ordered: 50,
    received: 0,
    percent: 0,
    dueDate: '08/12/2024',
    status: 'late',
  },
  { 
    id: 'PO-2024-085',
    supplier: 'Công ty TNHH ABC',
    material: 'Đường tinh luyện',
    ordered: 300,
    received: 150,
    percent: 50,
    dueDate: '15/12/2024',
    status: 'ontime',
  },
  { 
    id: 'PO-2024-084',
    supplier: 'NCC Bao bì XYZ',
    material: 'Bao bì PE 500g',
    ordered: 5000,
    received: 5000,
    percent: 100,
    dueDate: '10/12/2024',
    status: 'completed',
  },
];

export default function Delivery() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState<typeof deliveries[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleViewDetail = (delivery: typeof deliveries[0]) => {
    setSelectedDelivery(delivery);
    setIsDetailOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ontime':
        return <span className="badge-primary">Đúng hạn</span>;
      case 'late':
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive">Trễ hạn</span>;
      case 'completed':
        return <span className="badge-success">Hoàn thành</span>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout allowedRoles={['purchasing']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tiến độ giao hàng</h1>
          <p className="text-muted-foreground">Theo dõi tiến độ giao hàng của các đơn mua</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Tìm theo mã PO..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
        </div>

        <div className="stat-card p-0 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="table-header">Mã PO</TableHead>
                <TableHead className="table-header">NCC</TableHead>
                <TableHead className="table-header">NVL</TableHead>
                <TableHead className="table-header">SL đặt</TableHead>
                <TableHead className="table-header">SL giao</TableHead>
                <TableHead className="table-header">Tiến độ</TableHead>
                <TableHead className="table-header">Ngày giao</TableHead>
                <TableHead className="table-header">Tình trạng</TableHead>
                <TableHead className="table-header w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deliveries.map((delivery) => (
                <TableRow key={delivery.id} className="cursor-pointer" onClick={() => handleViewDetail(delivery)}>
                  <TableCell>
                    <span className="font-mono text-sm font-medium text-primary">{delivery.id}</span>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{delivery.supplier}</TableCell>
                  <TableCell className="text-muted-foreground">{delivery.material}</TableCell>
                  <TableCell className="text-foreground">{delivery.ordered}</TableCell>
                  <TableCell className="text-foreground">{delivery.received}</TableCell>
                  <TableCell className="w-32">
                    <div className="space-y-1">
                      <Progress value={delivery.percent} className="h-2" />
                      <span className="text-xs text-muted-foreground">{delivery.percent}%</span>
                    </div>
                  </TableCell>
                  <TableCell className={delivery.status === 'late' ? 'text-destructive' : 'text-muted-foreground'}>
                    {delivery.dueDate}
                  </TableCell>
                  <TableCell>{getStatusBadge(delivery.status)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleViewDetail(delivery); }}>
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <SheetContent className="w-[500px] sm:w-[600px]">
            <SheetHeader>
              <SheetTitle>Chi tiết tiến độ giao hàng</SheetTitle>
            </SheetHeader>
            {selectedDelivery && (
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-xs text-muted-foreground">Mã PO</div>
                    <div className="font-mono font-medium text-foreground">{selectedDelivery.id}</div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-xs text-muted-foreground">Tình trạng</div>
                    {getStatusBadge(selectedDelivery.status)}
                  </div>
                  <div className="p-4 bg-secondary rounded-lg col-span-2">
                    <div className="text-xs text-muted-foreground">NCC</div>
                    <div className="font-medium text-foreground">{selectedDelivery.supplier}</div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg col-span-2">
                    <div className="text-xs text-muted-foreground">Tiến độ</div>
                    <div className="mt-2">
                      <Progress value={selectedDelivery.percent} className="h-3" />
                      <div className="flex justify-between mt-2 text-sm">
                        <span className="text-muted-foreground">Đã giao: {selectedDelivery.received}</span>
                        <span className="text-foreground font-medium">{selectedDelivery.percent}%</span>
                        <span className="text-muted-foreground">Đặt: {selectedDelivery.ordered}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-xs text-muted-foreground">Ngày giao dự kiến</div>
                    <div className={`font-medium ${selectedDelivery.status === 'late' ? 'text-destructive' : 'text-foreground'}`}>
                      {selectedDelivery.dueDate}
                    </div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-xs text-muted-foreground">Còn lại</div>
                    <div className="text-xl font-bold text-foreground">{selectedDelivery.ordered - selectedDelivery.received}</div>
                  </div>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </DashboardLayout>
  );
}
