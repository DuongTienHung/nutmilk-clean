import { Outlet, NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Settings, Shield, Bell, Users, Server } from "lucide-react";

const settingsTabs = [
  { label: "Thiết lập chung", path: "/settings", icon: Settings },
  { label: "Bảo mật", path: "/settings/security", icon: Shield },
  { label: "Thông báo", path: "/settings/notifications", icon: Bell },
  { label: "Người dùng", path: "/settings/users", icon: Users },
  { label: "Hệ thống", path: "/settings/system", icon: Server },
];

export default function SettingsLayout() {
  const location = useLocation();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Cài đặt</h1>
        <p className="page-subtitle">Quản lý cấu hình hệ thống</p>
      </div>

      <div className="flex gap-6">
        {/* Vertical Tabs */}
        <nav className="w-56 flex-shrink-0">
          <div className="bg-card rounded-xl border border-border p-2 space-y-1">
            {settingsTabs.map((tab) => (
              <NavLink
                key={tab.path}
                to={tab.path}
                end={tab.path === "/settings"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )
                }
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
