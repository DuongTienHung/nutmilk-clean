import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

const breadcrumbMap: Record<string, string[]> = {
  "/dashboard": ["Dashboard"],
  "/inventory": ["Kho hàng", "Tổng quan"],
  "/inventory/import": ["Kho hàng", "Nhập hàng"],
  "/inventory/export": ["Kho hàng", "Xuất hàng"],
  "/inventory/adjustment": ["Kho hàng", "Điều chỉnh"],
  "/suppliers": ["Nhà cung cấp"],
  "/products": ["Sản phẩm"],
  "/reports": ["Báo cáo"],
  "/staff": ["Nhân sự", "Danh sách"],
  "/staff/attendance": ["Nhân sự", "Chấm công"],
  "/staff/payroll": ["Nhân sự", "Bảng lương"],
  "/settings": ["Cài đặt"],
  "/settings/general": ["Cài đặt", "Thiết lập chung"],
  "/settings/security": ["Cài đặt", "Bảo mật"],
  "/settings/notifications": ["Cài đặt", "Thông báo"],
  "/settings/users": ["Cài đặt", "Người dùng"],
  "/settings/system": ["Cài đặt", "Hệ thống"],
};

export function AppHeader() {
  const location = useLocation();
  const breadcrumbs = breadcrumbMap[location.pathname] || ["Dashboard"];

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <span key={index} className="flex items-center gap-2">
            {index > 0 && <span className="text-muted-foreground">/</span>}
            <span className={index === breadcrumbs.length - 1 ? "text-foreground font-medium" : "text-muted-foreground"}>
              {crumb}
            </span>
          </span>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm..."
            className="pl-9 bg-secondary border-0 h-9"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
        </Button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center cursor-pointer">
          <span className="text-primary-foreground text-sm font-medium">AD</span>
        </div>
      </div>
    </header>
  );
}
