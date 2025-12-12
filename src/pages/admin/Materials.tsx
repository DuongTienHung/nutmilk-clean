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
  Box,
  AlertTriangle,
  Layers,
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
import { AddMaterialForm } from '@/components/forms/AddMaterialForm';

const materials = [
  { 
    sku: 'NVL001', 
    name: 'Bột mì loại 1', 
    unit: 'kg', 
    group: 'Nguyên liệu chính',
    perishable: true,
    method: 'FIFO',
    stock: 500,
    batches: 3,
  },
  { 
    sku: 'NVL002', 
    name: 'Đường tinh luyện', 
    unit: 'kg', 
    group: 'Nguyên liệu chính',
    perishable: false,
    method: 'Bình quân',
    stock: 300,
    batches: 2,
  },
  { 
    sku: 'NVL003', 
    name: 'Bao bì PE 500g', 
    unit: 'cái', 
    group: 'Bao bì',
    perishable: false,
    method: 'FIFO',
    stock: 5000,
    batches: 1,
  },
  { 
    sku: 'NVL004', 
    name: 'Hương vani', 
    unit: 'lít', 
    group: 'Phụ gia',
    perishable: true,
    method: 'FIFO',
    stock: 25,
    batches: 2,
  },
  { 
    sku: 'NVL005', 
    name: 'Nhãn in màu', 
    unit: 'cuộn', 
    group: 'Bao bì',
    perishable: false,
    method: 'Bình quân',
    stock: 150,
    batches: 1,
  },
];

export default function Materials() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  return (
    <DashboardLayout allowedRoles={['admin']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Danh mục Nguyên vật liệu</h1>
            <p className="text-muted-foreground">Quản lý thông tin NVL trong hệ thống</p>
          </div>
          <Button className="btn-primary gap-2" onClick={() => setIsAddFormOpen(true)}>
            <Plus className="w-4 h-4" />
            Thêm NVL
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Tổng NVL"
            value="1,234"
            icon={Box}
          />
          <StatCard
            title="Dễ hư hỏng"
            value="156"
            change="Cần theo dõi HSD"
            changeType="negative"
            icon={AlertTriangle}
            iconColor="bg-warning/10 text-warning"
          />
          <StatCard
            title="Có theo lô"
            value="892"
            icon={Layers}
            iconColor="bg-accent/10 text-accent"
          />
          <StatCard
            title="Mới thêm"
            value="45"
            change="30 ngày qua"
            changeType="positive"
            icon={Box}
            iconColor="bg-success/10 text-success"
          />
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Tìm theo SKU, tên NVL..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Nhóm
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Đơn vị
          </Button>
        </div>

        {/* Table */}
        <div className="stat-card p-0 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="table-header">
                  <div className="flex items-center gap-2 cursor-pointer">
                    SKU <ArrowUpDown className="w-4 h-4" />
                  </div>
                </TableHead>
                <TableHead className="table-header">Tên NVL</TableHead>
                <TableHead className="table-header">Đơn vị</TableHead>
                <TableHead className="table-header">Nhóm</TableHead>
                <TableHead className="table-header">Hư hỏng</TableHead>
                <TableHead className="table-header">PP Giá</TableHead>
                <TableHead className="table-header">Tồn</TableHead>
                <TableHead className="table-header">Lô</TableHead>
                <TableHead className="table-header w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materials.map((material) => (
                <TableRow key={material.sku} className="cursor-pointer">
                  <TableCell>
                    <span className="font-mono text-sm font-medium text-primary">{material.sku}</span>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{material.name}</TableCell>
                  <TableCell className="text-muted-foreground">{material.unit}</TableCell>
                  <TableCell>
                    <span className="badge-primary">{material.group}</span>
                  </TableCell>
                  <TableCell>
                    {material.perishable ? (
                      <span className="badge-warning">Có</span>
                    ) : (
                      <span className="text-muted-foreground">Không</span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{material.method}</TableCell>
                  <TableCell className="font-medium text-foreground">{material.stock.toLocaleString()}</TableCell>
                  <TableCell className="text-muted-foreground">{material.batches}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
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

        {/* Add Material Form */}
        <AddMaterialForm 
          open={isAddFormOpen} 
          onOpenChange={setIsAddFormOpen}
        />
      </div>
    </DashboardLayout>
  );
}
