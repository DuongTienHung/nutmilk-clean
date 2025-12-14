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
  FileText,
  Clock,
  CheckCircle,
  XCircle,
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

const requests = [
  { 
    id: 'PR-2024-045',
    department: 'Sản xuất',
    material: 'Bột mì loại 1',
    sku: 'NVL001',
    qty: 500,
    reason: 'Tồn kho thấp, cần bổ sung cho sản xuất tuần tới',
    date: '10/12/2024',
    status: 'pending',
  },
  { 
    id: 'PR-2024-044',
    department: 'Sản xuất',
    material: 'Đường tinh luyện',
    sku: 'NVL002',
    qty: 300,
    reason: 'Đơn hàng mới cần NVL',
    date: '09/12/2024',
    status: 'approved',
  },
  { 
    id: 'PR-2024-043',
    department: 'Kho',
    material: 'Bao bì PE 500g',
    sku: 'NVL003',
    qty: 5000,
    reason: 'Bổ sung tồn kho',
    date: '08/12/2024',
    status: 'converted',
  },
  { 
    id: 'PR-2024-042',
    department: 'Sản xuất',
    material: 'Hương vani',
    sku: 'NVL005',
    qty: 20,
    reason: 'Sản xuất dòng mới',
    date: '07/12/2024',
    status: 'rejected',
  },
];

export default function Requests() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<typeof requests[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const handleViewDetail = (request: typeof requests[0]) => {
    setSelectedRequest(request);
    setIsDetailOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="badge-warning">Chờ duyệt</span>;
      case 'approved':
        return <span className="badge-primary">Đã duyệt</span>;
      case 'converted':
        return <span className="badge-success">Đã tạo PO</span>;
      case 'rejected':
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive">Từ chối</span>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout allowedRoles={['purchasing']}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Yêu cầu mua (PR)</h1>
            <p className="text-muted-foreground">Quản lý yêu cầu mua từ các bộ phận</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Tổng PR"
            value="45"
            change="Tháng này"
            changeType="neutral"
            icon={FileText}
          />
          <StatCard
            title="Chờ duyệt"
            value="8"
            change="Cần xử lý"
            changeType="negative"
            icon={Clock}
            iconColor="bg-warning/10 text-warning"
          />
          <StatCard
            title="Đã tạo PO"
            value="32"
            change="Tháng này"
            changeType="positive"
            icon={CheckCircle}
            iconColor="bg-success/10 text-success"
          />
          <StatCard
            title="Từ chối"
            value="5"
            change="Tháng này"
            changeType="neutral"
            icon={XCircle}
            iconColor="bg-destructive/10 text-destructive"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Tìm theo mã PR, NVL..."
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
                <TableHead className="table-header">
                  <div className="flex items-center gap-2 cursor-pointer">
                    Mã PR <ArrowUpDown className="w-4 h-4" />
                  </div>
                </TableHead>
                <TableHead className="table-header">Bộ phận</TableHead>
                <TableHead className="table-header">NVL</TableHead>
                <TableHead className="table-header">Số lượng</TableHead>
                <TableHead className="table-header">Lý do</TableHead>
                <TableHead className="table-header">Ngày</TableHead>
                <TableHead className="table-header">Trạng thái</TableHead>
                <TableHead className="table-header w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id} className="cursor-pointer" onClick={() => handleViewDetail(request)}>
                  <TableCell>
                    <span className="font-mono text-sm font-medium text-primary">{request.id}</span>
                  </TableCell>
                  <TableCell>
                    <span className="badge-primary">{request.department}</span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">{request.material}</div>
                      <div className="text-xs text-muted-foreground">{request.sku}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{request.qty}</TableCell>
                  <TableCell className="text-muted-foreground text-sm max-w-[200px] truncate">{request.reason}</TableCell>
                  <TableCell className="text-muted-foreground">{request.date}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetail(request)}>
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

        <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <SheetContent className="w-[500px] sm:w-[600px]">
            <SheetHeader>
              <SheetTitle>Chi tiết yêu cầu mua</SheetTitle>
            </SheetHeader>
            {selectedRequest && (
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-xs text-muted-foreground">Mã PR</div>
                    <div className="font-mono font-medium text-foreground">{selectedRequest.id}</div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-xs text-muted-foreground">Trạng thái</div>
                    {getStatusBadge(selectedRequest.status)}
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-xs text-muted-foreground">Bộ phận</div>
                    <div className="font-medium text-foreground">{selectedRequest.department}</div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-xs text-muted-foreground">Ngày tạo</div>
                    <div className="font-medium text-foreground">{selectedRequest.date}</div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg col-span-2">
                    <div className="text-xs text-muted-foreground">NVL</div>
                    <div className="font-medium text-foreground">{selectedRequest.material}</div>
                    <div className="text-xs text-muted-foreground">{selectedRequest.sku}</div>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <div className="text-xs text-muted-foreground">Số lượng yêu cầu</div>
                    <div className="text-2xl font-bold text-primary">{selectedRequest.qty}</div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg col-span-2">
                    <div className="text-xs text-muted-foreground">Lý do</div>
                    <div className="text-sm text-foreground">{selectedRequest.reason}</div>
                  </div>
                </div>

                {selectedRequest.status === 'pending' && (
                  <div className="flex gap-3 pt-4 border-t border-border">
                    <Button className="flex-1 btn-primary">Duyệt & Tạo PO</Button>
                    <Button variant="outline" className="flex-1">Từ chối</Button>
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
