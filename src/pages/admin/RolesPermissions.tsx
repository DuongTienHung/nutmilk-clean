import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Search, 
  Plus, 
  Shield, 
  Users,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Check,
  X,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';
import { AddRoleForm } from '@/components/forms/AddRoleForm';

const roles = [
  { 
    id: 'admin', 
    name: 'Admin',
    description: 'Toàn quyền quản trị hệ thống',
    userCount: 2,
    color: 'bg-destructive/10 text-destructive',
    permissions: ['all']
  },
  { 
    id: 'warehouse_manager', 
    name: 'Quản lý kho',
    description: 'Quản lý tồn kho, phiếu nhập xuất, báo cáo',
    userCount: 3,
    color: 'bg-primary/10 text-primary',
    permissions: ['inventory.view', 'inventory.edit', 'receipts.view', 'receipts.create', 'issues.view', 'issues.create', 'reports.view']
  },
  { 
    id: 'purchasing', 
    name: 'Nhân viên mua hàng',
    description: 'Tạo và quản lý đơn mua hàng',
    userCount: 4,
    color: 'bg-accent/10 text-accent',
    permissions: ['orders.view', 'orders.create', 'orders.edit', 'suppliers.view', 'requests.view']
  },
  { 
    id: 'production', 
    name: 'Nhân viên sản xuất',
    description: 'Thực hiện phiếu sản xuất, quản lý lô',
    userCount: 12,
    color: 'bg-warning/10 text-warning',
    permissions: ['production.view', 'production.execute', 'batches.view', 'materials.request']
  },
  { 
    id: 'warehouse_staff', 
    name: 'Nhân viên kho',
    description: 'Nhập xuất hàng, kiểm kê',
    userCount: 8,
    color: 'bg-success/10 text-success',
    permissions: ['receipts.create', 'issues.create', 'stocktake.view', 'stocktake.execute']
  },
];

const permissionGroups = [
  {
    name: 'Quản lý kho',
    permissions: [
      { id: 'inventory.view', label: 'Xem tồn kho' },
      { id: 'inventory.edit', label: 'Chỉnh sửa tồn kho' },
      { id: 'receipts.view', label: 'Xem phiếu nhập' },
      { id: 'receipts.create', label: 'Tạo phiếu nhập' },
      { id: 'issues.view', label: 'Xem phiếu xuất' },
      { id: 'issues.create', label: 'Tạo phiếu xuất' },
      { id: 'stocktake.view', label: 'Xem kiểm kê' },
      { id: 'stocktake.execute', label: 'Thực hiện kiểm kê' },
    ]
  },
  {
    name: 'Mua hàng',
    permissions: [
      { id: 'orders.view', label: 'Xem đơn mua' },
      { id: 'orders.create', label: 'Tạo đơn mua' },
      { id: 'orders.edit', label: 'Chỉnh sửa đơn mua' },
      { id: 'orders.approve', label: 'Duyệt đơn mua' },
      { id: 'suppliers.view', label: 'Xem nhà cung cấp' },
      { id: 'suppliers.edit', label: 'Quản lý nhà cung cấp' },
      { id: 'requests.view', label: 'Xem yêu cầu mua' },
      { id: 'requests.approve', label: 'Duyệt yêu cầu mua' },
    ]
  },
  {
    name: 'Sản xuất',
    permissions: [
      { id: 'production.view', label: 'Xem phiếu sản xuất' },
      { id: 'production.create', label: 'Tạo phiếu sản xuất' },
      { id: 'production.execute', label: 'Thực hiện sản xuất' },
      { id: 'batches.view', label: 'Xem lô thành phẩm' },
      { id: 'batches.create', label: 'Tạo lô thành phẩm' },
      { id: 'materials.request', label: 'Yêu cầu NVL' },
    ]
  },
  {
    name: 'Báo cáo',
    permissions: [
      { id: 'reports.view', label: 'Xem báo cáo' },
      { id: 'reports.export', label: 'Xuất báo cáo' },
    ]
  },
  {
    name: 'Hệ thống',
    permissions: [
      { id: 'users.view', label: 'Xem người dùng' },
      { id: 'users.manage', label: 'Quản lý người dùng' },
      { id: 'roles.view', label: 'Xem vai trò' },
      { id: 'roles.manage', label: 'Quản lý vai trò' },
      { id: 'settings.view', label: 'Xem cài đặt' },
      { id: 'settings.edit', label: 'Chỉnh sửa cài đặt' },
    ]
  },
];

