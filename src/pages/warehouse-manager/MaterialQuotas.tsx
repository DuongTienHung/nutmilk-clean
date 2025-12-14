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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Search, Plus, Trash2, Layers, Package } from 'lucide-react';
import { toast } from 'sonner';

// Mock data - thành phẩm
const products = [
  { id: 'TP001', name: 'Sữa hạt óc chó 500ml', group: 'Sữa hạt', status: 'active' },
  { id: 'TP002', name: 'Sữa hạt điều 500ml', group: 'Sữa hạt', status: 'active' },
  { id: 'TP003', name: 'Sữa hạt macca 500ml', group: 'Sữa hạt', status: 'active' },
  { id: 'TP004', name: 'Sữa hạt hạnh nhân 500ml', group: 'Sữa hạt', status: 'inactive' },
  { id: 'TP005', name: 'Sữa yến mạch 500ml', group: 'Sữa ngũ cốc', status: 'active' },
];

// Mock data - NVL
const materials = [
  { id: 'NVL001', name: 'Hạt óc chó', unit: 'kg' },
  { id: 'NVL002', name: 'Hạt điều', unit: 'kg' },
  { id: 'NVL003', name: 'Hạt macca', unit: 'kg' },
  { id: 'NVL004', name: 'Đường cát', unit: 'kg' },
  { id: 'NVL005', name: 'Muối', unit: 'kg' },
  { id: 'NVL006', name: 'Nước tinh khiết', unit: 'lít' },
];

// Mock data - định mức đã gán
const initialQuotas: Record<string, Array<{ materialId: string; quantity: number; note: string }>> = {
  'TP001': [
    { materialId: 'NVL001', quantity: 0.15, note: 'Hạt chính' },
    { materialId: 'NVL004', quantity: 0.02, note: '' },
    { materialId: 'NVL006', quantity: 0.45, note: '' },
  ],
  'TP002': [
    { materialId: 'NVL002', quantity: 0.12, note: 'Hạt chính' },
    { materialId: 'NVL004', quantity: 0.02, note: '' },
    { materialId: 'NVL006', quantity: 0.48, note: '' },
  ],
};

