import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Save, Bell, Mail, MessageSquare } from "lucide-react";

export default function NotificationSettings() {
  return (
    <div className="space-y-6">
      <div className="form-section">
        <h3 className="font-semibold text-lg flex items-center gap-2 mb-6">
          <Bell className="w-5 h-5 text-primary" />
          Thông báo trong ứng dụng
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="font-medium text-sm">Sản phẩm sắp hết hạn</p>
              <p className="text-sm text-muted-foreground">Nhận thông báo khi sản phẩm gần hết hạn sử dụng</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="font-medium text-sm">Tồn kho thấp</p>
              <p className="text-sm text-muted-foreground">Nhận thông báo khi tồn kho dưới mức tối thiểu</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="font-medium text-sm">Nhập/xuất kho</p>
              <p className="text-sm text-muted-foreground">Nhận thông báo khi có giao dịch nhập xuất</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="font-medium text-sm">Chấm công nhân viên</p>
              <p className="text-sm text-muted-foreground">Nhận thông báo khi nhân viên check-in/out</p>
            </div>
            <Switch />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="font-semibold text-lg flex items-center gap-2 mb-6">
          <Mail className="w-5 h-5 text-primary" />
          Thông báo qua Email
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="font-medium text-sm">Báo cáo hàng ngày</p>
              <p className="text-sm text-muted-foreground">Nhận email tổng hợp hoạt động hàng ngày</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="font-medium text-sm">Báo cáo hàng tuần</p>
              <p className="text-sm text-muted-foreground">Nhận email tổng hợp hoạt động hàng tuần</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="font-medium text-sm">Cảnh báo khẩn cấp</p>
              <p className="text-sm text-muted-foreground">Nhận email khi có vấn đề nghiêm trọng</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>

        <div className="mt-6">
          <div className="input-group">
            <Label className="input-label">Thời gian gửi báo cáo</Label>
            <Select defaultValue="8">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6">06:00</SelectItem>
                <SelectItem value="8">08:00</SelectItem>
                <SelectItem value="9">09:00</SelectItem>
                <SelectItem value="18">18:00</SelectItem>
              </SelectContent>
            </Select>
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
