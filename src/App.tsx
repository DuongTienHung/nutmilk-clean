import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import Suppliers from "./pages/admin/Suppliers";
import Materials from "./pages/admin/Materials";
import UsersPage from "./pages/admin/UsersPage";

// Warehouse Manager pages
import WarehouseManagerDashboard from "./pages/warehouse-manager/WarehouseManagerDashboard";
import Inventory from "./pages/warehouse-manager/Inventory";
import Batches from "./pages/warehouse-manager/Batches";
import Receipts from "./pages/warehouse-manager/Receipts";
import Issues from "./pages/warehouse-manager/Issues";
import Disposals from "./pages/warehouse-manager/Disposals";
import Reports from "./pages/warehouse-manager/Reports";
import WarehouseHistory from "./pages/warehouse-manager/History";

// Purchasing pages
import PurchasingDashboard from "./pages/purchasing/PurchasingDashboard";
import CreateOrder from "./pages/purchasing/CreateOrder";
import Orders from "./pages/purchasing/Orders";
import Requests from "./pages/purchasing/Requests";
import Suggestions from "./pages/purchasing/Suggestions";
import Delivery from "./pages/purchasing/Delivery";
import PurchasingHistory from "./pages/purchasing/History";

// Production pages
import ProductionDashboard from "./pages/production/ProductionDashboard";
import ProductionOrders from "./pages/production/ProductionOrders";
import Execute from "./pages/production/Execute";
import ProductionBatches from "./pages/production/ProductionBatches";
import ProductionMaterials from "./pages/production/ProductionMaterials";
import MaterialRequests from "./pages/production/MaterialRequests";
import Shifts from "./pages/production/Shifts";
import ProductionHistory from "./pages/production/ProductionHistory";

// Warehouse Staff pages
import WarehouseStaffDashboard from "./pages/warehouse-staff/WarehouseStaffDashboard";
import CreateReceipt from "./pages/warehouse-staff/CreateReceipt";
import ReceiveGoods from "./pages/warehouse-staff/ReceiveGoods";
import CreateIssue from "./pages/warehouse-staff/CreateIssue";
import Stocktake from "./pages/warehouse-staff/Stocktake";
import StaffDisposals from "./pages/warehouse-staff/StaffDisposals";
import StaffHistory from "./pages/warehouse-staff/StaffHistory";
// settings
import Settings from "./pages/settings";
// profile
import Profile from "./pages/profile";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Admin routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/suppliers" element={<Suppliers />} />
            <Route path="/admin/materials" element={<Materials />} />
            <Route path="/admin/pricing" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UsersPage />} />
            <Route path="/admin/roles" element={<AdminDashboard />} />

            {/* Warehouse Manager routes */}
            <Route path="/warehouse-manager" element={<WarehouseManagerDashboard />} />
            <Route path="/warehouse-manager/inventory" element={<Inventory />} />
            <Route path="/warehouse-manager/batches" element={<Batches />} />
            <Route path="/warehouse-manager/receipts" element={<Receipts />} />
            <Route path="/warehouse-manager/issues" element={<Issues />} />
            <Route path="/warehouse-manager/disposals" element={<Disposals />} />
            <Route path="/warehouse-manager/reports" element={<Reports />} />
            <Route path="/warehouse-manager/history" element={<WarehouseHistory />} />

            {/* Purchasing routes */}
            <Route path="/purchasing" element={<PurchasingDashboard />} />
            <Route path="/purchasing/create-order" element={<CreateOrder />} />
            <Route path="/purchasing/orders" element={<Orders />} />
            <Route path="/purchasing/requests" element={<Requests />} />
            <Route path="/purchasing/suggestions" element={<Suggestions />} />
            <Route path="/purchasing/delivery" element={<Delivery />} />
            <Route path="/purchasing/history" element={<PurchasingHistory />} />

            {/* Production routes */}
            <Route path="/production" element={<ProductionDashboard />} />
            <Route path="/production/orders" element={<ProductionOrders />} />
            <Route path="/production/execute" element={<Execute />} />
            <Route path="/production/batches" element={<ProductionBatches />} />
            <Route path="/production/materials" element={<ProductionMaterials />} />
            <Route path="/production/requests" element={<MaterialRequests />} />
            <Route path="/production/shifts" element={<Shifts />} />
            <Route path="/production/history" element={<ProductionHistory />} />

            {/* Warehouse Staff routes */}
            <Route path="/warehouse-staff" element={<WarehouseStaffDashboard />} />
            <Route path="/warehouse-staff/create-receipt" element={<CreateReceipt />} />
            <Route path="/warehouse-staff/receive" element={<ReceiveGoods />} />
            <Route path="/warehouse-staff/create-issue" element={<CreateIssue />} />
            <Route path="/warehouse-staff/stocktake" element={<Stocktake />} />
            <Route path="/warehouse-staff/disposals" element={<StaffDisposals />} />
            <Route path="/warehouse-staff/history" element={<StaffHistory />} />
            {/* setting and profile routes */}
            {/* User routes */}
            {/* User routes */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />

            {/* Catch all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
