import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/dummy-data";
import { Plus, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export default function InventoryHome() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "all" || p.category === category;
    return matchSearch && matchCategory;
  });

  const columns = [
    { key: "sku", label: "Mã SKU" },
    { key: "name", label: "Tên sản phẩm" },
    { key: "category", label: "Danh mục" },
    { key: "unit", label: "Đơn vị" },
    {
      key: "stock",
      label: "Tồn kho",
      render: (item: typeof products[0]) => (
        <span className={cn(item.stock < item.minStock && "text-destructive font-medium")}>
          {item.stock}
        </span>
      ),
    },
    {
      key: "status",
      label: "Trạng thái",
      render: (item: typeof products[0]) => {
        const daysUntilExpiry = Math.ceil(
          (new Date(item.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
        );
        if (daysUntilExpiry < 30) {
          return <Badge variant="destructive">Sắp hết hạn</Badge>;
        }
        if (item.stock < item.minStock) {
          return <Badge variant="outline" className="border-warning text-warning">Tồn thấp</Badge>;
        }
        return <Badge variant="outline" className="border-success text-success">Bình thường</Badge>;
      },
    },
    { key: "expiryDate", label: "Hạn sử dụng" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="page-header">
          <h1 className="page-title">Quản lý kho</h1>
          <p className="page-subtitle">Theo dõi tồn kho và trạng thái sản phẩm</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Thêm sản phẩm
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Danh mục" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả danh mục</SelectItem>
            <SelectItem value="Sữa hạt">Sữa hạt</SelectItem>
            <SelectItem value="Hạt rang">Hạt rang</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <DataTable columns={columns} data={filteredProducts} />
    </div>
  );
}
