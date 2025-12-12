import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-background to-accent-light opacity-50" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Phiên bản 2.0 - Mới nhất
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              NutMilk ERP
              <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Quản lý kho thông minh
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              Tăng tốc vận hành, giảm sai sót, tối ưu hiệu suất cho doanh nghiệp sản xuất và phân phối.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/login">
                <Button size="lg" className="btn-primary gap-2 h-14 px-8 text-base rounded-xl">
                  Trải nghiệm ngay
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2 h-14 px-8 text-base rounded-xl">
                <Play className="w-5 h-5" />
                Xem demo
              </Button>
            </div>
            
            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-bold text-foreground">500+</div>
                <div className="text-sm text-muted-foreground">Doanh nghiệp</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">50%</div>
                <div className="text-sm text-muted-foreground">Tiết kiệm thời gian</div>
              </div>
            </div>
          </div>
          
          {/* Right - Dashboard preview */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-10 bg-secondary flex items-center gap-2 px-4">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-warning/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
              </div>
              <div className="pt-10 p-4">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop" 
                  alt="Dashboard Preview" 
                  className="w-full rounded-lg shadow-sm"
                />
              </div>
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-elevated border border-border animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                  +
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Tồn kho tối ưu</div>
                  <div className="text-xs text-muted-foreground">Tự động cảnh báo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
