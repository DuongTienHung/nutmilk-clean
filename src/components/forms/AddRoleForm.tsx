import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, Shield } from 'lucide-react';
import { toast } from 'sonner';

interface AddRoleFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: RoleFormData) => void;
}

interface RoleFormData {
  name: string;
  description: string;
  permissions: string[];
}

const permissionGroups = [
  {
    name: 'Quản lý kho',
    permissions: [
      { id: 'inventory.view', label: 'Xem tồn kho' },
      { id: 'inventory.edit', label: 'Chỉnh sửa tồn kho' },
      { id: 'receipts.view', label: 'Xem phiếu nhập' },
      { id: 'receipts.create', label: 'Tạo phiếu nhập' },
      { id: 'issues.view', label: 'Xem phiếu xuất' },
      { id: 'issues.create', label: 'Tạo phiếu xuất' },
      { id: 'stocktake.view', label: 'Xem kiểm kê' },
      { id: 'stocktake.execute', label: 'Thực hiện kiểm kê' },
    ],
  },
  {
    name: 'Mua hàng',
    permissions: [
      { id: 'orders.view', label: 'Xem đơn mua' },
      { id: 'orders.create', label: 'Tạo đơn mua' },
      { id: 'orders.edit', label: 'Chỉnh sửa đơn mua' },
      { id: 'orders.approve', label: 'Duyệt đơn mua' },
      { id: 'suppliers.view', label: 'Xem nhà cung cấp' },
      { id: 'suppliers.edit', label: 'Quản lý nhà cung cấp' },
      { id: 'requests.view', label: 'Xem yêu cầu mua' },
      { id: 'requests.approve', label: 'Duyệt yêu cầu mua' },
    ],
  },
  {
    name: 'Sản xuất',
    permissions: [
      { id: 'production.view', label: 'Xem phiếu sản xuất' },
      { id: 'production.create', label: 'Tạo phiếu sản xuất' },
      { id: 'production.execute', label: 'Thực hiện sản xuất' },
      { id: 'batches.view', label: 'Xem lô thành phẩm' },
      { id: 'batches.create', label: 'Tạo lô thành phẩm' },
      { id: 'materials.request', label: 'Yêu cầu NVL' },
    ],
  },
  {
    name: 'Báo cáo',
    permissions: [
      { id: 'reports.view', label: 'Xem báo cáo' },
      { id: 'reports.export', label: 'Xuất báo cáo' },
    ],
  },
  {
    name: 'Hệ thống',
    permissions: [
      { id: 'users.view', label: 'Xem người dùng' },
      { id: 'users.manage', label: 'Quản lý người dùng' },
      { id: 'roles.view', label: 'Xem vai trò' },
      { id: 'roles.manage', label: 'Quản lý vai trò' },
      { id: 'settings.view', label: 'Xem cài đặt' },
      { id: 'settings.edit', label: 'Chỉnh sửa cài đặt' },
    ],
  },
];

export function AddRoleForm({
  open,
  onOpenChange,
  onSubmit,
}: AddRoleFormProps) {
  const [formData, setFormData] = useState<RoleFormData>({
    name: '',
    description: '',
    permissions: [],
  });

  const [expandedGroups, setExpandedGroups] = useState<string[]>([
    'Quản lý kho',
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleGroup = (groupName: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupName)
        ? prev.filter((g) => g !== groupName)
        : [...prev, groupName]
    );
  };

  const togglePermission = (permissionId: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((p) => p !== permissionId)
        : [...prev.permissions, permissionId],
    }));
  };

  const toggleAllInGroup = (group: typeof permissionGroups[number]) => {
    const groupIds = group.permissions.map((p) => p.id);
    const allSelected = groupIds.every((id) =>
      formData.permissions.includes(id)
    );

    setFormData((prev) => ({
      ...prev,
      permissions: allSelected
        ? prev.permissions.filter((p) => !groupIds.includes(p))
        : Array.from(new Set([...prev.permissions, ...groupIds])),
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Vui lòng nhập tên vai trò';
    if (formData.permissions.length === 0)
      newErrors.permissions = 'Vui lòng chọn ít nhất một quyền';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit?.(formData);
    toast.success('Thêm vai trò thành công!');
    handleCancel();
  };

  const handleCancel = () => {
    setFormData({ name: '', description: '', permissions: [] });
    setErrors({});
    setExpandedGroups(['Quản lý kho']);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-4xl rounded-xl p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Thêm vai trò
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {/* Thông tin cơ bản */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase">
              Thông tin cơ bản
            </h3>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Tên vai trò <span className="text-destructive">*</span>
              </label>
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
              <label className="text-sm font-medium">Mô tả</label>
              <Textarea
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
          </div>

          {/* Phân quyền */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase">
                Phân quyền <span className="text-destructive">*</span>
              </h3>
              <span className="text-sm text-muted-foreground">
                Đã chọn: {formData.permissions.length} quyền
              </span>
            </div>

            {errors.permissions && (
              <p className="text-sm text-destructive">{errors.permissions}</p>
            )}

            <div className="space-y-2">
              {permissionGroups.map((group) => {
                const ids = group.permissions.map((p) => p.id);
                const selected = ids.filter((id) =>
                  formData.permissions.includes(id)
                ).length;

                return (
                  <Collapsible
                    key={group.name}
                    open={expandedGroups.includes(group.name)}
                    onOpenChange={() => toggleGroup(group.name)}
                  >
                    <CollapsibleTrigger className="flex w-full items-center justify-between p-3 bg-secondary rounded-lg">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={selected === ids.length}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleAllInGroup(group);
                          }}
                        />
                        <span className="font-medium">{group.name}</span>
                        <span className="text-sm text-muted-foreground">
                          ({selected}/{ids.length})
                        </span>
                      </div>
                      {expandedGroups.includes(group.name) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div className="grid grid-cols-2 gap-3 p-3 bg-secondary/30 rounded-b-lg">
                        {group.permissions.map((p) => (
                          <div key={p.id} className="flex items-center gap-2">
                            <Checkbox
                              checked={formData.permissions.includes(p.id)}
                              onCheckedChange={() => togglePermission(p.id)}
                            />
                            <span className="text-sm">{p.label}</span>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button className="flex-1 btn-primary" onClick={handleSubmit}>
              Lưu
            </Button>
            <Button className="flex-1" variant="outline" onClick={handleCancel}>
              Hủy
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
