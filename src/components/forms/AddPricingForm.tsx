import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AddPricingFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddPricingForm({ open, onOpenChange }: AddPricingFormProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Thêm bảng giá NCC</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Nhà cung cấp</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Chọn nhà cung cấp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ncc1">Công ty ABC</SelectItem>
                <SelectItem value="ncc2">Công ty XYZ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Vật tư</Label>
            <Input placeholder="Tên vật tư" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Đơn giá</Label>
              <Input type="number" placeholder="VD: 15000" />
            </div>
            <div>
              <Label>Đơn vị</Label>
              <Input placeholder="kg / lít / cái" />
            </div>
          </div>

          <div>
            <Label>Ngày hiệu lực</Label>
            <Input type="date" />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            <Button className="btn-primary">
              Lưu bảng giá
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