export default function MaterialQuotas() {
  const [searchQuery, setSearchQuery] = useState('');
  const [groupFilter, setGroupFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [quotas, setQuotas] = useState(initialQuotas);
  
  // Form state cho thêm NVL
  const [newMaterial, setNewMaterial] = useState({ materialId: '', quantity: '', note: '' });

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGroup = groupFilter === 'all' || product.group === groupFilter;
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesGroup && matchesStatus;
  });

  const handleSelectProduct = (product: typeof products[0]) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const getProductQuotas = () => {
    if (!selectedProduct) return [];
    return quotas[selectedProduct.id] || [];
  };

  const handleAddMaterial = () => {
    if (!selectedProduct || !newMaterial.materialId || !newMaterial.quantity) {
      toast.error('Vui lòng chọn NVL và nhập số lượng');
      return;
    }

    const existingQuotas = quotas[selectedProduct.id] || [];
    if (existingQuotas.some(q => q.materialId === newMaterial.materialId)) {
      toast.error('NVL này đã được gán');
      return;
    }

    setQuotas({
      ...quotas,
      [selectedProduct.id]: [
        ...existingQuotas,
        {
          materialId: newMaterial.materialId,
          quantity: parseFloat(newMaterial.quantity),
          note: newMaterial.note,
        },
      ],
    });
    setNewMaterial({ materialId: '', quantity: '', note: '' });
    toast.success('Đã thêm NVL vào định mức');
  };

  const handleRemoveMaterial = (materialId: string) => {
    if (!selectedProduct) return;
    setQuotas({
      ...quotas,
      [selectedProduct.id]: (quotas[selectedProduct.id] || []).filter(q => q.materialId !== materialId),
    });
    toast.success('Đã xóa NVL khỏi định mức');
  };

  const handleSave = () => {
    toast.success(`Đã lưu định mức cho ${selectedProduct?.name}`);
    setIsFormOpen(false);
    setSelectedProduct(null);
  };

  const getMaterialName = (materialId: string) => {
    return materials.find(m => m.id === materialId)?.name || materialId;
  };

  const getMaterialUnit = (materialId: string) => {
    return materials.find(m => m.id === materialId)?.unit || '';
  };

  return (
    <DashboardLayout allowedRoles={['warehouse_manager', 'admin']}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Quản lý Định mức NVL</h1>
          <p className="text-muted-foreground mt-1">Thiết lập định mức nguyên vật liệu cho từng thành phẩm</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tổng thành phẩm</p>
                <p className="text-2xl font-bold">{products.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Layers className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Đã có định mức</p>
                <p className="text-2xl font-bold">{Object.keys(quotas).length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Package className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Chưa có định mức</p>
                <p className="text-2xl font-bold">{products.length - Object.keys(quotas).length}</p>
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
                  placeholder="Tìm theo tên hoặc mã thành phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={groupFilter} onValueChange={setGroupFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Nhóm sản phẩm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả nhóm</SelectItem>
                  <SelectItem value="Sữa hạt">Sữa hạt</SelectItem>
                  <SelectItem value="Sữa ngũ cốc">Sữa ngũ cốc</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="active">Đang dùng</SelectItem>
                  <SelectItem value="inactive">Ngừng dùng</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách thành phẩm</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã</TableHead>
                  <TableHead>Tên thành phẩm</TableHead>
                  <TableHead>Nhóm</TableHead>
                  <TableHead>Số NVL đã gán</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.group}</TableCell>
                    <TableCell>
                      <Badge variant={quotas[product.id]?.length ? 'default' : 'secondary'}>
                        {quotas[product.id]?.length || 0} NVL
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                        {product.status === 'active' ? 'Đang dùng' : 'Ngừng dùng'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" onClick={() => handleSelectProduct(product)}>
                        Chọn
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Form gán NVL */}
      <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Gán NVL cho thành phẩm</SheetTitle>
            <SheetDescription>
              {selectedProduct?.id} - {selectedProduct?.name}
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {/* Form thêm NVL */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Thêm NVL mới</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nguyên vật liệu *</Label>
                    <Select 
                      value={newMaterial.materialId} 
                      onValueChange={(value) => setNewMaterial({ ...newMaterial, materialId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn NVL" />
                      </SelectTrigger>
                      <SelectContent>
                        {materials.map((m) => (
                          <SelectItem key={m.id} value={m.id}>
                            {m.name} ({m.unit})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Số lượng *</Label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={newMaterial.quantity}
                      onChange={(e) => setNewMaterial({ ...newMaterial, quantity: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Ghi chú</Label>
                  <Textarea
                    placeholder="Ghi chú về định mức..."
                    value={newMaterial.note}
                    onChange={(e) => setNewMaterial({ ...newMaterial, note: e.target.value })}
                  />
                </div>
                <Button onClick={handleAddMaterial} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm NVL
                </Button>
              </CardContent>
            </Card>

            {/* Bảng NVL đã gán */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">NVL đã gán ({getProductQuotas().length})</CardTitle>
              </CardHeader>
              <CardContent>
                {getProductQuotas().length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Chưa có NVL nào được gán
                  </p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>NVL</TableHead>
                        <TableHead>Số lượng</TableHead>
                        <TableHead>Đơn vị</TableHead>
                        <TableHead>Ghi chú</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getProductQuotas().map((quota) => (
                        <TableRow key={quota.materialId}>
                          <TableCell className="font-medium">{getMaterialName(quota.materialId)}</TableCell>
                          <TableCell>{quota.quantity}</TableCell>
                          <TableCell>{getMaterialUnit(quota.materialId)}</TableCell>
                          <TableCell className="text-muted-foreground">{quota.note || '-'}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleRemoveMaterial(quota.materialId)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setIsFormOpen(false)}>
                Hủy
              </Button>
              <Button className="flex-1" onClick={handleSave}>
                Lưu định mức
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </DashboardLayout>
  );
}
