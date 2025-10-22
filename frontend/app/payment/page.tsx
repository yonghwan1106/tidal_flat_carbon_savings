'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { QRCodeSVG } from 'qrcode.react'

export default function PaymentPage() {
  const router = useRouter()
  const { isAuthenticated, userInfo } = useAuth()
  const [amount, setAmount] = useState('')
  const [qrGenerated, setQrGenerated] = useState(false)
  const [qrData, setQrData] = useState('')
  const [processing, setProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [countdown, setCountdown] = useState(180) // 3분 타이머

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    if (qrGenerated && !paymentSuccess && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [qrGenerated, paymentSuccess, countdown])

  const handleGenerateQR = () => {
    const numAmount = parseInt(amount)

    if (!numAmount || numAmount <= 0) {
      alert('사용할 포인트를 입력해주세요.')
      return
    }

    if (numAmount > (userInfo?.total_points || 0)) {
      alert('보유 포인트가 부족합니다.')
      return
    }

    // QR 데이터 생성 (실제로는 JWT 토큰을 사용)
    const qrPayload = {
      user_id: userInfo?.user_id,
      amount: numAmount,
      timestamp: Date.now()
    }

    setQrData(JSON.stringify(qrPayload))
    setQrGenerated(true)
  }

  const handleDemoPayment = async () => {
    setProcessing(true)

    // 데모 모드: 2초 후 자동 성공
    await new Promise(resolve => setTimeout(resolve, 2000))

    setProcessing(false)
    setPaymentSuccess(true)
  }

  const handleReset = () => {
    setAmount('')
    setQrGenerated(false)
    setQrData('')
    setPaymentSuccess(false)
    setCountdown(180)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!userInfo) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* 헤더 */}
      <header className="bg-white/80 backdrop-blur-md shadow-soft border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="text-gray-600 hover:text-primary-600 transition-colors hover:scale-110 transition-transform"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold gradient-text">포인트 결제</h1>
                <p className="text-sm text-gray-600">탄소 포인트 사용하기</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push('/dashboard')}
                className="hidden lg:block px-4 py-2 text-gray-700 hover:text-primary-600 transition font-medium"
              >
                대시보드
              </button>
              <button
                onClick={() => router.push('/partners')}
                className="hidden lg:block px-4 py-2 text-gray-700 hover:text-primary-600 transition font-medium"
              >
                제휴처
              </button>
              <div className="text-right px-4 py-2 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border-2 border-primary-200">
                <p className="text-sm text-gray-700 font-medium">보유 포인트</p>
                <p className="text-xl font-bold gradient-text">{userInfo.total_points.toLocaleString()} 포인트</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-md mx-auto px-4 py-8">
        {!paymentSuccess ? (
          <>
            {!qrGenerated ? (
              /* 포인트 입력 화면 */
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">사용할 포인트 입력</h2>
                  <p className="text-gray-600">제휴처에서 사용할 포인트를 입력하세요</p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    사용 포인트
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0"
                      className="w-full px-4 py-3 text-2xl font-bold text-center border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-gray-500">
                      CP
                    </span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    {[1000, 3000, 5000].map(value => (
                      <button
                        key={value}
                        onClick={() => setAmount(value.toString())}
                        className="flex-1 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                      >
                        +{value.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">사용 포인트</span>
                    <span className="font-bold">{amount ? parseInt(amount).toLocaleString() : 0} CP</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">잔여 포인트</span>
                    <span className="font-semibold text-primary">
                      {(userInfo.total_points - (amount ? parseInt(amount) : 0)).toLocaleString()} CP
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleGenerateQR}
                  className="w-full py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-bold text-lg"
                >
                  QR코드 생성
                </button>
              </div>
            ) : (
              /* QR코드 표시 화면 */
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2">QR코드 결제</h2>
                  <p className="text-gray-600">제휴처 직원에게 QR코드를 보여주세요</p>
                </div>

                {/* 타이머 */}
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                    countdown < 60 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-bold">{formatTime(countdown)}</span>
                  </div>
                </div>

                {/* QR코드 */}
                <div className="flex justify-center mb-6 p-8 bg-white rounded-lg border-4 border-gray-100">
                  <QRCodeSVG
                    value={qrData}
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                </div>

                {/* 결제 정보 */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-600">결제 금액</span>
                    <span className="text-2xl font-bold text-accent">{parseInt(amount).toLocaleString()} CP</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">결제 후 잔액</span>
                    <span className="font-semibold text-primary">
                      {(userInfo.total_points - parseInt(amount)).toLocaleString()} CP
                    </span>
                  </div>
                </div>

                {/* 데모 모드 버튼 */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-blue-800 mb-3 text-center">
                    💡 <strong>데모 모드:</strong> 아래 버튼을 클릭하여 결제를 시뮬레이션할 수 있습니다
                  </p>
                  <button
                    onClick={handleDemoPayment}
                    disabled={processing}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-bold disabled:bg-gray-400"
                  >
                    {processing ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        처리 중...
                      </span>
                    ) : '결제하기 (데모)'}
                  </button>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition font-semibold"
                >
                  취소
                </button>
              </div>
            )}
          </>
        ) : (
          /* 결제 완료 화면 */
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold mb-2">결제 완료!</h2>
            <p className="text-gray-600 mb-8">포인트 사용이 완료되었습니다</p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="flex justify-between items-center mb-4 pb-4 border-b">
                <span className="text-gray-600">사용 포인트</span>
                <span className="text-xl font-bold text-red-600">-{parseInt(amount).toLocaleString()} CP</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">잔여 포인트</span>
                <span className="text-2xl font-bold text-primary">
                  {(userInfo.total_points - parseInt(amount)).toLocaleString()} CP
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => router.push('/my')}
                className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-bold"
              >
                거래 내역 확인
              </button>
              <button
                onClick={handleReset}
                className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition font-semibold"
              >
                새 결제하기
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
