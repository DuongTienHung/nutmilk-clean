import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Filter, 
  ArrowUpDown,
  Eye,
  Calendar,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const history = [
  { 
    supplier: 'Công ty TNHH ABC',
    material: 'Bột mì loại 1',
    totalQty: 2500,
    totalValue: '125.000.000đ',
    avgPrice: '50.000đ',
    poCount: 5,
  },
  { 
    supplier: 'NCC Bao bì XYZ',
    material: 'Bao bì PE 500g',
    totalQty: 15000,
    totalValue: '30.000.000đ',
    avgPrice: '2.000đ',
    poCount: 3,
  },
  { 
    supplier: 'Đại lý Nguyên liệu DEF',
    material: 'Đường tinh luyện',
    totalQty: 1200,
    totalValue: '36.000.000đ',
    avgPrice: '30.000đ',
    poCount: 4,
  },
  { 
    supplier: 'Công ty CP Phụ gia GHI',
    material: 'Hương vani',
    totalQty: 100,
    totalValue: '20.000.000đ',
    avgPrice: '200.000đ',
    poCount: 2,
  },
];

export default function PurchasingHistory() {
  const [timeFilter, setTimeFilter] = useState('month');

  return (
    <DashboardLayout allowedRoles={['purchasing']}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Lịch sử mua hàng</h1>
            <p className="text-muted-foreground">Thống kê lịch sử mua hàng theo NCC và NVL</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-40">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Tuần này</SelectItem>
                <SelectItem value="month">Tháng này</SelectItem>
                <SelectItem value="quarter">Quý này</SelectItem>
                <SelectItem value="year">Năm nay</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              NCC
            </Button>
          </div>
        </div>

        <div className="stat-card p-0 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="table-header">
                  <div className="flex items-center gap-2 cursor-pointer">
                    NCC <ArrowUpDown className="w-4 h-4" />
                  </div>
                </TableHead>
                <TableHead className="table-header">NVL</TableHead>
                <TableHead className="table-header">Tổng SL</TableHead>
                <TableHead className="table-header">Tổng tiền</TableHead>
                <TableHead className="table-header">Giá TB</TableHead>
                <TableHead className="table-header">Số PO</TableHead>
                <TableHead className="table-header w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium text-foreground">{item.supplier}</TableCell>
                  <TableCell className="text-muted-foreground">{item.material}</TableCell>
                  <TableCell className="font-medium text-foreground">{item.totalQty.toLocaleString()}</TableCell>
                  <TableCell className="font-medium text-foreground">{item.totalValue}</TableCell>
                  <TableCell className="text-muted-foreground">{item.avgPrice}</TableCell>
                  <TableCell>
                    <span className="badge-primary">{item.poCount} đơn</span>
                  </TableCell>
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
