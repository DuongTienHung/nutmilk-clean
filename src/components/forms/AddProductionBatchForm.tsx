import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface AddProductionBatchFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddProductionBatchForm({
  open,
  onOpenChange,
}: AddProductionBatchFormProps) {
  const [formData, setFormData] = useState({
    productName: '',
    batchCode: '',
    quantity: 0,
    productionDate: '',
    shift: 'morning',
    note: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.productName || !formData.batchCode || formData.quantity <= 0) {
      toast.error('Vui lòng nhập đầy đủ thông tin bắt buộc');
      return;
    }

    toast.success('Tạo lô sản xuất thành công');
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-lg rounded-xl p-6">
        <DialogHeader>
          <DialogTitle>Tạo lô sản xuất</DialogTitle>
          <DialogDescription>
            Nhập thông tin lô thành phẩm vừa sản xuất
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="space-y-2">
            <Label>
              Tên sản phẩm <span className="text-destructive">*</span>
            </Label>
            <Input
              placeholder="Ví dụ: Sữa hạt óc chó"
              value={formData.productName}
              onChange={(e) =>
                setFormData({ ...formData, productName: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>
              Mã lô sản xuất <span className="text-destructive">*</span>
            </Label>
            <Input
              placeholder="PROD-2024-001"
              value={formData.batchCode}
              onChange={(e) =>
                setFormData({ ...formData, batchCode: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>
              Số lượng sản xuất <span className="text-destructive">*</span>
            </Label>
            <Input
              type="number"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  quantity: Number(e.target.value),
                })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Ngày sản xuất</Label>
              <Input
                type="date"
                value={formData.productionDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    productionDate: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Ca sản xuất</Label>
              <Select
                value={formData.shift}
                onValueChange={(value) =>
                  setFormData({ ...formData, shift: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Ca sáng</SelectItem>
                  <SelectItem value="afternoon">Ca chiều</SelectItem>
                  <SelectItem value="night">Ca đêm</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Ghi chú</Label>
            <Textarea
              rows={3}
              placeholder="Thông tin thêm về lô sản xuất"
              value={formData.note}
              onChange={(e) =>
                setFormData({ ...formData, note: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" type="button" onClick={handleCancel}>
              Hủy
            </Button>
            <Button type="submit" className="btn-primary">
              Lưu
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
