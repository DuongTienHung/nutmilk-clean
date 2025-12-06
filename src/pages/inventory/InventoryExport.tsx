import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { products, stockTransactions } from "@/lib/dummy-data";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpFromLine } from "lucide-react";

export default function InventoryExport() {
  const exportTransactions = stockTransactions.filter((t) => t.type === "export");

  const columns = [
    { key: "date", label: "Ngày xuất" },
    { key: "productName", label: "Sản phẩm" },
    { key: "quantity", label: "Số lượng" },
    { key: "reason", label: "Lý do xuất" },
    { key: "note", label: "Ghi chú" },
    {
      key: "status",
      label: "Trạng thái",
      render: () => <Badge variant="outline" className="border-primary text-primary">Hoàn tất</Badge>,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Xuất hàng</h1>
        <p className="page-subtitle">Tạo phiếu xuất và quản lý lịch sử xuất kho</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="form-section lg:col-span-1">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <ArrowUpFromLine className="w-5 h-5 text-accent" />
            Phiếu xuất mới
          </h3>

          <div className="input-group">
            <Label className="input-label">Sản phẩm</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Chọn sản phẩm" />
              </SelectTrigger>
              <SelectContent>
                {products.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name} - Tồn: {p.stock}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="input-group">
            <Label className="input-label">Số lượng</Label>
            <Input type="number" placeholder="Nhập số lượng xuất" />
          </div>

          <div className="input-group">
            <Label className="input-label">Ngày xuất</Label>
            <Input type="date" defaultValue={new Date().toISOString().split("T")[0]} />
          </div>

          <div className="input-group">
            <Label className="input-label">Lý do xuất</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Chọn lý do" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sale">Bán hàng</SelectItem>
                <SelectItem value="transfer">Chuyển kho</SelectItem>
                <SelectItem value="sample">Mẫu thử</SelectItem>
                <SelectItem value="gift">Tặng</SelectItem>
                <SelectItem value="other">Khác</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="input-group">
            <Label className="input-label">Ghi chú</Label>
            <Textarea placeholder="VD: Đơn hàng #DH-001" rows={3} />
          </div>

          <Button className="w-full">
            <ArrowUpFromLine className="w-4 h-4 mr-2" />
            Xác nhận xuất hàng
          </Button>
        </div>

        {/* History */}
        <div className="lg:col-span-2">
          <h3 className="font-semibold text-lg mb-4">Lịch sử xuất hàng</h3>
          <DataTable columns={columns} data={exportTransactions} />
        </div>
      </div>
    </div>
  );
}
