import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { products, suppliers, stockTransactions } from "@/lib/dummy-data";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { ArrowDownToLine } from "lucide-react";

export default function InventoryImport() {
  const importTransactions = stockTransactions.filter((t) => t.type === "import");

  const columns = [
    { key: "date", label: "Ngày nhập" },
    { key: "productName", label: "Sản phẩm" },
    { key: "quantity", label: "Số lượng" },
    { key: "supplierName", label: "Nhà cung cấp" },
    { key: "batchCode", label: "Mã lô" },
    { key: "expiryDate", label: "Hạn sử dụng" },
    {
      key: "status",
      label: "Trạng thái",
      render: () => <Badge variant="outline" className="border-success text-success">Hoàn tất</Badge>,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Nhập hàng</h1>
        <p className="page-subtitle">Tạo phiếu nhập và quản lý lịch sử nhập kho</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="form-section lg:col-span-1">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <ArrowDownToLine className="w-5 h-5 text-primary" />
            Phiếu nhập mới
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
                    {p.name} ({p.sku})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="input-group">
            <Label className="input-label">Số lượng</Label>
            <Input type="number" placeholder="Nhập số lượng" />
          </div>

          <div className="input-group">
            <Label className="input-label">Nhà cung cấp</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Chọn nhà cung cấp" />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="input-group">
            <Label className="input-label">Ngày nhập</Label>
            <Input type="date" defaultValue={new Date().toISOString().split("T")[0]} />
          </div>

          <div className="input-group">
            <Label className="input-label">Mã lô (Batch Code)</Label>
            <Input placeholder="VD: BTH-202412-001" />
          </div>

          <div className="input-group">
            <Label className="input-label">Hạn sử dụng</Label>
            <Input type="date" />
          </div>

          <div className="input-group">
            <Label className="input-label">Ghi chú</Label>
            <Textarea placeholder="Ghi chú thêm..." rows={3} />
          </div>

          <Button className="w-full">
            <ArrowDownToLine className="w-4 h-4 mr-2" />
            Xác nhận nhập hàng
          </Button>
        </div>

        {/* History */}
        <div className="lg:col-span-2">
          <h3 className="font-semibold text-lg mb-4">Lịch sử nhập hàng</h3>
          <DataTable columns={columns} data={importTransactions} />
        </div>
      </div>
    </div>
  );
}
