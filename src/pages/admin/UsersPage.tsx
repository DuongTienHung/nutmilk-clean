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
  Filter, 
  Users,
  UserCheck,
  UserX,
  Clock,
  MoreHorizontal,
  Eye,
  Edit,
  Key,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AddUserForm } from '@/components/forms/AddUserForm';

const users = [
  { 
    id: '1',
    name: 'Nguyễn Văn Admin', 
    username: 'admin', 
    email: 'admin@nutmilk.vn', 
    role: 'Admin',
    status: 'active',
    createdAt: '01/01/2024',
  },
  { 
    id: '2',
    name: 'Trần Thị Kho', 
    username: 'qlkho', 
    email: 'kho@nutmilk.vn', 
    role: 'Quản lý kho',
    status: 'active',
    createdAt: '15/01/2024',
  },
  { 
    id: '3',
    name: 'Lê Văn Mua', 
    username: 'muahang', 
    email: 'muahang@nutmilk.vn', 
    role: 'NV Mua hàng',
    status: 'active',
    createdAt: '20/01/2024',
  },
  { 
    id: '4',
    name: 'Phạm Thị Sản Xuất', 
    username: 'sanxuat', 
    email: 'sanxuat@nutmilk.vn', 
    role: 'NV Sản xuất',
    status: 'locked',
    createdAt: '25/01/2024',
  },
  { 
    id: '5',
    name: 'Hoàng Văn Kho', 
    username: 'nvkho', 
    email: 'nvkho@nutmilk.vn', 
    role: 'NV Kho',
    status: 'active',
    createdAt: '01/02/2024',
  },
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  return (
    <DashboardLayout allowedRoles={['admin']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Người dùng</h1>
            <p className="text-muted-foreground">Quản lý tài khoản người dùng</p>
          </div>
          <Button className="btn-primary gap-2" onClick={() => setIsAddFormOpen(true)}>
            <Plus className="w-4 h-4" />
            Thêm người dùng
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <StatCard
            title="Tổng user"
            value="28"
            icon={Users}
          />
          <StatCard
            title="Đang hoạt động"
            value="25"
            icon={UserCheck}
            iconColor="bg-success/10 text-success"
          />
          <StatCard
            title="Bị khóa"
            value="3"
            icon={UserX}
            iconColor="bg-destructive/10 text-destructive"
          />
          <StatCard
            title="Mới 30 ngày"
            value="5"
            icon={Clock}
            iconColor="bg-accent/10 text-accent"
          />
          <StatCard
            title="Vai trò phổ biến"
            value="NV Kho"
            icon={Users}
            iconColor="bg-warning/10 text-warning"
          />
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Tìm theo họ tên, username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Vai trò
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Trạng thái
          </Button>
        </div>

        {/* Table */}
        <div className="stat-card p-0 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="table-header">Họ tên</TableHead>
                <TableHead className="table-header">Username</TableHead>
                <TableHead className="table-header">Email</TableHead>
                <TableHead className="table-header">Vai trò</TableHead>
                <TableHead className="table-header">Trạng thái</TableHead>
                <TableHead className="table-header">Ngày tạo</TableHead>
                <TableHead className="table-header w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="cursor-pointer">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-medium text-foreground">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">{user.username}</TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell>
                    <span className="badge-primary">{user.role}</span>
                  </TableCell>
                  <TableCell>
                    {user.status === 'active' ? (
                      <span className="badge-success">Hoạt động</span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive">Bị khóa</span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.createdAt}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Key className="w-4 h-4 mr-2" />
                          Reset mật khẩu
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Add User Form */}
        <AddUserForm 
          open={isAddFormOpen} 
          onOpenChange={setIsAddFormOpen}
        />
      </div>
    </DashboardLayout>
  );
}
