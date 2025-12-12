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

interface AddPurchaseRequestFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddPurchaseRequestForm({
  open,
  onOpenChange,
}: AddPurchaseRequestFormProps) {
  const [formData, setFormData] = useState({
    materialName: '',
    quantity: 0,
    unit: 'kg',
    priority: 'normal',
    note: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.materialName || formData.quantity <= 0) {
      toast.error('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    toast.success('Tạo yêu cầu mua thành công');
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[500px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Tạo yêu cầu mua</SheetTitle>
          <SheetDescription>
            Nhập thông tin yêu cầu mua vật tư
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="space-y-2">
            <Label>Tên vật tư *</Label>
            <Input
              placeholder="Ví dụ: Đường tinh luyện"
              value={formData.materialName}
              onChange={(e) =>
                setFormData({ ...formData, materialName: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Số lượng *</Label>
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

            <div className="space-y-2">
              <Label>Đơn vị</Label>
              <Select
                value={formData.unit}
                onValueChange={(value) =>
                  setFormData({ ...formData, unit: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">Kg</SelectItem>
                  <SelectItem value="chai">Chai</SelectItem>
                  <SelectItem value="thùng">Thùng</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Mức ưu tiên</Label>
            <Select
              value={formData.priority}
              onValueChange={(value) =>
                setFormData({ ...formData, priority: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Thấp</SelectItem>
                <SelectItem value="normal">Bình thường</SelectItem>
                <SelectItem value="high">Gấp</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Ghi chú</Label>
            <Textarea
              rows={3}
              placeholder="Lý do mua, thời gian cần..."
              value={formData.note}
              onChange={(e) =>
                setFormData({ ...formData, note: e.target.value })
              }
            />
          </div>

          <SheetFooter className="mt-8 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>
            <Button type="submit" className="btn-primary">
              Gửi yêu cầu
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
