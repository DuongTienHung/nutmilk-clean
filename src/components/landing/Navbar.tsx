import { Button } from '@/components/ui/button';
import { Package, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
              <Package className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">NutMilk</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Tính năng
            </a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Bảng giá
            </a>
            <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Khách hàng
            </a>
            <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Liên hệ
            </a>
          </div>
          
          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" className="font-medium">
                Đăng nhập
              </Button>
            </Link>
            <Link to="/login">
              <Button className="btn-primary rounded-lg">
                Dùng thử miễn phí
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Tính năng
              </a>
              <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Bảng giá
              </a>
              <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Khách hàng
              </a>
              <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Liên hệ
              </a>
              <Link to="/login">
                <Button className="btn-primary w-full">
                  Đăng nhập
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
