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
  TableRow 
} from '@/components/ui/table';
import { 
  Search, 
  Filter, 
  FileText,
  Factory,
  Settings,
  DollarSign,
  ArrowUpDown,
  MoreHorizontal,
  Eye,
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

const issues = [
  { 
    id: 'PX-2024-156',
    department: 'Sản xuất',
    type: 'production',
    materials: 5,
    qty: 150,
    stockBefore: 500,
    stockAfter: 350,
    date: '10/12/2024',
    status: 'completed',
  },
  { 
    id: 'PX-2024-155',
    department: 'Sản xuất',
    type: 'production',
    materials: 3,
    qty: 80,
    stockBefore: 580,
    stockAfter: 500,
    date: '10/12/2024',
    status: 'pending',
  },
  { 
    id: 'PX-2024-154',
    department: 'Điều chỉnh',
    type: 'adjustment',
    materials: 1,
    qty: 10,
    stockBefore: 590,
    stockAfter: 580,
    date: '09/12/2024',
    status: 'completed',
  },
  { 
    id: 'PX-2024-153',
    department: 'Bán hàng',
    type: 'sales',
    materials: 2,
    qty: 200,
    stockBefore: 790,
    stockAfter: 590,
    date: '09/12/2024',
    status: 'completed',
  },
];

const issueItems = [
  { sku: 'NVL001', name: 'Bột mì loại 1', qty: 50, batch: 'L-2024-156', before: 200, after: 150 },
  { sku: 'NVL002', name: 'Đường tinh luyện', qty: 30, batch: 'L-2024-155', before: 150, after: 120 },
  { sku: 'NVL005', name: 'Hương vani', qty: 5, batch: 'L-2024-089', before: 25, after: 20 },
];

export default function Issues() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIssue, setSelectedIssue] = useState<typeof issues[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleViewDetail = (issue: typeof issues[0]) => {
    setSelectedIssue(issue);
    setIsDetailOpen(true);
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'production':
        return <span className="badge-primary">Sản xuất</span>;
      case 'adjustment':
        return <span className="badge-warning">Điều chỉnh</span>;
      case 'sales':
        return <span className="badge-success">Bán hàng</span>;
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
            <h1 className="text-2xl font-bold text-foreground">Phiếu xuất kho</h1>
            <p className="text-muted-foreground">Quản lý phiếu xuất hàng</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Tổng phiếu"
            value="654"
            change="Tháng này: 98"
            changeType="neutral"
            icon={FileText}
          />
          <StatCard
            title="Xuất sản xuất"
            value="78"
            change="Tháng này"
            changeType="neutral"
            icon={Factory}
            iconColor="bg-primary/10 text-primary"
          />
          <StatCard
            title="Xuất điều chỉnh"
            value="12"
            change="Tháng này"
            changeType="neutral"
            icon={Settings}
            iconColor="bg-warning/10 text-warning"
          />
          <StatCard
            title="Giá trị xuất"
            value="450tr"
            change="Tháng này"
            changeType="neutral"
            icon={DollarSign}
            iconColor="bg-accent/10 text-accent"
          />
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Tìm theo mã phiếu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Bộ phận
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Loại xuất
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
                <TableHead className="table-header">Bộ phận</TableHead>
                <TableHead className="table-header">NVL</TableHead>
                <TableHead className="table-header">Số lượng</TableHead>
                <TableHead className="table-header">Tồn trước</TableHead>
                <TableHead className="table-header">Tồn sau</TableHead>
                <TableHead className="table-header">Ngày</TableHead>
                <TableHead className="table-header">Trạng thái</TableHead>
                <TableHead className="table-header w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {issues.map((issue) => (
                <TableRow key={issue.id} className="cursor-pointer" onClick={() => handleViewDetail(issue)}>
                  <TableCell>
                    <span className="font-mono text-sm font-medium text-primary">{issue.id}</span>
                  </TableCell>
                  <TableCell>{getTypeBadge(issue.type)}</TableCell>
                  <TableCell className="text-muted-foreground">{issue.materials} mặt hàng</TableCell>
                  <TableCell className="font-medium text-foreground">{issue.qty}</TableCell>
                  <TableCell className="text-muted-foreground">{issue.stockBefore}</TableCell>
                  <TableCell className="text-muted-foreground">{issue.stockAfter}</TableCell>
                  <TableCell className="text-muted-foreground">{issue.date}</TableCell>
                  <TableCell>
                    {issue.status === 'completed' ? (
                      <span className="badge-success">Hoàn thành</span>
                    ) : (
                      <span className="badge-warning">Chờ xuất</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetail(issue)}>
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
          <SheetContent className="w-[700px] sm:w-[800px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Chi tiết phiếu xuất</SheetTitle>
            </SheetHeader>
            {selectedIssue && (
              <div className="mt-6 space-y-6">
                {/* Info */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Thông tin phiếu</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-secondary rounded-lg">
                      <div className="text-xs text-muted-foreground">Mã phiếu</div>
                      <div className="font-mono font-medium text-foreground">{selectedIssue.id}</div>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg">
                      <div className="text-xs text-muted-foreground">Loại xuất</div>
                      {getTypeBadge(selectedIssue.type)}
                    </div>
                    <div className="p-4 bg-secondary rounded-lg">
                      <div className="text-xs text-muted-foreground">Ngày</div>
                      <div className="font-medium text-foreground">{selectedIssue.date}</div>
                    </div>
                  </div>
                </div>

                {/* Materials */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Danh sách NVL</h3>
                  <div className="border border-border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="table-header">SKU</TableHead>
                          <TableHead className="table-header">Tên NVL</TableHead>
                          <TableHead className="table-header">Lô</TableHead>
                          <TableHead className="table-header">SL xuất</TableHead>
                          <TableHead className="table-header">Trước</TableHead>
                          <TableHead className="table-header">Sau</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {issueItems.map((item) => (
                          <TableRow key={item.sku}>
                            <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                            <TableCell className="text-foreground">{item.name}</TableCell>
                            <TableCell className="text-primary">{item.batch}</TableCell>
                            <TableCell className="font-medium text-destructive">-{item.qty}</TableCell>
                            <TableCell className="text-muted-foreground">{item.before}</TableCell>
                            <TableCell className="text-muted-foreground">{item.after}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
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
