import { Spin } from "antd";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../common/contexts/AuthContext";

type Props = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: Props) {
  const location = useLocation();
  const { ready, isAuthenticated } = useAuth();

  if (!ready) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Spin size="large" />
      </div>
    );
  }

  //   if (!isAuthenticated) {
  //     return <Navigate to="/login" state={{ from: location.pathname }} replace />
  //   }

  return <>{children}</>;
}
