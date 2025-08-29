'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { AuthContextType, User } from '@/types/auth'
import { authService } from '@/services/auth'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token')
    const storedUser = localStorage.getItem('auth_user')
    
    if (storedToken && storedUser) {
      authService.validateToken(storedToken).then((isValid) => {
        if (isValid) {
          setToken(storedToken)
          setUser(JSON.parse(storedUser))
        } else {
          localStorage.removeItem('auth_token')
          localStorage.removeItem('auth_user')
        }
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authService.login({ email, password })
      const newToken = response.token
      
      const mockUser: User = {
        id: '1',
        email,
        role: 'ADMIN'
      }

      localStorage.setItem('auth_token', newToken)
      localStorage.setItem('auth_user', JSON.stringify(mockUser))
      
      setToken(newToken)
      setUser(mockUser)
      
      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    setToken(null)
    setUser(null)
    router.push('/login')
  }

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}