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

interface AddProductionRequestFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddProductionRequestForm({
  open,
  onOpenChange,
}: AddProductionRequestFormProps) {
  const [formData, setFormData] = useState({
    requestType: 'material',
    itemName: '',
    quantity: 0,
    unit: 'kg',
    priority: 'normal',
    note: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.itemName || formData.quantity <= 0) {
      toast.error('Vui lòng nhập đầy đủ thông tin bắt buộc');
      return;
    }

    toast.success('Tạo yêu cầu sản xuất thành công');
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[500px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Tạo yêu cầu sản xuất</SheetTitle>
          <SheetDescription>
            Gửi yêu cầu phục vụ quá trình sản xuất
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Loại yêu cầu */}
          <div className="space-y-2">
            <Label>Loại yêu cầu</Label>
            <Select
              value={formData.requestType}
              onValueChange={(value) =>
                setFormData({ ...formData, requestType: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="material">Nguyên vật liệu</SelectItem>
                <SelectItem value="equipment">Thiết bị</SelectItem>
                <SelectItem value="support">Hỗ trợ sản xuất</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tên vật tư / yêu cầu */}
          <div className="space-y-2">
            <Label>Tên yêu cầu *</Label>
            <Input
              placeholder="Ví dụ: Đường tinh luyện"
              value={formData.itemName}
              onChange={(e) =>
                setFormData({ ...formData, itemName: e.target.value })
              }
            />
          </div>

          {/* Số lượng + đơn vị */}
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
                  <SelectItem value="lít">Lít</SelectItem>
                  <SelectItem value="chai">Chai</SelectItem>
                  <SelectItem value="bộ">Bộ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Mức ưu tiên */}
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

          {/* Ghi chú */}
          <div className="space-y-2">
            <Label>Ghi chú</Label>
            <Textarea
              rows={3}
              placeholder="Lý do, ca sản xuất, thời gian cần..."
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
