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
  FileCheck,
  Clock,
  CheckCircle,
  DollarSign,
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  Edit,
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

const receipts = [
  { 
    id: 'PN-2024-089',
    supplier: 'Công ty TNHH ABC',
    materials: 3,
    qty: 500,
    price: '125.000.000đ',
    date: '10/12/2024',
    status: 'completed',
  },
  { 
    id: 'PN-2024-088',
    supplier: 'NCC Bao bì XYZ',
    materials: 2,
    qty: 2000,
    price: '45.000.000đ',
    date: '09/12/2024',
    status: 'completed',
  },
  { 
    id: 'PN-2024-087',
    supplier: 'Đại lý Nguyên liệu DEF',
    materials: 5,
    qty: 300,
    price: '89.500.000đ',
    date: '09/12/2024',
    status: 'pending',
  },
  { 
    id: 'PN-2024-086',
    supplier: 'Công ty CP Phụ gia GHI',
    materials: 1,
    qty: 50,
    price: '15.000.000đ',
    date: '08/12/2024',
    status: 'pending',
  },
];

const receiptItems = [
  { sku: 'NVL001', name: 'Bột mì loại 1', qty: 200, price: '50.000đ', total: '10.000.000đ', batch: 'L-2024-156' },
  { sku: 'NVL002', name: 'Đường tinh luyện', qty: 150, price: '30.000đ', total: '4.500.000đ', batch: 'L-2024-157' },
  { sku: 'NVL005', name: 'Hương vani', qty: 50, price: '200.000đ', total: '10.000.000đ', batch: 'L-2024-158' },
];

const approvalHistory = [
  { date: '10/12/2024 10:30', action: 'Ghi nhận hoàn thành', user: 'Trần Văn A' },
  { date: '10/12/2024 08:00', action: 'Tạo phiếu nhập', user: 'Nguyễn Thị B' },
];

export default function Receipts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState<typeof receipts[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleViewDetail = (receipt: typeof receipts[0]) => {
    setSelectedReceipt(receipt);
    setIsDetailOpen(true);
  };

  return (
    <DashboardLayout allowedRoles={['warehouse_manager']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Phiếu nhập kho</h1>
            <p className="text-muted-foreground">Quản lý phiếu nhập hàng</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Tổng phiếu"
            value="892"
            change="Tháng này: 156"
            changeType="neutral"
            icon={FileCheck}
          />
          <StatCard
            title="Chờ ghi nhận"
            value="12"
            change="Cần xử lý"
            changeType="negative"
            icon={Clock}
            iconColor="bg-warning/10 text-warning"
          />
          <StatCard
            title="Hoàn thành"
            value="144"
            change="Tháng này"
            changeType="positive"
            icon={CheckCircle}
            iconColor="bg-success/10 text-success"
          />
          <StatCard
            title="Giá trị hôm nay"
            value="170tr"
            change="+25% so với hôm qua"
            changeType="positive"
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
            Trạng thái
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
                <TableHead className="table-header">NCC</TableHead>
                <TableHead className="table-header">NVL</TableHead>
                <TableHead className="table-header">Số lượng</TableHead>
                <TableHead className="table-header">Tổng tiền</TableHead>
                <TableHead className="table-header">Ngày</TableHead>
                <TableHead className="table-header">Trạng thái</TableHead>
                <TableHead className="table-header w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {receipts.map((receipt) => (
                <TableRow key={receipt.id} className="cursor-pointer" onClick={() => handleViewDetail(receipt)}>
                  <TableCell>
                    <span className="font-mono text-sm font-medium text-primary">{receipt.id}</span>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{receipt.supplier}</TableCell>
                  <TableCell className="text-muted-foreground">{receipt.materials} mặt hàng</TableCell>
                  <TableCell className="text-foreground">{receipt.qty}</TableCell>
                  <TableCell className="font-medium text-foreground">{receipt.price}</TableCell>
                  <TableCell className="text-muted-foreground">{receipt.date}</TableCell>
                  <TableCell>
                    {receipt.status === 'completed' ? (
                      <span className="badge-success">Hoàn thành</span>
                    ) : (
                      <span className="badge-warning">Chờ ghi nhận</span>
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
                        <DropdownMenuItem onClick={() => handleViewDetail(receipt)}>
                          <Eye className="w-4 h-4 mr-2" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Chỉnh sửa
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
              <SheetTitle>Chi tiết phiếu nhập</SheetTitle>
            </SheetHeader>
            {selectedReceipt && (
              <div className="mt-6 space-y-6">
                {/* Info */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Thông tin phiếu</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-secondary rounded-lg">
                      <div className="text-xs text-muted-foreground">Mã phiếu</div>
                      <div className="font-mono font-medium text-foreground">{selectedReceipt.id}</div>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg">
                      <div className="text-xs text-muted-foreground">Ngày</div>
                      <div className="font-medium text-foreground">{selectedReceipt.date}</div>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg">
                      <div className="text-xs text-muted-foreground">Trạng thái</div>
                      {selectedReceipt.status === 'completed' ? (
                        <span className="badge-success">Hoàn thành</span>
                      ) : (
                        <span className="badge-warning">Chờ ghi nhận</span>
                      )}
                    </div>
                    <div className="p-4 bg-secondary rounded-lg col-span-2">
                      <div className="text-xs text-muted-foreground">Nhà cung cấp</div>
                      <div className="font-medium text-foreground">{selectedReceipt.supplier}</div>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg">
                      <div className="text-xs text-muted-foreground">Tổng tiền</div>
                      <div className="text-xl font-bold text-foreground">{selectedReceipt.price}</div>
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
                          <TableHead className="table-header">SL</TableHead>
                          <TableHead className="table-header">Đơn giá</TableHead>
                          <TableHead className="table-header">Thành tiền</TableHead>
                          <TableHead className="table-header">Lô</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {receiptItems.map((item) => (
                          <TableRow key={item.sku}>
                            <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                            <TableCell className="text-foreground">{item.name}</TableCell>
                            <TableCell>{item.qty}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell className="font-medium">{item.total}</TableCell>
                            <TableCell className="text-primary">{item.batch}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* History */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Lịch sử duyệt</h3>
                  <div className="space-y-3">
                    {approvalHistory.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                        <div>
                          <div className="font-medium text-foreground">{item.action}</div>
                          <div className="text-xs text-muted-foreground">{item.user}</div>
                        </div>
                        <span className="text-xs text-muted-foreground">{item.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                {selectedReceipt.status === 'pending' && (
                  <div className="flex gap-3 pt-4 border-t border-border">
                    <Button className="flex-1 btn-primary">Ghi nhận hoàn thành</Button>
                    <Button variant="outline" className="flex-1">Chỉnh sửa</Button>
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
