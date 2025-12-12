import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { ROLE_DASHBOARDS, ROLE_LABELS } from '@/lib/auth';
import { Package, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const success = login(username, password);
    
    if (success) {
      const user = JSON.parse(localStorage.getItem('nutmilk_user') || '{}');
      toast.success(`Chào mừng ${user.name}!`, {
        description: `Đăng nhập với vai trò: ${ROLE_LABELS[user.role as keyof typeof ROLE_LABELS]}`,
      });
      navigate(ROLE_DASHBOARDS[user.role as keyof typeof ROLE_DASHBOARDS]);
    } else {
      toast.error('Đăng nhập thất bại', {
        description: 'Tài khoản hoặc mật khẩu không đúng.',
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại trang chủ
          </Link>
          
          <div className="space-y-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                <Package className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground">NutMilk ERP</span>
            </div>
            
            <h1 className="text-3xl font-bold text-foreground">Đăng nhập</h1>
            <p className="text-muted-foreground">
              Nhập thông tin tài khoản để truy cập hệ thống
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Tên đăng nhập</Label>
              <Input
                id="username"
                type="text"
                placeholder="Nhập tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 rounded-xl"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-xl pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 btn-primary rounded-xl text-base font-medium"
              disabled={isLoading}
            >
              {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
          </form>

          {/* Demo accounts */}
          <div className="pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">Tài khoản demo:</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 bg-secondary rounded-lg">
                <span className="font-semibold text-foreground">a</span>
                <span className="text-muted-foreground"> - Admin</span>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <span className="font-semibold text-foreground">b</span>
                <span className="text-muted-foreground"> - Quản lý kho</span>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <span className="font-semibold text-foreground">c</span>
                <span className="text-muted-foreground"> - Mua hàng</span>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <span className="font-semibold text-foreground">d</span>
                <span className="text-muted-foreground"> - Sản xuất</span>
              </div>
              <div className="p-3 bg-secondary rounded-lg col-span-2">
                <span className="font-semibold text-foreground">e</span>
                <span className="text-muted-foreground"> - Nhân viên kho</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Mật khẩu: bất kỳ ký tự</p>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary to-accent p-12 items-center justify-center">
        <div className="max-w-lg text-primary-foreground space-y-6">
          <h2 className="text-4xl font-bold">
            Quản lý kho thông minh, vận hành hiệu quả
          </h2>
          <p className="text-lg text-primary-foreground/80">
            NutMilk ERP giúp bạn kiểm soát toàn bộ quy trình nhập xuất kho, 
            quản lý nhà cung cấp và theo dõi sản xuất trong một nền tảng duy nhất.
          </p>
          <div className="flex gap-8 pt-6">
            <div>
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm text-primary-foreground/70">Doanh nghiệp</div>
            </div>
            <div>
              <div className="text-3xl font-bold">1M+</div>
              <div className="text-sm text-primary-foreground/70">Giao dịch/tháng</div>
            </div>
            <div>
              <div className="text-3xl font-bold">99.9%</div>
              <div className="text-sm text-primary-foreground/70">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
