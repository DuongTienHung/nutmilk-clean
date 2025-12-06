import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { employees } from "@/lib/dummy-data";
import { Plus, Search, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StaffList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredEmployees = employees.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.email.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      key: "avatar",
      label: "",
      render: (item: typeof employees[0]) => (
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          {item.avatar ? (
            <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <span className="text-primary font-medium text-sm">
              {item.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "name",
      label: "Họ tên",
      render: (item: typeof employees[0]) => (
        <div>
          <p className="font-medium">{item.name}</p>
          <p className="text-sm text-muted-foreground">{item.email}</p>
        </div>
      ),
    },
    { key: "role", label: "Chức vụ" },
    { key: "department", label: "Phòng ban" },
    { key: "workDays", label: "Ngày công" },
    {
      key: "status",
      label: "Trạng thái",
      render: (item: typeof employees[0]) => (
        <Badge
          variant="outline"
          className={cn(
            item.status === "active" && "border-success text-success",
            item.status === "on-leave" && "border-warning text-warning",
            item.status === "inactive" && "border-muted-foreground text-muted-foreground"
          )}
        >
          {item.status === "active" ? "Đang làm" : item.status === "on-leave" ? "Nghỉ phép" : "Nghỉ việc"}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "",
      render: (item: typeof employees[0]) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/staff/${item.id}`);
          }}
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="page-header">
          <h1 className="page-title">Danh sách nhân viên</h1>
          <p className="page-subtitle">Quản lý thông tin nhân sự công ty</p>
        </div>

        <Button onClick={() => navigate("/staff/new")}>
          <Plus className="w-4 h-4 mr-2" />
          Thêm nhân viên
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm nhân viên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredEmployees}
        onRowClick={(item) => navigate(`/staff/${item.id}`)}
      />
    </div>
  );
}
