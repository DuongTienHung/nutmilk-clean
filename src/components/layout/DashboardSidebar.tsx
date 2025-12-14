import { useAuth } from '@/contexts/AuthContext';
import { NavLink } from '@/components/NavLink';
import { UserRole } from '@/lib/auth';
import { 
  Package, 
  LayoutDashboard, 
  Users, 
  Truck, 
  FileText, 
  BarChart3,
  Settings,
  Box,
  ShoppingCart,
  ClipboardList,
  Clock,
  Factory,
  Warehouse,
  History,
  AlertTriangle,
  Calendar,
  TrendingUp,
  FileCheck,
  Layers,
  Shield,
  DollarSign,
} from 'lucide-react';

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const MENU_ITEMS: Record<UserRole, MenuItem[]> = {
  admin: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Truck, label: 'Nhà cung cấp', path: '/admin/suppliers' },
    { icon: Box, label: 'Danh mục NVL', path: '/admin/materials' },
    { icon: DollarSign, label: 'Bảng giá NCC', path: '/admin/pricing' },
    { icon: Users, label: 'Người dùng', path: '/admin/users' },
    { icon: Shield, label: 'Vai trò & Phân quyền', path: '/admin/roles' },
  ],
  warehouse_manager: [
    { icon: LayoutDashboard, label: 'Dashboard kho', path: '/warehouse-manager' },
    { icon: ClipboardList, label: 'Định mức NVL', path: '/warehouse-manager/quotas' },
    { icon: FileCheck, label: 'Phê duyệt đơn mua', path: '/warehouse-manager/purchase-approval' },
    { icon: ShoppingCart, label: 'Tạo phiếu sản xuất', path: '/warehouse-manager/create-order' },
    { icon: Layers, label: 'Theo dõi tồn kho', path: '/warehouse-manager/inventory' },
    { icon: Calendar, label: 'Lô & HSD', path: '/warehouse-manager/batches' },
    { icon: FileText, label: 'Phiếu nhập', path: '/warehouse-manager/receipts' },
    { icon: Box, label: 'Phiếu xuất', path: '/warehouse-manager/issues' },
    { icon: AlertTriangle, label: 'Hủy hàng', path: '/warehouse-manager/disposals' },
    { icon: BarChart3, label: 'Báo cáo kho', path: '/warehouse-manager/reports' },
    { icon: History, label: 'Lịch sử giao dịch', path: '/warehouse-manager/history' },
  ],
  purchasing: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/purchasing' },
    { icon: ShoppingCart, label: 'Tạo đơn mua', path: '/purchasing/create-order' },
    { icon: ClipboardList, label: 'Danh sách đơn mua', path: '/purchasing/orders' },
    { icon: FileText, label: 'Yêu cầu mua (PR)', path: '/purchasing/requests' },
    { icon: TrendingUp, label: 'Gợi ý nhập hàng', path: '/purchasing/suggestions' },
    { icon: Clock, label: 'Tiến độ giao hàng', path: '/purchasing/delivery' },
    { icon: History, label: 'Lịch sử mua hàng', path: '/purchasing/history' },
  ],
  production: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/production' },
    { icon: ClipboardList, label: 'Phiếu sản xuất', path: '/production/orders' },
    { icon: Factory, label: 'Thực hiện phiếu', path: '/production/execute' },
    { icon: Layers, label: 'NVL đã cấp', path: '/production/materials' },
    { icon: FileText, label: 'Yêu cầu NVL', path: '/production/requests' },
    { icon: Clock, label: 'Tiến độ ca', path: '/production/shifts' },
    { icon: Box, label: 'Lô thành phẩm', path: '/production/batches' },
    { icon: History, label: 'Lịch sử lô', path: '/production/history' },
  ],
  warehouse_staff: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/warehouse-staff' },
    { icon: Warehouse, label: 'Ghi nhận hàng nhập', path: '/warehouse-staff/receive' },
    { icon: ClipboardList, label: 'Kiểm kê', path: '/warehouse-staff/stocktake' },
    { icon: AlertTriangle, label: 'Hủy hàng', path: '/warehouse-staff/disposals' },
    { icon: FileCheck, label: 'Tạo phiếu nhập', path: '/warehouse-staff/create-receipt' },
    { icon: FileText, label: 'Tạo phiếu xuất', path: '/warehouse-staff/create-issue' },
    { icon: History, label: 'Lịch sử giao dịch', path: '/warehouse-staff/history' },
  ],
};

export function DashboardSidebar() {
  const { user } = useAuth();
  const menuItems = user ? MENU_ITEMS[user.role] : [];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="h-16 px-6 flex items-center gap-3 border-b border-border">
        <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
          <Package className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="text-lg font-bold text-foreground">NutMilk ERP</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === `/admin` || item.path === `/warehouse-manager` || item.path === `/purchasing` || item.path === `/production` || item.path === `/warehouse-staff`}
            className="sidebar-item sidebar-item-inactive"
            activeClassName="sidebar-item-active"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-2">
          <Settings className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Phiên bản 2.0</span>
        </div>
      </div>
    </aside>
  );
}
