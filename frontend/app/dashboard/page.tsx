'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { apiClient } from '@/lib/api'
import GuideTour from '@/components/GuideTour'

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
  const { isAuthenticated, userInfo, logout } = useAuth()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [rankings, setRankings] = useState<Ranking[]>([])
  const [loading, setLoading] = useState(true)
  const [runTour, setRunTour] = useState(false)

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

      // 첫 방문 시 자동으로 투어 시작
      const hasSeenTour = localStorage.getItem('hasSeenDashboardTour')
      if (!hasSeenTour) {
        setTimeout(() => setRunTour(true), 500)
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTourComplete = () => {
    localStorage.setItem('hasSeenDashboardTour', 'true')
    setRunTour(false)
  }

  const handleStartTour = () => {
    setRunTour(true)
  }

  const handleLogout = () => {
    logout()
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* 헤더 */}
      <header className="bg-white/80 backdrop-blur-md shadow-soft border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold gradient-text">갯벌 탄소예금</h1>
            <span className="hidden md:block text-gray-500">|</span>
            <p className="hidden md:block text-gray-700 font-medium">대시보드</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/about')}
              className="hidden md:block px-4 py-2 text-gray-700 hover:text-primary-600 transition font-medium rounded-lg hover:bg-primary-50"
            >
              소개
            </button>
            <button
              onClick={() => router.push('/partners')}
              className="hidden md:block px-4 py-2 text-gray-700 hover:text-primary-600 transition font-medium rounded-lg hover:bg-primary-50"
            >
              제휴처
            </button>
            <button
              onClick={handleStartTour}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg rounded-xl transition-all duration-300 hover:scale-105"
              title="가이드 투어 시작"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="hidden md:inline">가이드 투어</span>
            </button>
            <div className="hidden lg:block text-right px-4 py-2 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border-2 border-primary-200">
              <p className="font-semibold text-gray-800">{userInfo?.name}</p>
              <p className="text-sm font-bold gradient-text">
                {userInfo?.total_points?.toLocaleString() || 0} 포인트
              </p>
            </div>
            <button
              onClick={() => router.push('/activities')}
              className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-lg rounded-xl transition-all duration-300 hover:scale-105 font-medium"
            >
              활동 목록
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl transition-all duration-300 hover:scale-105 font-medium"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 갯벌 건강도 */}
        <div className="mb-8 dashboard-health">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 dashboard-stats">
          <div className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft hover:shadow-2xl p-6 transition-all duration-300 card-hover border-2 border-transparent hover:border-blue-300">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-600 font-medium">총 사용자</p>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-1">{stats?.total_users || 0}</p>
            <p className="text-sm text-gray-500">명</p>
          </div>

          <div className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft hover:shadow-2xl p-6 transition-all duration-300 card-hover border-2 border-transparent hover:border-green-300">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-600 font-medium">총 활동</p>
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-1">{stats?.total_activities || 0}</p>
            <p className="text-sm text-gray-500">개</p>
          </div>

          <div className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft hover:shadow-2xl p-6 transition-all duration-300 card-hover border-2 border-transparent hover:border-yellow-300">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-600 font-medium">총 포인트</p>
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-1">{stats?.total_points?.toLocaleString() || 0}</p>
            <p className="text-sm text-gray-500">포인트</p>
          </div>

          <div className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft hover:shadow-2xl p-6 transition-all duration-300 card-hover border-2 border-transparent hover:border-purple-300">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-600 font-medium">총 참여</p>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-1">{stats?.total_participations || 0}</p>
            <p className="text-sm text-gray-500">회</p>
          </div>
        </div>

        {/* 랭킹 테이블 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft p-8 mb-8 dashboard-rankings border-2 border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">포인트 랭킹 TOP 10</h3>
          </div>
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

        {/* AI 리포트 배너 */}
        <div className="relative overflow-hidden bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-3xl p-8 mb-8 text-white ai-report-banner shadow-2xl">
          {/* 애니메이션 배경 요소 */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-3">
                🎯 AI 기반 분석
              </div>
              <h3 className="text-3xl font-bold mb-3">AI 환경 기여 리포트</h3>
              <p className="text-lg opacity-90 mb-6 leading-relaxed">
                Claude AI가 분석한 나만의 환경 스토리를 확인하세요!
              </p>
              <button
                onClick={() => router.push('/ai-report')}
                className="group px-8 py-4 bg-white text-purple-600 rounded-2xl hover:shadow-2xl transition-all duration-300 font-bold text-lg flex items-center gap-3 hover:scale-105 active:scale-95"
              >
                AI 리포트 생성하기
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
            <div className="hidden md:block flex-shrink-0">
              <div className="relative w-40 h-40 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center animate-float">
                <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 네비게이션 */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => router.push('/my')}
            className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 font-semibold hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            마이페이지
          </button>
          <button
            onClick={() => router.push('/partners')}
            className="px-8 py-4 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 font-semibold hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            제휴처
          </button>
          <button
            onClick={() => router.push('/')}
            className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-100 hover:shadow-lg transition-all duration-300 font-semibold hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            홈으로
          </button>
        </div>
      </main>

      {/* 가이드 투어 */}
      <GuideTour runTour={runTour} onComplete={handleTourComplete} />
    </div>
  )
}
