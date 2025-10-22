/**
 * API 클라이언트 유틸리티
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8002'

export interface DemoAccount {
  user_id: string
  name: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
  user_id: string
  name: string
}

export interface Activity {
  activity_id: string
  title: string
  description: string
  date: string
  start_time: string
  duration_hours: number
  location_name: string
  latitude: number
  longitude: number
  max_participants: number
  points_per_hour: number
  image_url: string
  status: string
}

export interface ActivitiesResponse {
  activities: Activity[]
  total: number
}

export interface UserInfo {
  user_id: string
  name: string
  address: string
  total_points: number
  profile_type: string
  created_at: string
}

class ApiClient {
  private token: string | null = null

  constructor() {
    // 로컬 스토리지에서 토큰 로드 (클라이언트 사이드에서만)
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('access_token')
    }
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token)
    }
  }

  clearToken() {
    this.token = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token')
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Unknown error' }))
      throw new Error(error.detail || `HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  // Auth APIs
  async getDemoAccounts(): Promise<{ accounts: DemoAccount[] }> {
    return this.request('/api/auth/demo-accounts')
  }

  async demoLogin(userId: string): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>('/api/auth/demo-login', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId }),
    })

    this.setToken(response.access_token)
    return response
  }

  // Activities APIs
  async getActivities(status: string = 'open'): Promise<ActivitiesResponse> {
    return this.request(`/api/activities/?status=${status}`)
  }

  async getActivityDetail(activityId: string): Promise<Activity> {
    return this.request(`/api/activities/${activityId}`)
  }

  async joinActivity(activityId: string): Promise<any> {
    return this.request(`/api/activities/${activityId}/join`, {
      method: 'POST',
    })
  }

  // User APIs
  async getCurrentUser(): Promise<UserInfo> {
    return this.request('/api/users/me')
  }

  async getMyParticipations(): Promise<any> {
    return this.request('/api/users/me/participations')
  }

  async getMyTransactions(limit: number = 50): Promise<any> {
    return this.request(`/api/users/me/transactions?limit=${limit}`)
  }

  // Partners APIs
  async getPartners(category?: string): Promise<any> {
    const url = category
      ? `/api/partners/?category=${category}`
      : '/api/partners/'
    return this.request(url)
  }

  async getPartnerDetail(partnerId: string): Promise<any> {
    return this.request(`/api/partners/${partnerId}`)
  }

  // Dashboard APIs
  async getDashboardStats(): Promise<any> {
    return this.request('/api/dashboard/stats')
  }

  async getDashboardRankings(limit: number = 10): Promise<any> {
    return this.request(`/api/dashboard/rankings?limit=${limit}`)
  }

  async getRecentActivities(limit: number = 5): Promise<any> {
    return this.request(`/api/dashboard/activities/recent?limit=${limit}`)
  }

  async getMonthlyTrend(): Promise<any> {
    return this.request('/api/dashboard/monthly-trend')
  }
}

export const apiClient = new ApiClient()
