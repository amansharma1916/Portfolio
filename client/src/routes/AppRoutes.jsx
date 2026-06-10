import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./Protected";
import Dashboard from "../admin/private/Dashboard";
import Admin from "../admin/Admin";

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
      } />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;