export default function RolesPermissions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<typeof roles[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['Quản lý kho']);

  const handleViewDetail = (role: typeof roles[0]) => {
    setSelectedRole(role);
    setIsDetailOpen(true);
  };

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupName) 
        ? prev.filter(g => g !== groupName)
        : [...prev, groupName]
    );
  };

  const hasPermission = (permissionId: string) => {
    if (!selectedRole) return false;
    return selectedRole.permissions.includes('all') || selectedRole.permissions.includes(permissionId);
  };

  return (
    <DashboardLayout allowedRoles={['admin']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Vai trò & Phân quyền</h1>
            <p className="text-muted-foreground">Quản lý vai trò và quyền hạn trong hệ thống</p>
          </div>
          <Button className="btn-primary gap-2" onClick={() => setIsAddFormOpen(true)}>
            <Plus className="w-4 h-4" />
            Thêm vai trò
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Tổng vai trò"
            value="5"
            icon={Shield}
          />
          <StatCard
            title="Tổng người dùng"
            value="29"
            icon={Users}
          />
          <StatCard
            title="Quyền hạn"
            value="24"
            change="8 nhóm"
            changeType="neutral"
            icon={Shield}
            iconColor="bg-accent/10 text-accent"
          />
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Tìm vai trò..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11"
          />
        </div>

        {/* Table */}
        <div className="stat-card p-0 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="table-header">Vai trò</TableHead>
                <TableHead className="table-header">Mô tả</TableHead>
                <TableHead className="table-header">Số người dùng</TableHead>
                <TableHead className="table-header w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id} className="cursor-pointer" onClick={() => handleViewDetail(role)}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${role.color}`}>
                        <Shield className="w-5 h-5" />
                      </div>
                      <div className="font-medium text-foreground">{role.name}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{role.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{role.userCount}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetail(role)}>
                          <Eye className="w-4 h-4 mr-2" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        {role.id !== 'admin' && (
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Xóa
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Detail Sheet */}
        <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <SheetContent className="w-[500px] sm:w-[700px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Chi tiết vai trò</SheetTitle>
            </SheetHeader>
            {selectedRole && (
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${selectedRole.color}`}>
                    <Shield className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{selectedRole.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedRole.description}</p>
                  </div>
                </div>

                <div className="p-4 bg-secondary rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <span className="text-2xl font-bold text-foreground">{selectedRole.userCount}</span>
                    <span className="text-muted-foreground">người dùng</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Quyền hạn</h3>
                  
                  {selectedRole.permissions.includes('all') ? (
                    <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                      <div className="flex items-center gap-2 text-destructive">
                        <Shield className="w-5 h-5" />
                        <span className="font-medium">Toàn quyền hệ thống</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Vai trò này có tất cả quyền trong hệ thống</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {permissionGroups.map((group) => (
                        <Collapsible 
                          key={group.name}
                          open={expandedGroups.includes(group.name)}
                          onOpenChange={() => toggleGroup(group.name)}
                        >
                          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                            <span className="font-medium text-foreground">{group.name}</span>
                            {expandedGroups.includes(group.name) ? (
                              <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            )}
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="grid grid-cols-2 gap-2 p-3">
                              {group.permissions.map((permission) => (
                                <div 
                                  key={permission.id}
                                  className="flex items-center gap-2"
                                >
                                  {hasPermission(permission.id) ? (
                                    <Check className="w-4 h-4 text-success" />
                                  ) : (
                                    <X className="w-4 h-4 text-muted-foreground/50" />
                                  )}
                                  <span className={hasPermission(permission.id) ? 'text-foreground' : 'text-muted-foreground/50'}>
                                    {permission.label}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button className="flex-1 btn-primary">Chỉnh sửa</Button>
                  <Button variant="outline" className="flex-1">Xem người dùng</Button>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>

        {/* Add Role Form */}
        <AddRoleForm 
          open={isAddFormOpen} 
          onOpenChange={setIsAddFormOpen}
        />
      </div>
    </DashboardLayout>
  );
}
