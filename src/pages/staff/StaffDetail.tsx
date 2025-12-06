import { useParams, useNavigate, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { employees } from "@/lib/dummy-data";
import { ArrowLeft, Mail, Phone, Calendar, Building2, Edit, Clock, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StaffDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const employee = employees.find((e) => e.id === id);

  if (!employee) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Không tìm thấy nhân viên</p>
      </div>
    );
  }

  const tabs = [
    { label: "Hồ sơ", path: `/staff/${id}`, icon: Building2 },
    { label: "Chấm công", path: `/staff/${id}/attendance`, icon: Clock },
    { label: "Lương", path: `/staff/${id}/payroll`, icon: Wallet },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/staff")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="page-header flex-1">
          <h1 className="page-title">Hồ sơ nhân viên</h1>
          <p className="page-subtitle">Thông tin chi tiết và quản lý</p>
        </div>
        <Button variant="outline">
          <Edit className="w-4 h-4 mr-2" />
          Chỉnh sửa
        </Button>
      </div>

      {/* Profile Header */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-semibold text-2xl">
              {employee.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold">{employee.name}</h2>
              <Badge
                variant="outline"
                className={cn(
                  employee.status === "active" && "border-success text-success",
                  employee.status === "on-leave" && "border-warning text-warning"
                )}
              >
                {employee.status === "active" ? "Đang làm" : "Nghỉ phép"}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">{employee.role} • {employee.department}</p>
            
            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                {employee.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                Vào làm: {employee.joinDate}
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Ngày công tháng này</p>
            <p className="text-3xl font-bold text-primary">{employee.workDays}</p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-2 border-b border-border">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            end
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors",
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )
            }
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </NavLink>
        ))}
      </div>

      {/* Profile Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold mb-4">Thông tin cá nhân</h3>
          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Họ và tên</span>
              <span className="font-medium">{employee.name}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium">{employee.email}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Ngày vào làm</span>
              <span className="font-medium">{employee.joinDate}</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold mb-4">Thông tin công việc</h3>
          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Phòng ban</span>
              <span className="font-medium">{employee.department}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Chức vụ</span>
              <span className="font-medium">{employee.role}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Trạng thái</span>
              <Badge variant="outline" className="border-success text-success">
                {employee.status === "active" ? "Đang làm việc" : "Nghỉ phép"}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
