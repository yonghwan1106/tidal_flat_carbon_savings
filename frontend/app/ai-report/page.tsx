'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { apiClient } from '@/lib/api'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function AIReportPage() {
  const router = useRouter()
  const { isAuthenticated, userInfo } = useAuth()
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState<string | null>(null)
  const [statistics, setStatistics] = useState<any>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
  }, [isAuthenticated, router])

  const handleGenerateReport = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await apiClient.generateAIReport()
      setReport(response.report)
      setStatistics(response.statistics)
    } catch (err: any) {
      console.error('AI 리포트 생성 실패:', err)
      setError(err.message || 'AI 리포트 생성에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleShare = () => {
    if (report) {
      navigator.clipboard.writeText(report)
      alert('리포트가 클립보드에 복사되었습니다!')
    }
  }

  if (!userInfo) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="text-gray-600 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-primary">AI 환경 기여 리포트</h1>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">{userInfo.name}</p>
              <p className="text-xs text-primary font-bold">{userInfo.total_points.toLocaleString()} CP</p>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* 소개 섹션 */}
        {!report && (
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">AI가 분석한 나의 환경 기여도</h2>
                <p className="text-gray-600">
                  Claude AI가 여러분의 활동을 분석하여 개인화된 리포트를 생성합니다
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">분석 항목</p>
                <p className="text-2xl font-bold text-primary">4+</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">칭찬 & 격려</p>
                <p className="text-2xl font-bold text-accent">✨</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">추천 활동</p>
                <p className="text-2xl font-bold text-secondary">📍</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">환경 팁</p>
                <p className="text-2xl font-bold text-green-600">💡</p>
              </div>
            </div>

            <button
              onClick={handleGenerateReport}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition font-bold text-lg disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  AI가 리포트를 생성하고 있습니다...
                </span>
              ) : (
                'AI 리포트 생성하기'
              )}
            </button>

            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}
          </div>
        )}

        {/* 리포트 표시 */}
        {report && (
          <div className="space-y-6">
            {/* 통계 카드 */}
            {statistics && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold mb-4">📊 활동 통계</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">총 활동</p>
                    <p className="text-2xl font-bold text-primary">{statistics.total_activities}회</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">총 시간</p>
                    <p className="text-2xl font-bold text-secondary">{statistics.total_hours}시간</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">총 포인트</p>
                    <p className="text-2xl font-bold text-accent">{statistics.total_points}P</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">탄소 흡수</p>
                    <p className="text-2xl font-bold text-green-600">{statistics.carbon_absorption_kg}kg</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">선호 장소</p>
                    <p className="text-lg font-bold text-gray-800">{statistics.favorite_location}</p>
                  </div>
                </div>
              </div>
            )}

            {/* AI 리포트 */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Claude AI 분석 결과</h3>
                  <p className="text-sm text-gray-600">개인화된 환경 기여 리포트</p>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => <h1 className="text-2xl font-bold mt-6 mb-4">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-xl font-bold mt-5 mb-3">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-lg font-bold mt-4 mb-2">{children}</h3>,
                    p: ({ children }) => <p className="mb-4 leading-relaxed text-gray-700">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
                    li: ({ children }) => <li className="text-gray-700">{children}</li>,
                    strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
                  }}
                >
                  {report}
                </ReactMarkdown>
              </div>
            </div>

            {/* 액션 버튼 */}
            <div className="flex gap-4">
              <button
                onClick={handleShare}
                className="flex-1 py-3 bg-white border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition font-semibold"
              >
                📋 리포트 복사
              </button>
              <button
                onClick={() => setReport(null)}
                className="flex-1 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-semibold"
              >
                🔄 새 리포트 생성
              </button>
            </div>

            {/* 추가 네비게이션 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <p className="text-blue-800 mb-4">
                💡 <strong>더 많은 활동에 참여</strong>하고 나만의 환경 스토리를 만들어보세요!
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => router.push('/activities')}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-semibold"
                >
                  활동 참여하기
                </button>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="px-6 py-2 bg-white border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition font-semibold"
                >
                  대시보드 보기
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
