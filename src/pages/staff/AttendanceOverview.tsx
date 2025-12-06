import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { employees, attendance } from "@/lib/dummy-data";
import { Clock, LogIn, LogOut, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AttendanceOverview() {
  const navigate = useNavigate();

  // Aggregate attendance data per employee
  const employeeAttendanceData = employees.map((emp) => {
    const empAttendance = attendance.filter((a) => a.employeeId === emp.id);
    const totalHours = empAttendance.reduce((sum, a) => sum + a.totalHours, 0);
    return {
      ...emp,
      attendanceCount: empAttendance.length,
      totalHours,
      lastCheckIn: empAttendance[0]?.checkIn || "-",
      lastCheckOut: empAttendance[0]?.checkOut || "-",
    };
  });

  const columns = [
    {
      key: "name",
      label: "Nhân viên",
      render: (item: typeof employeeAttendanceData[0]) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-medium text-sm">
              {item.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </span>
          </div>
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-muted-foreground">{item.role}</p>
          </div>
        </div>
      ),
    },
    { key: "department", label: "Phòng ban" },
    {
      key: "attendanceCount",
      label: "Ngày công",
      render: (item: typeof employeeAttendanceData[0]) => (
        <span className="font-medium">{item.attendanceCount}</span>
      ),
    },
    {
      key: "totalHours",
      label: "Tổng giờ",
      render: (item: typeof employeeAttendanceData[0]) => (
        <span className="font-medium">{item.totalHours}h</span>
      ),
    },
    {
      key: "lastCheckIn",
      label: "Check-in gần nhất",
      render: (item: typeof employeeAttendanceData[0]) => (
        <div className="flex items-center gap-2">
          <LogIn className="w-4 h-4 text-success" />
          {item.lastCheckIn}
        </div>
      ),
    },
    {
      key: "status",
      label: "Trạng thái",
      render: (item: typeof employeeAttendanceData[0]) => (
        <Badge
          variant="outline"
          className={cn(
            item.status === "active" && "border-success text-success",
            item.status === "on-leave" && "border-warning text-warning"
          )}
        >
          {item.status === "active" ? "Đang làm" : "Nghỉ phép"}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "",
      render: (item: typeof employeeAttendanceData[0]) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/staff/${item.id}/attendance`);
          }}
        >
          Chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="page-header">
          <h1 className="page-title">Chấm công</h1>
          <p className="page-subtitle">Tổng quan chấm công toàn bộ nhân viên</p>
        </div>

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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tổng NV</p>
              <p className="text-2xl font-semibold">{employees.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <LogIn className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Đang làm việc</p>
              <p className="text-2xl font-semibold">{employees.filter(e => e.status === "active").length}</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Nghỉ phép</p>
              <p className="text-2xl font-semibold">{employees.filter(e => e.status === "on-leave").length}</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tổng giờ công</p>
              <p className="text-2xl font-semibold">{employeeAttendanceData.reduce((sum, e) => sum + e.totalHours, 0)}h</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={employeeAttendanceData}
        onRowClick={(item) => navigate(`/staff/${item.id}/attendance`)}
      />
    </div>
  );
}
