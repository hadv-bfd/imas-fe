import Keycloak from 'keycloak-js'
import { KEYCLOAK_CONFIG, keycloakEnabled } from '../../constants/env'

export { keycloakEnabled }

export const keycloak = keycloakEnabled
  ? new Keycloak({
      url: KEYCLOAK_CONFIG.url,
      realm: KEYCLOAK_CONFIG.realm,
      clientId: KEYCLOAK_CONFIG.clientId,
    })
  : null
