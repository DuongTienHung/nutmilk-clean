import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { AddDisposalForm } from '@/components/forms/AddDisposalForm';
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
  Filter, 
  Trash2,
  Calendar,
  AlertTriangle,
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  Plus,
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

const disposals = [
  { 
    id: 'HH-2024-045',
    material: 'Hương vani',
    sku: 'NVL005',
    batch: 'L-2024-045',
    qty: 5,
    reason: 'Hết hạn sử dụng',
    date: '10/12/2024',
    user: 'Trần Văn A',
  },
  { 
    id: 'HH-2024-044',
    material: 'Sữa bột',
    sku: 'NVL010',
    batch: 'L-2024-030',
    qty: 10,
    reason: 'Hết hạn sử dụng',
    date: '09/12/2024',
    user: 'Nguyễn Thị B',
  },
  { 
    id: 'HH-2024-043',
    material: 'Bột mì loại 1',
    sku: 'NVL001',
    batch: 'L-2024-015',
    qty: 25,
    reason: 'Hư hỏng',
    date: '08/12/2024',
    user: 'Lê Văn C',
  },
  { 
    id: 'HH-2024-042',
    material: 'Bao bì PE 500g',
    sku: 'NVL003',
    batch: 'L-2024-100',
    qty: 100,
    reason: 'Lỗi in ấn',
    date: '07/12/2024',
    user: 'Phạm Văn D',
  },
];

const reasonStats = [
  { reason: 'Hết hạn', count: 45 },
  { reason: 'Hư hỏng', count: 23 },
  { reason: 'Lỗi sản xuất', count: 12 },
  { reason: 'Khác', count: 8 },
];

export default function Disposals() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDisposal, setSelectedDisposal] = useState<typeof disposals[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const handleViewDetail = (disposal: typeof disposals[0]) => {
    setSelectedDisposal(disposal);
    setIsDetailOpen(true);
  };

  const getReasonBadge = (reason: string) => {
    if (reason.includes('Hết hạn')) return <span className="badge-warning">{reason}</span>;
    if (reason.includes('Hư hỏng')) return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive">{reason}</span>;
    return <span className="badge-primary">{reason}</span>;
  };

  return (
    <DashboardLayout allowedRoles={['warehouse_manager']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Hủy hàng</h1>
            <p className="text-muted-foreground">Quản lý hủy hàng và lý do</p>
          </div>
          <Button className="btn-primary gap-2"onClick={() => setIsAddFormOpen(true)}>
            <Plus className="w-4 h-4" />
            Tạo phiếu hủy
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Tổng SL hủy"
            value="88"
            change="Tháng này"
            changeType="neutral"
            icon={Trash2}
            iconColor="bg-destructive/10 text-destructive"
          />
          <StatCard
            title="Hủy hôm nay"
            value="5"
            change="1 phiếu"
            changeType="neutral"
            icon={Calendar}
            iconColor="bg-warning/10 text-warning"
          />
          <StatCard
            title="Do hết hạn"
            value="45"
            change="51% tổng hủy"
            changeType="negative"
            icon={AlertTriangle}
            iconColor="bg-warning/10 text-warning"
          />
          <StatCard
            title="Do hư hỏng"
            value="23"
            change="26% tổng hủy"
            changeType="negative"
            icon={Trash2}
            iconColor="bg-primary/10 text-primary"
          />
        </div>

        {/* Reason breakdown */}
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Phân loại theo lý do</h3>
          <div className="grid grid-cols-4 gap-4">
            {reasonStats.map((stat) => (
              <div key={stat.reason} className="p-4 bg-secondary rounded-lg text-center">
                <div className="text-2xl font-bold text-foreground">{stat.count}</div>
                <div className="text-sm text-muted-foreground">{stat.reason}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Tìm theo NVL, lô..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Lý do
          </Button>
        </div>

        {/* Table */}
        <div className="stat-card p-0 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="table-header">
                  <div className="flex items-center gap-2 cursor-pointer">
                    Mã phiếu <ArrowUpDown className="w-4 h-4" />
                  </div>
                </TableHead>
                <TableHead className="table-header">NVL</TableHead>
                <TableHead className="table-header">Lô</TableHead>
                <TableHead className="table-header">Số lượng</TableHead>
                <TableHead className="table-header">Lý do</TableHead>
                <TableHead className="table-header">Ngày</TableHead>
                <TableHead className="table-header">Người hủy</TableHead>
                <TableHead className="table-header w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {disposals.map((disposal) => (
                <TableRow key={disposal.id} className="cursor-pointer" onClick={() => handleViewDetail(disposal)}>
                  <TableCell>
                    <span className="font-mono text-sm font-medium text-primary">{disposal.id}</span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">{disposal.material}</div>
                      <div className="text-xs text-muted-foreground">{disposal.sku}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">{disposal.batch}</TableCell>
                  <TableCell className="font-medium text-destructive">{disposal.qty}</TableCell>
                  <TableCell>{getReasonBadge(disposal.reason)}</TableCell>
                  <TableCell className="text-muted-foreground">{disposal.date}</TableCell>
                  <TableCell className="text-muted-foreground">{disposal.user}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetail(disposal)}>
                          <Eye className="w-4 h-4 mr-2" />
                          Xem chi tiết
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
          <SheetContent className="w-[500px] sm:w-[600px]">
            <SheetHeader>
              <SheetTitle>Chi tiết phiếu hủy</SheetTitle>
            </SheetHeader>
            {selectedDisposal && (
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-xs text-muted-foreground">Mã phiếu</div>
                    <div className="font-mono font-medium text-foreground">{selectedDisposal.id}</div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-xs text-muted-foreground">Ngày hủy</div>
                    <div className="font-medium text-foreground">{selectedDisposal.date}</div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg col-span-2">
                    <div className="text-xs text-muted-foreground">NVL</div>
                    <div className="font-medium text-foreground">{selectedDisposal.material}</div>
                    <div className="text-xs text-muted-foreground">{selectedDisposal.sku}</div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-xs text-muted-foreground">Lô</div>
                    <div className="font-mono font-medium text-foreground">{selectedDisposal.batch}</div>
                  </div>
                  <div className="p-4 bg-destructive/10 rounded-lg">
                    <div className="text-xs text-muted-foreground">Số lượng hủy</div>
                    <div className="text-2xl font-bold text-destructive">{selectedDisposal.qty}</div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg col-span-2">
                    <div className="text-xs text-muted-foreground">Lý do</div>
                    {getReasonBadge(selectedDisposal.reason)}
                  </div>
                  <div className="p-4 bg-secondary rounded-lg col-span-2">
                    <div className="text-xs text-muted-foreground">Người thực hiện</div>
                    <div className="font-medium text-foreground">{selectedDisposal.user}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Ảnh đính kèm</h3>
                  <div className="p-8 border-2 border-dashed border-border rounded-lg text-center">
                    <p className="text-muted-foreground">Không có ảnh đính kèm</p>
                  </div>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
        <AddDisposalForm
          open={isAddFormOpen}
          onOpenChange={setIsAddFormOpen}
        />
      </div>
    </DashboardLayout>
  );
}
