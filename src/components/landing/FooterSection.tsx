import { Package, Facebook, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FooterSection() {
  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">NutMilk ERP</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Giải pháp quản lý kho và nhân sự toàn diện cho doanh nghiệp Việt Nam.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Sản phẩm</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Tính năng</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Bảng giá</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Demo</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">API</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Hỗ trợ</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Tài liệu</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Hướng dẫn</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Liên hệ</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Liên hệ</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contact@nutmilk.vn</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>1900 1234</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Tầng 10, Tòa nhà ABC, Quận Hai Bà Trưng, TP.HN</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/50">
            © 2025 NutMilk ERP. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/50">
            <a href="#" className="hover:text-primary-foreground transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Điều khoản sử dụng</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
