import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Search, FileCheck, Clock, XCircle, Eye, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

// Mock data - đơn mua chờ duyệt
const purchaseOrders = [
  {
    id: 'PO-2024-001',
    supplier: 'Công ty TNHH ABC',
    createdBy: 'Nguyễn Văn A',
    createdAt: '2024-01-15',
    total: 25000000,
    status: 'pending',
    items: [
      { id: 1, name: 'Hạt óc chó', sku: 'NVL001', quantity: 100, unit: 'kg', price: 150000, total: 15000000 },
      { id: 2, name: 'Hạt điều', sku: 'NVL002', quantity: 50, unit: 'kg', price: 200000, total: 10000000 },
    ],
  },
  {
    id: 'PO-2024-002',
    supplier: 'Công ty CP XYZ',
    createdBy: 'Trần Thị B',
    createdAt: '2024-01-16',
    total: 18500000,
    status: 'pending',
    items: [
      { id: 1, name: 'Hạt macca', sku: 'NVL003', quantity: 30, unit: 'kg', price: 350000, total: 10500000 },
      { id: 2, name: 'Đường cát', sku: 'NVL004', quantity: 200, unit: 'kg', price: 40000, total: 8000000 },
    ],
  },
  {
    id: 'PO-2024-003',
    supplier: 'Công ty TNHH DEF',
    createdBy: 'Lê Văn C',
    createdAt: '2024-01-17',
    total: 12000000,
    status: 'pending',
    items: [
      { id: 1, name: 'Nước tinh khiết', sku: 'NVL006', quantity: 1000, unit: 'lít', price: 5000, total: 5000000 },
      { id: 2, name: 'Muối', sku: 'NVL005', quantity: 100, unit: 'kg', price: 70000, total: 7000000 },
    ],
  },
];

const suppliers = ['Tất cả', 'Công ty TNHH ABC', 'Công ty CP XYZ', 'Công ty TNHH DEF'];

export default function PurchaseApproval() {
  const [searchQuery, setSearchQuery] = useState('');
  const [supplierFilter, setSupplierFilter] = useState('Tất cả');
  const [selectedOrder, setSelectedOrder] = useState<typeof purchaseOrders[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [orders, setOrders] = useState(purchaseOrders);
  
  // Dialog states
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [approveNote, setApproveNote] = useState('');
  const [rejectReason, setRejectReason] = useState('');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.createdBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSupplier = supplierFilter === 'Tất cả' || order.supplier === supplierFilter;
    return matchesSearch && matchesSupplier && order.status === 'pending';
  });

  const handleViewDetail = (order: typeof purchaseOrders[0]) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  const handleApprove = () => {
    if (!selectedOrder) return;
    
    setOrders(orders.map(o => 
      o.id === selectedOrder.id ? { ...o, status: 'approved' } : o
    ));
    toast.success(`Đã phê duyệt đơn mua ${selectedOrder.id}`);
    setIsApproveDialogOpen(false);
    setIsDetailOpen(false);
    setApproveNote('');
    setSelectedOrder(null);
  };

  const handleReject = () => {
    if (!selectedOrder || !rejectReason.trim()) {
      toast.error('Vui lòng nhập lý do từ chối');
      return;
    }
    
    setOrders(orders.map(o => 
      o.id === selectedOrder.id ? { ...o, status: 'rejected' } : o
    ));
    toast.success(`Đã từ chối đơn mua ${selectedOrder.id}`);
    setIsRejectDialogOpen(false);
    setIsDetailOpen(false);
    setRejectReason('');
    setSelectedOrder(null);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const totalPendingValue = orders
    .filter(o => o.status === 'pending')
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <DashboardLayout allowedRoles={['warehouse_manager', 'admin']}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Phê duyệt Đơn mua</h1>
          <p className="text-muted-foreground mt-1">Xem xét và phê duyệt các đơn mua hàng chờ duyệt</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Chờ duyệt</p>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileCheck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tổng giá trị chờ duyệt</p>
                <p className="text-2xl font-bold">{formatCurrency(totalPendingValue)}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Đã duyệt hôm nay</p>
                <p className="text-2xl font-bold">{orders.filter(o => o.status === 'approved').length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm theo mã đơn, người tạo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={supplierFilter} onValueChange={setSupplierFilter}>
                <SelectTrigger className="w-full md:w-56">
                  <SelectValue placeholder="Nhà cung cấp" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách đơn mua chờ duyệt</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <FileCheck className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Không có đơn mua nào chờ duyệt</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã đơn</TableHead>
                    <TableHead>Nhà cung cấp</TableHead>
                    <TableHead>Người tạo</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead className="text-right">Tổng tiền</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.supplier}</TableCell>
                      <TableCell>{order.createdBy}</TableCell>
                      <TableCell>{order.createdAt}</TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(order.total)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-orange-500/10 text-orange-600">
                          <Clock className="w-3 h-3 mr-1" />
                          Chờ duyệt
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline" onClick={() => handleViewDetail(order)}>
                          <Eye className="w-4 h-4 mr-1" />
                          Chi tiết
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detail Sheet */}
      <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Chi tiết Đơn mua</SheetTitle>
            <SheetDescription>{selectedOrder?.id}</SheetDescription>
          </SheetHeader>

          {selectedOrder && (
            <div className="mt-6 space-y-6">
              {/* Order Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Thông tin chung</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nhà cung cấp</p>
                    <p className="font-medium">{selectedOrder.supplier}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Người tạo</p>
                    <p className="font-medium">{selectedOrder.createdBy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ngày tạo</p>
                    <p className="font-medium">{selectedOrder.createdAt}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tổng tiền</p>
                    <p className="font-medium text-primary">{formatCurrency(selectedOrder.total)}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Items Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Danh sách NVL ({selectedOrder.items.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã NVL</TableHead>
                        <TableHead>Tên NVL</TableHead>
                        <TableHead className="text-right">SL</TableHead>
                        <TableHead>ĐVT</TableHead>
                        <TableHead className="text-right">Đơn giá</TableHead>
                        <TableHead className="text-right">Thành tiền</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.sku}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell>{item.unit}</TableCell>
                          <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
                          <TableCell className="text-right font-medium">{formatCurrency(item.total)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setIsDetailOpen(false)}>
                  Hủy
                </Button>
                <Button 
                  variant="destructive" 
                  className="flex-1"
                  onClick={() => setIsRejectDialogOpen(true)}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Từ chối
                </Button>
                <Button 
                  className="flex-1"
                  onClick={() => setIsApproveDialogOpen(true)}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Phê duyệt
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Approve Dialog */}
      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Phê duyệt đơn mua</DialogTitle>
            <DialogDescription>
              Xác nhận phê duyệt đơn mua {selectedOrder?.id}?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Ghi chú (không bắt buộc)</Label>
              <Textarea
                placeholder="Nhập ghi chú khi phê duyệt..."
                value={approveNote}
                onChange={(e) => setApproveNote(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleApprove}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Xác nhận phê duyệt
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Từ chối đơn mua</DialogTitle>
            <DialogDescription>
              Vui lòng nhập lý do từ chối đơn mua {selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Lý do từ chối *</Label>
              <Textarea
                placeholder="Nhập lý do từ chối..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              <XCircle className="w-4 h-4 mr-2" />
              Xác nhận từ chối
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
