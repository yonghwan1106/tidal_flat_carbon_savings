# 갯벌 탄소예금 (Tidal Flat Carbon Savings)

> **2025년 화성에서 ON 탄소중립 아이디어 경진대회** 출품작

나의 환경 활동이 자산이 됩니다. 화성시 갯벌 보전 활동에 참여하고 탄소 포인트를 적립하세요.

## 🌊 프로젝트 소개

갯벌 탄소예금은 시민들의 환경보호 활동을 실질적인 경제적 자산으로 전환하는 생태-금융 융합 플랫폼입니다.

### 핵심 기능
- ✅ **원클릭 데모 체험**: 회원가입 없이 즉시 체험
- ✅ **활동 참여**: GPS 출석 + QR 인증으로 포인트 적립
- ✅ **탄소 이자**: 갯벌 건강도 개선에 따른 이자 지급
- ✅ **포인트 사용**: 제휴처에서 현금처럼 사용
- ✅ **AI 리포트**: Claude AI 기반 개인화 환경 기여 리포트
- ✅ **네이버 지도**: 화성시 실제 갯벌 위치 표시

## 🚀 기술 스택

### Frontend
- **Next.js 15+** (App Router)
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **Naver Maps API**

### Backend
- **Python FastAPI**
- **Google Sheets** (Database)
- **Claude Haiku 4.5** (AI)

### Deployment
- **Vercel** (Frontend + Backend Serverless)
- **GitHub** (Version Control)

## 📦 프로젝트 구조

```
tidal-flat-carbon-savings/
├── frontend/          # Next.js Frontend
├── backend/           # Python FastAPI
├── docs/              # 문서 (PRD, 제안서)
├── data/              # 데모 데이터
└── README.md
```

## 🛠️ 개발 환경 설정

### 필요 환경
- Node.js 18+
- Python 3.9+
- Git

### 1. 저장소 클론
```bash
git clone https://github.com/heisenbug0306/tidal-flat-carbon-savings.git
cd tidal-flat-carbon-savings
```

### 2. Frontend 설정
```bash
cd frontend
npm install
cp .env.example .env.local
# .env.local에 API 키 입력
npm run dev
```

### 3. Backend 설정
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# .env에 API 키 입력
uvicorn main:app --reload
```

## 🌐 데모 체험

**URL**: https://tidal-flat-carbon-savings.vercel.app

### 빠른 시작 (5분)
1. "데모 체험하기" 버튼 클릭
2. 계정 선택 (홍길동 추천)
3. "심사위원 가이드 투어 시작" 체크
4. 5분 투어 완료 후 자유 탐색

## 📚 문서

- [PRD (Product Requirements Document)](./docs/prd.md)
- [제안서](./docs/proposal.md)

## 🏆 경진대회 정보

- **대회명**: 2025년 화성에서 ON 탄소중립 아이디어 경진대회
- **주제**: 하천, 갯벌, 생태공원 등 환경자원 및 시설 홍보 아이디어
- **출품일**: 2025-11-XX

## 👨‍💻 개발자

- **이메일**: heisenbug0306@gmail.com
- **GitHub**: [@heisenbug0306](https://github.com/heisenbug0306)

## 📄 라이선스

MIT License

---

**🌳 화성시의 탄소중립, 시민의 참여로 완성합니다.**
