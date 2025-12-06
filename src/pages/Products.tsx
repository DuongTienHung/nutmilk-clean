import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products } from "@/lib/dummy-data";
import { Plus, Search, Package } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Products() {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      key: "image",
      label: "",
      render: () => (
        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
          <Package className="w-5 h-5 text-muted-foreground" />
        </div>
      ),
    },
    { key: "sku", label: "Mã SKU" },
    { key: "name", label: "Tên sản phẩm" },
    { key: "category", label: "Danh mục" },
    { key: "unit", label: "Đơn vị" },
    {
      key: "price",
      label: "Giá bán",
      render: (item: typeof products[0]) => (
        <span className="font-medium">{item.price.toLocaleString()}đ</span>
      ),
    },
    { key: "stock", label: "Tồn kho" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="page-header">
          <h1 className="page-title">Sản phẩm</h1>
          <p className="page-subtitle">Quản lý danh mục và giá sản phẩm</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Thêm sản phẩm
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Thêm sản phẩm mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="input-group">
                <Label className="input-label">Mã SKU</Label>
                <Input placeholder="VD: NM-007" />
              </div>
              <div className="input-group">
                <Label className="input-label">Tên sản phẩm</Label>
                <Input placeholder="Nhập tên sản phẩm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="input-group">
                  <Label className="input-label">Danh mục</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sua-hat">Sữa hạt</SelectItem>
                      <SelectItem value="hat-rang">Hạt rang</SelectItem>
                      <SelectItem value="khac">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="input-group">
                  <Label className="input-label">Đơn vị</Label>
                  <Input placeholder="VD: Chai 500ml" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="input-group">
                  <Label className="input-label">Giá bán</Label>
                  <Input type="number" placeholder="0" />
                </div>
                <div className="input-group">
                  <Label className="input-label">Tồn tối thiểu</Label>
                  <Input type="number" placeholder="100" />
                </div>
              </div>
              <Button className="w-full">Lưu sản phẩm</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm theo tên hoặc SKU..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <DataTable columns={columns} data={filteredProducts} />
    </div>
  );
}
