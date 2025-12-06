import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { employees, payroll } from "@/lib/dummy-data";
import { Wallet, Download, DollarSign, TrendingUp, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PayrollOverview() {
  const navigate = useNavigate();

  // Get latest payroll for each employee
  const employeePayrollData = employees.map((emp) => {
    const empPayroll = payroll.find((p) => p.employeeId === emp.id);
    return {
      ...emp,
      baseSalary: empPayroll?.baseSalary || 0,
      bonus: empPayroll?.bonus || 0,
      deduction: empPayroll?.deduction || 0,
      totalSalary: empPayroll?.totalSalary || 0,
      totalHours: empPayroll?.totalHours || 0,
    };
  });

  const totalPayroll = employeePayrollData.reduce((sum, e) => sum + e.totalSalary, 0);
  const totalBonus = employeePayrollData.reduce((sum, e) => sum + e.bonus, 0);

  const columns = [
    {
      key: "name",
      label: "Nhân viên",
      render: (item: typeof employeePayrollData[0]) => (
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
      key: "baseSalary",
      label: "Lương cơ bản",
      render: (item: typeof employeePayrollData[0]) => (
        <span>{item.baseSalary.toLocaleString()}đ</span>
      ),
    },
    {
      key: "bonus",
      label: "Thưởng",
      render: (item: typeof employeePayrollData[0]) => (
        <span className="text-success">+{item.bonus.toLocaleString()}đ</span>
      ),
    },
    {
      key: "deduction",
      label: "Khấu trừ",
      render: (item: typeof employeePayrollData[0]) => (
        <span className={cn(item.deduction > 0 && "text-destructive")}>
          {item.deduction > 0 ? `-${item.deduction.toLocaleString()}đ` : "0đ"}
        </span>
      ),
    },
    {
      key: "totalSalary",
      label: "Thực lĩnh",
      render: (item: typeof employeePayrollData[0]) => (
        <span className="font-semibold text-primary">{item.totalSalary.toLocaleString()}đ</span>
      ),
    },
    {
      key: "actions",
      label: "",
      render: (item: typeof employeePayrollData[0]) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/staff/${item.id}/payroll`);
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
          <h1 className="page-title">Bảng lương</h1>
          <p className="page-subtitle">Quản lý lương và phúc lợi nhân viên</p>
        </div>

        <div className="flex items-center gap-3">
          <Select defaultValue="11-2024">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Chọn tháng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="11-2024">Tháng 11/2024</SelectItem>
              <SelectItem value="10-2024">Tháng 10/2024</SelectItem>
              <SelectItem value="09-2024">Tháng 09/2024</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Xuất tổng hợp
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tổng nhân viên</p>
              <p className="text-2xl font-semibold">{employees.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tổng chi lương</p>
              <p className="text-xl font-semibold">{(totalPayroll / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tổng thưởng</p>
              <p className="text-xl font-semibold">{(totalBonus / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Lương TB</p>
              <p className="text-xl font-semibold">{(totalPayroll / employees.length / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={employeePayrollData}
        onRowClick={(item) => navigate(`/staff/${item.id}/payroll`)}
      />
    </div>
  );
}
