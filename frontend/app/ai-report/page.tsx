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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* 헤더 */}
      <header className="bg-white/80 backdrop-blur-md shadow-soft sticky top-0 z-10 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold gradient-text">AI 환경 기여 리포트</h1>
            </div>
            <div className="text-right px-4 py-2 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border-2 border-primary-200">
              <p className="text-sm font-semibold text-gray-800">{userInfo.name}</p>
              <p className="text-xs font-bold gradient-text">{userInfo.total_points.toLocaleString()} CP</p>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* 소개 섹션 */}
        {!report && (
          <div className="relative overflow-hidden bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-3xl p-8 mb-8 shadow-2xl animate-scale-in">
            {/* 애니메이션 배경 요소 */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>

            <div className="relative flex flex-col md:flex-row items-center gap-6 mb-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center animate-float">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="flex-1 text-white text-center md:text-left">
                <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-3">
                  🤖 AI 기반 분석
                </div>
                <h2 className="text-3xl font-bold mb-2">AI가 분석한 나의 환경 기여도</h2>
                <p className="text-lg opacity-90 leading-relaxed">
                  Claude AI가 여러분의 활동을 분석하여 개인화된 리포트를 생성합니다
                </p>
              </div>
            </div>

            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-5 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl card-hover">
                <p className="text-sm text-gray-600 mb-2 font-medium">분석 항목</p>
                <p className="text-3xl font-bold gradient-text">4+</p>
              </div>
              <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-5 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl card-hover">
                <p className="text-sm text-gray-600 mb-2 font-medium">칭찬 & 격려</p>
                <p className="text-3xl">✨</p>
              </div>
              <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-5 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl card-hover">
                <p className="text-sm text-gray-600 mb-2 font-medium">추천 활동</p>
                <p className="text-3xl">📍</p>
              </div>
              <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-5 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl card-hover">
                <p className="text-sm text-gray-600 mb-2 font-medium">환경 팁</p>
                <p className="text-3xl">💡</p>
              </div>
            </div>

            <button
              onClick={handleGenerateReport}
              disabled={loading}
              className="relative w-full py-5 bg-white text-purple-600 rounded-2xl hover:shadow-2xl transition-all duration-300 font-bold text-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-7 h-7 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                  <span>AI가 리포트를 생성하고 있습니다...</span>
                </>
              ) : (
                <>
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>AI 리포트 생성하기</span>
                </>
              )}
            </button>

            {error && (
              <div className="relative mt-6 bg-red-50 border-2 border-red-200 rounded-2xl p-5 animate-slide-down">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-800 font-medium">{error}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 리포트 표시 */}
        {report && (
          <div className="space-y-6">
            {/* 통계 카드 */}
            {statistics && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft p-8 animate-slide-up border-2 border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">활동 통계</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="group bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-4 text-center transition-all duration-300 hover:scale-105 card-hover">
                    <p className="text-sm text-gray-600 mb-2 font-medium">총 활동</p>
                    <p className="text-3xl font-bold text-primary-600">{statistics.total_activities}회</p>
                  </div>
                  <div className="group bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl p-4 text-center transition-all duration-300 hover:scale-105 card-hover">
                    <p className="text-sm text-gray-600 mb-2 font-medium">총 시간</p>
                    <p className="text-3xl font-bold text-secondary-600">{statistics.total_hours}시간</p>
                  </div>
                  <div className="group bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-4 text-center transition-all duration-300 hover:scale-105 card-hover">
                    <p className="text-sm text-gray-600 mb-2 font-medium">총 포인트</p>
                    <p className="text-3xl font-bold text-accent-600">{statistics.total_points}P</p>
                  </div>
                  <div className="group bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 text-center transition-all duration-300 hover:scale-105 card-hover">
                    <p className="text-sm text-gray-600 mb-2 font-medium">탄소 흡수</p>
                    <p className="text-3xl font-bold text-green-600">{statistics.carbon_absorption_kg}kg</p>
                  </div>
                  <div className="group bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 text-center transition-all duration-300 hover:scale-105 card-hover">
                    <p className="text-sm text-gray-600 mb-2 font-medium">선호 장소</p>
                    <p className="text-lg font-bold text-purple-600">{statistics.favorite_location}</p>
                  </div>
                </div>
              </div>
            )}

            {/* AI 리포트 */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft p-8 animate-slide-up border-2 border-gray-100">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-gray-200">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg animate-pulse-slow">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Claude AI 분석 결과</h3>
                  <p className="text-sm text-gray-600 mt-1">개인화된 환경 기여 리포트</p>
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
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
              <button
                onClick={handleShare}
                className="flex-1 py-4 bg-white border-2 border-primary-500 text-primary-600 rounded-2xl hover:bg-primary-500 hover:text-white transition-all duration-300 font-semibold text-lg flex items-center justify-center gap-2 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                리포트 복사
              </button>
              <button
                onClick={() => setReport(null)}
                className="flex-1 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 font-semibold text-lg flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                새 리포트 생성
              </button>
            </div>

            {/* 추가 네비게이션 */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-cyan-500 border-2 border-blue-300 rounded-3xl p-8 text-center shadow-2xl animate-slide-up">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

              <div className="relative">
                <p className="text-white text-xl font-semibold mb-6 leading-relaxed">
                  💡 <strong>더 많은 활동에 참여</strong>하고<br className="hidden sm:block" />
                  나만의 환경 스토리를 만들어보세요!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => router.push('/activities')}
                    className="px-8 py-4 bg-white text-blue-600 rounded-2xl hover:shadow-2xl transition-all duration-300 font-bold text-lg hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    활동 참여하기
                  </button>
                  <button
                    onClick={() => router.push('/dashboard')}
                    className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white border-2 border-white rounded-2xl hover:bg-white hover:text-blue-600 transition-all duration-300 font-bold text-lg hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    대시보드 보기
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
