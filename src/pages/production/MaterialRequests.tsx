import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { AddProductionRequestForm } from '@/components/forms/AddProductionRequestForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  FileText,
  Clock,
  CheckCircle,
  Plus,
  Send,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const requests = [
  { 
    id: 'YC-2024-045',
    material: 'Hạt điều rang',
    sku: 'NVL010',
    qty: 30,
    status: 'pending',
    date: '10/12/2024',
  },
  { 
    id: 'YC-2024-044',
    material: 'Bao bì 500ml',
    sku: 'NVL003',
    qty: 200,
    status: 'approved',
    date: '10/12/2024',
  },
  { 
    id: 'YC-2024-043',
    material: 'Đường cát',
    sku: 'NVL002',
    qty: 15,
    status: 'delivered',
    date: '09/12/2024',
  },
];

const availableMaterials = [
  { sku: 'NVL001', name: 'Bột mì loại 1' },
  { sku: 'NVL002', name: 'Đường tinh luyện' },
  { sku: 'NVL010', name: 'Hạt điều rang' },
  { sku: 'NVL003', name: 'Bao bì PE 500g' },
];

export default function MaterialRequests() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [qty, setQty] = useState('');
  const [reason, setReason] = useState('');
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="badge-warning">Chờ duyệt</span>;
      case 'approved':
        return <span className="badge-primary">Đã duyệt</span>;
      case 'delivered':
        return <span className="badge-success">Đã cấp</span>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout allowedRoles={['production']}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Yêu cầu cấp NVL</h1>
            <p className="text-muted-foreground">Tạo và theo dõi yêu cầu cấp NVL</p>
          </div>
          <Button className="btn-primary gap-2" onClick={() => setIsAddFormOpen(true)}>
            <Plus className="w-4 h-4" />
            Tạo yêu cầu
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Tổng yêu cầu"
            value="15"
            change="Hôm nay"
            changeType="neutral"
            icon={FileText}
          />
          <StatCard
            title="Chờ duyệt"
            value="3"
            change="Đang chờ"
            changeType="neutral"
            icon={Clock}
            iconColor="bg-warning/10 text-warning"
          />
          <StatCard
            title="Đã cấp"
            value="10"
            change="Hôm nay"
            changeType="positive"
            icon={CheckCircle}
            iconColor="bg-success/10 text-success"
          />
        </div>

        <div className="stat-card p-0 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="table-header">Mã YC</TableHead>
                <TableHead className="table-header">NVL</TableHead>
                <TableHead className="table-header">Số lượng</TableHead>
                <TableHead className="table-header">Ngày</TableHead>
                <TableHead className="table-header">Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>
                    <span className="font-mono text-sm font-medium text-primary">{r.id}</span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">{r.material}</div>
                      <div className="text-xs text-muted-foreground">{r.sku}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{r.qty}</TableCell>
                  <TableCell className="text-muted-foreground">{r.date}</TableCell>
                  <TableCell>{getStatusBadge(r.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <AddProductionRequestForm open={isAddFormOpen} onOpenChange={setIsAddFormOpen} />
      </div>
    </DashboardLayout>
  );
}
