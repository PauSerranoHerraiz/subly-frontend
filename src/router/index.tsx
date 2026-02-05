import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { logPageView } from "../utils/analytics";
import PublicLayout from "../layouts/PublicLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import Landing from "../pages/Landing";
import About from "../pages/About";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import Plans from "../pages/Plans";
import Subscriptions from "../pages/Subscriptions";
import NotFound from "../pages/NotFound";

function PageViewTracker() {
  const location = useLocation();

  useEffect(() => {
    logPageView();
  }, [location.pathname]);

  return null;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <PageViewTracker />
      <Routes>
        {/* Public routes with footer */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Landing />
            </PublicLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PublicLayout>
              <About />
            </PublicLayout>
          }
        />

        {/* Auth pages (no footer) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Dashboard />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Customers />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/plans"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Plans />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/subscriptions"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Subscriptions />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
