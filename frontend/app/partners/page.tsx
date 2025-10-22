'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { apiClient } from '@/lib/api'

interface Partner {
  partner_id: string
  name: string
  category: string
  address: string
  phone: string
  discount_rate: number
  description: string
}

export default function PartnersPage() {
  const router = useRouter()
  const { isAuthenticated, userInfo, logout } = useAuth()
  const [partners, setPartners] = useState<Partner[]>([])
  const [filteredPartners, setFilteredPartners] = useState<Partner[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('전체')
  const [loading, setLoading] = useState(true)

  const categories = ['전체', '식당/카페', '로컬푸드', '제로웨이스트', '공공시설', '교육/문화']

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    fetchPartners()
  }, [isAuthenticated, router])

  useEffect(() => {
    if (selectedCategory === '전체') {
      setFilteredPartners(partners)
    } else {
      setFilteredPartners(partners.filter(p => p.category === selectedCategory))
    }
  }, [selectedCategory, partners])

  const fetchPartners = async () => {
    try {
      setLoading(true)
      const response = await apiClient.getPartners()
      setPartners(response.partners || [])
      setFilteredPartners(response.partners || [])
    } catch (error) {
      console.error('Failed to fetch partners:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      '식당/카페': '🍽️',
      '로컬푸드': '🌾',
      '제로웨이스트': '♻️',
      '공공시설': '🏛️',
      '교육/문화': '📚'
    }
    return icons[category] || '🏪'
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
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold gradient-text">갯벌 탄소예금</h1>
            <span className="hidden md:block text-gray-500">|</span>
            <p className="hidden md:block text-gray-700 font-medium">제휴처</p>
          </div>
          <div className="flex items-center gap-3">
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

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* 안내 카드 */}
        <div className="relative overflow-hidden bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 rounded-3xl p-8 mb-8 shadow-2xl animate-scale-in">
          {/* 애니메이션 배경 요소 */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>

          <div className="relative">
            <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">
              💳 포인트 사용하기
            </div>
            <h2 className="text-4xl font-bold mb-3 text-white">제휴 파트너</h2>
            <p className="text-xl opacity-90 text-white mb-6 leading-relaxed">
              화성시 환경 친화적 제휴처에서 탄소 포인트를 현금처럼 사용하세요!
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 min-w-[160px]">
                <p className="text-sm opacity-90 mb-2 text-white">내 포인트</p>
                <p className="text-4xl font-bold text-white">
                  {userInfo?.total_points?.toLocaleString() || 0}P
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 min-w-[160px]">
                <p className="text-sm opacity-90 mb-2 text-white">제휴처 수</p>
                <p className="text-4xl font-bold text-white">{partners.length}곳</p>
              </div>
            </div>
          </div>
        </div>

        {/* 카테고리 필터 */}
        <div className="mb-8 flex gap-3 flex-wrap animate-slide-up">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-xl'
                  : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-xl'
              }`}
            >
              <span className="flex items-center gap-2">
                {category !== '전체' && <span className="text-xl">{getCategoryIcon(category)}</span>}
                <span>{category}</span>
                <span className="text-sm opacity-75">
                  ({category === '전체' ? partners.length : partners.filter(p => p.category === category).length})
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* 제휴처 목록 */}
        {filteredPartners.length === 0 ? (
          <div className="text-center py-16 bg-white/90 backdrop-blur-sm rounded-3xl shadow-soft">
            <div className="text-6xl mb-4">🏪</div>
            <p className="text-lg text-gray-500 font-medium">해당 카테고리의 제휴처가 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartners.map((partner, index) => (
              <div
                key={partner.partner_id}
                className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft hover:shadow-2xl transition-all duration-300 p-6 card-hover animate-slide-up border-2 border-transparent hover:border-primary-200"
                style={{animationDelay: `${index * 0.05}s`}}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{getCategoryIcon(partner.category)}</div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 group-hover:text-primary-600 transition-colors">{partner.name}</h3>
                      <p className="text-sm text-gray-500 font-medium">{partner.category}</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                    {partner.discount_rate}% 할인
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-5 line-clamp-2 leading-relaxed">
                  {partner.description}
                </p>

                <div className="space-y-3 text-sm mb-5">
                  <div className="flex items-start gap-3 p-2 bg-gray-50 rounded-xl">
                    <svg
                      className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0"
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
                    <span className="text-gray-700 font-medium">{partner.address}</span>
                  </div>

                  <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl">
                    <svg
                      className="w-5 h-5 text-secondary-500 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="text-gray-700 font-medium">{partner.phone}</span>
                  </div>
                </div>

                <button
                  onClick={() => router.push('/payment')}
                  className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3.5 rounded-2xl hover:shadow-2xl transition-all duration-300 font-bold text-base hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                  포인트 사용하기
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 하단 네비게이션 */}
        <div className="mt-12 flex flex-wrap justify-center gap-4 animate-slide-up">
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
            onClick={() => router.push('/dashboard')}
            className="px-8 py-4 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 font-semibold hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            대시보드
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
    </div>
  )
}
