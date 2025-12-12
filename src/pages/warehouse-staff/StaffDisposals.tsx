import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { AddWarehouseDisposalForm } from '@/components/forms/AddWarehouseDisposalForm';
import { Input } from '@/components/ui/input';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, AlertTriangle, Trash2, Calendar, Upload } from 'lucide-react';
import { toast } from 'sonner';

const disposalRecords = [
  {
    id: 'HH-2024-001',
    sku: 'NVL001',
    name: 'Bột mì loại 1',
    batch: 'L001',
    quantity: 50,
    unit: 'kg',
    reason: 'Hết hạn sử dụng',
    date: '10/12/2024',
    user: 'Hoàng Văn Kho',
  },
  {
    id: 'HH-2024-002',
    sku: 'NVL004',
    name: 'Hương vani',
    batch: 'L007',
    quantity: 2,
    unit: 'lít',
    reason: 'Hư hỏng do vận chuyển',
    date: '08/12/2024',
    user: 'Hoàng Văn Kho',
  },
  {
    id: 'HH-2024-003',
    sku: 'NVL003',
    name: 'Bao bì PE 500g',
    batch: 'L006',
    quantity: 100,
    unit: 'cái',
    reason: 'Lỗi in ấn',
    date: '05/12/2024',
    user: 'Trần Văn B',
  },
];

const materials = [
  { sku: 'NVL001', name: 'Bột mì loại 1', unit: 'kg', batches: ['L001', 'L002', 'L003'] },
  { sku: 'NVL002', name: 'Đường tinh luyện', unit: 'kg', batches: ['L004', 'L005'] },
  { sku: 'NVL003', name: 'Bao bì PE 500g', unit: 'cái', batches: ['L006'] },
  { sku: 'NVL004', name: 'Hương vani', unit: 'lít', batches: ['L007', 'L008'] },
];

const reasons = [
  'Hết hạn sử dụng',
  'Hư hỏng do vận chuyển',
  'Hư hỏng do lưu kho',
  'Lỗi sản xuất',
  'Lỗi in ấn/bao bì',
  'Côn trùng/nấm mốc',
  'Khác',
];

export default function StaffDisposals() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [note, setNote] = useState('');
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const currentMaterial = materials.find(m => m.sku === selectedMaterial);

  const handleSubmit = () => {
    if (!selectedMaterial || !selectedBatch || !quantity || !selectedReason) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }
    toast.success('Đã tạo phiếu hủy hàng');
    setIsDialogOpen(false);
    // Reset form
    setSelectedMaterial('');
    setSelectedBatch('');
    setQuantity('');
    setSelectedReason('');
    setNote('');
  };

  return (
    <DashboardLayout allowedRoles={['warehouse_staff']}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Hủy hàng</h1>
            <p className="text-muted-foreground">Ghi nhận và xử lý hàng hóa cần hủy</p>
          </div>
          <Button className="btn-primary gap-2" onClick={() => setIsAddFormOpen(true)}>
            <Plus className="w-4 h-4" />
            Tạo phiếu hủy hàng
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Tổng SL hủy tháng này"
            value="152"
            icon={Trash2}
            iconColor="bg-destructive/10 text-destructive"
          />
          <StatCard
            title="Hủy hôm nay"
            value="0"
            icon={Calendar}
            iconColor="bg-warning/10 text-warning"
          />
          <StatCard
            title="Hết hạn sử dụng"
            value="50"
            icon={AlertTriangle}
            iconColor="bg-warning/10 text-warning"
          />
          <StatCard
            title="Hư hỏng"
            value="102"
            icon={Trash2}
            iconColor="bg-muted text-muted-foreground"
          />
        </div>

        <div className="stat-card p-0 overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Lịch sử hủy hàng</h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="table-header">Mã phiếu</TableHead>
                <TableHead className="table-header">NVL</TableHead>
                <TableHead className="table-header">Lô</TableHead>
                <TableHead className="table-header">Số lượng</TableHead>
                <TableHead className="table-header">Lý do</TableHead>
                <TableHead className="table-header">Ngày hủy</TableHead>
                <TableHead className="table-header">Người thực hiện</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {disposalRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-mono text-sm text-primary">{record.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">{record.name}</div>
                      <div className="text-xs text-muted-foreground">{record.sku}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{record.batch}</TableCell>
                  <TableCell className="font-medium text-foreground">{record.quantity} {record.unit}</TableCell>
                  <TableCell>
                    <span className="badge-warning">{record.reason}</span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{record.date}</TableCell>
                  <TableCell className="text-muted-foreground">{record.user}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <AddWarehouseDisposalForm open={isAddFormOpen} onOpenChange={setIsAddFormOpen} />
      </div>
    </DashboardLayout>
  );
}
