import { Zap, Eye, Shield } from 'lucide-react';

const reasons = [
  {
    icon: Zap,
    title: 'Tự động hóa',
    description: 'Giảm thiểu thao tác thủ công, tự động sinh mã, tự động tính toán và cảnh báo.',
  },
  {
    icon: Eye,
    title: 'Giao diện trực quan',
    description: 'Thiết kế tối giản, dễ sử dụng, không cần đào tạo phức tạp.',
  },
  {
    icon: Shield,
    title: 'Bảo mật & Phân quyền',
    description: 'Phân quyền chi tiết theo vai trò, bảo mật dữ liệu theo tiêu chuẩn.',
  },
];

export function WhyChooseSection() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Tại sao chọn NutMilk ERP?
          </h2>
          <p className="text-lg text-muted-foreground">
            Giải pháp được thiết kế riêng cho doanh nghiệp Việt Nam
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div 
              key={reason.title}
              className="text-center p-8"
            >
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-lg">
                <reason.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {reason.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
