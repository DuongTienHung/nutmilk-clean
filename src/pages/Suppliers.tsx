import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { suppliers } from "@/lib/dummy-data";
import { Plus, Search, Mail, Phone } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Suppliers() {
  const [search, setSearch] = useState("");

  const filteredSuppliers = suppliers.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { key: "name", label: "Tên nhà cung cấp" },
    { key: "contact", label: "Người liên hệ" },
    {
      key: "phone",
      label: "Điện thoại",
      render: (item: typeof suppliers[0]) => (
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-muted-foreground" />
          {item.phone}
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (item: typeof suppliers[0]) => (
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-muted-foreground" />
          {item.email}
        </div>
      ),
    },
    { key: "totalOrders", label: "Tổng đơn" },
    { key: "lastOrder", label: "Đơn gần nhất" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="page-header">
          <h1 className="page-title">Nhà cung cấp</h1>
          <p className="page-subtitle">Quản lý thông tin và lịch sử giao dịch</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Thêm NCC
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Thêm nhà cung cấp mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="input-group">
                <Label className="input-label">Tên công ty</Label>
                <Input placeholder="Nhập tên công ty" />
              </div>
              <div className="input-group">
                <Label className="input-label">Người liên hệ</Label>
                <Input placeholder="Họ tên người liên hệ" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="input-group">
                  <Label className="input-label">Điện thoại</Label>
                  <Input placeholder="0901234567" />
                </div>
                <div className="input-group">
                  <Label className="input-label">Email</Label>
                  <Input type="email" placeholder="email@company.vn" />
                </div>
              </div>
              <div className="input-group">
                <Label className="input-label">Địa chỉ</Label>
                <Textarea placeholder="Địa chỉ đầy đủ" rows={2} />
              </div>
              <Button className="w-full">Lưu nhà cung cấp</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm nhà cung cấp..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <DataTable columns={columns} data={filteredSuppliers} />
    </div>
  );
}
