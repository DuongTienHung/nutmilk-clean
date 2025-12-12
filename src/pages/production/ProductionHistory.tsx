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
import { Search, Eye, Calendar, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const history = [
  { 
    batch: 'LTP-2024-089',
    product: 'Sữa hạt điều 500ml',
    qty: 500,
    shift: 'Ca sáng',
    materials: 'Hạt điều, Đường, Nước',
    date: '10/12/2024',
  },
  { 
    batch: 'LTP-2024-088',
    product: 'Sữa hạt óc chó 250ml',
    qty: 300,
    shift: 'Ca sáng',
    materials: 'Hạt óc chó, Đường, Nước',
    date: '10/12/2024',
  },
  { 
    batch: 'LTP-2024-087',
    product: 'Sữa hạt macca 1L',
    qty: 200,
    shift: 'Ca chiều',
    materials: 'Hạt macca, Đường, Nước',
    date: '09/12/2024',
  },
  { 
    batch: 'LTP-2024-086',
    product: 'Sữa hạt điều 1L',
    qty: 150,
    shift: 'Ca sáng',
    materials: 'Hạt điều, Đường, Nước',
    date: '09/12/2024',
  },
];

export default function ProductionHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState('week');

  return (
    <DashboardLayout allowedRoles={['production']}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Lịch sử lô thành phẩm</h1>
            <p className="text-muted-foreground">Xem lịch sử sản xuất theo lô</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-40">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hôm nay</SelectItem>
                <SelectItem value="week">Tuần này</SelectItem>
                <SelectItem value="month">Tháng này</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Sản phẩm
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Tìm theo mã lô, sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
        </div>

        <div className="stat-card p-0 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="table-header">Mã lô</TableHead>
                <TableHead className="table-header">Sản phẩm</TableHead>
                <TableHead className="table-header">Số lượng</TableHead>
                <TableHead className="table-header">Ca</TableHead>
                <TableHead className="table-header">NVL sử dụng</TableHead>
                <TableHead className="table-header">Ngày</TableHead>
                <TableHead className="table-header w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item) => (
                <TableRow key={item.batch}>
                  <TableCell>
                    <span className="font-mono text-sm font-medium text-primary">{item.batch}</span>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{item.product}</TableCell>
                  <TableCell className="font-medium text-foreground">{item.qty} sp</TableCell>
                  <TableCell>
                    <span className="badge-primary">{item.shift}</span>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm max-w-[200px] truncate">
                    {item.materials}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.date}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
