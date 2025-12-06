import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable } from "@/components/ui/data-table";
import { employees, attendance } from "@/lib/dummy-data";
import { ArrowLeft, Clock, LogIn, LogOut, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StaffAttendance() {
  const { id } = useParams();
  const navigate = useNavigate();

  const employee = employees.find((e) => e.id === id);
  const employeeAttendance = attendance.filter((a) => a.employeeId === id);

  if (!employee) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Không tìm thấy nhân viên</p>
      </div>
    );
  }

  const totalHours = employeeAttendance.reduce((sum, a) => sum + a.totalHours, 0);

  const columns = [
    {
      key: "date",
      label: "Ngày",
      render: (item: typeof attendance[0]) => (
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          {item.date}
        </div>
      ),
    },
    {
      key: "checkIn",
      label: "Giờ vào",
      render: (item: typeof attendance[0]) => (
        <div className="flex items-center gap-2">
          <LogIn className="w-4 h-4 text-success" />
          {item.checkIn}
        </div>
      ),
    },
    {
      key: "checkOut",
      label: "Giờ ra",
      render: (item: typeof attendance[0]) => (
        <div className="flex items-center gap-2">
          <LogOut className="w-4 h-4 text-accent" />
          {item.checkOut}
        </div>
      ),
    },
    {
      key: "totalHours",
      label: "Tổng giờ",
      render: (item: typeof attendance[0]) => (
        <span className="font-medium">{item.totalHours}h</span>
      ),
    },
    {
      key: "status",
      label: "Trạng thái",
      render: (item: typeof attendance[0]) => (
        <Badge variant="outline" className="border-success text-success">
          {item.status === "present" ? "Có mặt" : "Vắng"}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(`/staff/${id}`)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="page-header flex-1">
          <h1 className="page-title">Chấm công - {employee.name}</h1>
          <p className="page-subtitle">Theo dõi giờ làm việc hàng ngày</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-semibold text-xl">
                {employee.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-lg">{employee.name}</h3>
              <p className="text-muted-foreground">{employee.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" className="border-success text-success hover:bg-success hover:text-success-foreground">
              <LogIn className="w-4 h-4 mr-2" />
              Check-in
            </Button>
            <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <LogOut className="w-4 h-4 mr-2" />
              Check-out
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ngày công</p>
              <p className="text-2xl font-semibold">{employeeAttendance.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tổng giờ làm</p>
              <p className="text-2xl font-semibold">{totalHours}h</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Trung bình/ngày</p>
              <p className="text-2xl font-semibold">{(totalHours / employeeAttendance.length || 0).toFixed(1)}h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Table */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Lịch sử chấm công</h3>
        <Select defaultValue="12-2024">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Chọn tháng" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="12-2024">Tháng 12/2024</SelectItem>
            <SelectItem value="11-2024">Tháng 11/2024</SelectItem>
            <SelectItem value="10-2024">Tháng 10/2024</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable columns={columns} data={employeeAttendance} />
    </div>
  );
}
