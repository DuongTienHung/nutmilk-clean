import { Package, TrendingUp, Users, FileText, BarChart3, Clock } from 'lucide-react';

const features = [
  {
    icon: Package,
    title: 'Quản lý kho thông minh',
    description: 'Theo dõi tồn kho real-time, cảnh báo hết hàng tự động.',
  },
  {
    icon: TrendingUp,
    title: 'Nhập – Xuất – Tồn',
    description: 'Quản lý phiếu nhập xuất, lịch sử giao dịch chi tiết.',
  },
  {
    icon: Users,
    title: 'Nhà cung cấp',
    description: 'Quản lý NCC, bảng giá, đánh giá và lịch sử mua hàng.',
  },
  {
    icon: FileText,
    title: 'Sản phẩm – NVL',
    description: 'Danh mục NVL đầy đủ với quy đổi đơn vị tính.',
  },
  {
    icon: BarChart3,
    title: 'Báo cáo trực quan',
    description: 'Biểu đồ thống kê, xuất Excel, phân tích dữ liệu.',
  },
  {
    icon: Clock,
    title: 'Nhân sự & Chấm công',
    description: 'Quản lý ca làm, chấm công, tính lương tự động.',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Tính năng nổi bật
          </h2>
          <p className="text-lg text-muted-foreground">
            Tất cả những gì bạn cần để vận hành doanh nghiệp hiệu quả
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="stat-card group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
