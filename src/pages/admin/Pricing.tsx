import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { AddPricingForm } from '@/components/forms/AddPricingForm';
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
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Calendar
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

const pricingData = [
  { 
    id: 'BG001', 
    supplier: 'Công ty TNHH Thực phẩm ABC',
    supplierId: 'NCC001',
    material: 'Hạt điều nguyên liệu',
    materialId: 'NVL001',
    unit: 'Kg',
    price: '185.000',
    validFrom: '01/01/2024',
    validTo: '31/12/2024',
    status: 'active',
    change: '+5%'
  },
  { 
    id: 'BG002', 
    supplier: 'NCC Bao bì XYZ',
    supplierId: 'NCC002',
    material: 'Chai nhựa 500ml',
    materialId: 'NVL005',
    unit: 'Cái',
    price: '2.500',
    validFrom: '01/03/2024',
    validTo: '28/02/2025',
    status: 'active',
    change: '-2%'
  },
  { 
    id: 'BG003', 
    supplier: 'Đại lý Nguyên liệu DEF',
    supplierId: 'NCC003',
    material: 'Hạt hạnh nhân',
    materialId: 'NVL002',
    unit: 'Kg',
    price: '420.000',
    validFrom: '15/02/2024',
    validTo: '14/02/2025',
    status: 'active',
    change: '+8%'
  },
  { 
    id: 'BG004', 
    supplier: 'Công ty CP Phụ gia GHI',
    supplierId: 'NCC004',
    material: 'Chất bảo quản thực phẩm',
    materialId: 'NVL008',
    unit: 'Lít',
    price: '75.000',
    validFrom: '01/06/2023',
    validTo: '31/05/2024',
    status: 'expired',
    change: '0%'
  },
];

export default function Pricing() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrice, setSelectedPrice] = useState<typeof pricingData[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const handleViewDetail = (price: typeof pricingData[0]) => {
    setSelectedPrice(price);
    setIsDetailOpen(true);
  };

  return (
    <DashboardLayout allowedRoles={['admin']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Bảng giá NCC</h1>
            <p className="text-muted-foreground">Quản lý bảng giá từ các nhà cung cấp</p>
          </div>
          <Button className="btn-primary gap-2" onClick={() => setIsAddFormOpen(true)}>
            <Plus className="w-4 h-4" />
            Thêm bảng giá
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Tổng bảng giá"
            value="248"
            icon={DollarSign}
          />
          <StatCard
            title="Đang áp dụng"
            value="215"
            change="87%"
            changeType="positive"
            icon={Calendar}
            iconColor="bg-success/10 text-success"
          />
          <StatCard
            title="Tăng giá"
            value="42"
            change="Tháng này"
            changeType="negative"
            icon={TrendingUp}
            iconColor="bg-destructive/10 text-destructive"
          />
          <StatCard
            title="Giảm giá"
            value="18"
            change="Tháng này"
            changeType="positive"
            icon={TrendingDown}
            iconColor="bg-accent/10 text-accent"
          />
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Tìm theo NCC, NVL, mã bảng giá..."
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
                    NVL <ArrowUpDown className="w-4 h-4" />
                  </div>
                </TableHead>
                <TableHead className="table-header">Nhà cung cấp</TableHead>
                <TableHead className="table-header">Đơn vị</TableHead>
                <TableHead className="table-header">Đơn giá</TableHead>
                <TableHead className="table-header">Hiệu lực</TableHead>
                <TableHead className="table-header">Biến động</TableHead>
                <TableHead className="table-header">Trạng thái</TableHead>
                <TableHead className="table-header w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pricingData.map((price) => (
                <TableRow key={price.id} className="cursor-pointer" onClick={() => handleViewDetail(price)}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">{price.material}</div>
                      <div className="text-xs text-muted-foreground">{price.materialId}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-foreground">{price.supplier}</div>
                      <div className="text-xs text-muted-foreground">{price.supplierId}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{price.unit}</TableCell>
                  <TableCell className="font-medium text-foreground">{price.price}đ</TableCell>
                  <TableCell className="text-muted-foreground">
                    <div className="text-xs">
                      <div>{price.validFrom}</div>
                      <div>→ {price.validTo}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {price.change.startsWith('+') ? (
                      <span className="text-destructive font-medium">{price.change}</span>
                    ) : price.change.startsWith('-') ? (
                      <span className="text-success font-medium">{price.change}</span>
                    ) : (
                      <span className="text-muted-foreground">{price.change}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {price.status === 'active' ? (
                      <span className="badge-success">Đang áp dụng</span>
                    ) : (
                      <span className="badge-warning">Hết hạn</span>
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
                        <DropdownMenuItem onClick={() => handleViewDetail(price)}>
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
              <SheetTitle>Chi tiết bảng giá</SheetTitle>
            </SheetHeader>
            {selectedPrice && (
              <div className="mt-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Thông tin NVL</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Mã NVL</div>
                      <div className="text-sm font-medium text-foreground">{selectedPrice.materialId}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Đơn vị</div>
                      <div className="text-sm font-medium text-foreground">{selectedPrice.unit}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-xs text-muted-foreground">Tên NVL</div>
                      <div className="text-sm font-medium text-foreground">{selectedPrice.material}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Nhà cung cấp</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Mã NCC</div>
                      <div className="text-sm font-medium text-foreground">{selectedPrice.supplierId}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-xs text-muted-foreground">Tên NCC</div>
                      <div className="text-sm font-medium text-foreground">{selectedPrice.supplier}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Giá & Hiệu lực</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-secondary rounded-lg">
                      <div className="text-2xl font-bold text-foreground">{selectedPrice.price}đ</div>
                      <div className="text-xs text-muted-foreground">Đơn giá/{selectedPrice.unit}</div>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg">
                      <div className="text-2xl font-bold text-foreground">{selectedPrice.change}</div>
                      <div className="text-xs text-muted-foreground">So với kỳ trước</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Hiệu lực từ</div>
                      <div className="text-sm font-medium text-foreground">{selectedPrice.validFrom}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Đến ngày</div>
                      <div className="text-sm font-medium text-foreground">{selectedPrice.validTo}</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button className="flex-1 btn-primary">Chỉnh sửa</Button>
                  <Button variant="outline" className="flex-1">Gia hạn</Button>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
        <AddPricingForm open={isAddFormOpen} onOpenChange={setIsAddFormOpen} />
      </div>
    </DashboardLayout>
  );
}
