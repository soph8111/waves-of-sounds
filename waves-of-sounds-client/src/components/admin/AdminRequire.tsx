// Navigate = JSX redirect
// Outlet = placeholder for child-routes (de routes admin skal have adgang til)   
import { Navigate, Outlet } from "react-router-dom";

export default function AdminRequire() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
}
