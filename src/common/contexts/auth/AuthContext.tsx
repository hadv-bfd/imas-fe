import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { KeycloakProfile } from "keycloak-js";
import { keycloak, keycloakEnabled } from "../../../services/auth/keycloak";
import { setApiAuthToken } from "../../../services/api/client";
import { AuthContext } from "./auth-context";

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [ready, setReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState<KeycloakProfile | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      const kc = keycloak;

      if (!keycloakEnabled || !kc) {
        setIsAuthenticated(true);
        setReady(true);
        return;
      }

      try {
        const authenticated = await kc.init({
          onLoad: "check-sso",
          pkceMethod: "S256",
          checkLoginIframe: false,
          silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
        });

        setIsAuthenticated(authenticated);
        setApiAuthToken(kc.token);

        if (authenticated) {
          const user = await kc.loadUserProfile();
          setProfile(user);
        }

        kc.onAuthSuccess = async () => {
          setIsAuthenticated(true);
          setApiAuthToken(kc.token);
          const user = await kc.loadUserProfile();
          setProfile(user);
        };

        kc.onAuthLogout = () => {
          setIsAuthenticated(false);
          setProfile(null);
          setApiAuthToken(undefined);
        };

        kc.onTokenExpired = async () => {
          try {
            await kc.updateToken(30);
            setApiAuthToken(kc.token);
          } catch {
            await kc.logout({ redirectUri: window.location.origin });
          }
        };
      } catch (error) {
        console.error("Keycloak init failed", error);
      } finally {
        setReady(true);
      }
    };

    void initAuth();
  }, []);

  const login = async () => {
    const kc = keycloak;

    if (!keycloakEnabled || !kc) {
      return;
    }

    await kc.login({ redirectUri: window.location.origin });
  };

  const logout = async () => {
    const kc = keycloak;

    if (!keycloakEnabled || !kc) {
      setIsAuthenticated(false);
      setProfile(null);
      return;
    }

    await kc.logout({ redirectUri: window.location.origin });
  };

  const value = useMemo(
    () => ({
      ready,
      isAuthenticated,
      keycloakEnabled,
      profile,
      login,
      logout,
    }),
    [ready, isAuthenticated, profile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
