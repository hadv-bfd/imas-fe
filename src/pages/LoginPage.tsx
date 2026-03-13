import { Button, Card, Typography } from "antd";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../common/contexts/AuthContext";

export function LoginPage() {
  const location = useLocation();
  const { ready, isAuthenticated, keycloakEnabled, login } = useAuth();

  if (!ready) {
    return null;
  }

  if (isAuthenticated) {
    const destination =
      (location.state as { from?: string } | null)?.from || "/";
    return <Navigate replace to={destination} />;
  }

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-gradient-to-br from-amber-50 via-white to-cyan-50 p-4">
      <div className="absolute -left-24 -top-16 h-64 w-64 rounded-full bg-amber-200/30 blur-3xl" />
      <div className="absolute -bottom-20 -right-16 h-72 w-72 rounded-full bg-cyan-200/40 blur-3xl" />

      <Card className="z-10 w-full max-w-md shadow-lg">
        <Typography.Title level={3} className="!mb-2 !text-teal-700">
          Login
        </Typography.Title>
        <Typography.Paragraph className="!mb-4">
          Project integrated with Keycloak authentication.
        </Typography.Paragraph>

        {!keycloakEnabled ? (
          <Typography.Paragraph type="warning">
            Missing Keycloak env config. Please define VITE_KEYCLOAK_URL,
            VITE_KEYCLOAK_REALM and VITE_KEYCLOAK_CLIENT_ID.
          </Typography.Paragraph>
        ) : null}

        <Button block size="large" type="primary" onClick={() => void login()}>
          Login with Keycloak
        </Button>
      </Card>
    </div>
  );
}
