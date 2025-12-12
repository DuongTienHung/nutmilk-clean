import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
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
  ArrowUpDown,
  Eye,
  TrendingUp,
  TrendingDown,
  Settings,
  Trash2,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

const transactions = [
  { 
    id: 'GD-2024-1589',
    type: 'receipt',
    material: 'Bột mì loại 1',
    sku: 'NVL001',
    batch: 'L-2024-156',
    qty: '+200',
    before: 300,
    after: 500,
    user: 'Trần Văn A',
    time: '10/12/2024 10:30',
    ref: 'PN-2024-089',
  },
  { 
    id: 'GD-2024-1588',
    type: 'issue',
    material: 'Đường tinh luyện',
    sku: 'NVL002',
    batch: 'L-2024-155',
    qty: '-50',
    before: 350,
    after: 300,
    user: 'Nguyễn Thị B',
    time: '10/12/2024 09:45',
    ref: 'PX-2024-156',
  },
  { 
    id: 'GD-2024-1587',
    type: 'adjustment',
    material: 'Hương vani',
    sku: 'NVL005',
    batch: 'L-2024-089',
    qty: '-5',
    before: 30,
    after: 25,
    user: 'Lê Văn C',
    time: '10/12/2024 09:00',
    ref: 'DC-2024-045',
  },
  { 
    id: 'GD-2024-1586',
    type: 'disposal',
    material: 'Sữa bột',
    sku: 'NVL010',
    batch: 'L-2024-030',
    qty: '-10',
    before: 10,
    after: 0,
    user: 'Phạm Văn D',
    time: '09/12/2024 16:30',
    ref: 'HH-2024-044',
  },
  { 
    id: 'GD-2024-1585',
    type: 'receipt',
    material: 'Bao bì PE 500g',
    sku: 'NVL003',
    batch: 'L-2024-154',
    qty: '+1000',
    before: 4000,
    after: 5000,
    user: 'Trần Văn A',
    time: '09/12/2024 14:00',
    ref: 'PN-2024-088',
  },
];

export default function WarehouseHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTx, setSelectedTx] = useState<typeof transactions[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleViewDetail = (tx: typeof transactions[0]) => {
    setSelectedTx(tx);
    setIsDetailOpen(true);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'receipt':
        return <TrendingUp className="w-4 h-4 text-success" />;
      case 'issue':
        return <TrendingDown className="w-4 h-4 text-primary" />;
      case 'adjustment':
        return <Settings className="w-4 h-4 text-warning" />;
      case 'disposal':
        return <Trash2 className="w-4 h-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'receipt':
        return <span className="badge-success">Nhập kho</span>;
      case 'issue':
        return <span className="badge-primary">Xuất kho</span>;
      case 'adjustment':
        return <span className="badge-warning">Điều chỉnh</span>;
      case 'disposal':
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive">Hủy</span>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout allowedRoles={['warehouse_manager']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Lịch sử giao dịch kho</h1>
            <p className="text-muted-foreground">Theo dõi toàn bộ giao dịch kho</p>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Tìm theo NVL, lô, mã giao dịch..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Loại GD
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Thời gian
          </Button>
        </div>

        {/* Table */}
        <div className="stat-card p-0 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="table-header">Loại</TableHead>
                <TableHead className="table-header">
                  <div className="flex items-center gap-2 cursor-pointer">
                    NVL <ArrowUpDown className="w-4 h-4" />
                  </div>
                </TableHead>
                <TableHead className="table-header">Lô</TableHead>
                <TableHead className="table-header">SL</TableHead>
                <TableHead className="table-header">Trước</TableHead>
                <TableHead className="table-header">Sau</TableHead>
                <TableHead className="table-header">Người thực hiện</TableHead>
                <TableHead className="table-header">Thời gian</TableHead>
                <TableHead className="table-header w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id} className="cursor-pointer" onClick={() => handleViewDetail(tx)}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(tx.type)}
                      {getTypeBadge(tx.type)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">{tx.material}</div>
                      <div className="text-xs text-muted-foreground">{tx.sku}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">{tx.batch}</TableCell>
                  <TableCell className={`font-medium ${tx.qty.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                    {tx.qty}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{tx.before}</TableCell>
                  <TableCell className="text-foreground">{tx.after}</TableCell>
                  <TableCell className="text-muted-foreground">{tx.user}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{tx.time}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleViewDetail(tx); }}>
                      <Eye className="w-4 h-4" />
                    </Button>
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
              <SheetTitle>Chi tiết giao dịch</SheetTitle>
            </SheetHeader>
            {selectedTx && (
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-xs text-muted-foreground">Mã giao dịch</div>
                    <div className="font-mono font-medium text-foreground">{selectedTx.id}</div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-xs text-muted-foreground">Loại</div>
                    {getTypeBadge(selectedTx.type)}
                  </div>
                  <div className="p-4 bg-secondary rounded-lg col-span-2">
                    <div className="text-xs text-muted-foreground">NVL</div>
                    <div className="font-medium text-foreground">{selectedTx.material}</div>
                    <div className="text-xs text-muted-foreground">{selectedTx.sku}</div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-xs text-muted-foreground">Lô</div>
                    <div className="font-mono font-medium text-foreground">{selectedTx.batch}</div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-xs text-muted-foreground">Số lượng</div>
                    <div className={`text-xl font-bold ${selectedTx.qty.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                      {selectedTx.qty}
                    </div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-xs text-muted-foreground">Tồn trước</div>
                    <div className="font-medium text-foreground">{selectedTx.before}</div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-xs text-muted-foreground">Tồn sau</div>
                    <div className="font-medium text-foreground">{selectedTx.after}</div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-xs text-muted-foreground">Chứng từ</div>
                    <div className="font-mono font-medium text-primary">{selectedTx.ref}</div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-xs text-muted-foreground">Thời gian</div>
                    <div className="font-medium text-foreground">{selectedTx.time}</div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg col-span-2">
                    <div className="text-xs text-muted-foreground">Người thực hiện</div>
                    <div className="font-medium text-foreground">{selectedTx.user}</div>
                  </div>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </DashboardLayout>
  );
}
