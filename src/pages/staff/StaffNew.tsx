import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, UserPlus } from "lucide-react";

export default function StaffNew() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/staff")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="page-header">
          <h1 className="page-title">Thêm nhân viên mới</h1>
          <p className="page-subtitle">Nhập thông tin nhân viên vào hệ thống</p>
        </div>
      </div>

      <div className="max-w-2xl">
        <div className="form-section">
          <h3 className="font-semibold text-lg flex items-center gap-2 mb-6">
            <UserPlus className="w-5 h-5 text-primary" />
            Thông tin cá nhân
          </h3>

          <div className="grid grid-cols-2 gap-6">
            <div className="input-group">
              <Label className="input-label">Họ và tên</Label>
              <Input placeholder="Nhập họ tên đầy đủ" />
            </div>
            <div className="input-group">
              <Label className="input-label">Email</Label>
              <Input type="email" placeholder="email@nutmilk.vn" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="input-group">
              <Label className="input-label">Số điện thoại</Label>
              <Input placeholder="0901234567" />
            </div>
            <div className="input-group">
              <Label className="input-label">Ngày sinh</Label>
              <Input type="date" />
            </div>
          </div>

          <div className="input-group">
            <Label className="input-label">Địa chỉ</Label>
            <Input placeholder="Địa chỉ thường trú" />
          </div>
        </div>

        <div className="form-section mt-6">
          <h3 className="font-semibold text-lg mb-6">Thông tin công việc</h3>

          <div className="grid grid-cols-2 gap-6">
            <div className="input-group">
              <Label className="input-label">Phòng ban</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn phòng ban" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kho">Kho vận</SelectItem>
                  <SelectItem value="tai-chinh">Tài chính</SelectItem>
                  <SelectItem value="nhan-su">Nhân sự</SelectItem>
                  <SelectItem value="san-xuat">Sản xuất</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="input-group">
              <Label className="input-label">Chức vụ</Label>
              <Input placeholder="VD: Nhân viên kho" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="input-group">
              <Label className="input-label">Ngày vào làm</Label>
              <Input type="date" defaultValue={new Date().toISOString().split("T")[0]} />
            </div>
            <div className="input-group">
              <Label className="input-label">Vai trò hệ thống</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Quản lý</SelectItem>
                  <SelectItem value="staff">Nhân viên</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="input-group">
              <Label className="input-label">Lương cơ bản</Label>
              <Input type="number" placeholder="15000000" />
            </div>
            <div className="input-group">
              <Label className="input-label">Trạng thái</Label>
              <Select defaultValue="active">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Đang làm việc</SelectItem>
                  <SelectItem value="probation">Thử việc</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => navigate("/staff")}>
              Hủy bỏ
            </Button>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Lưu nhân viên
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
