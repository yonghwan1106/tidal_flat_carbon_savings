'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { apiClient } from '@/lib/api'

interface DashboardStats {
  tidal_flat_health: number
  total_users: number
  total_activities: number
  total_points: number
  total_participations: number
  active_users_month: number
  participation_rate: number
}

interface Ranking {
  rank: number
  user_id: string
  name: string
  total_points: number
  profile_type: string
}

export default function DashboardPage() {
  const router = useRouter()
  const { isAuthenticated, userInfo } = useAuth()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [rankings, setRankings] = useState<Ranking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    fetchDashboardData()
  }, [isAuthenticated, router])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [statsData, rankingsData] = await Promise.all([
        apiClient.getDashboardStats(),
        apiClient.getDashboardRankings(10)
      ])

      setStats(statsData)
      setRankings(rankingsData.rankings || [])
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    router.push('/login')
  }

  const getHealthColor = (health: number) => {
    if (health >= 80) return 'text-green-600'
    if (health >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getHealthBgColor = (health: number) => {
    if (health >= 80) return 'bg-green-500'
    if (health >= 50) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return 'bg-yellow-400 text-yellow-900'
    if (rank === 2) return 'bg-gray-400 text-gray-900'
    if (rank === 3) return 'bg-orange-400 text-orange-900'
    return 'bg-blue-500 text-white'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-primary">갯벌 탄소예금</h1>
            <p className="text-gray-600">대시보드</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold">{userInfo?.name}</p>
              <p className="text-sm text-primary font-bold">
                {userInfo?.total_points?.toLocaleString() || 0} 포인트
              </p>
            </div>
            <button
              onClick={() => router.push('/activities')}
              className="px-4 py-2 bg-primary text-white hover:bg-green-700 rounded-lg transition"
            >
              활동 목록
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 갯벌 건강도 */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-green-500 text-white rounded-2xl p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">갯벌 건강도</h2>
                <p className="text-lg opacity-90">
                  화성시 갯벌의 생태 건강 지수
                </p>
                <p className="text-sm opacity-75 mt-2">
                  참여율 기반: {stats?.active_users_month || 0}명 / {stats?.total_users || 0}명 ({stats?.participation_rate || 0}%)
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32">
                  {/* 원형 게이지 */}
                  <svg className="transform -rotate-90" width="128" height="128">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="white"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${((stats?.tidal_flat_health || 0) / 100) * 352} 352`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold">{stats?.tidal_flat_health || 0}</span>
                  </div>
                </div>
                <p className="mt-2 text-sm opacity-90">건강도 점수</p>
              </div>
            </div>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">총 사용자</p>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats?.total_users || 0}</p>
            <p className="text-sm text-gray-500 mt-1">명</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">총 활동</p>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats?.total_activities || 0}</p>
            <p className="text-sm text-gray-500 mt-1">개</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">총 포인트</p>
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats?.total_points?.toLocaleString() || 0}</p>
            <p className="text-sm text-gray-500 mt-1">P</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">총 참여</p>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats?.total_participations || 0}</p>
            <p className="text-sm text-gray-500 mt-1">회</p>
          </div>
        </div>

        {/* 랭킹 테이블 */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">포인트 랭킹 TOP 10</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">순위</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">사용자</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">타입</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">포인트</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {rankings.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                      랭킹 데이터가 없습니다
                    </td>
                  </tr>
                ) : (
                  rankings.map((ranking) => (
                    <tr key={ranking.user_id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${getRankBadgeColor(ranking.rank)}`}>
                          {ranking.rank}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{ranking.name}</p>
                        <p className="text-sm text-gray-500">@{ranking.user_id}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {ranking.profile_type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <p className="font-bold text-primary">{ranking.total_points.toLocaleString()}P</p>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 하단 네비게이션 */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.push('/my')}
            className="px-6 py-3 bg-white border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            마이페이지
          </button>
          <button
            onClick={() => router.push('/partners')}
            className="px-6 py-3 bg-white border-2 border-secondary text-secondary rounded-lg hover:bg-secondary hover:text-white transition-colors"
          >
            제휴처
          </button>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            홈으로
          </button>
        </div>
      </main>
    </div>
  )
}
