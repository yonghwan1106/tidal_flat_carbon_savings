'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function AboutPage() {
  const router = useRouter()
  const { isAuthenticated, userInfo } = useAuth()

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="text-2xl font-bold text-primary hover:text-green-700 transition cursor-pointer"
            >
              갯벌 탄소예금
            </button>
            <p className="text-gray-600">프로젝트 소개</p>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="px-4 py-2 text-gray-700 hover:text-primary transition"
                >
                  대시보드
                </button>
                <button
                  onClick={() => router.push('/activities')}
                  className="px-4 py-2 text-gray-700 hover:text-primary transition"
                >
                  활동 목록
                </button>
                <div className="text-right">
                  <p className="font-semibold">{userInfo?.name}</p>
                  <p className="text-sm text-primary font-bold">
                    {userInfo?.total_points?.toLocaleString() || 0} CP
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <button
                onClick={() => router.push('/login')}
                className="px-4 py-2 bg-primary text-white hover:bg-green-700 rounded-lg transition"
              >
                로그인
              </button>
            )}
          </div>
        </div>
      </header>

      <main>
        {/* 히어로 섹션 */}
        <section className="bg-gradient-to-br from-primary to-secondary text-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-5xl font-bold mb-6">갯벌 탄소예금</h1>
            <p className="text-2xl mb-4">시민의 참여를 자산으로, 화성 갯벌의 미래를 저축합니다.</p>
            <p className="text-lg opacity-90">
              2025년 화성에서 ON 탄소중립 아이디어 경진대회 출품작
            </p>
          </div>
        </section>

        {/* 제안 배경 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">제안 배경</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-blue-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-blue-900">🌊 기회와 위기가 공존하는 화성</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  화성시는 <strong>동아시아-대양주 철새이동경로의 핵심 거점</strong>인 화성습지와
                  해양보호생물의 서식지인 매향리 갯벌 등 세계적 수준의 생태 자산을 보유한 도시입니다.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  특히 갯벌은 '블루카본(Blue Carbon)'의 핵심으로, <strong>숲보다 최대 10배 높은
                  탄소 흡수 능력</strong>을 지닌 강력한 탄소중립 자산입니다.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  하지만 동시에 화성시는 <strong>전국에서 가장 많은 공장이 밀집한 도시</strong>로,
                  산업화로 인한 환경 부담과 생태계 훼손의 위협에 끊임없이 직면하고 있습니다.
                </p>
              </div>

              <div className="bg-green-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-green-900">💡 새로운 패러다임의 필요성</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  지금까지 갯벌 정화 활동과 같은 환경보호 활동은 시민들의 선의에 기댄
                  '자발적 봉사'의 형태로 이루어져 왔습니다.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  이는 매우 숭고하고 가치 있는 일이지만, 참여 동기가 개인의 신념에 의존하기 때문에
                  <strong>지속성과 확장성에 명확한 한계</strong>를 가집니다.
                </p>
                <div className="bg-white rounded-xl p-6 border-l-4 border-green-500">
                  <p className="text-gray-800 font-semibold mb-2">
                    환경보호 활동의 패러다임 전환
                  </p>
                  <p className="text-gray-700">
                    <span className="line-through opacity-60">'비용(시간과 노력)을 쓰는 봉사'</span>
                    <br />
                    → <strong className="text-green-700">'가치를 쌓는 금융'</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 컨셉 개요 */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4 text-center">나의 환경 활동이 '자산'이 되는 가상 은행</h2>
            <p className="text-xl text-center text-gray-700 mb-12 max-w-4xl mx-auto">
              시민들이 화성시 갯벌 보전 활동에 참여하면, 그 기여도를 '탄소 포인트(CP: Carbon Point)'라는
              디지털 자산으로 환산하여 개인의 가상 계좌에 예금해주는 모바일 기반의 생태 금융 플랫폼입니다.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-2xl font-bold mb-4 text-primary">예금 (Deposit)</h3>
                <p className="text-gray-700 leading-relaxed">
                  갯벌 정화, 생태계 교란종 제거 등 공식 인증된 활동에 참여하고,
                  소요된 시간을 '탄소 원금'으로 적립합니다.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-2xl font-bold mb-4 text-secondary">이자 (Interest)</h3>
                <p className="text-gray-700 leading-relaxed">
                  예치된 탄소 포인트는 갯벌의 실제 탄소 흡수량 증가 데이터와 연동되어
                  '탄소 이자'가 발생합니다. 갯벌이 건강해질수록 나의 자산도 함께 늘어납니다.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="text-4xl mb-4">💳</div>
                <h3 className="text-2xl font-bold mb-4 text-blue-600">사용 (Withdrawal)</h3>
                <p className="text-gray-700 leading-relaxed">
                  누적된 탄소 포인트는 화성시 지역 화폐로 전환하거나,
                  지역 내 친환경 상점, 공공시설 등에서 현금처럼 사용할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 주요 기능 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">주요 기능</h2>

            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">계좌 개설: '나의 첫 탄소 통장' 만들기</h3>
                  <p className="text-gray-700 leading-relaxed">
                    시민 누구나 앱을 다운로드하고 간단한 본인 인증을 통해 개인별 '갯벌 탄소예금' 계좌를 개설합니다.
                    계좌 개설 시, 화성시 갯벌의 가치와 블루카본의 중요성에 대한 짧은 애니메이션을 제공합니다.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">활동 참여: '오늘의 갯벌 미션' 수행하기</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    앱 내 '오늘의 미션' 탭에서 화성시환경재단이나 협력 NGO가 주관하는
                    갯벌 보전 활동 목록을 확인하고 참여 신청을 합니다.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>활동 현장 도착 시 GPS 기반 '출석하기'</li>
                    <li>활동 종료 후 QR코드 스캔으로 활동 시간과 내용 최종 인증</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">탄소 적립: '탄소 원금' 입금하기</h3>
                  <p className="text-gray-700 leading-relaxed">
                    인증된 활동 시간은 사전에 정해진 기준(예: 1시간 = 100 CP)에 따라
                    '탄소 포인트(CP)'로 자동 변환되어 개인 계좌에 '원금'으로 즉시 입금됩니다.
                    입금 내역에는 구체적인 활동 내용이 기록됩니다.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">자산 증식: '탄소 이자' 받기</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    분기별로 화성시환경재단이 전문 연구기관과 협력하여 매향리 갯벌의
                    탄소 흡수능력 개선도를 측정합니다.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    측정된 개선도에 따라 '탄소 이자율'이 결정되고,
                    모든 예금 계좌에 보유 잔액 대비 이자가 일괄 지급됩니다.
                    "화성 갯벌의 건강이 1.5% 개선되어, 이자 15 CP가 지급되었습니다"와 같이
                    푸시 알림으로 공지됩니다.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  5
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">포인트 사용: '가치 소비' 실천하기</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    누적된 포인트는 앱 내 '사용하기' 탭을 통해 QR코드 결제 방식으로
                    지역 내 제로웨이스트샵, 로컬푸드 직매장, 친환경 카페 등
                    '가치소비 제휴점'에서 사용할 수 있습니다.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    화성시 공영주차장 요금 할인, 반석산 에코스쿨 등 환경 교육 프로그램 수강료 할인 등
                    공공 서비스와 연계하여 사용처를 다각화합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 기대 효과 */}
        <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">기대 효과 및 평가 기준 부합성</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold mb-3 text-primary">주제적합성</h3>
                <p className="text-gray-700">
                  화성시의 핵심 환경자원인 '갯벌'을 시민 참여의 중심 무대로 활용하고,
                  그 가치를 직접 체험하고 홍보하는 방안을 제시하여 공모 주제에 완벽하게 부합합니다.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold mb-3 text-secondary">창의성</h3>
                <p className="text-gray-700">
                  환경보호 활동을 '봉사'가 아닌 '개인 금융(예금, 이자)'의 개념과 결합하여,
                  참여 동기를 내재적 가치에서 실질적 자산 증식으로 확장한 전례 없는 혁신적인 모델입니다.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold mb-3 text-blue-600">논리성</h3>
                <p className="text-gray-700">
                  <strong>[문제]</strong> 시민 참여의 지속성 부족 →
                  <strong>[해결책]</strong> 개인화된 경제적 보상 시스템 도입 →
                  <strong>[기대효과]</strong> 참여 증대 및 갯벌 보전 가속화라는
                  명확하고 설득력 있는 인과관계를 가집니다.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold mb-3 text-purple-600">실효성</h3>
                <p className="text-gray-700">
                  제안된 기능은 기존의 모바일 앱 기술(GPS, QR코드, 포인트 시스템)로 충분히 구현 가능합니다.
                  MVP(최소 기능 제품) 프로토타입을 3~4개월 내에 개발하여 즉시 실증 사업을 시작할 수 있습니다.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md md:col-span-2">
                <h3 className="text-xl font-bold mb-3 text-pink-600">기여도</h3>
                <p className="text-gray-700">
                  갯벌(블루카본) 보전을 통해 화성시의 탄소 흡수원을 직접적으로 확충하며,
                  '화성시 탄소중립·녹색성장 기본계획' 및 HS-SDGs 14번(해양생태계 보전),
                  15번(생물다양성 보전) 목표 달성에 실질적으로 기여합니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 로드맵 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">프로토타입 구현 및 발전 계획</h2>

            <div className="relative">
              {/* 타임라인 라인 */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300"></div>

              <div className="space-y-12">
                {/* 1단계 */}
                <div className="relative">
                  <div className="md:flex items-center">
                    <div className="md:w-1/2 md:pr-12 mb-4 md:mb-0">
                      <div className="bg-primary text-white rounded-2xl p-8">
                        <div className="text-sm font-semibold mb-2">1단계 (3개월)</div>
                        <h3 className="text-2xl font-bold mb-4">MVP 프로토타입 개발</h3>
                        <p className="mb-4">
                          핵심 기능(활동 신청/인증, 포인트 적립)의 기술적 실현 가능성 및
                          사용자 수용성 검증
                        </p>
                        <ul className="space-y-2 text-sm">
                          <li>• 회원가입 및 탄소예금 계좌 생성</li>
                          <li>• GPS 기반 활동 출석체크 및 QR코드 인증</li>
                          <li>• 활동 시간에 따른 포인트 자동 적립 및 내역 조회</li>
                          <li>• 시범 운영: 참가자 100명 대상</li>
                        </ul>
                      </div>
                    </div>
                    <div className="hidden md:block w-12 h-12 bg-primary rounded-full absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center text-white font-bold border-4 border-white">
                      1
                    </div>
                    <div className="md:w-1/2"></div>
                  </div>
                </div>

                {/* 2단계 */}
                <div className="relative">
                  <div className="md:flex items-center">
                    <div className="md:w-1/2"></div>
                    <div className="hidden md:block w-12 h-12 bg-secondary rounded-full absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center text-white font-bold border-4 border-white">
                      2
                    </div>
                    <div className="md:w-1/2 md:pl-12">
                      <div className="bg-secondary text-white rounded-2xl p-8">
                        <div className="text-sm font-semibold mb-2">2단계 (MVP 개발 후 3개월)</div>
                        <h3 className="text-2xl font-bold mb-4">공식 플랫폼 런칭</h3>
                        <p className="mb-4">
                          이자 시스템 및 포인트 사용처 연동을 통한 생태-경제 순환 모델 구축
                        </p>
                        <ul className="space-y-2 text-sm">
                          <li>• MVP 기능 고도화</li>
                          <li>• 갯벌 건강도 데이터 연동 '탄소 이자' 시스템 도입</li>
                          <li>• 지역 소상공인 10곳과 제휴, QR 결제 시스템 도입</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3단계 */}
                <div className="relative">
                  <div className="md:flex items-center">
                    <div className="md:w-1/2 md:pr-12 mb-4 md:mb-0">
                      <div className="bg-blue-600 text-white rounded-2xl p-8">
                        <div className="text-sm font-semibold mb-2">3단계 (런칭 후 1년)</div>
                        <h3 className="text-2xl font-bold mb-4">플랫폼 확장</h3>
                        <p className="mb-4">
                          화성시 전역으로의 서비스 확장 및 데이터 기반 정책 제안
                        </p>
                        <ul className="space-y-2 text-sm">
                          <li>• 갯벌 외 하천, 생태공원 등 다른 환경자산 보전 활동까지 미션 확장</li>
                          <li>• 누적된 시민 참여 데이터를 분석하여 '시민 참여 환경 리포트' 발간</li>
                          <li>• 기업 ESG 활동과 연계한 B2B 모델 개발</li>
                        </ul>
                      </div>
                    </div>
                    <div className="hidden md:block w-12 h-12 bg-blue-600 rounded-full absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center text-white font-bold border-4 border-white">
                      3
                    </div>
                    <div className="md:w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 마무리 섹션 */}
        <section className="py-16 bg-gradient-to-br from-primary to-secondary text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              시민 한 사람 한 사람의 작은 실천이 모여
            </h2>
            <p className="text-xl leading-relaxed">
              개인의 자산이 되고, 마침내 <strong>탄소중립 도시 화성</strong>이라는
              더 큰 미래를 저축하게 될 것입니다.
            </p>
            <div className="mt-8">
              {isAuthenticated ? (
                <button
                  onClick={() => router.push('/dashboard')}
                  className="px-8 py-4 bg-white text-primary hover:bg-gray-100 rounded-lg transition font-bold text-lg"
                >
                  대시보드로 가기
                </button>
              ) : (
                <button
                  onClick={() => router.push('/login')}
                  className="px-8 py-4 bg-white text-primary hover:bg-gray-100 rounded-lg transition font-bold text-lg"
                >
                  시작하기
                </button>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm opacity-75">
            2025년 화성에서 ON 탄소중립 아이디어 경진대회 출품작
          </p>
          <p className="text-sm opacity-75 mt-2">
            갯벌 탄소예금 - 환경보호와 금융의 만남
          </p>
        </div>
      </footer>
    </div>
  )
}
