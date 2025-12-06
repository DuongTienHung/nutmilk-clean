// Dummy data for NutMilk ERP

export const employees = [
  { id: "1", name: "Nguyễn Văn An", email: "an.nguyen@nutmilk.vn", role: "Quản lý kho", department: "Kho vận", workDays: 22, status: "active", avatar: "", joinDate: "2023-01-15" },
  { id: "2", name: "Trần Thị Bình", email: "binh.tran@nutmilk.vn", role: "Nhân viên kho", department: "Kho vận", workDays: 20, status: "active", avatar: "", joinDate: "2023-03-20" },
  { id: "3", name: "Lê Minh Châu", email: "chau.le@nutmilk.vn", role: "Kế toán", department: "Tài chính", workDays: 21, status: "active", avatar: "", joinDate: "2022-08-10" },
  { id: "4", name: "Phạm Đức Dũng", email: "dung.pham@nutmilk.vn", role: "Nhân viên kho", department: "Kho vận", workDays: 18, status: "on-leave", avatar: "", joinDate: "2023-06-01" },
  { id: "5", name: "Hoàng Thị Hoa", email: "hoa.hoang@nutmilk.vn", role: "HR Manager", department: "Nhân sự", workDays: 23, status: "active", avatar: "", joinDate: "2022-02-14" },
];

export const attendance = [
  { id: "1", employeeId: "1", date: "2024-12-01", checkIn: "08:00", checkOut: "17:30", totalHours: 9.5, status: "present" },
  { id: "2", employeeId: "1", date: "2024-12-02", checkIn: "08:15", checkOut: "17:45", totalHours: 9.5, status: "present" },
  { id: "3", employeeId: "1", date: "2024-12-03", checkIn: "08:00", checkOut: "17:00", totalHours: 9, status: "present" },
  { id: "4", employeeId: "1", date: "2024-12-04", checkIn: "08:30", checkOut: "18:00", totalHours: 9.5, status: "present" },
  { id: "5", employeeId: "1", date: "2024-12-05", checkIn: "08:00", checkOut: "17:30", totalHours: 9.5, status: "present" },
];

export const payroll = [
  { id: "1", employeeId: "1", month: "2024-11", baseSalary: 15000000, totalHours: 176, hourlyRate: 85227, bonus: 2000000, deduction: 500000, totalSalary: 16500000 },
  { id: "2", employeeId: "1", month: "2024-10", baseSalary: 15000000, totalHours: 168, hourlyRate: 85227, bonus: 1500000, deduction: 0, totalSalary: 16500000 },
  { id: "3", employeeId: "1", month: "2024-09", baseSalary: 15000000, totalHours: 184, hourlyRate: 85227, bonus: 2500000, deduction: 200000, totalSalary: 17300000 },
];

export const products = [
  { id: "1", name: "Sữa hạt điều", sku: "NM-001", category: "Sữa hạt", unit: "Chai 500ml", price: 45000, stock: 1250, minStock: 200, expiryDate: "2025-03-15", image: "" },
  { id: "2", name: "Sữa hạnh nhân", sku: "NM-002", category: "Sữa hạt", unit: "Chai 500ml", price: 55000, stock: 890, minStock: 150, expiryDate: "2025-02-20", image: "" },
  { id: "3", name: "Sữa óc chó", sku: "NM-003", category: "Sữa hạt", unit: "Chai 500ml", price: 65000, stock: 450, minStock: 100, expiryDate: "2025-01-10", image: "" },
  { id: "4", name: "Sữa macca", sku: "NM-004", category: "Sữa hạt", unit: "Chai 500ml", price: 75000, stock: 320, minStock: 80, expiryDate: "2025-04-05", image: "" },
  { id: "5", name: "Sữa yến mạch", sku: "NM-005", category: "Sữa hạt", unit: "Chai 500ml", price: 42000, stock: 1800, minStock: 300, expiryDate: "2025-05-01", image: "" },
  { id: "6", name: "Hạt điều rang muối", sku: "NM-006", category: "Hạt rang", unit: "Gói 200g", price: 85000, stock: 560, minStock: 100, expiryDate: "2025-06-15", image: "" },
];

