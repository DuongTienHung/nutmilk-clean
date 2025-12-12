import { useState } from 'react';
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

interface AddUserFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: UserFormData) => void;
}

export interface UserFormData {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: string;
  status: 'active' | 'locked';
}

const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'warehouse-manager', label: 'Quản lý kho' },
  { value: 'warehouse-staff', label: 'Nhân viên kho' },
  { value: 'purchasing', label: 'Nhân viên mua hàng' },
  { value: 'production', label: 'Nhân viên sản xuất' },
];

export function AddUserForm({ open, onOpenChange, onSubmit }: AddUserFormProps) {
  const [formData, setFormData] = useState<UserFormData>({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '',
    status: 'active',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof UserFormData, string>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<Record<keyof UserFormData, string>> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Họ tên là bắt buộc';
    }
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username là bắt buộc';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username phải có ít nhất 3 ký tự';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    if (!formData.role) {
      newErrors.role = 'Vui lòng chọn vai trò';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    onSubmit?.(formData);
    toast.success('Thêm người dùng thành công');
    handleReset();
    onOpenChange(false);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      role: '',
      status: 'active',
    });
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleCancel = () => {
    handleReset();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[500px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Thêm Người Dùng</SheetTitle>
          <SheetDescription>
            Điền thông tin người dùng mới vào form bên dưới.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Thông tin cá nhân */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Thông tin cá nhân
            </h3>

            {/* Họ tên */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-foreground">
                Họ tên <span className="text-destructive">*</span>
              </Label>
              <Input
                id="fullName"
                placeholder="Nhập họ tên đầy đủ"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className={errors.fullName ? 'border-destructive' : ''}
              />
              {errors.fullName && (
                <p className="text-sm text-destructive">{errors.fullName}</p>
              )}
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground">
                Username <span className="text-destructive">*</span>
              </Label>
              <Input
                id="username"
                placeholder="Nhập username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase() })}
                className={errors.username ? 'border-destructive' : ''}
              />
              {errors.username && (
                <p className="text-sm text-destructive">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email
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
          </div>

          {/* Thông tin hệ thống */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Thông tin hệ thống
            </h3>

            {/* Mật khẩu */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Mật khẩu <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            {/* Xác nhận mật khẩu */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground">
                Xác nhận mật khẩu <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Nhập lại mật khẩu"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={errors.confirmPassword ? 'border-destructive pr-10' : 'pr-10'}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Vai trò */}
            <div className="space-y-2">
              <Label className="text-foreground">
                Vai trò <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger className={errors.role ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-sm text-destructive">{errors.role}</p>
              )}
            </div>

            {/* Trạng thái */}
            <div className="space-y-2">
              <Label className="text-foreground">
                Trạng thái
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value: 'active' | 'locked') => 
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Hoạt động</SelectItem>
                  <SelectItem value="locked">Tạm khóa</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
