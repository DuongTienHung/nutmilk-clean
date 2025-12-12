import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Search, Filter, ArrowUpDown, TrendingUp, TrendingDown, ArrowRightLeft, Trash2 } from 'lucide-react';

const transactions = [
  {
    id: 'GD-001',
    type: 'Nhập kho',
    sku: 'NVL001',
    name: 'Bột mì loại 1',
    batch: 'L003',
    quantity: 100,
    unit: 'kg',
    before: 400,
    after: 500,
    time: '12/12/2024 10:30',
    user: 'Hoàng Văn Kho',
    reference: 'PN-2024-044',
  },
  {
    id: 'GD-002',
    type: 'Xuất kho',
    sku: 'NVL002',
    name: 'Đường tinh luyện',
    batch: 'L004',
    quantity: 30,
    unit: 'kg',
    before: 330,
    after: 300,
    time: '12/12/2024 09:45',
    user: 'Hoàng Văn Kho',
    reference: 'PX-2024-088',
  },
  {
    id: 'GD-003',
    type: 'Điều chỉnh',
    sku: 'NVL003',
    name: 'Bao bì PE 500g',
    batch: 'L006',
    quantity: -15,
    unit: 'cái',
    before: 5015,
    after: 5000,
    time: '12/12/2024 09:00',
    user: 'Hoàng Văn Kho',
    reference: 'KK-2024-012',
  },
  {
    id: 'GD-004',
    type: 'Hủy',
    sku: 'NVL004',
    name: 'Hương vani',
    batch: 'L007',
    quantity: 2,
    unit: 'lít',
    before: 27,
    after: 25,
    time: '11/12/2024 16:30',
    user: 'Hoàng Văn Kho',
    reference: 'HH-2024-002',
  },
  {
    id: 'GD-005',
    type: 'Nhập kho',
    sku: 'NVL005',
    name: 'Hạt điều rang',
    batch: 'L009',
    quantity: 50,
    unit: 'kg',
    before: 100,
    after: 150,
    time: '11/12/2024 14:00',
    user: 'Hoàng Văn Kho',
    reference: 'PN-2024-043',
  },
  {
    id: 'GD-006',
    type: 'Xuất kho',
    sku: 'NVL001',
    name: 'Bột mì loại 1',
    batch: 'L001',
    quantity: 80,
    unit: 'kg',
    before: 480,
    after: 400,
    time: '11/12/2024 11:20',
    user: 'Hoàng Văn Kho',
    reference: 'PX-2024-087',
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'Nhập kho':
      return <TrendingUp className="w-4 h-4 text-success" />;
    case 'Xuất kho':
      return <TrendingDown className="w-4 h-4 text-accent" />;
    case 'Điều chỉnh':
      return <ArrowRightLeft className="w-4 h-4 text-warning" />;
    case 'Hủy':
      return <Trash2 className="w-4 h-4 text-destructive" />;
    default:
      return null;
  }
};

const getTypeBadge = (type: string) => {
  switch (type) {
    case 'Nhập kho':
      return 'badge-success';
    case 'Xuất kho':
      return 'bg-accent/10 text-accent px-2.5 py-1 rounded-full text-xs font-medium';
    case 'Điều chỉnh':
      return 'badge-warning';
    case 'Hủy':
      return 'px-2.5 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive';
    default:
      return 'badge-primary';
  }
};

export default function StaffHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || t.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <DashboardLayout allowedRoles={['warehouse_staff']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Lịch sử giao dịch kho</h1>
          <p className="text-muted-foreground">Các giao dịch kho do bạn thực hiện</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Tìm theo SKU, tên NVL, mã chứng từ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Loại giao dịch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="Nhập kho">Nhập kho</SelectItem>
              <SelectItem value="Xuất kho">Xuất kho</SelectItem>
              <SelectItem value="Điều chỉnh">Điều chỉnh</SelectItem>
              <SelectItem value="Hủy">Hủy</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Thời gian
          </Button>
        </div>

        <div className="stat-card p-0 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="table-header">
                  <div className="flex items-center gap-2 cursor-pointer">
                    Loại <ArrowUpDown className="w-4 h-4" />
                  </div>
                </TableHead>
                <TableHead className="table-header">NVL</TableHead>
                <TableHead className="table-header">Lô</TableHead>
                <TableHead className="table-header">SL</TableHead>
                <TableHead className="table-header">Tồn trước</TableHead>
                <TableHead className="table-header">Tồn sau</TableHead>
                <TableHead className="table-header">Chứng từ</TableHead>
                <TableHead className="table-header">
                  <div className="flex items-center gap-2 cursor-pointer">
                    Thời gian <ArrowUpDown className="w-4 h-4" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(tx.type)}
                      <span className={getTypeBadge(tx.type)}>{tx.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">{tx.name}</div>
                      <div className="text-xs text-muted-foreground font-mono">{tx.sku}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{tx.batch}</TableCell>
                  <TableCell className={`font-medium ${
                    tx.type === 'Nhập kho' ? 'text-success' :
                    tx.type === 'Xuất kho' || tx.type === 'Hủy' ? 'text-destructive' :
                    tx.quantity > 0 ? 'text-success' : 'text-destructive'
                  }`}>
                    {tx.type === 'Nhập kho' ? '+' : tx.type === 'Xuất kho' || tx.type === 'Hủy' ? '-' : tx.quantity > 0 ? '+' : ''}
                    {Math.abs(tx.quantity)} {tx.unit}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{tx.before}</TableCell>
                  <TableCell className="font-medium text-foreground">{tx.after}</TableCell>
                  <TableCell>
                    <span className="font-mono text-sm text-primary">{tx.reference}</span>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{tx.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Hiển thị {filteredTransactions.length} / {transactions.length} giao dịch
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Trước</Button>
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Sau</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
