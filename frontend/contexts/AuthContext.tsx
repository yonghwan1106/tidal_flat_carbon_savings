'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { apiClient, LoginResponse, UserInfo } from '@/lib/api'

interface AuthContextType {
  user: LoginResponse | null
  userInfo: UserInfo | null
  isAuthenticated: boolean
  login: (userId: string) => Promise<void>
  logout: () => void
  refreshUserInfo: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<LoginResponse | null>(null)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  useEffect(() => {
    // 페이지 로드 시 토큰 확인
    const token = localStorage.getItem('access_token')
    const savedUser = localStorage.getItem('user')

    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser))
        refreshUserInfo()
      } catch (error) {
        console.error('Failed to restore user session:', error)
        logout()
      }
    }
  }, [])

  const login = async (userId: string) => {
    try {
      const response = await apiClient.demoLogin(userId)
      setUser(response)
      localStorage.setItem('user', JSON.stringify(response))
      await refreshUserInfo()
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    setUserInfo(null)
    apiClient.clearToken()
    localStorage.removeItem('user')
  }

  const refreshUserInfo = async () => {
    try {
      const info = await apiClient.getCurrentUser()
      setUserInfo(info)
    } catch (error) {
      console.error('Failed to fetch user info:', error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userInfo,
        isAuthenticated: !!user,
        login,
        logout,
        refreshUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
