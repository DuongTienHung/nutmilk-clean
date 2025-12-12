import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

const materials = [
  { 
    name: 'Hạt điều rang',
    qty: 50,
    unit: 'kg',
    receipt: 'PC-2024-089',
    status: 'used',
  },
  { 
    name: 'Đường cát',
    qty: 20,
    unit: 'kg',
    receipt: 'PC-2024-089',
    status: 'used',
  },
  { 
    name: 'Nước tinh khiết',
    qty: 200,
    unit: 'lít',
    receipt: 'PC-2024-089',
    status: 'partial',
  },
  { 
    name: 'Bao bì 500ml',
    qty: 500,
    unit: 'cái',
    receipt: 'PC-2024-090',
    status: 'received',
  },
];

export default function ProductionMaterials() {
  return (
    <DashboardLayout allowedRoles={['production']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">NVL đã cấp</h1>
          <p className="text-muted-foreground">Danh sách NVL đã nhận cho sản xuất</p>
        </div>

        <div className="stat-card p-0 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="table-header">NVL</TableHead>
                <TableHead className="table-header">Số lượng</TableHead>
                <TableHead className="table-header">Đơn vị</TableHead>
                <TableHead className="table-header">Phiếu cấp</TableHead>
                <TableHead className="table-header">Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materials.map((m, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium text-foreground">{m.name}</TableCell>
                  <TableCell className="font-medium text-foreground">{m.qty}</TableCell>
                  <TableCell className="text-muted-foreground">{m.unit}</TableCell>
                  <TableCell>
                    <span className="font-mono text-sm text-primary">{m.receipt}</span>
                  </TableCell>
                  <TableCell>
                    {m.status === 'used' ? (
                      <span className="badge-success">Đã dùng hết</span>
                    ) : m.status === 'partial' ? (
                      <span className="badge-warning">Đang dùng</span>
                    ) : (
                      <span className="badge-primary">Đã nhận</span>
                    )}
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
