import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { logPageView } from "../utils/analytics";
import PublicLayout from "../components/PublicLayout";
import ProtectedLayout from "../components/ProtectedLayout";
import ProtectedRoute from "../auth/ProtectedRoute";
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

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

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

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
