import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import { DashboardLayout } from "@/components/layout/DashboardLayout";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import InventoryHome from "./pages/inventory/InventoryHome";
import InventoryImport from "./pages/inventory/InventoryImport";
import InventoryExport from "./pages/inventory/InventoryExport";
import InventoryAdjustment from "./pages/inventory/InventoryAdjustment";
import Suppliers from "./pages/Suppliers";
import Products from "./pages/Products";
import Reports from "./pages/Reports";

// Staff / HR
import StaffList from "./pages/staff/StaffList";
import StaffNew from "./pages/staff/StaffNew";
import StaffDetail from "./pages/staff/StaffDetail";
import StaffAttendance from "./pages/staff/StaffAttendance";
import StaffPayroll from "./pages/staff/StaffPayroll";
import AttendanceOverview from "./pages/staff/AttendanceOverview";
import PayrollOverview from "./pages/staff/PayrollOverview";

// Settings
import SettingsLayout from "./pages/settings/SettingsLayout";
import GeneralSettings from "./pages/settings/GeneralSettings";
import SecuritySettings from "./pages/settings/SecuritySettings";
import NotificationSettings from "./pages/settings/NotificationSettings";
import UsersSettings from "./pages/settings/UsersSettings";
import SystemSettings from "./pages/settings/SystemSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Dashboard Layout Routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Inventory */}
            <Route path="/inventory" element={<InventoryHome />} />
            <Route path="/inventory/import" element={<InventoryImport />} />
            <Route path="/inventory/export" element={<InventoryExport />} />
            <Route path="/inventory/adjustment" element={<InventoryAdjustment />} />
            
            {/* Suppliers & Products */}
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/products" element={<Products />} />
            
            {/* Reports */}
            <Route path="/reports" element={<Reports />} />
            
            {/* Staff / HR */}
            <Route path="/staff" element={<StaffList />} />
            <Route path="/staff/new" element={<StaffNew />} />
            <Route path="/staff/attendance" element={<AttendanceOverview />} />
            <Route path="/staff/payroll" element={<PayrollOverview />} />
            <Route path="/staff/:id" element={<StaffDetail />} />
            <Route path="/staff/:id/attendance" element={<StaffAttendance />} />
            <Route path="/staff/:id/payroll" element={<StaffPayroll />} />
            
            {/* Settings */}
            <Route path="/settings" element={<SettingsLayout />}>
              <Route index element={<GeneralSettings />} />
              <Route path="security" element={<SecuritySettings />} />
              <Route path="notifications" element={<NotificationSettings />} />
              <Route path="users" element={<UsersSettings />} />
              <Route path="system" element={<SystemSettings />} />
            </Route>
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
