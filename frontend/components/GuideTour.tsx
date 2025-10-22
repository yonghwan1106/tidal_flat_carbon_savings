'use client'

import { useEffect } from 'react'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

interface GuideTourProps {
  runTour: boolean
  onComplete: () => void
}

export default function GuideTour({ runTour, onComplete }: GuideTourProps) {
  useEffect(() => {
    if (!runTour) return

    const driverObj = driver({
      showProgress: true,
      showButtons: ['next', 'previous', 'close'],
      nextBtnText: '다음',
      prevBtnText: '이전',
      doneBtnText: '완료',
      onDestroyStarted: () => {
        driverObj.destroy()
        onComplete()
      },
      steps: [
        {
          popover: {
            title: '🌊 갯벌 탄소예금에 오신 것을 환영합니다!',
            description: '심사위원님을 위한 5분 가이드 투어를 시작합니다. 화성시 갯벌 보전 활동에 참여하고 탄소 포인트를 적립하는 혁신적인 환경-금융 융합 플랫폼을 체험해보세요!',
          }
        },
        {
          element: '.dashboard-health',
          popover: {
            title: '📊 갯벌 건강도',
            description: '화성시 갯벌의 생태 건강 지수입니다. 시민들의 활동 참여율을 기반으로 실시간 계산됩니다. 💡 Tip: 참여율이 높을수록 갯벌 건강도가 개선됩니다!',
          }
        },
        {
          element: '.dashboard-stats',
          popover: {
            title: '📈 전체 통계',
            description: '총 사용자 수, 활동 수, 적립된 포인트, 참여 횟수 등 플랫폼 전체의 주요 지표를 한눈에 확인할 수 있습니다.',
          }
        },
        {
          element: '.dashboard-rankings',
          popover: {
            title: '🏆 포인트 랭킹',
            description: '가장 많은 활동에 참여한 상위 10명의 사용자 랭킹입니다. gamification을 통해 참여 동기를 부여합니다.',
          }
        },
        {
          element: '.ai-report-banner',
          popover: {
            title: '🤖 AI 환경 기여 리포트',
            description: 'Claude Haiku 4.5 AI가 사용자의 활동 데이터를 분석하여 개인화된 환경 기여 리포트를 생성합니다. ✨ 경진대회 차별화 포인트: AI 기반 맞춤형 피드백',
          }
        },
        {
          popover: {
            title: '🎉 투어 완료!',
            description: '이제 다른 기능들을 자유롭게 탐색해보세요:\n\n✓ 활동 목록: 네이버 지도에서 갯벌 활동 위치 확인\n✓ 마이페이지: 나의 활동 내역 및 포인트 거래 내역\n✓ 제휴처: 포인트 사용 가능한 지역 업체\n✓ 포인트 결제: QR코드로 포인트 결제 체험\n\n💡 참고: 데모 모드에서는 모든 기능을 시뮬레이션으로 체험할 수 있습니다.',
          }
        },
      ]
    })

    driverObj.drive()

    return () => {
      if (driverObj) {
        driverObj.destroy()
      }
    }
  }, [runTour, onComplete])

  return null
}
