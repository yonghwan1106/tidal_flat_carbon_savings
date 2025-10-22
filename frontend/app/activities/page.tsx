'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { apiClient, Activity } from '@/lib/api'
import NaverMap from '@/components/NaverMap'

export default function ActivitiesPage() {
  const router = useRouter()
  const { isAuthenticated, user, userInfo, logout } = useAuth()
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    fetchActivities()
  }, [isAuthenticated, router])

  const fetchActivities = async () => {
    try {
      setLoading(true)
      const response = await apiClient.getActivities('open')
      setActivities(response.activities)
    } catch (err: any) {
      setError(err.message || '활동 목록을 불러오는데 실패했습니다.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleJoinActivity = async (activityId: string) => {
    try {
      await apiClient.joinActivity(activityId)
      alert('활동 참가 신청이 완료되었습니다!')
      fetchActivities() // 목록 새로고침
    } catch (err: any) {
      alert(err.message || '활동 참가에 실패했습니다.')
      console.error(err)
    }
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
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">갯벌 탄소예금</h1>
              <p className="text-sm text-gray-600">환경 활동 참여하기</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold">{user?.name}</p>
                <p className="text-xs text-gray-600">
                  {userInfo?.total_points.toLocaleString() || 0} 포인트
                </p>
              </div>
              <button
                onClick={() => router.push('/my')}
                className="px-4 py-2 text-sm bg-primary text-white hover:bg-green-700 rounded-lg transition"
              >
                마이페이지
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 상태 표시 */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* 활동 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">참여 가능한 활동</p>
            <p className="text-3xl font-bold text-primary">{activities.length}개</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">내 포인트</p>
            <p className="text-3xl font-bold text-secondary">
              {userInfo?.total_points.toLocaleString() || 0}P
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">이번 달 참여</p>
            <p className="text-3xl font-bold text-accent">-회</p>
          </div>
        </div>

        {/* 활동 위치 지도 */}
        {activities.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">📍 활동 위치</h2>
            <NaverMap
              locations={activities.map(activity => ({
                latitude: activity.latitude,
                longitude: activity.longitude,
                name: activity.location_name,
                title: activity.title
              }))}
              height="500px"
            />
          </div>
        )}

        {/* 활동 목록 */}
        <div>
          <h2 className="text-xl font-bold mb-4">🌊 참여 가능한 활동</h2>

          {activities.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <p className="text-gray-500">참여 가능한 활동이 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map((activity) => (
                <div
                  key={activity.activity_id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                >
                  {/* 활동 이미지 (임시) */}
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <span className="text-6xl">🌊</span>
                  </div>

                  {/* 활동 정보 */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2">{activity.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {activity.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>{activity.location_name}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>
                          {activity.date} {activity.start_time}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{activity.duration_hours}시간</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <p className="text-xs text-gray-500">적립 포인트</p>
                        <p className="text-lg font-bold text-accent">
                          {activity.points_per_hour * activity.duration_hours}P
                        </p>
                      </div>

                      <button
                        onClick={() => handleJoinActivity(activity.activity_id)}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-semibold"
                      >
                        참여하기
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
