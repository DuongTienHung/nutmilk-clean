import { Button } from '@/components/ui/button';
import { ShieldX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ROLE_DASHBOARDS } from '@/lib/auth';

export default function Unauthorized() {
  const { user } = useAuth();
  const dashboardPath = user ? ROLE_DASHBOARDS[user.role] : '/login';

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
          <ShieldX className="w-10 h-10 text-destructive" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Không có quyền truy cập</h1>
          <p className="text-muted-foreground max-w-md">
            Bạn không có quyền truy cập trang này. Vui lòng liên hệ quản trị viên nếu bạn cho rằng đây là lỗi.
          </p>
        </div>
        <Link to={dashboardPath}>
          <Button className="btn-primary">
            Quay lại Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
