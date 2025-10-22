'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { apiClient } from '@/lib/api'

interface Participation {
  participation_id: string
  user_id: string
  activity_id: string
  activity_title: string
  participation_date: string
  status: string
  points_earned: number
}

interface Transaction {
  transaction_id: string
  user_id: string
  transaction_type: string
  amount: number
  description: string
  transaction_date: string
  balance_after: number
}

export default function MyPage() {
  const router = useRouter()
  const { isAuthenticated, userInfo, logout } = useAuth()
  const [activeTab, setActiveTab] = useState<'participations' | 'transactions'>('participations')
  const [participations, setParticipations] = useState<Participation[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    fetchData()
  }, [isAuthenticated, router])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [participationsRes, transactionsRes] = await Promise.all([
        apiClient.getMyParticipations(),
        apiClient.getMyTransactions(50)
      ])

      setParticipations(participationsRes.participations || [])
      setTransactions(transactionsRes.transactions || [])
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">로딩 중...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* 헤더 */}
      <header className="bg-white/80 backdrop-blur-md shadow-soft border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="text-2xl font-bold gradient-text hover:scale-105 transition-transform cursor-pointer"
            >
              갯벌 탄소예금
            </button>
            <span className="hidden md:block text-gray-400">|</span>
            <p className="hidden md:block text-gray-700 font-medium">마이페이지</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/dashboard')}
              className="hidden lg:block px-4 py-2 text-gray-700 hover:text-primary-600 transition font-medium"
            >
              대시보드
            </button>
            <button
              onClick={() => router.push('/activities')}
              className="hidden lg:block px-4 py-2 text-gray-700 hover:text-primary-600 transition font-medium"
            >
              활동 목록
            </button>
            <div className="hidden lg:block text-right px-4 py-2 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border-2 border-primary-200">
              <p className="font-semibold text-gray-800">{userInfo?.name}</p>
              <p className="text-sm font-bold gradient-text">
                {userInfo?.total_points?.toLocaleString() || 0} 포인트
              </p>
            </div>
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
        {/* 사용자 정보 카드 */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold mb-2">{userInfo?.name}</h2>
              <p className="text-lg opacity-90">@{userInfo?.user_id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90 mb-1">내 탄소 포인트</p>
              <p className="text-4xl font-bold">
                {userInfo?.total_points?.toLocaleString() || 0}P
              </p>
            </div>
          </div>
        </div>

        {/* 탭 */}
        <div className="flex gap-4 mb-6 border-b">
          <button
            onClick={() => setActiveTab('participations')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'participations'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            참여 이력 ({participations.length})
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'transactions'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            포인트 내역 ({transactions.length})
          </button>
        </div>

        {/* 참여 이력 탭 */}
        {activeTab === 'participations' && (
          <div className="space-y-4">
            {participations.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-500">아직 참여한 활동이 없습니다.</p>
                <button
                  onClick={() => router.push('/activities')}
                  className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-green-700"
                >
                  활동 참여하기
                </button>
              </div>
            ) : (
              participations.map((participation) => (
                <div
                  key={participation.participation_id}
                  className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">
                        {participation.activity_title || participation.activity_id}
                      </h3>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span>📅 {participation.participation_date}</span>
                        <span
                          className={`px-2 py-1 rounded ${
                            participation.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : participation.status === 'confirmed'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {participation.status === 'completed'
                            ? '완료'
                            : participation.status === 'confirmed'
                            ? '확정'
                            : '대기중'}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">적립 포인트</p>
                      <p className="text-2xl font-bold text-primary">
                        +{participation.points_earned?.toLocaleString() || 0}P
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* 포인트 내역 탭 */}
        {activeTab === 'transactions' && (
          <div className="space-y-4">
            {transactions.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-500">거래 내역이 없습니다.</p>
              </div>
            ) : (
              transactions.map((transaction) => (
                <div
                  key={transaction.transaction_id}
                  className="bg-white rounded-lg p-6 shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            transaction.transaction_type === 'earn'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {transaction.transaction_type === 'earn' ? '적립' : '사용'}
                        </span>
                        <p className="font-semibold">{transaction.description}</p>
                      </div>
                      <p className="text-sm text-gray-600">
                        📅 {transaction.transaction_date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-2xl font-bold ${
                          transaction.transaction_type === 'earn'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {transaction.transaction_type === 'earn' ? '+' : '-'}
                        {transaction.amount?.toLocaleString() || 0}P
                      </p>
                      <p className="text-sm text-gray-500">
                        잔액: {transaction.balance_after?.toLocaleString() || 0}P
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* 하단 네비게이션 */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => router.push('/activities')}
            className="px-6 py-3 bg-white border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            활동 둘러보기
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
