import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable } from "@/components/ui/data-table";
import { employees, payroll } from "@/lib/dummy-data";
import { ArrowLeft, Wallet, Download, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StaffPayroll() {
  const { id } = useParams();
  const navigate = useNavigate();

  const employee = employees.find((e) => e.id === id);
  const employeePayroll = payroll.filter((p) => p.employeeId === id);
  const latestPayroll = employeePayroll[0];

  if (!employee) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Không tìm thấy nhân viên</p>
      </div>
    );
  }

  const columns = [
    {
      key: "month",
      label: "Tháng",
      render: (item: typeof payroll[0]) => (
        <span className="font-medium">{item.month}</span>
      ),
    },
    {
      key: "baseSalary",
      label: "Lương cơ bản",
      render: (item: typeof payroll[0]) => (
        <span>{item.baseSalary.toLocaleString()}đ</span>
      ),
    },
    {
      key: "totalHours",
      label: "Giờ công",
      render: (item: typeof payroll[0]) => (
        <span>{item.totalHours}h</span>
      ),
    },
    {
      key: "bonus",
      label: "Thưởng",
      render: (item: typeof payroll[0]) => (
        <span className="text-success">+{item.bonus.toLocaleString()}đ</span>
      ),
    },
    {
      key: "deduction",
      label: "Khấu trừ",
      render: (item: typeof payroll[0]) => (
        <span className={cn(item.deduction > 0 && "text-destructive")}>
          {item.deduction > 0 ? `-${item.deduction.toLocaleString()}đ` : "0đ"}
        </span>
      ),
    },
    {
      key: "totalSalary",
      label: "Thực lĩnh",
      render: (item: typeof payroll[0]) => (
        <span className="font-semibold text-primary">{item.totalSalary.toLocaleString()}đ</span>
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
          <h1 className="page-title">Bảng lương - {employee.name}</h1>
          <p className="page-subtitle">Thông tin lương và phúc lợi</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Xuất bảng lương
        </Button>
      </div>

      {/* Current Month Summary */}
      {latestPayroll && (
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-semibold">
                  {employee.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </span>
              </div>
              <div>
                <h3 className="font-semibold">{employee.name}</h3>
                <p className="text-sm text-muted-foreground">{employee.role} • Tháng {latestPayroll.month}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Tổng lương tháng</p>
              <p className="text-3xl font-bold text-primary">{latestPayroll.totalSalary.toLocaleString()}đ</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <DollarSign className="w-4 h-4" />
                Lương cơ bản
              </div>
              <p className="text-lg font-semibold">{latestPayroll.baseSalary.toLocaleString()}đ</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Wallet className="w-4 h-4" />
                Giờ công
              </div>
              <p className="text-lg font-semibold">{latestPayroll.totalHours}h</p>
            </div>
            <div className="bg-success/10 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm text-success mb-1">
                <TrendingUp className="w-4 h-4" />
                Thưởng
              </div>
              <p className="text-lg font-semibold text-success">+{latestPayroll.bonus.toLocaleString()}đ</p>
            </div>
            <div className="bg-destructive/10 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm text-destructive mb-1">
                <TrendingDown className="w-4 h-4" />
                Khấu trừ
              </div>
              <p className="text-lg font-semibold text-destructive">-{latestPayroll.deduction.toLocaleString()}đ</p>
            </div>
          </div>
        </div>
      )}

      {/* Filter & Table */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Lịch sử lương</h3>
        <Select defaultValue="2024">
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Năm" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable columns={columns} data={employeePayroll} />
    </div>
  );
}
