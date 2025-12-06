import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Truck,
  ShoppingBasket,
  BarChart3,
  Settings,
  Users,
  ChevronDown,
  Box,
  ArrowDownToLine,
  ArrowUpFromLine,
  SlidersHorizontal,
  UserCircle,
  Clock,
  Wallet,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  {
    label: "Kho hàng",
    icon: Package,
    path: "/inventory",
    children: [
      { label: "Tổng quan kho", icon: Box, path: "/inventory" },
      { label: "Nhập hàng", icon: ArrowDownToLine, path: "/inventory/import" },
      { label: "Xuất hàng", icon: ArrowUpFromLine, path: "/inventory/export" },
      { label: "Điều chỉnh", icon: SlidersHorizontal, path: "/inventory/adjustment" },
    ],
  },
  { label: "Nhà cung cấp", icon: Truck, path: "/suppliers" },
  { label: "Sản phẩm", icon: ShoppingBasket, path: "/products" },
  { label: "Báo cáo", icon: BarChart3, path: "/reports" },
  {
    label: "Nhân sự",
    icon: Users,
    path: "/staff",
    children: [
      { label: "Danh sách NV", icon: UserCircle, path: "/staff" },
      { label: "Chấm công", icon: Clock, path: "/staff/attendance" },
      { label: "Bảng lương", icon: Wallet, path: "/staff/payroll" },
    ],
  },
  { label: "Cài đặt", icon: Settings, path: "/settings" },
];

export function AppSidebar() {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(["Kho hàng", "Nhân sự"]);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    );
  };

  const isActive = (path: string) => {
    if (path === "/inventory" && location.pathname === "/inventory") return true;
    if (path === "/staff" && location.pathname === "/staff") return true;
    return location.pathname === path;
  };

  const isParentActive = (item: typeof menuItems[0]) => {
    if (!item.children) return false;
    return item.children.some((child) => location.pathname.startsWith(child.path));
  };

  return (
    <aside className="w-[260px] bg-sidebar h-screen flex flex-col border-r border-sidebar-border">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">NM</span>
          </div>
          <span className="text-sidebar-foreground font-semibold text-lg">NutMilk ERP</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <div key={item.label}>
            {item.children ? (
              <>
                <button
                  onClick={() => toggleExpand(item.label)}
                  className={cn(
                    "sidebar-item w-full justify-between",
                    isParentActive(item) && "text-sidebar-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform",
                      expandedItems.includes(item.label) && "rotate-180"
                    )}
                  />
                </button>
                {expandedItems.includes(item.label) && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        end={child.path === "/inventory" || child.path === "/staff"}
                        className={({ isActive }) =>
                          cn("sidebar-item", isActive && "active")
                        }
                      >
                        <child.icon className="w-4 h-4" />
                        <span className="text-sm">{child.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn("sidebar-item", isActive && "active")
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            )}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-full bg-sidebar-accent flex items-center justify-center">
            <span className="text-sidebar-foreground text-sm font-medium">AD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sidebar-foreground text-sm font-medium truncate">Admin</p>
            <p className="text-sidebar-muted text-xs truncate">admin@nutmilk.vn</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
