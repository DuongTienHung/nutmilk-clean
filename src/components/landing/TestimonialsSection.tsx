import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Nguyễn Minh Tuấn',
    role: 'Giám đốc điều hành',
    company: 'Công ty TNHH Thực phẩm ABC',
    content: 'NutMilk ERP giúp chúng tôi giảm 40% thời gian quản lý kho và gần như loại bỏ hoàn toàn sai sót trong kiểm kê.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Trần Thị Mai',
    role: 'Quản lý kho',
    company: 'Nhà máy sản xuất XYZ',
    content: 'Giao diện dễ sử dụng, nhân viên mới cũng có thể làm quen trong vài giờ. Hỗ trợ kỹ thuật rất nhiệt tình.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Lê Hoàng Nam',
    role: 'Trưởng phòng IT',
    company: 'Tập đoàn DEF',
    content: 'Tích hợp dễ dàng với hệ thống hiện có. API documentation rõ ràng, team dev rất hài lòng.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Khách hàng nói gì?
          </h2>
          <p className="text-lg text-muted-foreground">
            Được tin tưởng bởi hàng trăm doanh nghiệp
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.name}
              className="stat-card"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                ))}
              </div>
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
