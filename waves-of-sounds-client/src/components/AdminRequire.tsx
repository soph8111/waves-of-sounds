import { Navigate, Outlet } from "react-router-dom";

export default function AdminRequire() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
}
