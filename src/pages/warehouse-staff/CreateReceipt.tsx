import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Trash2, Save, Send } from 'lucide-react';
import { toast } from 'sonner';

interface ReceiptItem {
  id: string;
  sku: string;
  name: string;
  unit: string;
  quantity: number;
  price: number;
  expiryDate: string;
  batch: string;
}

const availableMaterials = [
  { sku: 'NVL001', name: 'Bột mì loại 1', unit: 'kg', price: 15000 },
  { sku: 'NVL002', name: 'Đường tinh luyện', unit: 'kg', price: 22000 },
  { sku: 'NVL003', name: 'Bao bì PE 500g', unit: 'cái', price: 500 },
  { sku: 'NVL004', name: 'Hương vani', unit: 'lít', price: 180000 },
  { sku: 'NVL005', name: 'Hạt điều rang', unit: 'kg', price: 280000 },
];

const suppliers = [
  { id: 'NCC001', name: 'Công ty TNHH Thực phẩm ABC' },
  { id: 'NCC002', name: 'NCC Bao bì XYZ' },
  { id: 'NCC003', name: 'Đại lý Nguyên liệu DEF' },
];

export default function CreateReceipt() {
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [note, setNote] = useState('');
  const [items, setItems] = useState<ReceiptItem[]>([]);

  const handleAddItem = () => {
    if (!selectedMaterial || !quantity) {
      toast.error('Vui lòng chọn NVL và nhập số lượng');
      return;
    }

    const material = availableMaterials.find(m => m.sku === selectedMaterial);
    if (!material) return;

    const newItem: ReceiptItem = {
      id: Date.now().toString(),
      sku: material.sku,
      name: material.name,
      unit: material.unit,
      quantity: parseFloat(quantity),
      price: parseFloat(price) || material.price,
      expiryDate: expiryDate,
      batch: `L${Date.now().toString().slice(-6)}`,
    };

    setItems([...items, newItem]);
    setSelectedMaterial('');
    setQuantity('');
    setPrice('');
    setExpiryDate('');
    toast.success('Đã thêm NVL vào phiếu');
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const totalValue = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const handleSaveDraft = () => {
    toast.success('Đã lưu nháp phiếu nhập');
  };

  const handleSubmit = () => {
    if (!selectedSupplier || items.length === 0) {
      toast.error('Vui lòng chọn NCC và thêm ít nhất 1 NVL');
      return;
    }
    toast.success('Đã tạo phiếu nhập thành công');
  };

  return (
    <DashboardLayout allowedRoles={['warehouse_staff']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tạo phiếu nhập kho</h1>
          <p className="text-muted-foreground">Tạo phiếu nhập hàng từ nhà cung cấp</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form thông tin */}
          <div className="lg:col-span-1 space-y-6">
            <div className="stat-card space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Thông tin phiếu</h3>
              
              <div className="space-y-2">
                <Label>Nhà cung cấp *</Label>
                <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
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
                <Label>Ghi chú</Label>
                <Textarea
                  placeholder="Nhập ghi chú..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            <div className="stat-card space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Thêm NVL</h3>
              
              <div className="space-y-2">
                <Label>Chọn NVL *</Label>
                <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn NVL" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableMaterials.map(m => (
                      <SelectItem key={m.sku} value={m.sku}>
                        {m.sku} - {m.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Số lượng *</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Đơn giá</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Hạn sử dụng</Label>
                <Input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>

              <Button onClick={handleAddItem} className="w-full gap-2">
                <Plus className="w-4 h-4" />
                Thêm vào phiếu
              </Button>
            </div>
          </div>

          {/* Danh sách NVL */}
          <div className="lg:col-span-2 space-y-4">
            <div className="stat-card p-0 overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="text-lg font-semibold text-foreground">Danh sách NVL ({items.length})</h3>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="table-header">SKU</TableHead>
                    <TableHead className="table-header">Tên NVL</TableHead>
                    <TableHead className="table-header">Lô</TableHead>
                    <TableHead className="table-header">SL</TableHead>
                    <TableHead className="table-header">Đơn giá</TableHead>
                    <TableHead className="table-header">Thành tiền</TableHead>
                    <TableHead className="table-header">HSD</TableHead>
                    <TableHead className="table-header w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        Chưa có NVL nào. Thêm NVL từ form bên trái.
                      </TableCell>
                    </TableRow>
                  ) : (
                    items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-mono text-sm text-primary">{item.sku}</TableCell>
                        <TableCell className="font-medium text-foreground">{item.name}</TableCell>
                        <TableCell className="text-muted-foreground">{item.batch}</TableCell>
                        <TableCell className="text-foreground">{item.quantity} {item.unit}</TableCell>
                        <TableCell className="text-muted-foreground">{item.price.toLocaleString()}đ</TableCell>
                        <TableCell className="font-medium text-foreground">
                          {(item.quantity * item.price).toLocaleString()}đ
                        </TableCell>
                        <TableCell className="text-muted-foreground">{item.expiryDate || '-'}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Footer */}
            <div className="stat-card">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Tổng giá trị</div>
                  <div className="text-2xl font-bold text-foreground">{totalValue.toLocaleString()}đ</div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleSaveDraft} className="gap-2">
                    <Save className="w-4 h-4" />
                    Lưu nháp
                  </Button>
                  <Button onClick={handleSubmit} className="btn-primary gap-2">
                    <Send className="w-4 h-4" />
                    Tạo phiếu
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
