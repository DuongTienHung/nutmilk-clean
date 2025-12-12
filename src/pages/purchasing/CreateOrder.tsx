import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Save, Send, Search } from 'lucide-react';

const suppliers = [
  { id: 'NCC001', name: 'Công ty TNHH Thực phẩm ABC' },
  { id: 'NCC002', name: 'NCC Bao bì XYZ' },
  { id: 'NCC003', name: 'Đại lý Nguyên liệu DEF' },
];

const availableMaterials = [
  { sku: 'NVL001', name: 'Bột mì loại 1', unit: 'kg', price: 50000, stock: 500 },
  { sku: 'NVL002', name: 'Đường tinh luyện', unit: 'kg', price: 30000, stock: 300 },
  { sku: 'NVL003', name: 'Bao bì PE 500g', unit: 'cái', price: 2000, stock: 5000 },
  { sku: 'NVL005', name: 'Hương vani', unit: 'lít', price: 200000, stock: 25 },
];

interface OrderItem {
  sku: string;
  name: string;
  unit: string;
  qty: number;
  price: number;
  total: number;
}

export default function CreateOrder() {
  const [supplier, setSupplier] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [orderType, setOrderType] = useState('normal');
  const [note, setNote] = useState('');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const addItem = (material: typeof availableMaterials[0]) => {
    const existing = orderItems.find(item => item.sku === material.sku);
    if (existing) return;
    
    setOrderItems([...orderItems, {
      sku: material.sku,
      name: material.name,
      unit: material.unit,
      qty: 1,
      price: material.price,
      total: material.price,
    }]);
  };

  const updateQty = (sku: string, qty: number) => {
    setOrderItems(orderItems.map(item => 
      item.sku === sku 
        ? { ...item, qty, total: qty * item.price }
        : item
    ));
  };

  const removeItem = (sku: string) => {
    setOrderItems(orderItems.filter(item => item.sku !== sku));
  };

  const total = orderItems.reduce((sum, item) => sum + item.total, 0);

  const filteredMaterials = availableMaterials.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout allowedRoles={['purchasing']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tạo đơn mua hàng (PO)</h1>
          <p className="text-muted-foreground">Tạo đơn đặt hàng mới cho nhà cung cấp</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="stat-card space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Thông tin đơn hàng</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nhà cung cấp *</Label>
                  <Select value={supplier} onValueChange={setSupplier}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn NCC" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map(s => (
                        <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Ngày giao dự kiến *</Label>
                  <Input 
                    type="date" 
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Loại đơn</Label>
                  <Select value={orderType} onValueChange={setOrderType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Đơn thường</SelectItem>
                      <SelectItem value="urgent">Đơn gấp</SelectItem>
                      <SelectItem value="contract">Đơn hợp đồng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Ghi chú</Label>
                  <Textarea 
                    placeholder="Ghi chú cho đơn hàng..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={1}
                  />
                </div>
              </div>
            </div>

            {/* Material selection */}
            <div className="stat-card space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Chọn NVL</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm theo SKU, tên NVL..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="border border-border rounded-lg overflow-hidden max-h-48 overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="table-header">SKU</TableHead>
                      <TableHead className="table-header">Tên NVL</TableHead>
                      <TableHead className="table-header">DVT</TableHead>
                      <TableHead className="table-header">Giá</TableHead>
                      <TableHead className="table-header">Tồn</TableHead>
                      <TableHead className="table-header w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMaterials.map((m) => (
                      <TableRow key={m.sku}>
                        <TableCell className="font-mono text-sm">{m.sku}</TableCell>
                        <TableCell>{m.name}</TableCell>
                        <TableCell>{m.unit}</TableCell>
                        <TableCell>{m.price.toLocaleString()}đ</TableCell>
                        <TableCell>{m.stock}</TableCell>
                        <TableCell>
                          <Button 
                            size="icon" 
                            variant="ghost"
                            onClick={() => addItem(m)}
                            disabled={orderItems.some(i => i.sku === m.sku)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Order items */}
            <div className="stat-card space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Chi tiết đơn hàng</h3>
              {orderItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Chưa có NVL nào được chọn
                </div>
              ) : (
                <div className="border border-border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="table-header">NVL</TableHead>
                        <TableHead className="table-header">Số lượng</TableHead>
                        <TableHead className="table-header">Đơn giá</TableHead>
                        <TableHead className="table-header">Thành tiền</TableHead>
                        <TableHead className="table-header w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orderItems.map((item) => (
                        <TableRow key={item.sku}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-xs text-muted-foreground">{item.sku}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min={1}
                              value={item.qty}
                              onChange={(e) => updateQty(item.sku, parseInt(e.target.value) || 1)}
                              className="w-24"
                            />
                          </TableCell>
                          <TableCell>{item.price.toLocaleString()}đ/{item.unit}</TableCell>
                          <TableCell className="font-medium">{item.total.toLocaleString()}đ</TableCell>
                          <TableCell>
                            <Button 
                              size="icon" 
                              variant="ghost"
                              onClick={() => removeItem(item.sku)}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-4">
            <div className="stat-card sticky top-20">
              <h3 className="text-lg font-semibold text-foreground mb-4">Tổng kết</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Số mặt hàng:</span>
                  <span className="font-medium">{orderItems.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tổng số lượng:</span>
                  <span className="font-medium">{orderItems.reduce((sum, i) => sum + i.qty, 0)}</span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between">
                    <span className="text-foreground font-medium">Tổng tiền:</span>
                    <span className="text-xl font-bold text-primary">{total.toLocaleString()}đ</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button variant="outline" className="flex-1 gap-2">
                  <Save className="w-4 h-4" />
                  Lưu nháp
                </Button>
                <Button className="flex-1 btn-primary gap-2">
                  <Send className="w-4 h-4" />
                  Gửi duyệt
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
