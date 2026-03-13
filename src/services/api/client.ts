import axios from 'axios'
import { API_BASE_URL } from '../../constants/env'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

export function setApiAuthToken(token?: string) {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`
    return
  }

  delete apiClient.defaults.headers.common.Authorization
}
