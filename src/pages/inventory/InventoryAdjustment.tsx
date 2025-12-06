import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { products, stockTransactions } from "@/lib/dummy-data";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export default function InventoryAdjustment() {
  const adjustmentTransactions = stockTransactions.filter((t) => t.type === "adjustment");

  const columns = [
    { key: "date", label: "Ngày" },
    { key: "productName", label: "Sản phẩm" },
    {
      key: "quantity",
      label: "Điều chỉnh",
      render: (item: typeof adjustmentTransactions[0]) => (
        <span className={cn(item.quantity > 0 ? "text-success" : "text-destructive", "font-medium")}>
          {item.quantity > 0 ? `+${item.quantity}` : item.quantity}
        </span>
      ),
    },
    { key: "reason", label: "Lý do" },
    { key: "note", label: "Ghi chú" },
    {
      key: "status",
      label: "Trạng thái",
      render: () => <Badge variant="outline">Đã xử lý</Badge>,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Điều chỉnh tồn kho</h1>
        <p className="page-subtitle">Tăng/giảm số lượng tồn kho và ghi nhận lý do</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="form-section lg:col-span-1">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-primary" />
            Phiếu điều chỉnh
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
            <Label className="input-label">Loại điều chỉnh</Label>
            <RadioGroup defaultValue="decrease" className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="increase" id="increase" />
                <Label htmlFor="increase" className="text-success cursor-pointer">Tăng (+)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="decrease" id="decrease" />
                <Label htmlFor="decrease" className="text-destructive cursor-pointer">Giảm (-)</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="input-group">
            <Label className="input-label">Số lượng</Label>
            <Input type="number" placeholder="Nhập số lượng điều chỉnh" />
          </div>

          <div className="input-group">
            <Label className="input-label">Lý do điều chỉnh</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Chọn lý do" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="damage">Hư hỏng</SelectItem>
                <SelectItem value="expired">Hết hạn</SelectItem>
                <SelectItem value="lost">Thất thoát</SelectItem>
                <SelectItem value="count">Kiểm kê</SelectItem>
                <SelectItem value="return">Trả hàng</SelectItem>
                <SelectItem value="other">Khác</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="input-group">
            <Label className="input-label">Ghi chú chi tiết</Label>
            <Textarea placeholder="Mô tả lý do điều chỉnh..." rows={3} />
          </div>

          <Button className="w-full">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Xác nhận điều chỉnh
          </Button>
        </div>

        {/* History */}
        <div className="lg:col-span-2">
          <h3 className="font-semibold text-lg mb-4">Lịch sử điều chỉnh</h3>
          <DataTable columns={columns} data={adjustmentTransactions} />
        </div>
      </div>
    </div>
  );
}
