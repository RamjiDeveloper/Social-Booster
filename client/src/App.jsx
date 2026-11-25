import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { AnimatePresence } from "motion/react";

import PageTransition from "./components/common/PageTransition";
import ProtectedRoute from "./routes/ProtectedRoute";

import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Orders from "./pages/dashboard/Orders";
import Campaigns from "./pages/dashboard/Campaigns";
import Wallet from "./pages/dashboard/Wallet";
import Profile from "./pages/dashboard/Profile";
import NewOrder from "./pages/dashboard/NewOrder";

import Support from "./pages/dashboard/Support";

// Admin
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminSupport from "./pages/admin/AdminSupport";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/services"
          element={
            <PageTransition>
              <ServicesPage />
            </PageTransition>
          }
        />
        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />
        <Route
          path="/register"
          element={
            <PageTransition>
              <Register />
            </PageTransition>
          }
        />

        {/* Protected Customer Dashboard */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="new-order" element={<NewOrder />} />
            <Route path="orders" element={<Orders />} />
            <Route path="campaigns" element={<Campaigns />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="profile" element={<Profile />} />

            <Route path="support" element={<Support />} />
          </Route>
        </Route>
        {/* Protected Admin Panel */}
<Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<AdminDashboard />} />
    <Route path="support" element={<AdminSupport />} />
  </Route>
</Route>

        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
