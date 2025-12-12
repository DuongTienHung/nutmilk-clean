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
  Plus, 
  Filter, 
  Truck, 
  CheckCircle2, 
  PauseCircle,
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2 
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
import { AddSupplierForm } from '@/components/forms/AddSupplierForm';

const suppliers = [
  { 
    id: 'NCC001', 
    name: 'Công ty TNHH Thực phẩm ABC', 
    contact: 'Nguyễn Văn A', 
    email: 'nva@abc.com', 
    phone: '0901234567', 
    status: 'active',
    orders: 45,
    lastOrder: '125.000.000đ'
  },
  { 
    id: 'NCC002', 
    name: 'NCC Bao bì XYZ', 
    contact: 'Trần Thị B', 
    email: 'ttb@xyz.com', 
    phone: '0912345678', 
    status: 'active',
    orders: 32,
    lastOrder: '45.000.000đ'
  },
  { 
    id: 'NCC003', 
    name: 'Đại lý Nguyên liệu DEF', 
    contact: 'Lê Văn C', 
    email: 'lvc@def.com', 
    phone: '0923456789', 
    status: 'paused',
    orders: 18,
    lastOrder: '28.500.000đ'
  },
  { 
    id: 'NCC004', 
    name: 'Công ty CP Phụ gia GHI', 
    contact: 'Phạm Thị D', 
    email: 'ptd@ghi.com', 
    phone: '0934567890', 
    status: 'active',
    orders: 56,
    lastOrder: '89.200.000đ'
  },
];

export default function Suppliers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState<typeof suppliers[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const handleViewDetail = (supplier: typeof suppliers[0]) => {
    setSelectedSupplier(supplier);
    setIsDetailOpen(true);
  };

  return (
    <DashboardLayout allowedRoles={['admin']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Nhà cung cấp</h1>
            <p className="text-muted-foreground">Quản lý thông tin nhà cung cấp</p>
          </div>
          <Button className="btn-primary gap-2" onClick={() => setIsAddFormOpen(true)}>
            <Plus className="w-4 h-4" />
            Thêm NCC
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Tổng NCC"
            value="156"
            icon={Truck}
          />
          <StatCard
            title="Đang hoạt động"
            value="142"
            change="91%"
            changeType="positive"
            icon={CheckCircle2}
            iconColor="bg-success/10 text-success"
          />
          <StatCard
            title="Tạm ngưng"
            value="14"
            icon={PauseCircle}
            iconColor="bg-warning/10 text-warning"
          />
          <StatCard
            title="Đơn mua gần nhất"
            value="45"
            change="Tuần này"
            changeType="neutral"
            icon={Truck}
            iconColor="bg-accent/10 text-accent"
          />
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Tìm theo tên, email, mã NCC..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Bộ lọc
          </Button>
        </div>

        {/* Table */}
        <div className="stat-card p-0 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="table-header">
                  <div className="flex items-center gap-2 cursor-pointer">
                    Tên NCC <ArrowUpDown className="w-4 h-4" />
                  </div>
                </TableHead>
                <TableHead className="table-header">Liên hệ</TableHead>
                <TableHead className="table-header">Email</TableHead>
                <TableHead className="table-header">Điện thoại</TableHead>
                <TableHead className="table-header">Trạng thái</TableHead>
                <TableHead className="table-header">SL đơn</TableHead>
                <TableHead className="table-header">Giá trị gần nhất</TableHead>
                <TableHead className="table-header w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.map((supplier) => (
                <TableRow key={supplier.id} className="cursor-pointer" onClick={() => handleViewDetail(supplier)}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">{supplier.name}</div>
                      <div className="text-xs text-muted-foreground">{supplier.id}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground">{supplier.contact}</TableCell>
                  <TableCell className="text-muted-foreground">{supplier.email}</TableCell>
                  <TableCell className="text-muted-foreground">{supplier.phone}</TableCell>
                  <TableCell>
                    {supplier.status === 'active' ? (
                      <span className="badge-success">Hoạt động</span>
                    ) : (
                      <span className="badge-warning">Tạm ngưng</span>
                    )}
                  </TableCell>
                  <TableCell className="text-foreground">{supplier.orders}</TableCell>
                  <TableCell className="font-medium text-foreground">{supplier.lastOrder}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetail(supplier)}>
                          <Eye className="w-4 h-4 mr-2" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Xóa
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
              <SheetTitle>Chi tiết nhà cung cấp</SheetTitle>
            </SheetHeader>
            {selectedSupplier && (
              <div className="mt-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Thông tin chung</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Mã NCC</div>
                      <div className="text-sm font-medium text-foreground">{selectedSupplier.id}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Trạng thái</div>
                      {selectedSupplier.status === 'active' ? (
                        <span className="badge-success">Hoạt động</span>
                      ) : (
                        <span className="badge-warning">Tạm ngưng</span>
                      )}
                    </div>
                    <div className="col-span-2">
                      <div className="text-xs text-muted-foreground">Tên công ty</div>
                      <div className="text-sm font-medium text-foreground">{selectedSupplier.name}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Người liên hệ</div>
                      <div className="text-sm font-medium text-foreground">{selectedSupplier.contact}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Điện thoại</div>
                      <div className="text-sm font-medium text-foreground">{selectedSupplier.phone}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-xs text-muted-foreground">Email</div>
                      <div className="text-sm font-medium text-foreground">{selectedSupplier.email}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Thống kê</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-secondary rounded-lg">
                      <div className="text-2xl font-bold text-foreground">{selectedSupplier.orders}</div>
                      <div className="text-xs text-muted-foreground">Tổng đơn mua</div>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg">
                      <div className="text-2xl font-bold text-foreground">{selectedSupplier.lastOrder}</div>
                      <div className="text-xs text-muted-foreground">Giá trị gần nhất</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button className="flex-1 btn-primary">Chỉnh sửa</Button>
                  <Button variant="outline" className="flex-1">Cập nhật giá</Button>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>

        {/* Add Supplier Form */}
        <AddSupplierForm 
          open={isAddFormOpen} 
          onOpenChange={setIsAddFormOpen}
        />
      </div>
    </DashboardLayout>
  );
}
