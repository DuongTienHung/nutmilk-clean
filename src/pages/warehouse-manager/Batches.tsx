import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AddBatchForm } from '@/components/forms/AddBatchForm';
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
  Filter, 
  Layers,
  AlertTriangle,
  XCircle,
  Plus,
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

const batches = [
  { 
    id: 'L-2024-156',
    material: 'Bột mì loại 1',
    sku: 'NVL001',
    qty: 200,
    expiry: '15/03/2025',
    mfg: '01/12/2024',
    status: 'active',
  },
  { 
    id: 'L-2024-155',
    material: 'Đường tinh luyện',
    sku: 'NVL002',
    qty: 150,
    expiry: '20/04/2025',
    mfg: '28/11/2024',
    status: 'active',
  },
  { 
    id: 'L-2024-089',
    material: 'Hương vani',
    sku: 'NVL005',
    qty: 5,
    expiry: '18/12/2024',
    mfg: '01/06/2024',
    status: 'expiring',
  },
  { 
    id: 'L-2024-045',
    material: 'Sữa bột',
    sku: 'NVL010',
    qty: 0,
    expiry: '10/12/2024',
    mfg: '01/03/2024',
    status: 'expired',
  },
  { 
    id: 'L-2024-154',
    material: 'Bao bì PE 500g',
    sku: 'NVL003',
    qty: 1000,
    expiry: null,
    mfg: '25/11/2024',
    status: 'active',
  },
];

const issueHistory = [
  { date: '10/12/2024', ref: 'PX-2024-156', qty: 50, dept: 'Sản xuất' },
  { date: '08/12/2024', ref: 'PX-2024-150', qty: 30, dept: 'Sản xuất' },
  { date: '05/12/2024', ref: 'PX-2024-145', qty: 20, dept: 'Bán hàng' },
];

export default function Batches() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatch, setSelectedBatch] = useState<typeof batches[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const handleViewDetail = (batch: typeof batches[0]) => {
    setSelectedBatch(batch);
    setIsDetailOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="badge-success">Đang dùng</span>;
      case 'expiring':
        return <span className="badge-warning">Sắp hết hạn</span>;
      case 'expired':
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive">Hết hạn</span>;
      default:
        return null;
    }
  };
  
  return (
    <DashboardLayout allowedRoles={['warehouse_manager']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Lô & Hạn sử dụng</h1>
            <p className="text-muted-foreground">Theo dõi lô hàng và hạn sử dụng</p>
          </div>
          <Button className="btn-primary gap-2" onClick={() => setIsAddFormOpen(true)}>
            <Plus className="w-4 h-4" />
            Tạo lô mới
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Tổng số lô"
            value="342"
            change="28 lô mới tuần này"
            changeType="positive"
            icon={Layers}
          />
          <StatCard
            title="Sắp hết hạn"
            value="23"
            change="Trong 7 ngày"
            changeType="negative"
            icon={AlertTriangle}
            iconColor="bg-warning/10 text-warning"
          />
          <StatCard
            title="Đã hết hạn"
            value="5"
            change="Cần xử lý"
            changeType="negative"
            icon={XCircle}
            iconColor="bg-destructive/10 text-destructive"
          />
          <StatCard
            title="Mới tạo"
            value="15"
            change="7 ngày qua"
            changeType="positive"
            icon={Plus}
            iconColor="bg-success/10 text-success"
          />
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Tìm theo mã lô, NVL..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            HSD
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Hết hạn
          </Button>
        </div>

        {/* Table */}
        <div className="stat-card p-0 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="table-header">
                  <div className="flex items-center gap-2 cursor-pointer">
                    Mã lô <ArrowUpDown className="w-4 h-4" />
                  </div>
                </TableHead>
                <TableHead className="table-header">NVL</TableHead>
                <TableHead className="table-header">SL còn</TableHead>
                <TableHead className="table-header">HSD</TableHead>
                <TableHead className="table-header">NSX</TableHead>
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
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">{batch.material}</div>
                      <div className="text-xs text-muted-foreground">{batch.sku}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{batch.qty}</TableCell>
                  <TableCell className={batch.status === 'expired' ? 'text-destructive' : batch.status === 'expiring' ? 'text-warning' : 'text-muted-foreground'}>
                    {batch.expiry || 'Không có'}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{batch.mfg}</TableCell>
                  <TableCell>{getStatusBadge(batch.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetail(batch)}>
                          <Eye className="w-4 h-4 mr-2" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Điều chỉnh
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Hủy lô
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Detail Sheet */}
        <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <SheetContent className="w-[600px] sm:w-[700px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Chi tiết lô hàng</SheetTitle>
            </SheetHeader>
            {selectedBatch && (
              <div className="mt-6 space-y-6">
                {/* Info */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Thông tin lô</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-secondary rounded-lg">
                      <div className="text-xs text-muted-foreground">Mã lô</div>
                      <div className="font-mono font-medium text-foreground">{selectedBatch.id}</div>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg">
                      <div className="text-xs text-muted-foreground">Trạng thái</div>
                      {getStatusBadge(selectedBatch.status)}
                    </div>
                    <div className="p-4 bg-secondary rounded-lg">
                      <div className="text-xs text-muted-foreground">Số lượng còn</div>
                      <div className="text-2xl font-bold text-foreground">{selectedBatch.qty}</div>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg">
                      <div className="text-xs text-muted-foreground">NVL</div>
                      <div className="font-medium text-foreground">{selectedBatch.material}</div>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg">
                      <div className="text-xs text-muted-foreground">Ngày sản xuất</div>
                      <div className="font-medium text-foreground">{selectedBatch.mfg}</div>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg">
                      <div className="text-xs text-muted-foreground">Hạn sử dụng</div>
                      <div className={`font-medium ${selectedBatch.status === 'expired' ? 'text-destructive' : selectedBatch.status === 'expiring' ? 'text-warning' : 'text-foreground'}`}>
                        {selectedBatch.expiry || 'Không có'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Issue History */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Lịch sử xuất</h3>
                  <div className="space-y-3">
                    {issueHistory.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                        <div>
                          <div className="font-medium text-foreground">{item.ref}</div>
                          <div className="text-xs text-muted-foreground">{item.date} - {item.dept}</div>
                        </div>
                        <div className="font-medium text-foreground">-{item.qty}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button variant="outline" className="flex-1">Điều chỉnh số lượng</Button>
                  <Button variant="destructive" className="flex-1">Hủy lô</Button>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
        <AddBatchForm
          open={isAddFormOpen} 
          onOpenChange={setIsAddFormOpen}
        />
        </div>
    </DashboardLayout>
  );
}
