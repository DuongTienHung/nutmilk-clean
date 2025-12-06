import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Server, Database, HardDrive, RefreshCw } from "lucide-react";

export default function SystemSettings() {
  return (
    <div className="space-y-6">
      <div className="form-section">
        <h3 className="font-semibold text-lg flex items-center gap-2 mb-6">
          <Database className="w-5 h-5 text-primary" />
          Cơ sở dữ liệu
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="font-medium text-sm">Tự động sao lưu</p>
              <p className="text-sm text-muted-foreground">Sao lưu dữ liệu tự động hàng ngày</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="input-group">
              <Label className="input-label">Tần suất sao lưu</Label>
              <Select defaultValue="daily">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Mỗi giờ</SelectItem>
                  <SelectItem value="daily">Hàng ngày</SelectItem>
                  <SelectItem value="weekly">Hàng tuần</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="input-group">
              <Label className="input-label">Giữ bản sao lưu (ngày)</Label>
              <Input type="number" defaultValue="30" />
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline">
              <HardDrive className="w-4 h-4 mr-2" />
              Sao lưu ngay
            </Button>
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Khôi phục
            </Button>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="font-semibold text-lg flex items-center gap-2 mb-6">
          <Server className="w-5 h-5 text-primary" />
          Hiệu suất hệ thống
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="font-medium text-sm">Bộ nhớ cache</p>
              <p className="text-sm text-muted-foreground">Lưu trữ tạm để tăng tốc độ tải</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="font-medium text-sm">Nén dữ liệu</p>
              <p className="text-sm text-muted-foreground">Giảm dung lượng truyền tải</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="font-medium text-sm">Ghi log hệ thống</p>
              <p className="text-sm text-muted-foreground">Ghi lại hoạt động để theo dõi</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="input-group">
            <Label className="input-label">Mức độ log</Label>
            <Select defaultValue="error">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="debug">Debug (Chi tiết)</SelectItem>
                <SelectItem value="info">Info (Thông tin)</SelectItem>
                <SelectItem value="error">Error (Lỗi)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="font-semibold text-lg mb-6">Thông tin hệ thống</h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Phiên bản</span>
            <span className="font-medium">NutMilk ERP v1.0.0</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Framework</span>
            <span className="font-medium">React + TypeScript</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Database</span>
            <span className="font-medium">PostgreSQL</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Cập nhật lần cuối</span>
            <span className="font-medium">05/12/2024</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Lưu thay đổi
        </Button>
      </div>
    </div>
  );
}
