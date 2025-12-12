import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
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
  AlertTriangle,
  Clock,
  Truck,
  ShoppingCart,
} from 'lucide-react';

const suggestions = [
  { 
    sku: 'NVL001',
    name: 'Bột mì loại 1',
    min: 100,
    max: 1000,
    stock: 50,
    forecast: 200,
    suggest: 500,
    reason: 'Dưới tồn tối thiểu',
  },
  { 
    sku: 'NVL002',
    name: 'Đường tinh luyện',
    min: 80,
    max: 500,
    stock: 30,
    forecast: 150,
    suggest: 300,
    reason: 'Dưới tồn tối thiểu',
  },
  { 
    sku: 'NVL003',
    name: 'Bao bì PE 500g',
    min: 1000,
    max: 10000,
    stock: 800,
    forecast: 2000,
    suggest: 3000,
    reason: 'Dưới tồn tối thiểu',
  },
  { 
    sku: 'NVL005',
    name: 'Hương vani',
    min: 10,
    max: 50,
    stock: 25,
    forecast: 30,
    suggest: 20,
    reason: 'Sắp hết hạn',
  },
];

export default function Suggestions() {
  return (
    <DashboardLayout allowedRoles={['purchasing']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gợi ý nhập hàng</h1>
          <p className="text-muted-foreground">Đề xuất NVL cần nhập dựa trên tồn kho và dự báo</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Tồn thấp"
            value="8"
            change="Dưới mức tối thiểu"
            changeType="negative"
            icon={AlertTriangle}
            iconColor="bg-destructive/10 text-destructive"
          />
          <StatCard
            title="Sắp hết hạn"
            value="5"
            change="Trong 30 ngày"
            changeType="negative"
            icon={Clock}
            iconColor="bg-warning/10 text-warning"
          />
          <StatCard
            title="PO đang về"
            value="12"
            change="Đang giao hàng"
            changeType="neutral"
            icon={Truck}
            iconColor="bg-accent/10 text-accent"
          />
          <StatCard
            title="Cần tạo PO"
            value="4"
            change="Đề xuất hôm nay"
            changeType="neutral"
            icon={ShoppingCart}
            iconColor="bg-primary/10 text-primary"
          />
        </div>

        <div className="stat-card p-0 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="table-header">SKU</TableHead>
                <TableHead className="table-header">Tên NVL</TableHead>
                <TableHead className="table-header">Min/Max</TableHead>
                <TableHead className="table-header">Tồn hiện tại</TableHead>
                <TableHead className="table-header">Dự đoán tiêu thụ</TableHead>
                <TableHead className="table-header">Đề xuất nhập</TableHead>
                <TableHead className="table-header">Lý do</TableHead>
                <TableHead className="table-header">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suggestions.map((item) => (
                <TableRow key={item.sku}>
                  <TableCell>
                    <span className="font-mono text-sm font-medium text-primary">{item.sku}</span>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{item.name}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{item.min}/{item.max}</TableCell>
                  <TableCell>
                    <span className={`font-medium ${item.stock < item.min ? 'text-destructive' : 'text-foreground'}`}>
                      {item.stock}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.forecast}</TableCell>
                  <TableCell>
                    <span className="font-medium text-primary">{item.suggest}</span>
                  </TableCell>
                  <TableCell>
                    {item.reason === 'Dưới tồn tối thiểu' ? (
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive">{item.reason}</span>
                    ) : (
                      <span className="badge-warning">{item.reason}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button size="sm" className="btn-primary">
                      Tạo PO
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
