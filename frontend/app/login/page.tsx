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
      router.push('/activities')
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
      router.push('/activities')
    } catch (err: any) {
      setError(err.message || '로그인에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-secondary/10 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            갯벌 탄소예금
          </h1>
          <p className="text-gray-600">
            환경 활동으로 탄소 포인트를 적립하세요
          </p>
        </div>

        {/* 데모 안내 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>데모 모드</strong>: 아래 계정 중 하나를 선택하여 로그인하세요.
          </p>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* 데모 계정 목록 */}
        <div className="space-y-3">
          {accounts.map((account) => (
            <button
              key={account.user_id}
              onClick={() => handleLogin(account.user_id)}
              disabled={loading}
              className="w-full p-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="font-semibold">{account.name}</p>
                  <p className="text-sm opacity-90">@{account.user_id}</p>
                </div>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* 푸터 */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>2025년 화성에서 ON 탄소중립 아이디어 경진대회</p>
          <p className="mt-1">출품작</p>
        </div>
      </div>
    </div>
  )
}
