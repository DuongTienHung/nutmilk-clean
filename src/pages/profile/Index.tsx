import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { ROLE_LABELS } from '@/lib/auth';

export default function Index() {
  const { user } = useAuth();

  if (!user) return null; // hoặc loading

  return (
    <DashboardLayout
      allowedRoles={[
        'admin',
        'warehouse_manager',
        'warehouse_staff',
        'purchasing',
        'production',
      ]}
    >
      <div className="max-w-3xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Hồ sơ cá nhân</h1>
          <p className="text-muted-foreground">
            Thông tin tài khoản của bạn
          </p>
        </div>

        <div className="stat-card space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Họ tên</Label>
              <Input value={user.name} disabled />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={user.email} disabled />
            </div>

            <div className="space-y-2">
              <Label>Vai trò</Label>
              <Input value={ROLE_LABELS[user.role]} disabled />
            </div>

            <div className="space-y-2">
              <Label>Tên đăng nhập</Label>
              <Input value={user.username} disabled />
            </div>
          </div>

          <div className="flex justify-end">
            <Button className="btn-primary">
              Chỉnh sửa hồ sơ
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
