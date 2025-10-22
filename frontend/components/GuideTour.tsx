'use client'

import { useEffect, useState } from 'react'
import Joyride, { Step, CallBackProps, STATUS } from 'react-joyride'

interface GuideTourProps {
  runTour: boolean
  onComplete: () => void
}

export default function GuideTour({ runTour, onComplete }: GuideTourProps) {
  const [run, setRun] = useState(false)

  useEffect(() => {
    setRun(runTour)
  }, [runTour])

  const steps: Step[] = [
    {
      target: 'body',
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-primary">🌊 갯벌 탄소예금에 오신 것을 환영합니다!</h2>
          <p className="text-lg">
            심사위원님을 위한 <strong>5분 가이드 투어</strong>를 시작합니다.
          </p>
          <p className="text-gray-600">
            화성시 갯벌 보전 활동에 참여하고 탄소 포인트를 적립하는
            혁신적인 환경-금융 융합 플랫폼을 체험해보세요!
          </p>
        </div>
      ),
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '.dashboard-health',
      content: (
        <div className="space-y-3">
          <h3 className="text-xl font-bold">📊 갯벌 건강도</h3>
          <p>
            화성시 갯벌의 생태 건강 지수입니다.
            시민들의 활동 참여율을 기반으로 실시간 계산됩니다.
          </p>
          <div className="bg-blue-50 p-3 rounded-lg text-sm">
            <strong>💡 Tip:</strong> 참여율이 높을수록 갯벌 건강도가 개선됩니다!
          </div>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '.dashboard-stats',
      content: (
        <div className="space-y-3">
          <h3 className="text-xl font-bold">📈 전체 통계</h3>
          <p>
            총 사용자 수, 활동 수, 적립된 포인트, 참여 횟수 등
            플랫폼 전체의 주요 지표를 한눈에 확인할 수 있습니다.
          </p>
        </div>
      ),
      placement: 'top',
    },
    {
      target: '.dashboard-rankings',
      content: (
        <div className="space-y-3">
          <h3 className="text-xl font-bold">🏆 포인트 랭킹</h3>
          <p>
            가장 많은 활동에 참여한 상위 10명의 사용자 랭킹입니다.
            gamification을 통해 참여 동기를 부여합니다.
          </p>
        </div>
      ),
      placement: 'top',
    },
    {
      target: '.ai-report-banner',
      content: (
        <div className="space-y-3">
          <h3 className="text-xl font-bold">🤖 AI 환경 기여 리포트</h3>
          <p>
            <strong>Claude Haiku 4.5</strong> AI가 사용자의 활동 데이터를 분석하여
            개인화된 환경 기여 리포트를 생성합니다.
          </p>
          <div className="bg-purple-50 p-3 rounded-lg text-sm">
            <strong>✨ 경진대회 차별화 포인트:</strong> AI 기반 맞춤형 피드백
          </div>
        </div>
      ),
      placement: 'top',
    },
    {
      target: 'body',
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-primary">🎉 투어 완료!</h2>
          <p className="text-lg">
            이제 다른 기능들을 자유롭게 탐색해보세요:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <strong>활동 목록:</strong> 네이버 지도에서 갯벌 활동 위치 확인
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <strong>마이페이지:</strong> 나의 활동 내역 및 포인트 거래 내역
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <strong>제휴처:</strong> 포인트 사용 가능한 지역 업체
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <strong>포인트 결제:</strong> QR코드로 포인트 결제 체험
            </li>
          </ul>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-800">
              💡 <strong>참고:</strong> 데모 모드에서는 모든 기능을 시뮬레이션으로 체험할 수 있습니다.
            </p>
          </div>
        </div>
      ),
      placement: 'center',
    },
  ]

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRun(false)
      onComplete()
    }
  }

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: '#16a34a',
          zIndex: 10000,
        },
        tooltipContainer: {
          textAlign: 'left',
        },
        tooltip: {
          fontSize: '16px',
          padding: '20px',
        },
        buttonNext: {
          backgroundColor: '#16a34a',
          fontSize: '14px',
          padding: '10px 20px',
        },
        buttonBack: {
          color: '#666',
          marginRight: '10px',
        },
        buttonSkip: {
          color: '#999',
        },
      }}
      locale={{
        back: '이전',
        close: '닫기',
        last: '완료',
        next: '다음',
        skip: '건너뛰기',
      }}
    />
  )
}
