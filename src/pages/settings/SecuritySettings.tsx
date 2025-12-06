import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Shield, Key, Lock } from "lucide-react";

export default function SecuritySettings() {
  return (
    <div className="space-y-6">
      <div className="form-section">
        <h3 className="font-semibold text-lg flex items-center gap-2 mb-6">
          <Key className="w-5 h-5 text-primary" />
          Chính sách mật khẩu
        </h3>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="input-group">
              <Label className="input-label">Độ dài tối thiểu</Label>
              <Select defaultValue="8">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 ký tự</SelectItem>
                  <SelectItem value="8">8 ký tự</SelectItem>
                  <SelectItem value="12">12 ký tự</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="input-group">
              <Label className="input-label">Thời hạn mật khẩu</Label>
              <Select defaultValue="90">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 ngày</SelectItem>
                  <SelectItem value="60">60 ngày</SelectItem>
                  <SelectItem value="90">90 ngày</SelectItem>
                  <SelectItem value="never">Không giới hạn</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="font-medium text-sm">Yêu cầu chữ hoa</p>
              <p className="text-sm text-muted-foreground">Mật khẩu phải có ít nhất 1 chữ hoa</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="font-medium text-sm">Yêu cầu số</p>
              <p className="text-sm text-muted-foreground">Mật khẩu phải có ít nhất 1 chữ số</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="font-medium text-sm">Yêu cầu ký tự đặc biệt</p>
              <p className="text-sm text-muted-foreground">Mật khẩu phải có ít nhất 1 ký tự đặc biệt</p>
            </div>
            <Switch />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="font-semibold text-lg flex items-center gap-2 mb-6">
          <Lock className="w-5 h-5 text-primary" />
          Xác thực hai yếu tố (2FA)
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="font-medium text-sm">Bật 2FA cho Admin</p>
              <p className="text-sm text-muted-foreground">Yêu cầu xác thực 2FA cho tài khoản admin</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="font-medium text-sm">Bật 2FA cho tất cả</p>
              <p className="text-sm text-muted-foreground">Yêu cầu xác thực 2FA cho tất cả người dùng</p>
            </div>
            <Switch />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="font-semibold text-lg flex items-center gap-2 mb-6">
          <Shield className="w-5 h-5 text-primary" />
          Phiên đăng nhập
        </h3>

        <div className="grid grid-cols-2 gap-6">
          <div className="input-group">
            <Label className="input-label">Thời gian phiên (phút)</Label>
            <Input type="number" defaultValue="60" />
          </div>
          <div className="input-group">
            <Label className="input-label">Số lần thử đăng nhập tối đa</Label>
            <Input type="number" defaultValue="5" />
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
