import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { AddProductionBatchForm } from '@/components/forms/AddProductionBatchForm';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Search, 
  Box,
  CheckCircle,
  Clock,
  Eye,
  Plus,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

const batches = [
  { 
    id: 'LTP-2024-089',
    product: 'Sữa hạt điều 500ml',
    qty: 500,
    date: '10/12/2024',
    shift: 'Ca sáng',
    status: 'completed',
  },
  { 
    id: 'LTP-2024-088',
    product: 'Sữa hạt óc chó 250ml',
    qty: 300,
    date: '10/12/2024',
    shift: 'Ca sáng',
    status: 'in_progress',
  },
  { 
    id: 'LTP-2024-087',
    product: 'Sữa hạt macca 1L',
    qty: 200,
    date: '09/12/2024',
    shift: 'Ca chiều',
    status: 'completed',
  },
  { 
    id: 'LTP-2024-086',
    product: 'Sữa hạt điều 1L',
    qty: 150,
    date: '09/12/2024',
    shift: 'Ca sáng',
    status: 'completed',
  },
];

export default function ProductionBatches() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatch, setSelectedBatch] = useState<typeof batches[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const handleViewDetail = (batch: typeof batches[0]) => {
    setSelectedBatch(batch);
    setIsDetailOpen(true);
  };

  return (
    <DashboardLayout allowedRoles={['production']}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Lô thành phẩm</h1>
            <p className="text-muted-foreground">Quản lý lô sản phẩm đã sản xuất</p>
          </div>
          <Button className="btn-primary gap-2" onClick={() => setIsAddFormOpen(true)}>
            <Plus className="w-4 h-4" />
            Tạo lô mới
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Tổng lô"
            value="156"
            change="Tháng này"
            changeType="neutral"
            icon={Box}
          />
          <StatCard
            title="Hoàn thành"
            value="148"
            change="95%"
            changeType="positive"
            icon={CheckCircle}
            iconColor="bg-success/10 text-success"
          />
          <StatCard
            title="Đang làm"
            value="8"
            change="Hôm nay"
            changeType="neutral"
            icon={Clock}
            iconColor="bg-warning/10 text-warning"
          />
          <StatCard
            title="Hôm nay"
            value="12"
            change="Lô mới"
            changeType="positive"
            icon={Box}
            iconColor="bg-primary/10 text-primary"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Tìm theo mã lô, sản phẩm..."
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
                <TableHead className="table-header">Mã lô</TableHead>
                <TableHead className="table-header">Sản phẩm</TableHead>
                <TableHead className="table-header">Số lượng</TableHead>
                <TableHead className="table-header">Ngày SX</TableHead>
                <TableHead className="table-header">Ca</TableHead>
                <TableHead className="table-header">Trạng thái</TableHead>
                <TableHead className="table-header w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {batches.map((batch) => (
                <TableRow key={batch.id} className="cursor-pointer" onClick={() => handleViewDetail(batch)}>
                  <TableCell>
                    <span className="font-mono text-sm font-medium text-primary">{batch.id}</span>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{batch.product}</TableCell>
                  <TableCell className="font-medium text-foreground">{batch.qty} sp</TableCell>
                  <TableCell className="text-muted-foreground">{batch.date}</TableCell>
                  <TableCell>
                    <span className="badge-primary">{batch.shift}</span>
                  </TableCell>
                  <TableCell>
                    {batch.status === 'completed' ? (
                      <span className="badge-success">Hoàn thành</span>
                    ) : (
                      <span className="badge-warning">Đang làm</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleViewDetail(batch); }}>
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
              <SheetTitle>Chi tiết lô thành phẩm</SheetTitle>
            </SheetHeader>
            {selectedBatch && (
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-xs text-muted-foreground">Mã lô</div>
                    <div className="font-mono font-medium text-foreground">{selectedBatch.id}</div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-xs text-muted-foreground">Trạng thái</div>
                    {selectedBatch.status === 'completed' ? (
                      <span className="badge-success">Hoàn thành</span>
                    ) : (
                      <span className="badge-warning">Đang làm</span>
                    )}
                  </div>
                  <div className="p-4 bg-secondary rounded-lg col-span-2">
                    <div className="text-xs text-muted-foreground">Sản phẩm</div>
                    <div className="font-medium text-foreground">{selectedBatch.product}</div>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <div className="text-xs text-muted-foreground">Số lượng</div>
                    <div className="text-2xl font-bold text-primary">{selectedBatch.qty} sp</div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-xs text-muted-foreground">Ca sản xuất</div>
                    <div className="font-medium text-foreground">{selectedBatch.shift}</div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg col-span-2">
                    <div className="text-xs text-muted-foreground">Ngày sản xuất</div>
                    <div className="font-medium text-foreground">{selectedBatch.date}</div>
                  </div>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
        <AddProductionBatchForm open={isAddFormOpen} onOpenChange={setIsAddFormOpen} />
      </div>
    </DashboardLayout>
  );
}
