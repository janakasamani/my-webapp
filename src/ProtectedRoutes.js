import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
  const refreshToken = localStorage.getItem('refreshToken');
  let auth = { token: refreshToken};
  return auth.token ? <Outlet /> : <Navigate to="/" />;
}