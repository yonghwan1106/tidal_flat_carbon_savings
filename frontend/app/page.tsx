'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* 배경 그라데이션 애니메이션 */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-secondary-50 to-nature-50 animate-gradient"></div>

      {/* 떠다니는 원형 요소들 */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-nature-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '4s'}}></div>

      <div className="relative flex flex-col items-center justify-center min-h-screen p-8">
        <div className="max-w-6xl mx-auto text-center">
          {/* 히어로 섹션 */}
          <div className="mb-12 animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 gradient-text">
              갯벌 탄소예금
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-secondary-700">
              Tidal Flat Carbon Savings
            </h2>
            <div className="inline-block px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full mb-8 shadow-lg animate-bounce-slow">
              <p className="text-lg font-semibold">
                🌊 나의 환경 활동이 자산이 됩니다
              </p>
            </div>
            <p className="text-xl md:text-2xl mb-12 text-gray-700 max-w-3xl mx-auto leading-relaxed">
              화성시 갯벌 보전 활동에 참여하고 탄소 포인트를 적립하세요
            </p>

            {/* CTA 버튼 */}
            <div className="space-y-4 mb-8 animate-slide-up">
              <button
                onClick={() => router.push('/login')}
                className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-primary-500 via-secondary-500 to-nature-500 rounded-2xl shadow-2xl hover:shadow-glow-primary transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center gap-3">
                  🚀 데모 체험하기
                  <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
              <p className="text-sm text-gray-600">
                🏆 2025년 화성에서 ON 탄소중립 아이디어 경진대회 출품작
              </p>
            </div>
          </div>

          {/* 특징 카드 */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-up">
            <div className="group p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft hover:shadow-2xl transition-all duration-300 card-hover border-2 border-transparent hover:border-primary-300">
              <div className="text-6xl mb-6 group-hover:animate-bounce">🌱</div>
              <div className="w-16 h-1 bg-gradient-to-r from-primary-400 to-primary-600 mx-auto mb-4 rounded-full"></div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-primary-600 transition-colors">활동 참여</h3>
              <p className="text-gray-600 leading-relaxed">
                갯벌 보전 활동에 참여하여 탄소 포인트를 적립하고 환경을 지켜주세요
              </p>
            </div>

            <div className="group p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft hover:shadow-2xl transition-all duration-300 card-hover border-2 border-transparent hover:border-secondary-300">
              <div className="text-6xl mb-6 group-hover:animate-bounce">📈</div>
              <div className="w-16 h-1 bg-gradient-to-r from-secondary-400 to-secondary-600 mx-auto mb-4 rounded-full"></div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-secondary-600 transition-colors">이자 획득</h3>
              <p className="text-gray-600 leading-relaxed">
                갯벌 건강도 개선에 따라 자동으로 이자가 지급되는 특별한 혜택
              </p>
            </div>

            <div className="group p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft hover:shadow-2xl transition-all duration-300 card-hover border-2 border-transparent hover:border-accent-300">
              <div className="text-6xl mb-6 group-hover:animate-bounce">💸</div>
              <div className="w-16 h-1 bg-gradient-to-r from-accent-400 to-accent-600 mx-auto mb-4 rounded-full"></div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-accent-600 transition-colors">포인트 사용</h3>
              <p className="text-gray-600 leading-relaxed">
                적립한 포인트를 제휴 상점에서 현금처럼 자유롭게 사용하세요
              </p>
            </div>
          </div>

          {/* 추가 정보 섹션 */}
          <div className="mt-20 p-8 bg-gradient-to-r from-ocean-500 to-primary-500 rounded-3xl shadow-2xl text-white animate-slide-up">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-left flex-1">
                <h3 className="text-3xl font-bold mb-4">🤖 AI 기반 환경 리포트</h3>
                <p className="text-lg opacity-90 leading-relaxed mb-4">
                  Claude AI가 분석한 개인화된 환경 기여 리포트를 받아보세요
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    실시간 갯벌 건강도 추적
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    GPS 및 QR 인증 시스템
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    네이버 지도 연동
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0">
                <div className="w-48 h-48 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse-slow">
                  <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
