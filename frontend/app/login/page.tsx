'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { apiClient, DemoAccount } from '@/lib/api'

export default function LoginPage() {
  const router = useRouter()
  const { login, isAuthenticated } = useAuth()
  const [accounts, setAccounts] = useState<DemoAccount[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // 이미 로그인되어 있으면 대시보드로 리다이렉트
    if (isAuthenticated) {
      router.push('/dashboard')
    }

    // 데모 계정 목록 가져오기
    async function fetchAccounts() {
      try {
        const response = await apiClient.getDemoAccounts()
        setAccounts(response.accounts)
      } catch (err) {
        setError('데모 계정을 불러오는데 실패했습니다.')
        console.error(err)
      }
    }

    fetchAccounts()
  }, [isAuthenticated, router])

  const handleLogin = async (userId: string) => {
    setLoading(true)
    setError('')

    try {
      await login(userId)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || '로그인에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 배경 애니메이션 */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-secondary-100 to-ocean-100"></div>

      {/* 떠다니는 원형 요소들 */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-secondary-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '2s'}}></div>

      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div className="max-w-md w-full animate-scale-in">
          {/* 로고 섹션 */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-white rounded-full shadow-2xl mb-6 animate-bounce-slow">
              <svg className="w-16 h-16 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
              </svg>
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-3">
              갯벌 탄소예금
            </h1>
            <p className="text-gray-700 text-lg">
              환경 활동으로 탄소 포인트를 적립하세요
            </p>
          </div>

          {/* 메인 카드 */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/50">
            {/* 데모 안내 */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-5 mb-6 animate-slide-down">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-bold text-blue-900 mb-1">데모 모드</p>
                  <p className="text-sm text-blue-800">
                    아래 계정 중 하나를 선택하여 로그인하세요
                  </p>
                </div>
              </div>
            </div>

            {/* 에러 메시지 */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 mb-6 animate-slide-down">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-800 font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* 데모 계정 목록 */}
            <div className="space-y-3">
              {accounts.map((account, index) => (
                <button
                  key={account.user_id}
                  onClick={() => handleLogin(account.user_id)}
                  disabled={loading}
                  className="group w-full p-5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 animate-slide-up"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-lg">{account.name}</p>
                        <p className="text-sm opacity-90">@{account.user_id}</p>
                      </div>
                    </div>
                    <svg
                      className="w-7 h-7 group-hover:translate-x-2 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </button>
              ))}
            </div>

            {/* 로딩 상태 */}
            {loading && (
              <div className="mt-6 text-center">
                <div className="inline-block w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                <p className="mt-2 text-sm text-gray-600 font-medium">로그인 중...</p>
              </div>
            )}
          </div>

          {/* 푸터 */}
          <div className="mt-8 text-center animate-fade-in">
            <div className="inline-block bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg">
              <p className="text-sm font-semibold text-gray-700">🏆 2025년 화성에서 ON</p>
              <p className="text-sm font-semibold text-gray-700">탄소중립 아이디어 경진대회 출품작</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
