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

export function AddSupplierForm({ open, onOpenChange, onSubmit }: AddSupplierFormProps) {
  const [formData, setFormData] = useState<SupplierFormData>({
    name: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    status: 'active',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof SupplierFormData, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof SupplierFormData, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Tên nhà cung cấp là bắt buộc';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
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
    handleReset();
    onOpenChange(false);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      contactName: '',
      email: '',
      phone: '',
      address: '',
      status: 'active',
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
          <SheetTitle>Thêm Nhà Cung Cấp</SheetTitle>
          <SheetDescription>
            Điền thông tin nhà cung cấp mới vào form bên dưới.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Tên nhà cung cấp */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              Tên nhà cung cấp <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Nhập tên nhà cung cấp"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Tên người liên hệ */}
          <div className="space-y-2">
            <Label htmlFor="contactName" className="text-foreground">
              Tên người liên hệ
            </Label>
            <Input
              id="contactName"
              placeholder="Nhập tên người liên hệ"
              value={formData.contactName}
              onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              Email liên hệ
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Số điện thoại */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground">
              Số điện thoại
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="0901234567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          {/* Địa chỉ */}
          <div className="space-y-2">
            <Label htmlFor="address" className="text-foreground">
              Địa chỉ
            </Label>
            <Textarea
              id="address"
              placeholder="Nhập địa chỉ nhà cung cấp"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              rows={3}
            />
          </div>

          {/* Trạng thái */}
          <div className="space-y-2">
            <Label htmlFor="status" className="text-foreground">
              Trạng thái
            </Label>
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
