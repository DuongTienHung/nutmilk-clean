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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Package,
  DollarSign,
  AlertTriangle,
  TrendingDown,
  ArrowUpDown,
  MoreHorizontal,
  Eye,
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

const inventoryItems = [
  { 
    sku: 'NVL001', 
    name: 'Bột mì loại 1', 
    group: 'Nguyên liệu chính',
    unit: 'kg', 
    stock: 500,
    batchStock: 3,
    allocated: 50,
    min: 100,
    max: 1000,
    value: '25.000.000đ',
  },
  { 
    sku: 'NVL002', 
    name: 'Đường tinh luyện', 
    group: 'Nguyên liệu chính',
    unit: 'kg', 
    stock: 300,
    batchStock: 2,
    allocated: 30,
    min: 80,
    max: 500,
    value: '15.000.000đ',
  },
  { 
    sku: 'NVL003', 
    name: 'Hạt điều rang', 
    group: 'Nguyên liệu chính',
    unit: 'kg', 
    stock: 150,
    batchStock: 4,
    allocated: 25,
    min: 50,
    max: 300,
    value: '45.000.000đ',
  },
  { 
    sku: 'NVL004', 
    name: 'Bao bì PE 500g', 
    group: 'Bao bì',
    unit: 'cái', 
    stock: 5000,
    batchStock: 1,
    allocated: 500,
    min: 1000,
    max: 10000,
    value: '10.000.000đ',
  },
  { 
    sku: 'NVL005', 
    name: 'Hương vani', 
    group: 'Phụ gia',
    unit: 'lít', 
    stock: 25,
    batchStock: 2,
    allocated: 5,
    min: 10,
    max: 50,
    value: '5.000.000đ',
  },
];

const batchDetails = [
  { batch: 'L-2024-001', qty: 200, expiry: '15/03/2025', location: 'Kho A1' },
  { batch: 'L-2024-045', qty: 150, expiry: '20/04/2025', location: 'Kho A1' },
  { batch: 'L-2024-089', qty: 150, expiry: '10/05/2025', location: 'Kho A2' },
];

const transactionLog = [
  { date: '10/12/2024', type: 'Nhập', qty: '+100', ref: 'PN-2024-089', user: 'Trần Văn A' },
  { date: '09/12/2024', type: 'Xuất', qty: '-50', ref: 'PX-2024-156', user: 'Nguyễn Thị B' },
  { date: '08/12/2024', type: 'Nhập', qty: '+200', ref: 'PN-2024-088', user: 'Trần Văn A' },
];

