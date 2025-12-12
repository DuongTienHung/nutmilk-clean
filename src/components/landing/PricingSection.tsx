import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Basic',
    price: '1.990.000',
    description: 'Dành cho doanh nghiệp nhỏ',
    features: [
      'Tối đa 5 người dùng',
      'Quản lý kho cơ bản',
      'Phiếu nhập xuất',
      'Báo cáo tồn kho',
      'Hỗ trợ email',
    ],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '4.990.000',
    description: 'Phổ biến nhất cho SME',
    features: [
      'Tối đa 20 người dùng',
      'Tất cả tính năng Basic',
      'Quản lý nhà cung cấp',
      'Quản lý sản xuất',
      'Báo cáo nâng cao',
      'API tích hợp',
      'Hỗ trợ 24/7',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Liên hệ',
    description: 'Giải pháp tùy chỉnh',
    features: [
      'Không giới hạn người dùng',
      'Tất cả tính năng Pro',
      'Triển khai on-premise',
      'Tùy chỉnh theo yêu cầu',
      'Đào tạo nhân viên',
      'Dedicated support',
      'SLA đảm bảo',
    ],
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Bảng giá đơn giản, minh bạch
          </h2>
          <p className="text-lg text-muted-foreground">
            Chọn gói phù hợp với quy mô doanh nghiệp của bạn
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`rounded-2xl p-8 ${
                plan.highlighted 
                  ? 'bg-gradient-to-b from-primary to-primary/90 text-primary-foreground shadow-lg scale-105' 
                  : 'bg-card border border-border'
              }`}
            >
              {plan.highlighted && (
                <div className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium mb-4">
                  Phổ biến nhất
                </div>
              )}
              <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? '' : 'text-foreground'}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-4 ${plan.highlighted ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                {plan.description}
              </p>
              <div className="mb-6">
                <span className={`text-4xl font-bold ${plan.highlighted ? '' : 'text-foreground'}`}>
                  {plan.price}
                </span>
                {plan.price !== 'Liên hệ' && (
                  <span className={plan.highlighted ? 'text-primary-foreground/80' : 'text-muted-foreground'}>
                    đ/tháng
                  </span>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className={`w-5 h-5 ${plan.highlighted ? 'text-accent' : 'text-primary'}`} />
                    <span className={`text-sm ${plan.highlighted ? '' : 'text-foreground'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <Link to="/login">
                <Button 
                  className={`w-full h-12 rounded-xl font-medium ${
                    plan.highlighted 
                      ? 'bg-card text-foreground hover:bg-card/90' 
                      : 'btn-primary'
                  }`}
                >
                  Bắt đầu ngay
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
