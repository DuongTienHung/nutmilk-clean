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

interface AddSupplierFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: SupplierFormData) => void;
}

export interface SupplierFormData {
  name: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  status: 'active' | 'paused';
}

export function AddSupplierForm({
  open,
  onOpenChange,
  onSubmit,
}: AddSupplierFormProps) {
  const [formData, setFormData] = useState<SupplierFormData>({
    name: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    status: 'active',
  });

  const [errors, setErrors] =
    useState<Partial<Record<keyof SupplierFormData, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof SupplierFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Tên nhà cung cấp là bắt buộc';
    }

    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = 'Email không hợp lệ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    onSubmit?.(formData);
    toast.success('Thêm nhà cung cấp thành công');
    handleCancel();
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      contactName: '',
      email: '',
      phone: '',
      address: '',
      status: 'active',
    });
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-xl rounded-xl p-6">
        <DialogHeader>
          <DialogTitle>Thêm nhà cung cấp</DialogTitle>
          <DialogDescription>
            Điền thông tin nhà cung cấp mới vào form bên dưới.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Tên nhà cung cấp */}
          <div className="space-y-2">
            <Label>
              Tên nhà cung cấp <span className="text-destructive">*</span>
            </Label>
            <Input
              placeholder="Nhập tên nhà cung cấp"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Người liên hệ */}
          <div className="space-y-2">
            <Label>Tên người liên hệ</Label>
            <Input
              placeholder="Nhập tên người liên hệ"
              value={formData.contactName}
              onChange={(e) =>
                setFormData({ ...formData, contactName: e.target.value })
              }
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label>Email liên hệ</Label>
            <Input
              type="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Số điện thoại */}
          <div className="space-y-2">
            <Label>Số điện thoại</Label>
            <Input
              placeholder="0901234567"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          {/* Địa chỉ */}
          <div className="space-y-2">
            <Label>Địa chỉ</Label>
            <Textarea
              rows={3}
              placeholder="Nhập địa chỉ nhà cung cấp"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>

          {/* Trạng thái */}
          <div className="space-y-2">
            <Label>Trạng thái</Label>
            <Select
              value={formData.status}
              onValueChange={(value: 'active' | 'paused') =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Hoạt động</SelectItem>
                <SelectItem value="paused">Tạm ngưng</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
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
