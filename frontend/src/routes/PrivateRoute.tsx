// routes/PrivateRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext2";

interface PrivateRouteProps {
  allowedFor: "candidato" | "recrutador";
}

export const PrivateRoute = ({ allowedFor }: PrivateRouteProps) => {
  const { isAuthenticated, userType } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (userType !== allowedFor) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
