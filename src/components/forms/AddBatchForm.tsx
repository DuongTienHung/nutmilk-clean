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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { toast } from 'sonner';

interface AddBatchFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: BatchFormData) => void;
}

export interface BatchFormData {
  materialCode: string;
  batchCode: string;
  quantity: number;
  manufactureDate: string;
  expiryDate: string;
  note: string;
  status: 'available' | 'locked';
}

export function AddBatchForm({ open, onOpenChange, onSubmit }: AddBatchFormProps) {
  const [formData, setFormData] = useState<BatchFormData>({
    materialCode: '',
    batchCode: '',
    quantity: 0,
    manufactureDate: '',
    expiryDate: '',
    note: '',
    status: 'available',
  });

  const [errors, setErrors] =
    useState<Partial<Record<keyof BatchFormData, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof BatchFormData, string>> = {};

    if (!formData.materialCode.trim()) {
      newErrors.materialCode = 'Mã vật tư là bắt buộc';
    }

    if (!formData.batchCode.trim()) {
      newErrors.batchCode = 'Mã lô là bắt buộc';
    }

    if (formData.quantity <= 0) {
      newErrors.quantity = 'Số lượng phải lớn hơn 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    onSubmit?.(formData);
    toast.success('Tạo lô mới thành công');
    handleReset();
    onOpenChange(false);
  };

  const handleReset = () => {
    setFormData({
      materialCode: '',
      batchCode: '',
      quantity: 0,
      manufactureDate: '',
      expiryDate: '',
      note: '',
      status: 'available',
    });
    setErrors({});
  };

  const handleCancel = () => {
    handleReset();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[500px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Tạo Lô Mới</SheetTitle>
          <SheetDescription>
            Nhập thông tin lô vật tư hoặc thành phẩm.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="space-y-2">
            <Label>Mã vật tư *</Label>
            <Input
              value={formData.materialCode}
              onChange={(e) =>
                setFormData({ ...formData, materialCode: e.target.value })
              }
              className={errors.materialCode ? 'border-destructive' : ''}
            />
            {errors.materialCode && (
              <p className="text-sm text-destructive">{errors.materialCode}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Mã lô *</Label>
            <Input
              value={formData.batchCode}
              onChange={(e) =>
                setFormData({ ...formData, batchCode: e.target.value })
              }
              className={errors.batchCode ? 'border-destructive' : ''}
            />
            {errors.batchCode && (
              <p className="text-sm text-destructive">{errors.batchCode}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Số lượng *</Label>
            <Input
              type="number"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: Number(e.target.value) })
              }
              className={errors.quantity ? 'border-destructive' : ''}
            />
            {errors.quantity && (
              <p className="text-sm text-destructive">{errors.quantity}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Ngày sản xuất</Label>
              <Input
                type="date"
                value={formData.manufactureDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    manufactureDate: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Hạn sử dụng</Label>
              <Input
                type="date"
                value={formData.expiryDate}
                onChange={(e) =>
                  setFormData({ ...formData, expiryDate: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Ghi chú</Label>
            <Textarea
              rows={3}
              value={formData.note}
              onChange={(e) =>
                setFormData({ ...formData, note: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Trạng thái</Label>
            <Select
              value={formData.status}
              onValueChange={(value: 'available' | 'locked') =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Sẵn sàng</SelectItem>
                <SelectItem value="locked">Khóa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <SheetFooter className="mt-8 gap-3">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Hủy
            </Button>
            <Button type="submit" className="btn-primary">
              Lưu
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
