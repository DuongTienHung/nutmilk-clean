import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
import { Badge } from '@/components/ui/badge';
import { Search, Check, X, Plus, Factory, Users, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

// Mock products data
const products = [
  { id: 'SP001', name: 'Sữa hạt óc chó 500ml', group: 'Sữa hạt', unit: 'Chai' },
  { id: 'SP002', name: 'Sữa hạt điều 500ml', group: 'Sữa hạt', unit: 'Chai' },
  { id: 'SP003', name: 'Sữa hạt macca 500ml', group: 'Sữa hạt', unit: 'Chai' },
  { id: 'SP004', name: 'Sữa hạt hạnh nhân 1L', group: 'Sữa hạt', unit: 'Chai' },
  { id: 'SP005', name: 'Sữa đậu nành 1L', group: 'Sữa đậu', unit: 'Chai' },
];

// Mock materials quota based on product
const getProductMaterials = (productId: string, quantity: number) => {
  const quotas: Record<string, { id: string; name: string; unit: string; quota: number; stock: number }[]> = {
    'SP001': [
      { id: 'NVL001', name: 'Hạt óc chó', unit: 'Kg', quota: 0.15, stock: 50 },
      { id: 'NVL002', name: 'Đường', unit: 'Kg', quota: 0.05, stock: 100 },
      { id: 'NVL003', name: 'Nước tinh khiết', unit: 'Lít', quota: 0.4, stock: 500 },
      { id: 'NVL004', name: 'Chai nhựa 500ml', unit: 'Cái', quota: 1, stock: 1000 },
    ],
    'SP002': [
      { id: 'NVL005', name: 'Hạt điều', unit: 'Kg', quota: 0.12, stock: 40 },
      { id: 'NVL002', name: 'Đường', unit: 'Kg', quota: 0.05, stock: 100 },
      { id: 'NVL003', name: 'Nước tinh khiết', unit: 'Lít', quota: 0.42, stock: 500 },
      { id: 'NVL004', name: 'Chai nhựa 500ml', unit: 'Cái', quota: 1, stock: 1000 },
    ],
    'SP003': [
      { id: 'NVL006', name: 'Hạt macca', unit: 'Kg', quota: 0.1, stock: 30 },
      { id: 'NVL002', name: 'Đường', unit: 'Kg', quota: 0.04, stock: 100 },
      { id: 'NVL003', name: 'Nước tinh khiết', unit: 'Lít', quota: 0.45, stock: 500 },
      { id: 'NVL004', name: 'Chai nhựa 500ml', unit: 'Cái', quota: 1, stock: 1000 },
    ],
  };
  
  const baseQuota = quotas[productId] || quotas['SP001'];
  return baseQuota.map(m => ({
    ...m,
    requiredQty: Math.round(m.quota * quantity * 100) / 100,
  }));
};

// Mock employees
const employees = [
  { id: 'NV001', name: 'Nguyễn Văn A', position: 'Công nhân sản xuất' },
  { id: 'NV002', name: 'Trần Thị B', position: 'Công nhân sản xuất' },
  { id: 'NV003', name: 'Lê Văn C', position: 'Trưởng ca' },
  { id: 'NV004', name: 'Phạm Thị D', position: 'Công nhân sản xuất' },
  { id: 'NV005', name: 'Hoàng Văn E', position: 'Công nhân sản xuất' },
];

const shifts = [
  { id: 'CA1', name: 'Ca sáng (6:00 - 14:00)' },
  { id: 'CA2', name: 'Ca chiều (14:00 - 22:00)' },
  { id: 'CA3', name: 'Ca đêm (22:00 - 6:00)' },
];

interface MaterialRow {
  id: string;
  name: string;
  unit: string;
  quota: number;
  requiredQty: number;
  stock: number;
}

export default function CreateProductionOrder() {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Step 1: Product selection
  const [productSearch, setProductSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  
  // Step 2: Production info
  const [quantity, setQuantity] = useState<number>(100);
  const [shift, setShift] = useState('');
  const [deadline, setDeadline] = useState('');
  const [notes, setNotes] = useState('');
  
  // Step 3: Materials
  const [materials, setMaterials] = useState<MaterialRow[]>([]);
  
  // Step 4: Employee assignment
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [assignmentNotes, setAssignmentNotes] = useState('');

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.id.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.group.toLowerCase().includes(productSearch.toLowerCase())
  );

  const handleSelectProduct = (product: typeof products[0]) => {
    setSelectedProduct(product);
    // Load materials based on product and quantity
    const productMaterials = getProductMaterials(product.id, quantity);
    setMaterials(productMaterials);
  };

  const handleQuantityChange = (newQty: number) => {
    setQuantity(newQty);
    if (selectedProduct) {
      const productMaterials = getProductMaterials(selectedProduct.id, newQty);
      setMaterials(productMaterials);
    }
  };

  const handleMaterialQtyChange = (materialId: string, newQty: number) => {
    setMaterials(prev =>
      prev.map(m => m.id === materialId ? { ...m, requiredQty: newQty } : m)
    );
  };

  const toggleEmployee = (empId: string) => {
    setSelectedEmployees(prev =>
      prev.includes(empId)
        ? prev.filter(id => id !== empId)
        : [...prev, empId]
    );
  };

  const handleSubmit = () => {
    if (!selectedProduct) {
      toast({ title: 'Lỗi', description: 'Vui lòng chọn sản phẩm', variant: 'destructive' });
      return;
    }
    if (!shift) {
      toast({ title: 'Lỗi', description: 'Vui lòng chọn ca sản xuất', variant: 'destructive' });
      return;
    }
    if (!deadline) {
      toast({ title: 'Lỗi', description: 'Vui lòng chọn hạn hoàn thành', variant: 'destructive' });
      return;
    }
    if (selectedEmployees.length === 0) {
      toast({ title: 'Lỗi', description: 'Vui lòng chọn ít nhất một nhân viên', variant: 'destructive' });
      return;
    }

    toast({
      title: 'Thành công',
      description: 'Đã tạo phiếu sản xuất thành công!',
    });
    
    navigate('/production/orders');
  };

  const handleCancel = () => {
    navigate('/production/orders');
  };

  const getStockStatus = (required: number, stock: number) => {
    if (stock >= required) {
      return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200">Đủ</Badge>;
    }
    return <Badge variant="destructive">Thiếu {Math.round((required - stock) * 100) / 100}</Badge>;
  };

  return (
    <DashboardLayout allowedRoles={['warehouse_manager', 'admin']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Tạo Phiếu Sản Xuất</h1>
            <p className="text-muted-foreground mt-1">Tạo phiếu sản xuất mới và phân công công việc</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Step 1: Product Selection */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Package className="w-5 h-5 text-primary" />
                1. Chọn sản phẩm
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm theo tên, mã, nhóm..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="border rounded-lg overflow-hidden max-h-[250px] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã</TableHead>
                      <TableHead>Tên sản phẩm</TableHead>
                      <TableHead>Nhóm</TableHead>
                      <TableHead className="w-20"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow 
                        key={product.id}
                        className={selectedProduct?.id === product.id ? 'bg-primary/5' : ''}
                      >
                        <TableCell className="font-mono text-sm">{product.id}</TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{product.group}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant={selectedProduct?.id === product.id ? 'default' : 'outline'}
                            onClick={() => handleSelectProduct(product)}
                          >
                            {selectedProduct?.id === product.id ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              'Chọn'
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {selectedProduct && (
                <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-sm text-muted-foreground">Đã chọn:</p>
                  <p className="font-semibold text-foreground">{selectedProduct.name}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Step 2: Production Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Factory className="w-5 h-5 text-primary" />
                2. Thông tin sản xuất
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Số lượng cần sản xuất</Label>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(Number(e.target.value))}
                    min={1}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Đơn vị</Label>
                  <Input value={selectedProduct?.unit || 'Chai'} disabled />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Ca sản xuất</Label>
                <Select value={shift} onValueChange={setShift}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn ca sản xuất" />
                  </SelectTrigger>
                  <SelectContent>
                    {shifts.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Hạn hoàn thành</Label>
                <Input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Ghi chú</Label>
                <Textarea
                  placeholder="Nhập ghi chú (nếu có)..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Step 3: Materials */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Package className="w-5 h-5 text-primary" />
                3. NVL cần cấp (tự động theo định mức)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {materials.length > 0 ? (
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã NVL</TableHead>
                        <TableHead>Tên NVL</TableHead>
                        <TableHead>Đơn vị</TableHead>
                        <TableHead className="text-right">Định mức/SP</TableHead>
                        <TableHead className="text-right">Số lượng cần</TableHead>
                        <TableHead className="text-right">Tồn kho</TableHead>
                        <TableHead className="text-center">Trạng thái</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {materials.map((material) => (
                        <TableRow key={material.id}>
                          <TableCell className="font-mono text-sm">{material.id}</TableCell>
                          <TableCell className="font-medium">{material.name}</TableCell>
                          <TableCell>{material.unit}</TableCell>
                          <TableCell className="text-right">{material.quota}</TableCell>
                          <TableCell className="text-right">
                            <Input
                              type="number"
                              value={material.requiredQty}
                              onChange={(e) => handleMaterialQtyChange(material.id, Number(e.target.value))}
                              className="w-24 text-right"
                              min={0}
                              step={0.01}
                            />
                          </TableCell>
                          <TableCell className="text-right">{material.stock}</TableCell>
                          <TableCell className="text-center">
                            {getStockStatus(material.requiredQty, material.stock)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Vui lòng chọn sản phẩm để xem danh sách NVL cần cấp
                </div>
              )}
            </CardContent>
          </Card>

          {/* Step 4: Employee Assignment */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="w-5 h-5 text-primary" />
                4. Phân công nhân viên
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {employees.map((emp) => (
                  <div
                    key={emp.id}
                    onClick={() => toggleEmployee(emp.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedEmployees.includes(emp.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{emp.name}</p>
                        <p className="text-sm text-muted-foreground">{emp.position}</p>
                      </div>
                      {selectedEmployees.includes(emp.id) && (
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label>Ghi chú giao việc</Label>
                <Textarea
                  placeholder="Nhập ghi chú giao việc cho nhân viên..."
                  value={assignmentNotes}
                  onChange={(e) => setAssignmentNotes(e.target.value)}
                  rows={2}
                />
              </div>

              {selectedEmployees.length > 0 && (
                <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-sm text-muted-foreground">
                    Đã chọn: <span className="font-semibold text-foreground">{selectedEmployees.length} nhân viên</span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <Button variant="outline" onClick={handleCancel}>
            <X className="w-4 h-4 mr-2" />
            Hủy
          </Button>
          <Button onClick={handleSubmit} className="gradient-primary text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Tạo Phiếu Sản Xuất
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
