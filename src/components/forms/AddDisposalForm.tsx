import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { toast } from 'sonner';

interface AddDisposalFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddDisposalForm({ open, onOpenChange }: AddDisposalFormProps) {
  const [formData, setFormData] = useState({
    batchCode: '',
    quantity: 0,
    reason: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Tạo phiếu hủy thành công');
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[500px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Tạo Phiếu Hủy</SheetTitle>
          <SheetDescription>
            Ghi nhận vật tư / lô hàng bị hủy
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="space-y-2">
            <Label>Mã lô</Label>
            <Input
              value={formData.batchCode}
              onChange={(e) =>
                setFormData({ ...formData, batchCode: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Số lượng hủy</Label>
            <Input
              type="number"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: Number(e.target.value) })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Lý do</Label>
            <Textarea
              rows={3}
              value={formData.reason}
              onChange={(e) =>
                setFormData({ ...formData, reason: e.target.value })
              }
            />
          </div>

          <SheetFooter className="mt-8 gap-3">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
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
