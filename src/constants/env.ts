const env = import.meta.env

export const API_BASE_URL = env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com'

export const KEYCLOAK_CONFIG = {
  url: env.VITE_KEYCLOAK_URL || '',
  realm: env.VITE_KEYCLOAK_REALM || '',
  clientId: env.VITE_KEYCLOAK_CLIENT_ID || '',
}

export const keycloakEnabled =
  KEYCLOAK_CONFIG.url.length > 0 &&
  KEYCLOAK_CONFIG.realm.length > 0 &&
  KEYCLOAK_CONFIG.clientId.length > 0
