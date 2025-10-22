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
  const { isAuthenticated, userInfo } = useAuth()
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
    localStorage.removeItem('access_token')
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
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-primary">갯벌 탄소예금</h1>
            <p className="text-gray-600">제휴처</p>
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

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* 안내 카드 */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-2">포인트 사용처</h2>
          <p className="text-lg opacity-90">
            화성시 환경 친화적 제휴처에서 탄소 포인트를 현금처럼 사용하세요!
          </p>
          <div className="mt-4 flex gap-8">
            <div>
              <p className="text-sm opacity-75">내 포인트</p>
              <p className="text-3xl font-bold">
                {userInfo?.total_points?.toLocaleString() || 0}P
              </p>
            </div>
            <div>
              <p className="text-sm opacity-75">제휴처 수</p>
              <p className="text-3xl font-bold">{partners.length}곳</p>
            </div>
          </div>
        </div>

        {/* 카테고리 필터 */}
        <div className="mb-6 flex gap-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category} {category !== '전체' && getCategoryIcon(category)}
              {category === '전체' && `(${partners.length})`}
              {category !== '전체' && `(${partners.filter(p => p.category === category).length})`}
            </button>
          ))}
        </div>

        {/* 제휴처 목록 */}
        {filteredPartners.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500">해당 카테고리의 제휴처가 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartners.map((partner) => (
              <div
                key={partner.partner_id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{getCategoryIcon(partner.category)}</span>
                    <div>
                      <h3 className="font-bold text-lg">{partner.name}</h3>
                      <p className="text-sm text-gray-500">{partner.category}</p>
                    </div>
                  </div>
                  <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
                    {partner.discount_rate}% 할인
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {partner.description}
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-gray-400 mt-0.5"
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
                    <span className="text-gray-600">{partner.address}</span>
                  </div>

                  <div className="flex items-center gap-2">
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
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="text-gray-600">{partner.phone}</span>
                  </div>
                </div>

                <button
                  onClick={() => router.push('/payment')}
                  className="mt-4 w-full bg-gradient-to-r from-primary to-secondary text-white py-2 rounded-lg hover:opacity-90 transition font-semibold"
                >
                  포인트 사용하기
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 하단 네비게이션 */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => router.push('/my')}
            className="px-6 py-3 bg-white border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            마이페이지
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
