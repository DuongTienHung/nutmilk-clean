import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
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

interface AddMaterialFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: MaterialFormData) => void;
}

export interface MaterialFormData {
  name: string;
  sku: string;
  group: string;
  unit: string;
  trackByBatch: boolean;
  hasExpiry: boolean;
  minStock: number;
  maxStock: number;
  defaultSupplier: string;
  status: 'active' | 'inactive';
}

const materialGroups = [
  'Nguyên liệu chính',
  'Phụ gia',
  'Bao bì',
  'Vật tư',
  'Khác',
];

const units = [
  'kg',
  'g',
  'lít',
  'ml',
  'cái',
  'hộp',
  'cuộn',
  'thùng',
];

const suppliers = [
  { id: 'NCC001', name: 'Công ty TNHH Thực phẩm ABC' },
  { id: 'NCC002', name: 'NCC Bao bì XYZ' },
  { id: 'NCC003', name: 'Đại lý Nguyên liệu DEF' },
  { id: 'NCC004', name: 'Công ty CP Phụ gia GHI' },
];

export function AddMaterialForm({
  open,
  onOpenChange,
  onSubmit,
}: AddMaterialFormProps) {
  const [formData, setFormData] = useState<MaterialFormData>({
    name: '',
    sku: '',
    group: '',
    unit: '',
    trackByBatch: false,
    hasExpiry: false,
    minStock: 0,
    maxStock: 0,
    defaultSupplier: '',
    status: 'active',
  });

  const [errors, setErrors] =
    useState<Partial<Record<keyof MaterialFormData, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof MaterialFormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = 'Tên NVL là bắt buộc';
    if (!formData.sku.trim()) newErrors.sku = 'Mã SKU là bắt buộc';
    if (!formData.group) newErrors.group = 'Vui lòng chọn nhóm NVL';
    if (!formData.unit) newErrors.unit = 'Vui lòng chọn đơn vị tính';

    if (formData.minStock < 0)
      newErrors.minStock = 'Mức tồn tối thiểu không thể âm';

    if (formData.maxStock < 0)
      newErrors.maxStock = 'Mức tồn tối đa không thể âm';

    if (formData.maxStock > 0 && formData.minStock > formData.maxStock) {
      newErrors.minStock = 'Mức tồn tối thiểu không thể lớn hơn tối đa';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    onSubmit?.(formData);
    toast.success('Thêm nguyên vật liệu thành công');
    handleReset();
    onOpenChange(false);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      sku: '',
      group: '',
      unit: '',
      trackByBatch: false,
      hasExpiry: false,
      minStock: 0,
      maxStock: 0,
      defaultSupplier: '',
      status: 'active',
    });
    setErrors({});
  };

  const handleCancel = () => {
    handleReset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-2xl rounded-xl p-6 overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Thêm nguyên vật liệu</DialogTitle>
          <DialogDescription>
            Điền thông tin nguyên vật liệu mới vào form bên dưới
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Thông tin cơ bản */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase">
              Thông tin cơ bản
            </h3>

            <div className="space-y-2">
              <Label>
                Tên NVL <span className="text-destructive">*</span>
              </Label>
              <Input
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

            <div className="space-y-2">
              <Label>
                Mã SKU <span className="text-destructive">*</span>
              </Label>
              <Input
                value={formData.sku}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sku: e.target.value.toUpperCase(),
                  })
                }
                className={errors.sku ? 'border-destructive' : ''}
              />
              {errors.sku && (
                <p className="text-sm text-destructive">{errors.sku}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>
                Nhóm NVL <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.group}
                onValueChange={(value) =>
                  setFormData({ ...formData, group: value })
                }
              >
                <SelectTrigger
                  className={errors.group ? 'border-destructive' : ''}
                >
                  <SelectValue placeholder="Chọn nhóm NVL" />
                </SelectTrigger>
                <SelectContent>
                  {materialGroups.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.group && (
                <p className="text-sm text-destructive">{errors.group}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>
                Đơn vị tính <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.unit}
                onValueChange={(value) =>
                  setFormData({ ...formData, unit: value })
                }
              >
                <SelectTrigger
                  className={errors.unit ? 'border-destructive' : ''}
                >
                  <SelectValue placeholder="Chọn đơn vị tính" />
                </SelectTrigger>
                <SelectContent>
                  {units.map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.unit && (
                <p className="text-sm text-destructive">{errors.unit}</p>
              )}
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={formData.trackByBatch}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    trackByBatch: checked as boolean,
                  })
                }
              />
              <Label className="cursor-pointer">Quản lý theo lô</Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                checked={formData.hasExpiry}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    hasExpiry: checked as boolean,
                  })
                }
              />
              <Label className="cursor-pointer">Có hạn sử dụng</Label>
            </div>
          </div>

          {/* Min / Max */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Mức tồn tối thiểu</Label>
              <Input
                type="number"
                value={formData.minStock || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    minStock: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Mức tồn tối đa</Label>
              <Input
                type="number"
                value={formData.maxStock || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    maxStock: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          {/* Nhà cung cấp */}
          <div className="space-y-2">
            <Label>NCC mặc định</Label>
            <Select
              value={formData.defaultSupplier}
              onValueChange={(value) =>
                setFormData({ ...formData, defaultSupplier: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn nhà cung cấp" />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Trạng thái */}
          <div className="space-y-2">
            <Label>Trạng thái</Label>
            <Select
              value={formData.status}
              onValueChange={(value: 'active' | 'inactive') =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Đang sử dụng</SelectItem>
                <SelectItem value="inactive">Ngừng sử dụng</SelectItem>
              </SelectContent>
            </Select>
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
