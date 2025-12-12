import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, Package, AlertTriangle, Play, Pause } from 'lucide-react';

const currentOrder = {
  id: 'PSX-2024-089',
  product: 'Sữa hạt điều 500ml',
  qty: 500,
  completed: 300,
  defect: 5,
};

const steps = [
  { id: 1, name: 'Chọn phiếu SX', status: 'completed' },
  { id: 2, name: 'Nhận NVL', status: 'completed' },
  { id: 3, name: 'Ghi nhận đầu vào', status: 'current' },
  { id: 4, name: 'Sản xuất', status: 'pending' },
  { id: 5, name: 'Ghi nhận thành phẩm', status: 'pending' },
];

const receivedMaterials = [
  { name: 'Hạt điều rang', qty: 50, unit: 'kg', used: 30 },
  { name: 'Đường cát', qty: 20, unit: 'kg', used: 12 },
  { name: 'Nước tinh khiết', qty: 200, unit: 'lít', used: 120 },
];

export default function Execute() {
  const [selectedOrder, setSelectedOrder] = useState(currentOrder.id);
  const [outputQty, setOutputQty] = useState('');
  const [defectQty, setDefectQty] = useState('');
  const [note, setNote] = useState('');
  const [isRunning, setIsRunning] = useState(true);

  const progress = (currentOrder.completed / currentOrder.qty) * 100;

  return (
    <DashboardLayout allowedRoles={['production']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Thực hiện sản xuất</h1>
          <p className="text-muted-foreground">Ghi nhận quá trình sản xuất</p>
        </div>

        {/* Progress steps */}
        <div className="stat-card">
          <div className="flex items-center justify-between mb-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                  step.status === 'completed' ? 'bg-success text-success-foreground' :
                  step.status === 'current' ? 'bg-primary text-primary-foreground' :
                  'bg-secondary text-muted-foreground'
                }`}>
                  {step.status === 'completed' ? <CheckCircle className="w-5 h-5" /> : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step.status === 'completed' ? 'bg-success' : 'bg-secondary'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            {steps.map((step) => (
              <span key={step.id} className={step.status === 'current' ? 'text-primary font-medium' : ''}>
                {step.name}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order selection */}
            <div className="stat-card space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Phiếu sản xuất</h3>
              <Select value={selectedOrder} onValueChange={setSelectedOrder}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PSX-2024-089">PSX-2024-089 - Sữa hạt điều 500ml</SelectItem>
                  <SelectItem value="PSX-2024-090">PSX-2024-090 - Sữa hạt óc chó 250ml</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-secondary rounded-lg text-center">
                  <div className="text-2xl font-bold text-foreground">{currentOrder.qty}</div>
                  <div className="text-xs text-muted-foreground">Mục tiêu</div>
                </div>
                <div className="p-4 bg-success/10 rounded-lg text-center">
                  <div className="text-2xl font-bold text-success">{currentOrder.completed}</div>
                  <div className="text-xs text-muted-foreground">Hoàn thành</div>
                </div>
                <div className="p-4 bg-destructive/10 rounded-lg text-center">
                  <div className="text-2xl font-bold text-destructive">{currentOrder.defect}</div>
                  <div className="text-xs text-muted-foreground">Lỗi</div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Tiến độ</span>
                  <span className="font-medium text-foreground">{progress.toFixed(0)}%</span>
                </div>
                <Progress value={progress} className="h-3" />
              </div>

              <div className="flex gap-3">
                <Button 
                  className={isRunning ? 'flex-1' : 'flex-1 btn-primary'}
                  variant={isRunning ? 'outline' : 'default'}
                  onClick={() => setIsRunning(!isRunning)}
                >
                  {isRunning ? <><Pause className="w-4 h-4 mr-2" /> Tạm dừng</> : <><Play className="w-4 h-4 mr-2" /> Tiếp tục</>}
                </Button>
              </div>
            </div>

            {/* Output form */}
            <div className="stat-card space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Ghi nhận sản lượng</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Số lượng thành phẩm</Label>
                  <Input 
                    type="number" 
                    placeholder="0"
                    value={outputQty}
                    onChange={(e) => setOutputQty(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Số lượng lỗi</Label>
                  <Input 
                    type="number" 
                    placeholder="0"
                    value={defectQty}
                    onChange={(e) => setDefectQty(e.target.value)}
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Ghi chú</Label>
                  <Textarea 
                    placeholder="Ghi chú về quá trình sản xuất..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </div>
              <Button className="w-full btn-primary">
                <Package className="w-4 h-4 mr-2" />
                Ghi nhận sản lượng
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="stat-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">NVL đã nhận</h3>
              <div className="space-y-3">
                {receivedMaterials.map((m, i) => (
                  <div key={i} className="p-3 bg-secondary rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-foreground">{m.name}</span>
                      <span className="text-xs text-muted-foreground">{m.qty} {m.unit}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Đã dùng: {m.used} {m.unit}</span>
                      <span className="text-success">Còn: {m.qty - m.used} {m.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 gap-2">
                <AlertTriangle className="w-4 h-4" />
                Yêu cầu thêm NVL
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
