import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { userRole } from "../types/User";

interface RoleRouteProps {
  allowedRoles: userRole[];
}

export function RoleRoute({ allowedRoles }: RoleRouteProps) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role as userRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
