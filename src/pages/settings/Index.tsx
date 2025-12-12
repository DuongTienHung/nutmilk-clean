import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function Index() {
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
          <h1 className="text-2xl font-bold">Cài đặt</h1>
          <p className="text-muted-foreground">
            Tùy chỉnh trải nghiệm sử dụng
          </p>
        </div>

        <div className="stat-card space-y-6">
          <div className="flex items-center justify-between">
            <Label>Thông báo hệ thống</Label>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <Label>Thông báo email</Label>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <Label>Chế độ tối (Dark mode)</Label>
            <Switch />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
