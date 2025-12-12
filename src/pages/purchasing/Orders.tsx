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
  ShoppingCart,
  Clock,
  Truck,
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
import { Link } from 'react-router-dom';

const orders = [
  { 
    id: 'PO-2024-089',
    supplier: 'Công ty TNHH ABC',
    date: '10/12/2024',
    total: '125.000.000đ',
    user: 'Lê Văn Mua',
    status: 'pending',
  },
  { 
    id: 'PO-2024-088',
    supplier: 'NCC Bao bì XYZ',
    date: '09/12/2024',
    total: '45.000.000đ',
    user: 'Lê Văn Mua',
    status: 'approved',
  },
  { 
    id: 'PO-2024-087',
    supplier: 'Đại lý Nguyên liệu DEF',
    date: '08/12/2024',
    total: '89.500.000đ',
    user: 'Trần Thị B',
    status: 'delivering',
  },
  { 
    id: 'PO-2024-086',
    supplier: 'Công ty CP Phụ gia GHI',
    date: '07/12/2024',
    total: '32.000.000đ',
    user: 'Lê Văn Mua',
    status: 'late',
  },
  { 
    id: 'PO-2024-085',
    supplier: 'Công ty TNHH ABC',
    date: '05/12/2024',
    total: '78.000.000đ',
    user: 'Trần Thị B',
    status: 'completed',
  },
];

const orderItems = [
  { sku: 'NVL001', name: 'Bột mì loại 1', qty: 200, price: '50.000đ', total: '10.000.000đ' },
  { sku: 'NVL002', name: 'Đường tinh luyện', qty: 150, price: '30.000đ', total: '4.500.000đ' },
];

export default function Orders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleViewDetail = (order: typeof orders[0]) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="badge-warning">Chờ duyệt</span>;
      case 'approved':
        return <span className="badge-primary">Đã duyệt</span>;
      case 'delivering':
        return <span className="bg-accent/10 text-accent px-2.5 py-1 rounded-full text-xs font-medium">Đang giao</span>;
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Danh sách đơn mua</h1>
            <p className="text-muted-foreground">Quản lý tất cả đơn đặt hàng</p>
          </div>
          <Link to="/purchasing/create-order">
            <Button className="btn-primary gap-2">
              <Plus className="w-4 h-4" />
              Tạo đơn mua
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Tổng đơn"
            value="156"
            change="Tháng này"
            changeType="neutral"
            icon={ShoppingCart}
          />
          <StatCard
            title="Chờ duyệt"
            value="12"
            change="Cần xử lý"
            changeType="negative"
            icon={Clock}
            iconColor="bg-warning/10 text-warning"
          />
          <StatCard
            title="Đang giao"
            value="23"
            change="Từ 8 NCC"
            changeType="neutral"
            icon={Truck}
            iconColor="bg-accent/10 text-accent"
          />
          <StatCard
            title="Trễ hạn"
            value="3"
            change="Cần theo dõi"
            changeType="negative"
            icon={AlertTriangle}
            iconColor="bg-destructive/10 text-destructive"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Tìm theo mã đơn, NCC..."
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

        <div className="stat-card p-0 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="table-header">
                  <div className="flex items-center gap-2 cursor-pointer">
                    Mã đơn <ArrowUpDown className="w-4 h-4" />
                  </div>
                </TableHead>
                <TableHead className="table-header">NCC</TableHead>
                <TableHead className="table-header">Ngày tạo</TableHead>
                <TableHead className="table-header">Tổng tiền</TableHead>
                <TableHead className="table-header">Người tạo</TableHead>
                <TableHead className="table-header">Trạng thái</TableHead>
                <TableHead className="table-header w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="cursor-pointer" onClick={() => handleViewDetail(order)}>
                  <TableCell>
                    <span className="font-mono text-sm font-medium text-primary">{order.id}</span>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{order.supplier}</TableCell>
                  <TableCell className="text-muted-foreground">{order.date}</TableCell>
                  <TableCell className="font-medium text-foreground">{order.total}</TableCell>
                  <TableCell className="text-muted-foreground">{order.user}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetail(order)}>
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
          <SheetContent className="w-[700px] sm:w-[800px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Chi tiết đơn mua</SheetTitle>
            </SheetHeader>
            {selectedOrder && (
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-xs text-muted-foreground">Mã đơn</div>
                    <div className="font-mono font-medium text-foreground">{selectedOrder.id}</div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-xs text-muted-foreground">Trạng thái</div>
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-xs text-muted-foreground">Tổng tiền</div>
                    <div className="text-xl font-bold text-foreground">{selectedOrder.total}</div>
                  </div>
                </div>

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
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orderItems.map((item) => (
                          <TableRow key={item.sku}>
                            <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.qty}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell className="font-medium">{item.total}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {selectedOrder.status === 'pending' && (
                  <div className="flex gap-3 pt-4 border-t border-border">
                    <Button className="flex-1 btn-primary">Duyệt đơn</Button>
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
