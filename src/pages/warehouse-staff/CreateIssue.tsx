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

interface IssueItem {
  id: string;
  sku: string;
  name: string;
  unit: string;
  quantity: number;
  batch: string;
  stock: number;
}

const availableMaterials = [
  { sku: 'NVL001', name: 'Bột mì loại 1', unit: 'kg', stock: 500, batches: ['L001', 'L002', 'L003'] },
  { sku: 'NVL002', name: 'Đường tinh luyện', unit: 'kg', stock: 300, batches: ['L004', 'L005'] },
  { sku: 'NVL003', name: 'Bao bì PE 500g', unit: 'cái', stock: 5000, batches: ['L006'] },
  { sku: 'NVL004', name: 'Hương vani', unit: 'lít', stock: 25, batches: ['L007', 'L008'] },
  { sku: 'NVL005', name: 'Hạt điều rang', unit: 'kg', stock: 150, batches: ['L009'] },
];

const departments = [
  { id: 'SX', name: 'Sản xuất' },
  { id: 'BH', name: 'Bán hàng' },
  { id: 'QC', name: 'Kiểm tra chất lượng' },
  { id: 'RD', name: 'R&D' },
];

export default function CreateIssue() {
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('');
  const [items, setItems] = useState<IssueItem[]>([]);

  const currentMaterial = availableMaterials.find(m => m.sku === selectedMaterial);

  const handleAddItem = () => {
    if (!selectedMaterial || !quantity || !selectedBatch) {
      toast.error('Vui lòng chọn NVL, lô và nhập số lượng');
      return;
    }

    const material = availableMaterials.find(m => m.sku === selectedMaterial);
    if (!material) return;

    if (parseFloat(quantity) > material.stock) {
      toast.error('Số lượng xuất vượt quá tồn kho');
      return;
    }

    const newItem: IssueItem = {
      id: Date.now().toString(),
      sku: material.sku,
      name: material.name,
      unit: material.unit,
      quantity: parseFloat(quantity),
      batch: selectedBatch,
      stock: material.stock,
    };

    setItems([...items, newItem]);
    setSelectedMaterial('');
    setSelectedBatch('');
    setQuantity('');
    toast.success('Đã thêm NVL vào phiếu xuất');
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSaveDraft = () => {
    toast.success('Đã lưu nháp phiếu xuất');
  };

  const handleSubmit = () => {
    if (!selectedDept || items.length === 0) {
      toast.error('Vui lòng chọn bộ phận và thêm ít nhất 1 NVL');
      return;
    }
    toast.success('Đã tạo phiếu xuất thành công');
  };

  return (
    <DashboardLayout allowedRoles={['warehouse_staff']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tạo phiếu xuất kho</h1>
          <p className="text-muted-foreground">Tạo phiếu xuất NVL cho các bộ phận</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form thông tin */}
          <div className="lg:col-span-1 space-y-6">
            <div className="stat-card space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Thông tin phiếu</h3>
              
              <div className="space-y-2">
                <Label>Bộ phận nhận *</Label>
                <Select value={selectedDept} onValueChange={setSelectedDept}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn bộ phận" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(d => (
                      <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Lý do xuất</Label>
                <Textarea
                  placeholder="Nhập lý do xuất kho..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            <div className="stat-card space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Thêm NVL xuất</h3>
              
              <div className="space-y-2">
                <Label>Chọn NVL *</Label>
                <Select value={selectedMaterial} onValueChange={(val) => {
                  setSelectedMaterial(val);
                  setSelectedBatch('');
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn NVL" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableMaterials.map(m => (
                      <SelectItem key={m.sku} value={m.sku}>
                        {m.sku} - {m.name} (Tồn: {m.stock})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {currentMaterial && (
                <div className="space-y-2">
                  <Label>Chọn lô *</Label>
                  <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn lô" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentMaterial.batches.map(b => (
                        <SelectItem key={b} value={b}>{b}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label>Số lượng xuất *</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                {currentMaterial && (
                  <p className="text-xs text-muted-foreground">
                    Tồn kho: {currentMaterial.stock} {currentMaterial.unit}
                  </p>
                )}
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
                <h3 className="text-lg font-semibold text-foreground">NVL cần xuất ({items.length})</h3>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="table-header">SKU</TableHead>
                    <TableHead className="table-header">Tên NVL</TableHead>
                    <TableHead className="table-header">Lô</TableHead>
                    <TableHead className="table-header">SL xuất</TableHead>
                    <TableHead className="table-header">Tồn hiện tại</TableHead>
                    <TableHead className="table-header">Tồn sau xuất</TableHead>
                    <TableHead className="table-header w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        Chưa có NVL nào. Thêm NVL từ form bên trái.
                      </TableCell>
                    </TableRow>
                  ) : (
                    items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-mono text-sm text-primary">{item.sku}</TableCell>
                        <TableCell className="font-medium text-foreground">{item.name}</TableCell>
                        <TableCell className="text-muted-foreground">{item.batch}</TableCell>
                        <TableCell className="font-medium text-foreground">{item.quantity} {item.unit}</TableCell>
                        <TableCell className="text-muted-foreground">{item.stock}</TableCell>
                        <TableCell className={item.stock - item.quantity < 0 ? 'text-destructive font-medium' : 'text-success font-medium'}>
                          {item.stock - item.quantity}
                        </TableCell>
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
                  <div className="text-sm text-muted-foreground">Tổng số mặt hàng</div>
                  <div className="text-2xl font-bold text-foreground">{items.length}</div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleSaveDraft} className="gap-2">
                    <Save className="w-4 h-4" />
                    Lưu nháp
                  </Button>
                  <Button onClick={handleSubmit} className="btn-primary gap-2">
                    <Send className="w-4 h-4" />
                    Tạo phiếu xuất
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
