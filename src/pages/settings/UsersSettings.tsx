import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Shield, UserCog } from "lucide-react";
import { cn } from "@/lib/utils";

const users = [
  { id: "1", name: "Admin", email: "admin@nutmilk.vn", role: "admin", status: "active", lastLogin: "2024-12-05 08:30" },
  { id: "2", name: "Nguyễn Văn An", email: "an.nguyen@nutmilk.vn", role: "manager", status: "active", lastLogin: "2024-12-05 07:45" },
  { id: "3", name: "Trần Thị Bình", email: "binh.tran@nutmilk.vn", role: "staff", status: "active", lastLogin: "2024-12-04 17:20" },
  { id: "4", name: "Lê Minh Châu", email: "chau.le@nutmilk.vn", role: "staff", status: "inactive", lastLogin: "2024-11-28 15:00" },
];

const roleColors: Record<string, string> = {
  admin: "border-destructive text-destructive",
  manager: "border-primary text-primary",
  staff: "border-muted-foreground text-muted-foreground",
};

const roleLabels: Record<string, string> = {
  admin: "Admin",
  manager: "Quản lý",
  staff: "Nhân viên",
};

export default function UsersSettings() {
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      key: "name",
      label: "Người dùng",
      render: (item: typeof users[0]) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-medium text-sm">
              {item.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </span>
          </div>
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-muted-foreground">{item.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      label: "Vai trò",
      render: (item: typeof users[0]) => (
        <Badge variant="outline" className={cn(roleColors[item.role])}>
          {roleLabels[item.role]}
        </Badge>
      ),
    },
    {
      key: "status",
      label: "Trạng thái",
      render: (item: typeof users[0]) => (
        <Badge
          variant="outline"
          className={cn(
            item.status === "active" ? "border-success text-success" : "border-muted-foreground text-muted-foreground"
          )}
        >
          {item.status === "active" ? "Hoạt động" : "Vô hiệu"}
        </Badge>
      ),
    },
    { key: "lastLogin", label: "Đăng nhập gần nhất" },
    {
      key: "actions",
      label: "",
      render: () => (
        <Button variant="ghost" size="sm">
          <UserCog className="w-4 h-4" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="form-section">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Quản lý người dùng
          </h3>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Thêm người dùng
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Thêm người dùng mới</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="input-group">
                  <Label className="input-label">Họ tên</Label>
                  <Input placeholder="Nhập họ tên" />
                </div>
                <div className="input-group">
                  <Label className="input-label">Email</Label>
                  <Input type="email" placeholder="email@nutmilk.vn" />
                </div>
                <div className="input-group">
                  <Label className="input-label">Vai trò</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn vai trò" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Quản lý</SelectItem>
                      <SelectItem value="staff">Nhân viên</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Tạo người dùng</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative max-w-sm mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm người dùng..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <DataTable columns={columns} data={filteredUsers} />
      </div>

      <div className="form-section">
        <h3 className="font-semibold text-lg mb-4">Phân quyền vai trò</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="font-medium text-sm">Admin</p>
              <p className="text-sm text-muted-foreground">Toàn quyền truy cập hệ thống</p>
            </div>
            <Badge variant="outline" className="border-destructive text-destructive">Full Access</Badge>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="font-medium text-sm">Quản lý</p>
              <p className="text-sm text-muted-foreground">Quản lý kho, nhân sự, báo cáo</p>
            </div>
            <Badge variant="outline" className="border-primary text-primary">Limited</Badge>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="font-medium text-sm">Nhân viên</p>
              <p className="text-sm text-muted-foreground">Chỉ xem và nhập liệu cơ bản</p>
            </div>
            <Badge variant="outline">Read/Write</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
