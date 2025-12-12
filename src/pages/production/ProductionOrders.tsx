import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  ClipboardList,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

const productionOrders = [
  { 
    id: 'PSX-2024-089',
    product: 'Sữa hạt điều 500ml',
    qty: 500,
    shift: 'Ca sáng',
    deadline: '10/12/2024 12:00',
    status: 'in_progress',
    progress: 60,
  },
  { 
    id: 'PSX-2024-090',
    product: 'Sữa hạt óc chó 250ml',
    qty: 300,
    shift: 'Ca sáng',
    deadline: '10/12/2024 14:00',
    status: 'waiting_material',
    progress: 0,
  },
  { 
    id: 'PSX-2024-091',
    product: 'Sữa hạt macca 1L',
    qty: 200,
    shift: 'Ca chiều',
    deadline: '10/12/2024 18:00',
    status: 'pending',
    progress: 0,
  },
  { 
    id: 'PSX-2024-088',
    product: 'Sữa hạt điều 1L',
    qty: 150,
    shift: 'Ca sáng',
    deadline: '10/12/2024 10:00',
    status: 'completed',
    progress: 100,
  },
];

const materialsList = [
  { name: 'Hạt điều rang', qty: 50, unit: 'kg', status: 'received' },
  { name: 'Đường cát', qty: 20, unit: 'kg', status: 'received' },
  { name: 'Bao bì 500ml', qty: 500, unit: 'cái', status: 'pending' },
];

export default function ProductionOrders() {
  const [selectedOrder, setSelectedOrder] = useState<typeof productionOrders[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleViewDetail = (order: typeof productionOrders[0]) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="badge-primary">Chờ thực hiện</span>;
      case 'in_progress':
        return <span className="badge-warning">Đang làm</span>;
      case 'waiting_material':
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive">Chờ NVL</span>;
      case 'completed':
        return <span className="badge-success">Hoàn thành</span>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout allowedRoles={['production']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Phiếu sản xuất được giao</h1>
          <p className="text-muted-foreground">Danh sách phiếu sản xuất cần thực hiện</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Phiếu hôm nay"
            value="12"
            change="Được giao"
            changeType="neutral"
            icon={ClipboardList}
          />
          <StatCard
            title="Đang thực hiện"
            value="5"
            change="Đúng tiến độ"
            changeType="positive"
            icon={Clock}
            iconColor="bg-warning/10 text-warning"
          />
          <StatCard
            title="Hoàn thành"
            value="4"
            change="Hôm nay"
            changeType="positive"
            icon={CheckCircle}
            iconColor="bg-success/10 text-success"
          />
          <StatCard
            title="Chờ NVL"
            value="3"
            change="Đang chờ cấp"
            changeType="negative"
            icon={AlertTriangle}
            iconColor="bg-destructive/10 text-destructive"
          />
        </div>

        <div className="stat-card p-0 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="table-header">Mã phiếu</TableHead>
                <TableHead className="table-header">Sản phẩm</TableHead>
                <TableHead className="table-header">Ca</TableHead>
                <TableHead className="table-header">SL cần làm</TableHead>
                <TableHead className="table-header">Hạn</TableHead>
                <TableHead className="table-header">Trạng thái</TableHead>
                <TableHead className="table-header w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productionOrders.map((order) => (
                <TableRow key={order.id} className="cursor-pointer" onClick={() => handleViewDetail(order)}>
                  <TableCell>
                    <span className="font-mono text-sm font-medium text-primary">{order.id}</span>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{order.product}</TableCell>
                  <TableCell>
                    <span className="badge-primary">{order.shift}</span>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{order.qty} sp</TableCell>
                  <TableCell className="text-muted-foreground">{order.deadline}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleViewDetail(order); }}>
                      <Eye className="w-4 h-4" />
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
              <SheetTitle>Chi tiết phiếu sản xuất</SheetTitle>
            </SheetHeader>
            {selectedOrder && (
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-xs text-muted-foreground">Mã phiếu</div>
                    <div className="font-mono font-medium text-foreground">{selectedOrder.id}</div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-xs text-muted-foreground">Trạng thái</div>
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                  <div className="p-4 bg-secondary rounded-lg col-span-2">
                    <div className="text-xs text-muted-foreground">Sản phẩm</div>
                    <div className="font-medium text-foreground">{selectedOrder.product}</div>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <div className="text-xs text-muted-foreground">Số lượng</div>
                    <div className="text-2xl font-bold text-primary">{selectedOrder.qty} sp</div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-xs text-muted-foreground">Tiến độ</div>
                    <div className="text-2xl font-bold text-foreground">{selectedOrder.progress}%</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">NVL cần cấp</h3>
                  <div className="space-y-3">
                    {materialsList.map((m, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                        <div>
                          <div className="font-medium text-foreground">{m.name}</div>
                          <div className="text-xs text-muted-foreground">{m.qty} {m.unit}</div>
                        </div>
                        {m.status === 'received' ? (
                          <span className="badge-success">Đã nhận</span>
                        ) : (
                          <span className="badge-warning">Chờ cấp</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {selectedOrder.status !== 'completed' && (
                  <div className="flex gap-3 pt-4 border-t border-border">
                    <Button className="flex-1 btn-primary">Bắt đầu thực hiện</Button>
                    <Button variant="outline" className="flex-1">Yêu cầu NVL</Button>
                  </div>
                )}
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </DashboardLayout>
  );
}
