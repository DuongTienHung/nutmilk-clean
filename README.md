# 🥛 NutMilk ERP Web (Frontend)
NutMilk ERP Web là ứng dụng web quản lý nội bộ cho doanh nghiệp sản xuất sữa hạt, được xây dựng bằng **React + TypeScript + Vite**.  
Project tập trung vào giao diện, phân trang theo vai trò và luồng sử dụng ERP.

## ⚙️ Yêu cầu môi trường
- **Node.js**: v18 trở lên  
- **npm**: đi kèm Node.js

Kiểm tra:
```bash
node -v
npm -v
🚀 Chạy project từng bước
Bước 1: Mở thư mục project
cd NutMilkClean

Bước 2: Cài dependencies
npm install

Bước 3: Chạy server development
npm run dev

Bước 4: Mở trình duyệt
Truy cập:http://localhost:8080

👉 Nếu chạy thành công, giao diện web NutMilk sẽ hiển thị.

🧭 Luồng cơ bản của ứng dụng
Truy cập Landing Page
Chuyển sang Login Page
Đăng nhập và điều hướng theo vai trò:
Admin
Quản lý kho
Nhân viên kho
Nhân viên mua hàng
Nhân viên sản xuất
Nếu không có quyền → trang Unauthorized

📁 Cấu trúc chính
src/
├── components/   # UI components, layout, form
├── pages/        # Các trang theo vai trò
├── contexts/     # Auth & global state
├── lib/          # Helper & business logic
├── App.tsx       # Root component
├── main.tsx      # Entry point