export const suppliers = [
  { id: "1", name: "Công ty TNHH Hạt Việt", contact: "Nguyễn Văn Hải", phone: "0901234567", email: "hai@hatviet.vn", address: "123 Nguyễn Trãi, Q.1, TP.HCM", totalOrders: 45, lastOrder: "2024-12-01" },
  { id: "2", name: "NNC Foods", contact: "Trần Minh Tâm", phone: "0912345678", email: "tam@nncfoods.vn", address: "456 Lê Lợi, Q.3, TP.HCM", totalOrders: 32, lastOrder: "2024-11-28" },
  { id: "3", name: "Green Farm Supply", contact: "Lê Thị Hương", phone: "0923456789", email: "huong@greenfarm.vn", address: "789 Điện Biên Phủ, Q.10, TP.HCM", totalOrders: 28, lastOrder: "2024-11-25" },
  { id: "4", name: "Organic Vietnam", contact: "Phạm Văn Nam", phone: "0934567890", email: "nam@organicvn.vn", address: "321 Cách Mạng Tháng 8, Q.Tân Bình, TP.HCM", totalOrders: 19, lastOrder: "2024-11-20" },
];

export const stockTransactions = [
  { id: "1", type: "import", productId: "1", productName: "Sữa hạt điều", quantity: 500, date: "2024-12-05", supplierId: "1", supplierName: "Công ty TNHH Hạt Việt", batchCode: "BTH-202412-001", expiryDate: "2025-03-15", note: "" },
  { id: "2", type: "export", productId: "2", productName: "Sữa hạnh nhân", quantity: 200, date: "2024-12-04", reason: "Bán hàng", note: "Đơn hàng #DH-001" },
  { id: "3", type: "import", productId: "3", productName: "Sữa óc chó", quantity: 300, date: "2024-12-03", supplierId: "2", supplierName: "NNC Foods", batchCode: "BTH-202412-002", expiryDate: "2025-01-10", note: "" },
  { id: "4", type: "adjustment", productId: "4", productName: "Sữa macca", quantity: -20, date: "2024-12-02", reason: "Hư hỏng", note: "Kiểm kho phát hiện" },
  { id: "5", type: "export", productId: "1", productName: "Sữa hạt điều", quantity: 150, date: "2024-12-01", reason: "Bán hàng", note: "Đơn hàng #DH-002" },
];

export const notifications = [
  { id: "1", title: "Sản phẩm sắp hết hạn", message: "Sữa óc chó (450 chai) sẽ hết hạn vào 10/01/2025", type: "warning", date: "2024-12-05", read: false },
  { id: "2", title: "Tồn kho thấp", message: "Sữa macca còn 320 chai, dưới mức tối thiểu (80)", type: "alert", date: "2024-12-05", read: false },
  { id: "3", title: "Nhập hàng thành công", message: "Đã nhập 500 chai Sữa hạt điều từ Công ty TNHH Hạt Việt", type: "success", date: "2024-12-05", read: true },
  { id: "4", title: "Nhân viên mới", message: "Phạm Đức Dũng đã được thêm vào hệ thống", type: "info", date: "2024-12-04", read: true },
];

export const dashboardStats = {
  totalStock: 5270,
  expiringProducts: 2,
  todayImport: 800,
  todayExport: 350,
  totalSuppliers: 4,
  totalEmployees: 5,
  lowStockProducts: 1,
};

export const chartData = {
  stockFlow: [
    { month: "T7", import: 2400, export: 1800 },
    { month: "T8", import: 2100, export: 1600 },
    { month: "T9", import: 2800, export: 2200 },
    { month: "T10", import: 2600, export: 2000 },
    { month: "T11", import: 3100, export: 2400 },
    { month: "T12", import: 2900, export: 2100 },
  ],
  topProducts: [
    { name: "Sữa yến mạch", value: 1800 },
    { name: "Sữa hạt điều", value: 1250 },
    { name: "Sữa hạnh nhân", value: 890 },
    { name: "Hạt điều rang", value: 560 },
    { name: "Sữa óc chó", value: 450 },
  ],
};
