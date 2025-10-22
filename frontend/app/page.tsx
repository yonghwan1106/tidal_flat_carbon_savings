export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 text-primary">
          갯벌 탄소예금
        </h1>
        <h2 className="text-3xl font-semibold mb-4 text-secondary">
          Tidal Flat Carbon Savings
        </h2>
        <p className="text-xl mb-8 text-gray-700">
          나의 환경 활동이 자산이 됩니다
        </p>
        <p className="text-lg mb-12 text-gray-600">
          화성시 갯벌 보전 활동에 참여하고 탄소 포인트를 적립하세요
        </p>

        <div className="space-y-4">
          <button className="bg-primary hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors">
            데모 체험하기
          </button>
          <p className="text-sm text-gray-500">
            2025년 화성에서 ON 탄소중립 아이디어 경진대회 출품작
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">🌱</div>
            <h3 className="text-lg font-semibold mb-2">활동 참여</h3>
            <p className="text-gray-600">갯벌 보전 활동 참여로 탄소 포인트 적립</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-lg font-semibold mb-2">이자 획득</h3>
            <p className="text-gray-600">갯벌 건강도 개선에 따른 이자 지급</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">💸</div>
            <h3 className="text-lg font-semibold mb-2">포인트 사용</h3>
            <p className="text-gray-600">제휴처에서 현금처럼 사용</p>
          </div>
        </div>
      </div>
    </main>
  )
}
