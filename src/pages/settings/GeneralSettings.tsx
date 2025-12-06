import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";

export default function GeneralSettings() {
  return (
    <div className="space-y-6">
      <div className="form-section">
        <h3 className="font-semibold text-lg mb-6">Thông tin công ty</h3>

        <div className="space-y-6">
          <div className="input-group">
            <Label className="input-label">Tên công ty</Label>
            <Input defaultValue="NutMilk Vietnam" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="input-group">
              <Label className="input-label">Email</Label>
              <Input type="email" defaultValue="contact@nutmilk.vn" />
            </div>
            <div className="input-group">
              <Label className="input-label">Số điện thoại</Label>
              <Input defaultValue="028 1234 5678" />
            </div>
          </div>

          <div className="input-group">
            <Label className="input-label">Địa chỉ</Label>
            <Textarea defaultValue="123 Nguyễn Văn Linh, Quận 7, TP.HCM" rows={2} />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="input-group">
              <Label className="input-label">Mã số thuế</Label>
              <Input defaultValue="0123456789" />
            </div>
            <div className="input-group">
              <Label className="input-label">Website</Label>
              <Input defaultValue="https://nutmilk.vn" />
            </div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="font-semibold text-lg mb-6">Thiết lập khu vực</h3>

        <div className="grid grid-cols-2 gap-6">
          <div className="input-group">
            <Label className="input-label">Múi giờ</Label>
            <Select defaultValue="asia-hcm">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asia-hcm">Asia/Ho_Chi_Minh (GMT+7)</SelectItem>
                <SelectItem value="asia-hanoi">Asia/Hanoi (GMT+7)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="input-group">
            <Label className="input-label">Ngôn ngữ</Label>
            <Select defaultValue="vi">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vi">Tiếng Việt</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="input-group">
            <Label className="input-label">Định dạng ngày</Label>
            <Select defaultValue="dd-mm-yyyy">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="input-group">
            <Label className="input-label">Đơn vị tiền tệ</Label>
            <Select defaultValue="vnd">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vnd">VND - Việt Nam Đồng</SelectItem>
                <SelectItem value="usd">USD - US Dollar</SelectItem>
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
