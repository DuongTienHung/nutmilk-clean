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

interface AddWarehouseDisposalFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddWarehouseDisposalForm({
  open,
  onOpenChange,
}: AddWarehouseDisposalFormProps) {
  const [formData, setFormData] = useState({
    itemType: 'material', // material | product
    itemName: '',
    batchCode: '',
    quantity: 0,
    reason: 'expired',
    note: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.itemName || !formData.batchCode || formData.quantity <= 0) {
      toast.error('Vui lòng nhập đầy đủ thông tin bắt buộc');
      return;
    }

    toast.success('Tạo phiếu hủy thành công');
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[500px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Tạo phiếu hủy</SheetTitle>
          <SheetDescription>
            Ghi nhận vật tư / thành phẩm bị hủy trong kho
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Loại hàng */}
          <div className="space-y-2">
            <Label>Loại hàng</Label>
            <Select
              value={formData.itemType}
              onValueChange={(value) =>
                setFormData({ ...formData, itemType: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="material">Nguyên vật liệu</SelectItem>
                <SelectItem value="product">Thành phẩm</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tên vật tư / sản phẩm */}
          <div className="space-y-2">
            <Label>Tên vật tư / sản phẩm *</Label>
            <Input
              placeholder="Ví dụ: Đường tinh luyện"
              value={formData.itemName}
              onChange={(e) =>
                setFormData({ ...formData, itemName: e.target.value })
              }
            />
          </div>

          {/* Mã lô */}
          <div className="space-y-2">
            <Label>Mã lô *</Label>
            <Input
              placeholder="LOT-2024-001"
              value={formData.batchCode}
              onChange={(e) =>
                setFormData({ ...formData, batchCode: e.target.value })
              }
            />
          </div>

          {/* Số lượng */}
          <div className="space-y-2">
            <Label>Số lượng hủy *</Label>
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

          {/* Lý do */}
          <div className="space-y-2">
            <Label>Lý do hủy</Label>
            <Select
              value={formData.reason}
              onValueChange={(value) =>
                setFormData({ ...formData, reason: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="expired">Hết hạn</SelectItem>
                <SelectItem value="damaged">Hư hỏng</SelectItem>
                <SelectItem value="quality">Không đạt chất lượng</SelectItem>
                <SelectItem value="other">Khác</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Ghi chú */}
          <div className="space-y-2">
            <Label>Ghi chú</Label>
            <Textarea
              rows={3}
              placeholder="Mô tả chi tiết tình trạng"
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
              Lưu phiếu hủy
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
