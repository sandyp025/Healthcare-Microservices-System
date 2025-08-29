import axios from 'axios'
import { LoginRequest, LoginResponse } from '@/types/auth'

// Notice: the base URL now ends with /auth
const AUTH_BASE_URL =
  (process.env.NEXT_PUBLIC_AUTH_SERVICE_URL ||
    'http://lb-95a94c8e.elb.localhost.localstack.cloud:4004') + '/auth'

const authApi = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    console.log('Auth Base URL:', AUTH_BASE_URL)
    console.log('Making request to:', `${AUTH_BASE_URL}/login`)
    const response = await authApi.post<LoginResponse>('/login', credentials)

    // store token here if API returns one
    if (response.data?.token) {
      localStorage.setItem('auth_token', response.data.token)
    }

    return response.data
  },

  validateToken: async (token: string): Promise<boolean> => {
    try {
      await authApi.get('/validate', {
        headers: { Authorization: `Bearer ${token}` },
      })
      return true
    } catch {
      return false
    }
  },
}