export default function Inventory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<typeof inventoryItems[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleViewDetail = (item: typeof inventoryItems[0]) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  return (
    <DashboardLayout allowedRoles={['warehouse_manager']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Theo dõi tồn kho</h1>
            <p className="text-muted-foreground">Quản lý số lượng tồn kho NVL</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Tổng tồn kho"
            value="12,458"
            change="1,234 SKU"
            changeType="neutral"
            icon={Package}
          />
          <StatCard
            title="Giá trị tồn"
            value="2.5 tỷ"
            change="+12% tháng này"
            changeType="positive"
            icon={DollarSign}
            iconColor="bg-success/10 text-success"
          />
          <StatCard
            title="Dưới tồn tối thiểu"
            value="8"
            change="Cần nhập thêm"
            changeType="negative"
            icon={AlertTriangle}
            iconColor="bg-warning/10 text-warning"
          />
          <StatCard
            title="Tồn âm"
            value="0"
            change="Không có"
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
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Theo lô
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
                <TableHead className="table-header">Nhóm</TableHead>
                <TableHead className="table-header">Đơn vị</TableHead>
                <TableHead className="table-header">Tồn</TableHead>
                <TableHead className="table-header">Lô</TableHead>
                <TableHead className="table-header">Đã cấp</TableHead>
                <TableHead className="table-header">Min/Max</TableHead>
                <TableHead className="table-header">Giá trị</TableHead>
                <TableHead className="table-header w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryItems.map((item) => (
                <TableRow key={item.sku} className="cursor-pointer" onClick={() => handleViewDetail(item)}>
                  <TableCell>
                    <span className="font-mono text-sm font-medium text-primary">{item.sku}</span>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{item.name}</TableCell>
                  <TableCell>
                    <span className="badge-primary">{item.group}</span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.unit}</TableCell>
                  <TableCell>
                    <span className={`font-medium ${item.stock < item.min ? 'text-destructive' : 'text-foreground'}`}>
                      {item.stock.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.batchStock}</TableCell>
                  <TableCell className="text-muted-foreground">{item.allocated}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{item.min}/{item.max}</TableCell>
                  <TableCell className="font-medium text-foreground">{item.value}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetail(item)}>
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

        {/* Detail Sheet */}
        <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <SheetContent className="w-[600px] sm:w-[700px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Chi tiết tồn kho</SheetTitle>
            </SheetHeader>
            {selectedItem && (
              <div className="mt-6">
                <Tabs defaultValue="info" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="info">Thông tin</TabsTrigger>
                    <TabsTrigger value="batches">Tồn theo lô</TabsTrigger>
                    <TabsTrigger value="log">Nhật ký</TabsTrigger>
                    <TabsTrigger value="alerts">Cảnh báo</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="info" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-secondary rounded-lg">
                        <div className="text-xs text-muted-foreground">SKU</div>
                        <div className="font-mono font-medium text-foreground">{selectedItem.sku}</div>
                      </div>
                      <div className="p-4 bg-secondary rounded-lg">
                        <div className="text-xs text-muted-foreground">Nhóm</div>
                        <div className="font-medium text-foreground">{selectedItem.group}</div>
                      </div>
                      <div className="p-4 bg-secondary rounded-lg">
                        <div className="text-xs text-muted-foreground">Tồn hiện tại</div>
                        <div className="text-2xl font-bold text-foreground">{selectedItem.stock} {selectedItem.unit}</div>
                      </div>
                      <div className="p-4 bg-secondary rounded-lg">
                        <div className="text-xs text-muted-foreground">Giá trị</div>
                        <div className="text-2xl font-bold text-foreground">{selectedItem.value}</div>
                      </div>
                      <div className="p-4 bg-secondary rounded-lg">
                        <div className="text-xs text-muted-foreground">Tồn tối thiểu</div>
                        <div className="font-medium text-foreground">{selectedItem.min} {selectedItem.unit}</div>
                      </div>
                      <div className="p-4 bg-secondary rounded-lg">
                        <div className="text-xs text-muted-foreground">Tồn tối đa</div>
                        <div className="font-medium text-foreground">{selectedItem.max} {selectedItem.unit}</div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="batches" className="mt-4">
                    <div className="space-y-3">
                      {batchDetails.map((batch) => (
                        <div key={batch.batch} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                          <div>
                            <div className="font-medium text-foreground">{batch.batch}</div>
                            <div className="text-xs text-muted-foreground">HSD: {batch.expiry}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-foreground">{batch.qty} {selectedItem.unit}</div>
                            <div className="text-xs text-muted-foreground">{batch.location}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="log" className="mt-4">
                    <div className="space-y-3">
                      {transactionLog.map((log, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                          <div>
                            <div className="font-medium text-foreground">{log.ref}</div>
                            <div className="text-xs text-muted-foreground">{log.date} - {log.user}</div>
                          </div>
                          <div className="text-right">
                            <div className={`font-medium ${log.qty.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                              {log.qty}
                            </div>
                            <span className={log.type === 'Nhập' ? 'badge-success' : 'badge-primary'}>{log.type}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="alerts" className="mt-4">
                    {selectedItem.stock < selectedItem.min ? (
                      <div className="p-4 bg-destructive/10 rounded-lg">
                        <div className="flex items-center gap-2 text-destructive font-medium">
                          <AlertTriangle className="w-5 h-5" />
                          Tồn kho dưới mức tối thiểu
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Cần nhập thêm {selectedItem.min - selectedItem.stock} {selectedItem.unit} để đạt mức tối thiểu.
                        </p>
                      </div>
                    ) : (
                      <div className="p-4 bg-success/10 rounded-lg">
                        <div className="flex items-center gap-2 text-success font-medium">
                          Tồn kho ổn định
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Không có cảnh báo nào.
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </DashboardLayout>
  );
}
