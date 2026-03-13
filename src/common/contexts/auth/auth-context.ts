import { createContext } from "react";
import type { KeycloakProfile } from "keycloak-js";

export type AuthContextValue = {
  ready: boolean;
  isAuthenticated: boolean;
  keycloakEnabled: boolean;
  profile: KeycloakProfile | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
