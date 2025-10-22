# Product Requirements Document (PRD)
# 갯벌 탄소예금 (Tidal Flat Carbon Savings)

## 문서 정보
- **버전**: 2.0
- **작성일**: 2025-10-22
- **프로젝트명**: 갯벌 탄소예금 플랫폼
- **대회명**: 2025년 화성에서 ON 탄소중립 아이디어 경진대회
- **담당자**: heisenbug0306@gmail.com

---

## ⚠️ 중요: 경진대회 출품작

본 프로젝트는 **"2025년 화성에서 ON 탄소중립 아이디어 경진대회"** 출품작으로, 심사위원들이 번거로운 회원가입 절차 없이 **원클릭으로 모든 기능을 체험**할 수 있도록 설계되었습니다.

### 핵심 설계 원칙
1. ✅ **회원가입 없음**: 사전에 설정된 데모 계정으로 원클릭 로그인
2. ✅ **즉시 체험**: 메인 페이지에서 "데모 체험하기" 버튼 클릭 → 즉시 사용 가능
3. ✅ **가이드 투어**: 선택적 가이드 투어로 주요 기능 안내
4. ✅ **풍부한 샘플 데이터**: 실제 사용 환경을 시뮬레이션한 데이터 사전 생성

---

## 1. 제품 개요

### 1.1 제품 비전
갯벌 탄소예금은 시민들의 환경보호 활동을 실질적인 경제적 자산으로 전환하는 생태-금융 융합 플랫폼입니다. 시민들이 갯벌 보전 활동에 참여하면 '탄소 포인트(CP)'를 적립하고, 갯벌 건강도 개선에 따른 이자를 받으며, 이를 지역 경제에서 사용할 수 있는 혁신적인 환경 참여 시스템입니다.

### 1.2 핵심 가치 제안
- **시민**: 환경보호 활동 → 실질적 경제 보상 → 지속 가능한 참여 동기
- **화성시**: 시민 참여 증대 → 갯벌 보전 가속화 → 탄소중립 목표 달성
- **지역 경제**: 포인트 사용처 확대 → 친환경 소상공인 활성화 → 선순환 생태계

### 1.3 타겟 사용자
1. **경진대회 심사위원** (최우선): 원클릭 체험으로 아이디어 검증
2. **일반 시민**: 환경보호에 관심 있는 화성시민 (20-50대)
3. **활동 운영자**: 화성시환경재단, 협력 NGO 담당자
4. **제휴처 관리자**: 포인트 사용처 소상공인
5. **시스템 관리자**: 화성시 담당 공무원

---

## 2. 비즈니스 목표 및 성공 지표

### 2.1 경진대회 목표
1. ✅ **심사위원에게 명확한 가치 전달**: 5분 내 핵심 기능 체험 완료
2. ✅ **기술적 실현 가능성 입증**: 동작하는 프로토타입 제시
3. ✅ **창의성 및 혁신성 강조**: 환경보호 + 금융 융합 모델
4. ✅ **화성시 특화**: 매향리 갯벌, 화성습지 등 실제 장소 활용

### 2.2 향후 비즈니스 목표 (수상 후)
1. MVP 출시 후 3개월 내 500명 이상의 활성 사용자 확보
2. 분기별 갯벌 정화 활동 참여율 30% 증가
3. 1년 내 지역 제휴처 50곳 확보
4. 화성시 탄소중립 목표 달성에 정량적 기여 (탄소 흡수량 측정)

### 2.3 핵심 성공 지표 (KPI)
- **경진대회**: 심사위원 평가 점수, 데모 완료율
- **사용자 지표**: MAU(월간 활성 사용자), 활동 참여율, 리텐션율
- **활동 지표**: 월간 총 활동 시간, 활동당 평균 참여자 수
- **경제 지표**: 포인트 적립/사용 비율, 제휴처 결제 건수
- **환경 지표**: 갯벌 건강도 개선률, 탄소 흡수량 증가율

---

## 3. 기능 요구사항

### 3.1 사용자 기능

#### 3.1.1 데모 계정 원클릭 로그인 ⭐ 경진대회 핵심
**우선순위: P0 (경진대회 필수)**

- **기능 설명**
  - 메인 페이지에서 "데모 체험하기" 버튼 클릭
  - 사전 설정된 데모 계정 중 하나를 자동 선택하여 로그인
  - 온보딩: 화성시 갯벌 소개 및 서비스 핵심 가치 설명 (스킵 가능)

- **데모 계정 목록** (사전 생성)
  1. **홍길동**: 활발한 참여자 (활동 15회, 포인트 2,500 CP)
  2. **이영희**: 신규 사용자 (활동 2회, 포인트 300 CP)
  3. **김철수**: 포인트 사용자 (활동 8회, 포인트 800 CP, 사용 내역 多)
  4. **박민지**: 랭킹 1위 (활동 30회, 포인트 5,000 CP)

- **세부 요구사항**
  - 버튼 한 번 클릭으로 즉시 로그인 (인증 없음)
  - 계정 선택 UI: "어떤 사용자로 체험하시겠습니까?" (선택 옵션)
  - 온보딩 영상/애니메이션 (30초 이내, 스킵 가능)
  - "심사위원 가이드 투어 시작하기" 버튼 제공

- **기술 구현**
  - Next.js App Router: `/demo` 페이지
  - 로컬 스토리지에 선택한 데모 계정 정보 저장
  - JWT 토큰 생성 (유효기간: 24시간)
  - Google Sheets: 사전 생성된 데모 계정 데이터

#### 3.1.2 심사위원 가이드 투어 ⭐ 경진대회 핵심
**우선순위: P0 (경진대회 필수)**

- **기능 설명**
  - 주요 기능을 순차적으로 안내하는 인터랙티브 투어
  - 각 단계마다 설명 + 실제 동작 시연
  - 언제든 종료 및 재시작 가능

- **투어 단계** (총 5분)
  1. **대시보드** (1분): 나의 환경 기여 현황, 보유 포인트 확인
  2. **활동 목록** (1분): 갯벌 정화 활동 조회, 네이버 지도 위치 표시
  3. **활동 참여** (1분): GPS 출석 체크 시뮬레이션, QR 인증 체험
  4. **포인트 적립** (30초): 포인트 자동 적립 및 거래 내역 확인
  5. **포인트 사용** (1분): 제휴처 지도, QR 결제 시뮬레이션
  6. **AI 리포트** (30초): Claude AI 생성 환경 기여 리포트

- **기술 구현**
  - React 라이브러리: `react-joyride` 또는 커스텀 투어 컴포넌트
  - 각 단계별 하이라이트 및 툴팁
  - 진행 상태 표시 (1/6, 2/6...)

#### 3.1.3 활동 참여 시스템
**우선순위: P0 (MVP 필수)**

##### 3.1.3.1 미션 목록 조회
- **기능 설명**
  - 화성시 갯벌 보전 활동 목록 표시
  - 활동 상세 정보: 일시, 장소, 소요 시간, 예상 적립 포인트
  - 네이버 지도 연동: 활동 장소 표시 및 길찾기

- **샘플 활동 데이터** (사전 생성)
  1. 매향리 갯벌 쓰레기 수거 (2025-10-25, 10:00-12:00, 200 CP)
  2. 화성습지 생태 모니터링 (2025-10-26, 14:00-16:00, 200 CP)
  3. 갯끈풀 제거 봉사 (2025-10-27, 09:00-12:00, 300 CP)
  4. 염생식물 군락 조성 (2025-10-28, 13:00-17:00, 400 CP)

- **세부 요구사항**
  - 활동 목록: 날짜별 필터링, 거리순 정렬
  - 카드 형태의 UI: 이미지, 제목, 장소, 시간, 포인트
  - 참여 신청 버튼 (정원 제한 표시)

- **기술 구현**
  - Next.js SSR로 활동 목록 로딩
  - Google Sheets (`activities` 시트)에서 데이터 조회
  - Naver Maps API로 지도 표시

##### 3.1.3.2 GPS 기반 출석 체크 (시뮬레이션)
- **기능 설명**
  - 경진대회용: 실제 GPS 대신 **시뮬레이션 모드**
  - 심사위원이 버튼 클릭 → "출석 완료" 애니메이션
  - (실제 배포 시: 활동 현장 도착 시 GPS 위치 기반 출석 인증)

- **세부 요구사항**
  - "출석 체크하기" 버튼
  - 시뮬레이션 모드: 항상 성공 (위치 상관없음)
  - 성공 시 애니메이션 + 음향 효과
  - 출석 시간 기록

- **기술 구현**
  - Next.js Client Component
  - 데모 모드: 자동 성공 처리
  - (실제 배포 시: Geolocation API + Python FastAPI GPS 검증)

##### 3.1.3.3 QR코드 활동 인증 (시뮬레이션)
- **기능 설명**
  - 경진대회용: QR 스캔 UI 표시 + **자동 인증 성공**
  - 심사위원이 "QR 인증" 버튼 클릭 → 즉시 포인트 적립
  - (실제 배포 시: 현장 관리자 QR코드 스캔 필요)

- **세부 요구사항**
  - QR 스캔 UI (카메라 권한 요청 없음)
  - 샘플 QR코드 이미지 표시 (스캔 연출)
  - 2초 후 자동 인증 성공
  - 획득 포인트 강조 표시

- **기술 구현**
  - Next.js Client Component
  - 데모 모드: 타이머 2초 후 자동 성공
  - (실제 배포 시: `html5-qrcode` + Python FastAPI 검증)

#### 3.1.4 포인트 관리
**우선순위: P0 (MVP 필수)**

##### 3.1.4.1 탄소 원금 적립
- **기능 설명**
  - 활동 인증 완료 → 탄소 포인트 자동 변환 (1시간 = 100 CP)
  - 실시간 포인트 입금 알림 (인앱 토스트)

- **세부 요구사항**
  - 활동 완료 시 즉시 포인트 입금
  - 입금 내역: 활동명, 시간, 포인트, 일시
  - 누적 잔액 표시
  - 축하 애니메이션

- **기술 구현**
  - Python FastAPI: 포인트 적립 계산 로직
  - Google Sheets (`transactions` 시트)에 거래 기록
  - Toast 알림 (react-hot-toast)

##### 3.1.4.2 탄소 이자 지급
**우선순위: P1 (정식 런칭 시 필수)**

- **기능 설명**
  - 분기별 갯벌 건강도 개선률에 따라 이자 지급
  - 이자율: 갯벌 탄소 흡수능력 개선도 기반 (예: 1.5% 개선 → 1.5% 이자)

- **데모 데이터**
  - 홍길동 계정: 2025-10-01에 37.5 CP 이자 지급 (2,500 CP의 1.5%)
  - 이자 지급 공지 배너: "이번 분기 갯벌 건강도 1.5% 개선!"

- **세부 요구사항**
  - 분기별 이자 일괄 지급 (자동화)
  - 이자 지급 공지: 인앱 배너 + 알림
  - 이자 산정 근거 설명 페이지

- **기술 구현**
  - Python 스크립트: 이자 계산 및 일괄 지급 배치 작업
  - 환경 데이터 연동: 화성시환경재단 제공 데이터 또는 공공 API
  - Vercel Cron Jobs으로 분기별 자동 실행

##### 3.1.4.3 포인트 내역 조회
- **기능 설명**
  - 포인트 입출금 내역 조회 (활동 적립, 이자, 사용)
  - 기간별 필터링 (최근 1개월, 3개월, 전체)

- **세부 요구사항**
  - 시간 역순 정렬
  - 거래 유형별 아이콘 및 색상 구분
  - 무한 스크롤 또는 페이지네이션

- **기술 구현**
  - Next.js Server Component로 SSR
  - Google Sheets (`transactions` 시트)에서 조회

#### 3.1.5 포인트 사용
**우선순위: P1 (정식 런칭 시 필수)**

##### 3.1.5.1 제휴처 결제 (시뮬레이션)
- **기능 설명**
  - 경진대회용: QR코드 생성 → "결제 완료" 시뮬레이션
  - 앱에서 QR코드 생성 → 사용 포인트 입력 → 영수증 표시

- **세부 요구사항**
  - 사용 가능 포인트 및 잔액 표시
  - QR코드 생성 (실제 동작)
  - "결제하기" 버튼 클릭 → 2초 후 성공 (데모 모드)
  - 결제 완료 영수증 표시

- **기술 구현**
  - Next.js Client Component로 QR코드 생성 (`qrcode.react`)
  - 데모 모드: 자동 성공 처리
  - (실제 배포 시: Python FastAPI 결제 처리 API)

##### 3.1.5.2 제휴처 목록 조회
- **기능 설명**
  - 포인트 사용 가능한 제휴처 목록
  - 제휴처 카테고리: 카페, 식당, 제로웨이스트샵, 공공시설 등

- **샘플 제휴처 데이터** (사전 생성)
  1. 에코카페 (동탄1동, 카페)
  2. 화성로컬푸드 직매장 (봉담읍, 식당)
  3. 제로웨이스트샵 그린 (동탄2동, 샵)
  4. 화성시 공영주차장 (매송면, 공공시설)
  5. 반석산 에코스쿨 (서신면, 교육)

- **세부 요구사항**
  - 네이버 지도 연동: 제휴처 위치 표시
  - 거리순, 카테고리별 필터링
  - 제휴처 상세 정보: 주소, 전화번호, 혜택 내용

- **기술 구현**
  - Google Sheets (`partners` 시트)에서 데이터 조회
  - Naver Maps API로 지도 표시 및 마커

#### 3.1.6 대시보드 및 통계
**우선순위: P0 (경진대회 필수)**

- **기능 설명**
  - 나의 환경 기여 현황: 총 활동 시간, 누적 포인트, 활동 횟수
  - 화성시 갯벌 건강도 현황: 탄소 흡수량, 개선률
  - 랭킹 시스템: 월간 활동 리더보드 (선택적 공개)

- **세부 요구사항**
  - 시각적 차트: 월별 활동 그래프, 포인트 증가 추이
  - 배지 시스템: 활동 마일스톤 달성 시 배지 획득
  - 환경 임팩트 시각화: "나의 활동으로 나무 🌳 5그루 만큼의 탄소 흡수!"

- **기술 구현**
  - Next.js Server Component로 데이터 집계
  - Recharts로 시각화
  - Google Sheets에서 데이터 조회

#### 3.1.7 AI 환경 기여 리포트 ⭐ 경진대회 차별화
**우선순위: P0 (경진대회 필수)**

- **기능 설명**
  - Claude Haiku 4.5 API로 개인화된 환경 기여 리포트 생성
  - 사용자 활동 데이터 분석 → 자연어 리포트
  - 칭찬 + 추천 활동 + 환경 팁

- **리포트 예시**
  > "홍길동님, 이번 달 15회의 갯벌 정화 활동에 참여하셨네요! 총 30시간 동안 2,500 CP를 적립하셨고, 이는 약 250kg의 탄소를 흡수한 것과 같습니다. 특히 매향리 갯벌에서의 활동이 많았는데요, 다음 주 화성습지 생태 모니터링 활동에도 참여해보시는 건 어떨까요?"

- **세부 요구사항**
  - "AI 리포트 생성" 버튼
  - 로딩 애니메이션 (3-5초)
  - 리포트 표시: 마크다운 렌더링
  - 공유 버튼 (SNS, 이미지 저장)

- **기술 구현**
  - Python FastAPI: Claude API 호출
  - Anthropic Claude Haiku 4.5 모델
  - 프롬프트 엔지니어링: 사용자 데이터 → 개인화 리포트

### 3.2 운영자 기능

#### 3.2.1 활동 관리
**우선순위: P1 (향후 확장)**

- **기능 설명**
  - 갯벌 보전 활동 등록/수정/삭제
  - 활동 상세 정보 입력: 제목, 설명, 일시, 장소(좌표), 정원, 예상 소요 시간

- **세부 요구사항**
  - 관리자 인증 (간단한 비밀번호)
  - 활동 이미지 업로드 (Google Drive 연동)
  - 네이버 지도에서 장소 선택 → 좌표 자동 입력

- **기술 구현**
  - Next.js 관리자 페이지 (`/admin` 경로)
  - Google Sheets API로 CRUD 작업
  - Naver Maps API: Geocoding (주소 → 좌표 변환)

#### 3.2.2 QR코드 생성
**우선순위: P1 (향후 확장)**

- **기능 설명**
  - 활동별 인증용 QR코드 생성
  - QR코드 출력 (PDF) 기능

- **기술 구현**
  - Python FastAPI: QR코드 생성 API
  - JWT 기반 인증 토큰 포함

### 3.3 제휴처 기능

#### 3.3.1 결제 처리
**우선순위: P2 (향후 확장)**

- **기능 설명**
  - 고객이 제시한 QR코드 스캔
  - 사용 포인트 입력 및 결제 승인

- **기술 구현**
  - 제휴처용 웹 페이지 (`/partner`)
  - Python FastAPI: 결제 검증 및 처리 API

---

## 4. 기술 스택 및 아키텍처

### 4.1 프론트엔드

#### 4.1.1 Core Framework
- **Next.js 15+ (App Router)**
  - React Server Components 활용
  - SSR/SSG로 성능 최적화
  - API Routes 대신 Python FastAPI 사용

#### 4.1.2 UI 라이브러리
- **Tailwind CSS**: 스타일링
- **shadcn/ui**: 컴포넌트 라이브러리 (Button, Card, Dialog 등)
- **Lucide React**: 아이콘

#### 4.1.3 상태 관리
- **Zustand** 또는 **React Context API**: 전역 상태 관리 (사용자 정보, 로그인 상태)

#### 4.1.4 기타 라이브러리
- **react-joyride**: 가이드 투어 (심사위원용)
- **html5-qrcode**: QR코드 스캔 (실제 배포 시)
- **qrcode.react**: QR코드 생성
- **Recharts**: 데이터 시각화
- **react-hot-toast**: 토스트 알림
- **date-fns**: 날짜 처리

### 4.2 백엔드

#### 4.2.1 API 서버
- **Python FastAPI**
  - 고성능 비동기 API 서버
  - 중요 비즈니스 로직 처리:
    - 포인트 적립/차감 계산
    - GPS 좌표 검증 (실제 배포 시)
    - QR코드 생성 및 검증
    - 이자 계산 및 일괄 지급
    - 환경 데이터 분석
    - Claude API 연동

#### 4.2.2 Python 주요 라이브러리
- **FastAPI**: 웹 프레임워크
- **Pydantic**: 데이터 검증
- **gspread** / **gspread-dataframe**: Google Sheets 연동
- **python-jose**: JWT 토큰 생성/검증
- **qrcode**: QR코드 생성
- **geopy**: GPS 거리 계산 (실제 배포 시)
- **pandas**: 데이터 분석 (이자 계산, 통계)
- **anthropic**: Claude API 클라이언트

### 4.3 데이터베이스

#### 4.3.1 Google Sheets (Main Database)
- **장점**:
  - 초기 MVP에 적합 (빠른 프로토타이핑)
  - 관리자가 직접 데이터 확인/수정 가능
  - 별도 DB 서버 불필요
  - 경진대회 심사위원이 데이터 확인 가능

- **시트 구조**:
  1. **users**: 사용자 정보 (데모 계정 4개)
  2. **activities**: 활동 정보 (샘플 활동 10개)
  3. **participations**: 활동 참여 기록 (샘플 기록 50개)
  4. **transactions**: 포인트 거래 내역 (샘플 거래 100개)
  5. **partners**: 제휴처 정보 (샘플 제휴처 10개)
  6. **environment_data**: 갯벌 환경 데이터 (분기별 데이터)

- **접근 방법**:
  - Python: `gspread` 라이브러리
  - Next.js: Python API를 통해 간접 접근

#### 4.3.2 향후 확장 (Phase 2)
- **Supabase** 또는 **PostgreSQL**로 마이그레이션
  - 사용자 증가 시 성능 개선
  - 복잡한 쿼리 및 트랜잭션 처리
  - 실시간 데이터 동기화

### 4.4 외부 API 및 서비스

#### 4.4.1 필수 API

##### Anthropic Claude API (Haiku 4.5)
- **용도**:
  - 개인화된 환경 기여 리포트 생성 ⭐ 경진대회 차별화
  - 활동 추천 시스템 (사용자 선호도 기반)
  - 갯벌 건강도 데이터 자연어 요약
  - 환경 정보 챗봇 (선택)

- **API 엔드포인트**:
  ```python
  POST https://api.anthropic.com/v1/messages
  Model: claude-haiku-4.5-20250925
  ```

##### Naver Maps API (네이버 지도)
- **용도**:
  1. **지도 표시**: 활동 장소, 제휴처 위치 표시
  2. **마커**: 위치 마커 및 클러스터링
  3. **길찾기**: 현재 위치 → 활동 장소 경로 안내
  4. **Geocoding**: 주소 → 좌표 변환 (관리자 기능)
  5. **Reverse Geocoding**: 좌표 → 주소 변환

- **API 종류**:
  - Naver Maps JavaScript API v3 (지도 표시)
  - Naver Cloud Geocoding API (주소 검색)

- **사용 화면**:
  - 활동 목록: 지도 뷰에서 모든 활동 위치 표시
  - 활동 상세: 개별 활동 장소 지도
  - 제휴처 목록: 제휴처 위치 지도 + 마커
  - 관리자: 활동 등록 시 주소 검색 → 좌표 변환

#### 4.4.2 선택적 API (추천)

##### 공공데이터 API
1. **해양수산부 해양환경정보 API**
   - 갯벌 수질 데이터
   - 해양생물 다양성 데이터

2. **기상청 동네예보 API**
   - 활동 일자의 날씨 정보 표시
   - 심사위원에게 실용성 강조

3. **한국환경공단 에어코리아 API**
   - 화성시 대기질 데이터 (추가 환경 지표)

##### 기타 서비스
1. **Vercel Cron Jobs**
   - 분기별 이자 지급 자동화
   - 일일 통계 집계

### 4.5 시스템 아키텍처

```
┌─────────────────────────────────────────────────────┐
│               Frontend (Vercel)                      │
│                                                       │
│  ┌─────────────────────────────────────────────┐   │
│  │         Next.js 15 App Router                │   │
│  │  - React Server Components                   │   │
│  │  - Client Components (QR, 지도)              │   │
│  │  - Tailwind CSS + shadcn/ui                  │   │
│  │  - 데모 계정 원클릭 로그인                    │   │
│  │  - 심사위원 가이드 투어                       │   │
│  └─────────────────────────────────────────────┘   │
│                        │                              │
│                        │ HTTP/REST                    │
│                        ▼                              │
│  ┌─────────────────────────────────────────────┐   │
│  │      Python FastAPI (Vercel Serverless)     │   │
│  │  - 비즈니스 로직 처리                         │   │
│  │  - 포인트 계산                               │   │
│  │  - GPS/QR 검증 (실제 배포 시)                │   │
│  │  - Claude API 연동                           │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
┌──────────────┐ ┌─────────────┐ ┌──────────────┐
│   Google     │ │  Naver      │ │  Claude API  │
│   Sheets     │ │  Maps API   │ │  (Haiku 4.5) │
│              │ │  - 지도      │ │              │
│  (Database)  │ │  - Geocoding│ │  - AI 리포트 │
│  - 데모데이터│ │             │ │              │
└──────────────┘ └─────────────┘ └──────────────┘
```

---

## 5. 데이터 모델

### 5.1 Google Sheets 스키마

#### Sheet 1: users (데모 계정 4개)
| 컬럼명 | 데이터 타입 | 설명 | 예시 |
|--------|-------------|------|------|
| user_id | string | 고유 ID | `demo_hong` |
| name | string | 이름 | `홍길동` |
| address | string | 주소 (동) | `화성시 동탄1동` |
| created_at | datetime | 가입일시 | `2025-09-01 10:00:00` |
| total_points | number | 총 보유 포인트 | `2500` |
| profile_type | string | 계정 타입 | `active`, `new`, `spender`, `top` |

**데모 계정 데이터**:
```
demo_hong, 홍길동, 화성시 동탄1동, 2025-09-01, 2500, active
demo_lee, 이영희, 화성시 봉담읍, 2025-10-15, 300, new
demo_kim, 김철수, 화성시 동탄2동, 2025-08-01, 800, spender
demo_park, 박민지, 화성시 매송면, 2025-07-01, 5000, top
```

#### Sheet 2: activities (샘플 활동 10개)
| 컬럼명 | 데이터 타입 | 설명 | 예시 |
|--------|-------------|------|------|
| activity_id | string | 활동 ID | `act_001` |
| title | string | 활동명 | `매향리 갯벌 정화` |
| description | text | 상세 설명 | `쓰레기 수거 및 분류` |
| date | date | 활동 일자 | `2025-10-25` |
| start_time | time | 시작 시간 | `10:00` |
| duration_hours | number | 소요 시간 | `2` |
| location_name | string | 장소명 | `매향리 갯벌` |
| latitude | number | 위도 | `37.2036` |
| longitude | number | 경도 | `126.8290` |
| max_participants | number | 정원 | `30` |
| points_per_hour | number | 시간당 포인트 | `100` |
| image_url | string | 이미지 URL | `https://...` |
| status | string | 상태 | `open`, `closed` |

**샘플 활동 위치** (실제 화성시 갯벌):
1. 매향리 갯벌: 37.2036, 126.8290
2. 화성습지: 37.2158, 126.7625
3. 전곡항 갯벌: 37.0681, 126.6411
4. 궁평항 갯벌: 37.0392, 126.6953

#### Sheet 3: participations (샘플 참여 기록 50개)
| 컬럼명 | 데이터 타입 | 설명 | 예시 |
|--------|-------------|------|------|
| participation_id | string | 참여 ID | `par_001` |
| user_id | string | 사용자 ID | `demo_hong` |
| activity_id | string | 활동 ID | `act_001` |
| applied_at | datetime | 신청 일시 | `2025-10-20 14:30:00` |
| checked_in_at | datetime | 출석 일시 | `2025-10-25 10:05:00` |
| verified_at | datetime | 인증 일시 | `2025-10-25 12:05:00` |
| actual_hours | number | 실제 참여 시간 | `2` |
| earned_points | number | 획득 포인트 | `200` |
| status | string | 상태 | `verified` |

#### Sheet 4: transactions (샘플 거래 100개)
| 컬럼명 | 데이터 타입 | 설명 | 예시 |
|--------|-------------|------|------|
| transaction_id | string | 거래 ID | `txn_001` |
| user_id | string | 사용자 ID | `demo_hong` |
| type | string | 거래 유형 | `earn`, `interest`, `spend` |
| amount | number | 포인트 (+/-) | `200` |
| balance_after | number | 거래 후 잔액 | `2500` |
| reference_id | string | 참조 ID | `par_001` |
| description | string | 설명 | `매향리 갯벌 정화 (2시간)` |
| created_at | datetime | 거래 일시 | `2025-10-25 12:10:00` |

#### Sheet 5: partners (샘플 제휴처 10개)
| 컬럼명 | 데이터 타입 | 설명 | 예시 |
|--------|-------------|------|------|
| partner_id | string | 제휴처 ID | `ptn_001` |
| name | string | 상호명 | `에코카페` |
| category | string | 카테고리 | `cafe` |
| address | string | 주소 | `화성시 동탄1동 123` |
| latitude | number | 위도 | `37.2010` |
| longitude | number | 경도 | `127.0738` |
| phone | string | 전화번호 | `031-1234-5678` |
| description | text | 소개 | `친환경 제로웨이스트 카페` |
| image_url | string | 이미지 URL | `https://...` |
| status | string | 상태 | `active` |

#### Sheet 6: environment_data (분기별 환경 데이터)
| 컬럼명 | 데이터 타입 | 설명 | 예시 |
|--------|-------------|------|------|
| data_id | string | 데이터 ID | `env_001` |
| measurement_date | date | 측정 일자 | `2025-10-01` |
| location | string | 측정 장소 | `매향리 갯벌` |
| carbon_absorption_rate | number | 탄소 흡수율 (톤/년) | `125.5` |
| vegetation_area | number | 염생식물 면적 (㎡) | `50000` |
| biodiversity_index | number | 생물 다양성 지수 | `0.75` |
| improvement_rate | number | 개선률 (%) | `1.5` |
| notes | text | 비고 | `전분기 대비 1.5% 개선` |

---

## 6. API 명세

### 6.1 인증 API

#### POST /api/auth/demo-login
데모 계정 원클릭 로그인

**Request**
```json
{
  "user_id": "demo_hong"
}
```

**Response**
```json
{
  "success": true,
  "user": {
    "user_id": "demo_hong",
    "name": "홍길동",
    "address": "화성시 동탄1동",
    "total_points": 2500,
    "profile_type": "active"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### GET /api/auth/demo-accounts
데모 계정 목록 조회

**Response**
```json
{
  "accounts": [
    {
      "user_id": "demo_hong",
      "name": "홍길동",
      "total_points": 2500,
      "description": "활발한 참여자 (활동 15회)"
    },
    {
      "user_id": "demo_lee",
      "name": "이영희",
      "total_points": 300,
      "description": "신규 사용자 (활동 2회)"
    }
  ]
}
```

### 6.2 활동 API

#### GET /api/activities
활동 목록 조회

**Query Parameters**
- `date`: 날짜 필터 (YYYY-MM-DD)
- `status`: 상태 필터 (`open`, `closed`)

**Response**
```json
{
  "activities": [
    {
      "activity_id": "act_001",
      "title": "매향리 갯벌 정화",
      "description": "쓰레기 수거 및 분류",
      "date": "2025-10-25",
      "start_time": "10:00",
      "duration_hours": 2,
      "location_name": "매향리 갯벌",
      "latitude": 37.2036,
      "longitude": 126.8290,
      "max_participants": 30,
      "current_participants": 15,
      "points_per_hour": 100,
      "image_url": "https://...",
      "status": "open"
    }
  ]
}
```

#### POST /api/activities/{activity_id}/apply
활동 참여 신청

**Headers**
- `Authorization`: Bearer {token}

**Response**
```json
{
  "success": true,
  "participation": {
    "participation_id": "par_new",
    "activity_id": "act_001",
    "status": "applied"
  }
}
```

#### POST /api/activities/{activity_id}/checkin
GPS 출석 체크 (데모 모드: 항상 성공)

**Headers**
- `Authorization`: Bearer {token}

**Request**
```json
{
  "demo_mode": true
}
```

**Response**
```json
{
  "success": true,
  "message": "출석이 완료되었습니다!",
  "checked_in_at": "2025-10-25T10:05:00Z"
}
```

#### POST /api/activities/verify-qr
QR코드 활동 인증 (데모 모드: 자동 성공)

**Headers**
- `Authorization`: Bearer {token}

**Request**
```json
{
  "demo_mode": true,
  "activity_id": "act_001"
}
```

**Response**
```json
{
  "success": true,
  "earned_points": 200,
  "participation": {
    "participation_id": "par_001",
    "activity_id": "act_001",
    "actual_hours": 2,
    "earned_points": 200,
    "status": "verified"
  }
}
```

### 6.3 포인트 API

#### GET /api/points/balance
포인트 잔액 조회

**Headers**
- `Authorization`: Bearer {token}

**Response**
```json
{
  "user_id": "demo_hong",
  "name": "홍길동",
  "total_points": 2500
}
```

#### GET /api/points/transactions
포인트 거래 내역 조회

**Headers**
- `Authorization`: Bearer {token}

**Query Parameters**
- `limit`: 조회 개수 (default: 20)
- `offset`: 시작 위치 (default: 0)
- `type`: 거래 유형 필터 (`earn`, `interest`, `spend`)

**Response**
```json
{
  "transactions": [
    {
      "transaction_id": "txn_001",
      "type": "earn",
      "amount": 200,
      "balance_after": 2500,
      "description": "매향리 갯벌 정화 활동 (2시간)",
      "created_at": "2025-10-25T12:10:00Z"
    },
    {
      "transaction_id": "txn_002",
      "type": "interest",
      "amount": 37.5,
      "balance_after": 2300,
      "description": "2025년 3분기 이자 (1.5%)",
      "created_at": "2025-10-01T00:00:00Z"
    }
  ],
  "total": 45
}
```

#### POST /api/points/generate-qr
결제용 QR코드 생성

**Headers**
- `Authorization`: Bearer {token}

**Request**
```json
{
  "amount": 500
}
```

**Response**
```json
{
  "success": true,
  "qr_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "qr_data": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "expires_at": "2025-10-25T12:13:00Z"
}
```

#### POST /api/points/spend
포인트 사용 (데모 모드: 자동 성공)

**Request**
```json
{
  "qr_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "partner_id": "ptn_001",
  "demo_mode": true
}
```

**Response**
```json
{
  "success": true,
  "transaction": {
    "transaction_id": "txn_new",
    "user_id": "demo_hong",
    "amount": -500,
    "balance_after": 2000,
    "partner_name": "에코카페"
  }
}
```

### 6.4 제휴처 API

#### GET /api/partners
제휴처 목록 조회

**Query Parameters**
- `category`: 카테고리 필터

**Response**
```json
{
  "partners": [
    {
      "partner_id": "ptn_001",
      "name": "에코카페",
      "category": "cafe",
      "address": "화성시 동탄1동 123",
      "latitude": 37.2010,
      "longitude": 127.0738,
      "phone": "031-1234-5678",
      "description": "친환경 제로웨이스트 카페",
      "image_url": "https://..."
    }
  ]
}
```

### 6.5 대시보드 API

#### GET /api/dashboard/stats
사용자 통계 조회

**Headers**
- `Authorization`: Bearer {token}

**Response**
```json
{
  "user": {
    "name": "홍길동",
    "total_activities": 15,
    "total_hours": 30,
    "total_earned_points": 3000,
    "total_spent_points": 500,
    "current_balance": 2500,
    "rank": 4
  },
  "environment": {
    "total_carbon_absorption": 125.5,
    "improvement_rate": 1.5,
    "last_measurement_date": "2025-10-01",
    "user_contribution_kg": 250
  },
  "monthly_activities": [
    {"month": "2025-08", "count": 3},
    {"month": "2025-09", "count": 7},
    {"month": "2025-10", "count": 5}
  ]
}
```

#### GET /api/dashboard/leaderboard
랭킹 조회

**Query Parameters**
- `period`: 기간 (`month`, `all`)
- `limit`: 조회 개수 (default: 10)

**Response**
```json
{
  "leaderboard": [
    {
      "rank": 1,
      "name": "박민지",
      "total_hours": 60,
      "total_points": 5000
    },
    {
      "rank": 2,
      "name": "최영수",
      "total_hours": 50,
      "total_points": 4200
    }
  ]
}
```

### 6.6 AI API (Claude Integration)

#### POST /api/ai/generate-report
개인화된 환경 기여 리포트 생성

**Headers**
- `Authorization`: Bearer {token}

**Response**
```json
{
  "report": {
    "summary": "홍길동님은 이번 달 15회의 활동에 참여하여 총 30시간 동안 갯벌 보전에 기여하셨습니다. 이는 약 250kg의 탄소를 흡수한 것과 같으며, 나무 🌳 5그루를 심은 효과입니다!",
    "highlights": [
      "매향리 갯벌에서 가장 많은 활동 (8회)",
      "지난달 대비 활동 시간 40% 증가",
      "이번 분기 이자 37.5 CP 획득"
    ],
    "recommendations": [
      {
        "activity_id": "act_005",
        "title": "화성습지 생태 모니터링",
        "reason": "홍길동님이 선호하시는 유형의 활동입니다."
      }
    ],
    "environmental_tip": "갯벌은 숲보다 10배 높은 탄소 흡수 능력을 가지고 있습니다. 홍길동님의 활동이 화성시 탄소중립 목표 달성에 큰 도움이 되고 있습니다!"
  }
}
```

---

## 7. UI/UX 요구사항

### 7.1 디자인 원칙
1. **모바일 우선**: 모든 화면은 모바일에 최적화
2. **직관적**: 복잡한 설명 없이 바로 사용 가능
3. **친환경 테마**: 녹색/청색 계열의 자연 친화적 컬러
4. **성취감 강조**: 포인트 적립, 활동 완료 시 애니메이션 효과
5. **심사위원 친화적**: 5분 내 모든 기능 체험 가능

### 7.2 주요 화면

#### 7.2.1 메인 페이지 (랜딩)
- **헤더**: 로고 + "갯벌 탄소예금" 타이틀
- **히어로 섹션**:
  - 헤드라인: "나의 환경 활동이 자산이 됩니다"
  - 서브 헤드라인: "화성시 갯벌 보전 활동에 참여하고 탄소 포인트를 적립하세요"
  - **CTA 버튼**: "데모 체험하기" (크고 눈에 띄게)
- **주요 기능 소개** (3단 카드):
  1. 활동 참여 → 포인트 적립
  2. 갯벌 건강도 개선 → 이자 획득
  3. 제휴처에서 사용
- **화성시 갯벌 소개**: 이미지 + 짧은 설명
- **푸터**: 경진대회 정보

#### 7.2.2 데모 계정 선택
- **제목**: "어떤 사용자로 체험하시겠습니까?"
- **4개 계정 카드**:
  - 프로필 아이콘, 이름, 포인트, 설명
  - 예: "홍길동 (2,500 CP) - 활발한 참여자"
- **버튼**: "이 계정으로 시작하기"
- **하단**: "심사위원 가이드 투어 시작하기" 체크박스

#### 7.2.3 홈 화면 (로그인 후)
- **상단**: 현재 보유 포인트 (큰 글씨, 애니메이션)
- **가이드 투어 배너** (첫 로그인 시): "주요 기능을 안내해드릴까요?"
- **중간**: 추천 활동 카드 슬라이더
- **하단**: 화성시 갯벌 건강도 위젯
  - 탄소 흡수량, 개선률, 시각화 그래프

#### 7.2.4 활동 목록
- **탭**: 지도 뷰 / 리스트 뷰
- **지도 뷰**: Naver Map + 활동 마커
- **리스트 뷰**: 활동 카드
  - 썸네일, 제목, 일시, 장소, 예상 포인트, 정원
- **필터**: 날짜, 거리순

#### 7.2.5 활동 상세
- **상단**: 큰 이미지
- **정보**: 일시, 장소, 소요 시간, 예상 포인트
- **지도**: Naver Map 임베드 (장소 표시)
- **버튼**: "참여 신청하기" (하단 고정)
- **이미 신청한 경우**: "출석 체크하기", "QR 인증하기" 버튼

#### 7.2.6 활동 참여 (데모 모드)
- **Step 1: 출석 체크**
  - 버튼: "출석 체크하기"
  - 클릭 시: 로딩 (1초) → 성공 애니메이션 🎉
  - "출석이 완료되었습니다!"

- **Step 2: QR 인증**
  - QR 스캔 UI (카메라 뷰 연출)
  - 샘플 QR코드 이미지 표시
  - 2초 후 자동 인증 성공
  - 축하 메시지 + 획득 포인트 강조 표시
  - "공유하기" 버튼

#### 7.2.7 포인트 내역
- **상단**: 총 보유 포인트 (크게)
- **탭**: 전체, 적립, 이자, 사용
- **리스트**: 거래 내역
  - 아이콘 (적립: 🌱, 이자: 📈, 사용: 💸)
  - 설명, 금액, 날짜
- **무한 스크롤**

#### 7.2.8 제휴처 목록
- **탭**: 지도 뷰 / 리스트 뷰
- **지도 뷰**: Naver Map + 제휴처 마커
- **리스트 뷰**: 제휴처 카드
  - 썸네일, 상호명, 카테고리, 주소, 거리
- **필터**: 카테고리 (카페, 식당, 샵, 공공)

#### 7.2.9 제휴처 상세
- **상단**: 이미지
- **정보**: 주소, 전화번호, 소개
- **지도**: Naver Map 임베드
- **버튼**: "결제하기", "길찾기"

#### 7.2.10 결제 QR코드 (데모 모드)
- **입력**: 사용할 포인트
- **QR코드**: 크게 표시
- **타이머**: 3분 카운트다운 (연출)
- **하단**: 잔액 표시
- **데모 모드**: "결제하기" 버튼 → 2초 후 성공

#### 7.2.11 대시보드
- **나의 통계**:
  - 총 활동 시간, 횟수, 누적 포인트
  - 월별 활동 그래프 (Recharts)
  - 환경 기여도: "나무 🌳 5그루 만큼의 탄소 흡수!"

- **화성시 갯벌 건강도**:
  - 탄소 흡수량, 개선률
  - 분기별 추이 그래프

- **배지**:
  - 획득한 배지 목록 (첫 활동 완료, 10회 참여 등)

- **랭킹**:
  - 월간 리더보드 (상위 10명)
  - 내 순위 강조

#### 7.2.12 AI 환경 기여 리포트
- **버튼**: "AI 리포트 생성하기"
- **로딩**: Claude AI 생성 중... (3-5초, 애니메이션)
- **리포트 표시**:
  - 마크다운 렌더링
  - 섹션: 요약, 주요 성과, 추천 활동, 환경 팁
- **하단**: "공유하기" 버튼 (SNS, 이미지 저장)

### 7.3 컬러 팔레트
- **Primary**: `#16a34a` (녹색 - 환경)
- **Secondary**: `#0284c7` (청색 - 갯벌/바다)
- **Accent**: `#f59e0b` (주황 - 포인트/이자)
- **Success**: `#22c55e`
- **Background**: `#f9fafb`
- **Text**: `#1f2937`

### 7.4 반응형 디자인
- **모바일**: 320px ~ 767px (우선 지원)
- **태블릿**: 768px ~ 1023px
- **데스크톱**: 1024px 이상 (대시보드, 관리자 페이지)

---

## 8. 데모 데이터 생성 계획

### 8.1 데이터 생성 스크립트
- **Python 스크립트**: `scripts/generate_demo_data.py`
- **실행 시점**: 배포 전 1회 실행
- **출력**: Google Sheets에 직접 입력

### 8.2 데이터 시나리오

#### 홍길동 계정 (demo_hong)
- **프로필**: 활발한 참여자
- **활동**: 15회 참여 (9월 3회, 10월 12회)
- **포인트**:
  - 적립: 3,000 CP (활동)
  - 이자: 37.5 CP (10월 1일)
  - 사용: 537.5 CP (제휴처)
  - 잔액: 2,500 CP
- **선호 활동**: 매향리 갯벌 정화
- **랭킹**: 4위

#### 이영희 계정 (demo_lee)
- **프로필**: 신규 사용자
- **활동**: 2회 참여 (10월 15일, 10월 20일)
- **포인트**:
  - 적립: 300 CP
  - 이자: 0 CP (가입 이후 분기 없음)
  - 사용: 0 CP
  - 잔액: 300 CP
- **랭킹**: 50위

#### 김철수 계정 (demo_kim)
- **프로필**: 포인트 사용자
- **활동**: 8회 참여 (8-10월)
- **포인트**:
  - 적립: 1,200 CP
  - 이자: 18 CP
  - 사용: 418 CP (자주 사용)
  - 잔액: 800 CP
- **선호 활동**: 다양한 활동
- **랭킹**: 15위

#### 박민지 계정 (demo_park)
- **프로필**: 랭킹 1위
- **활동**: 30회 참여 (7-10월)
- **포인트**:
  - 적립: 6,000 CP
  - 이자: 90 CP
  - 사용: 1,090 CP
  - 잔액: 5,000 CP
- **선호 활동**: 장시간 활동
- **랭킹**: 1위

### 8.3 샘플 활동 데이터
- **총 10개 활동** (과거 5개, 현재/미래 5개)
- **다양한 장소**: 매향리 갯벌, 화성습지, 전곡항, 궁평항
- **다양한 시간대**: 오전, 오후, 종일
- **다양한 포인트**: 100-400 CP

### 8.4 샘플 제휴처 데이터
- **총 10개 제휴처**
- **카테고리**: 카페 3, 식당 2, 샵 2, 공공시설 3
- **위치**: 화성시 전역 분산

---

## 9. 심사위원 가이드 투어 상세

### 9.1 투어 시작
- **트리거**: 데모 계정 선택 시 "가이드 투어 시작" 옵션 체크
- **환영 메시지**: "환영합니다! 갯벌 탄소예금의 핵심 기능을 5분 안에 안내해드리겠습니다."

### 9.2 투어 단계

#### Step 1: 대시보드 (1분)
- **하이라이트**: 보유 포인트, 활동 통계
- **설명**: "홍길동님은 현재 2,500 CP를 보유하고 있습니다. 15회의 활동으로 30시간 동안 갯벌 보전에 기여하셨습니다."
- **인터랙션**: 그래프 확대/축소
- **다음**: "활동 목록 보기" 버튼

#### Step 2: 활동 목록 (1분)
- **하이라이트**: 활동 카드, 네이버 지도
- **설명**: "화성시 갯벌 보전 활동을 지도에서 확인할 수 있습니다. 각 활동은 예상 포인트와 함께 표시됩니다."
- **인터랙션**: 지도 확대, 마커 클릭
- **다음**: "활동 상세 보기" 버튼

#### Step 3: 활동 참여 (1.5분)
- **하이라이트**: 출석 체크, QR 인증
- **설명**: "활동 현장에 도착하면 GPS로 출석 체크를 합니다. 활동 완료 후 QR코드를 스캔하면 포인트가 적립됩니다."
- **인터랙션**:
  - "출석 체크하기" 클릭 → 성공 애니메이션
  - "QR 인증하기" 클릭 → 2초 후 성공, 포인트 적립
- **다음**: "포인트 내역 보기" 버튼

#### Step 4: 포인트 내역 (30초)
- **하이라이트**: 거래 내역 리스트
- **설명**: "적립, 이자, 사용 내역을 한눈에 확인할 수 있습니다. 분기별로 갯벌 건강도에 따라 이자가 지급됩니다."
- **인터랙션**: 내역 스크롤
- **다음**: "제휴처 보기" 버튼

#### Step 5: 포인트 사용 (1분)
- **하이라이트**: 제휴처 지도, QR 결제
- **설명**: "누적된 포인트는 화성시 제휴처에서 현금처럼 사용할 수 있습니다."
- **인터랙션**:
  - 제휴처 지도 보기
  - "결제하기" 클릭 → QR코드 생성 → 2초 후 결제 성공
- **다음**: "AI 리포트 보기" 버튼

#### Step 6: AI 환경 기여 리포트 (1분)
- **하이라이트**: Claude AI 생성 리포트
- **설명**: "AI가 분석한 나의 환경 기여 리포트를 확인하세요. 개인화된 칭찬과 추천 활동을 받을 수 있습니다."
- **인터랙션**:
  - "AI 리포트 생성" 클릭 → 로딩 (3초) → 리포트 표시
  - 리포트 읽기
- **다음**: "투어 완료" 버튼

### 9.3 투어 완료
- **축하 메시지**: "모든 기능을 체험하셨습니다! 이제 자유롭게 둘러보세요."
- **옵션**: "투어 다시 보기", "자유 탐색 시작"

---

## 10. 배포 및 인프라

### 10.1 GitHub Repository
- **저장소명**: `tidal-flat-carbon-savings`
- **브랜치 전략**:
  - `main`: 프로덕션 (Vercel 자동 배포)
  - `develop`: 개발 (Vercel Preview)

### 10.2 Vercel 배포

#### 10.2.1 Next.js Frontend
- **프로젝트명**: tidal-flat-carbon-savings
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **환경변수**:
  ```
  NEXT_PUBLIC_API_URL=https://your-api.vercel.app
  NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=xxxxx
  NEXT_PUBLIC_DEMO_MODE=true
  ```

#### 10.2.2 Python FastAPI Backend
- **프로젝트명**: tidal-flat-carbon-api
- **Framework Preset**: Other
- **Root Directory**: `/backend`
- **환경변수**:
  ```
  GOOGLE_SHEETS_CREDENTIALS={"type":"service_account",...}
  GOOGLE_SHEET_ID=xxxxx
  JWT_SECRET_KEY=xxxxx
  CLAUDE_API_KEY=sk-ant-xxxxx
  DEMO_MODE=true
  ```

#### 10.2.3 Vercel Cron Jobs (vercel.json)
```json
{
  "crons": [
    {
      "path": "/api/cron/calculate-interest",
      "schedule": "0 0 1 */3 *"
    }
  ]
}
```

### 10.3 도메인
- **추천**: 화성시 도메인 연동 (수상 후)
- **경진대회용**: Vercel 기본 도메인 사용

---

## 11. 개발 로드맵

### Phase 1: 경진대회 프로토타입 (4주)

#### Week 1: 프로젝트 셋업 및 데이터 준비
- [x] GitHub 저장소 생성
- [x] Next.js 프로젝트 초기화
- [x] Python FastAPI 프로젝트 초기화
- [x] Google Sheets 데이터베이스 구조 생성
- [x] 데모 데이터 생성 스크립트 작성 및 실행
- [ ] Vercel 프로젝트 연동

#### Week 2: 핵심 기능 개발
- [x] 데모 계정 원클릭 로그인
- [x] 활동 목록 조회 (Google Sheets 연동)
- [x] 네이버 지도 연동 (활동 위치 표시)
- [x] 대시보드 (통계 및 시각화)

#### Week 3: 활동 참여 및 포인트 시스템
- [x] GPS 출석 체크 (데모 모드)
- [x] QR코드 인증 (데모 모드)
- [x] 포인트 자동 적립 로직
- [x] 포인트 잔액 및 거래 내역 조회
- [x] 제휴처 목록 및 지도 표시
- [x] QR 결제 (데모 모드)

#### Week 4: AI 기능 및 심사위원 투어
- [x] Claude API 연동
- [x] AI 환경 기여 리포트 생성
- [ ] 심사위원 가이드 투어 구현
- [ ] UI/UX 최종 디자인
- [ ] 테스트 및 버그 수정
- [ ] **경진대회 제출**

### Phase 2: 정식 런칭 준비 (수상 후 8주)

#### Week 5-6: 실제 인증 시스템
- [ ] 휴대폰 SMS 인증 (회원가입)
- [ ] 실제 GPS 기반 출석 체크
- [ ] 실제 QR코드 스캔 및 검증

#### Week 7-8: 이자 시스템 및 관리자 기능
- [ ] 갯벌 환경 데이터 연동
- [ ] 이자 계산 알고리즘
- [ ] 분기별 이자 자동 지급 (Cron Jobs)
- [ ] 관리자: 활동 등록 및 QR코드 생성

#### Week 9-10: 제휴처 시스템
- [ ] 제휴처 결제 페이지
- [ ] 실제 포인트 차감 로직
- [ ] 정산 시스템

#### Week 11-12: 최적화 및 런칭
- [ ] 성능 최적화
- [ ] SEO 최적화
- [ ] 사용자 테스트
- [ ] 공식 런칭

---

## 12. 프로젝트 디렉토리 구조

```
tidal-flat-carbon-savings/
├── frontend/                    # Next.js Frontend
│   ├── src/
│   │   ├── app/                 # App Router
│   │   │   ├── page.tsx         # 랜딩 페이지
│   │   │   ├── demo/            # 데모 계정 선택
│   │   │   ├── home/            # 로그인 후 홈
│   │   │   ├── activities/      # 활동 목록 및 상세
│   │   │   ├── points/          # 포인트 관리
│   │   │   ├── partners/        # 제휴처 목록
│   │   │   ├── dashboard/       # 대시보드
│   │   │   ├── ai-report/       # AI 리포트
│   │   │   └── layout.tsx
│   │   ├── components/          # Shared Components
│   │   │   ├── ui/              # shadcn/ui components
│   │   │   ├── tour/            # 가이드 투어 컴포넌트
│   │   │   ├── activity-card.tsx
│   │   │   ├── qr-scanner.tsx   # (데모 모드)
│   │   │   ├── naver-map.tsx    # 네이버 지도
│   │   │   └── ...
│   │   ├── lib/                 # Utilities
│   │   │   ├── api.ts           # API client
│   │   │   ├── auth.ts          # Auth helpers (데모)
│   │   │   └── utils.ts
│   │   └── types/               # TypeScript types
│   ├── public/
│   │   ├── images/              # 갯벌 이미지
│   │   └── animations/          # Lottie 애니메이션
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                     # Python FastAPI Backend
│   ├── api/
│   │   ├── __init__.py
│   │   ├── auth.py              # 데모 로그인 API
│   │   ├── activities.py        # 활동 API
│   │   ├── points.py            # 포인트 API
│   │   ├── partners.py          # 제휴처 API
│   │   ├── dashboard.py         # 대시보드 API
│   │   └── ai.py                # Claude API 연동
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py            # 환경변수 설정
│   │   ├── database.py          # Google Sheets 연동
│   │   ├── security.py          # JWT
│   │   └── claude.py            # Claude API 클라이언트
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py              # Pydantic 모델
│   │   ├── activity.py
│   │   └── ...
│   ├── services/
│   │   ├── __init__.py
│   │   ├── qr_service.py        # QR코드 생성
│   │   ├── points_service.py    # 포인트 계산
│   │   └── interest_service.py  # 이자 계산
│   ├── scripts/
│   │   ├── generate_demo_data.py # 데모 데이터 생성
│   │   └── calculate_interest.py # Cron job
│   ├── requirements.txt
│   └── main.py
│
├── docs/                        # 문서
│   ├── proposal.md              # 제안서
│   ├── prd.md                   # PRD (이 문서)
│   └── demo-guide.md            # 심사위원 가이드
│
├── data/                        # 데이터 파일
│   ├── google-sheets-template.xlsx
│   └── demo-data.json           # 데모 데이터 소스
│
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions
│
├── .env.example
├── .gitignore
├── vercel.json                  # Vercel 설정
└── README.md
```

---

## 13. 리스크 및 대응 방안

### 13.1 경진대회 리스크

| 리스크 | 영향 | 확률 | 대응 방안 |
|--------|------|------|-----------|
| 데모 시연 중 기술 오류 | 높음 | 낮음 | 충분한 테스트, 데모 모드 안정화 |
| 네트워크 연결 불안정 | 중간 | 중간 | 오프라인 폴백 데이터, 로컬 캐싱 |
| 심사위원이 투어 건너뛰기 | 중간 | 높음 | 직관적 UI 설계, 안내 배너 |
| 데모 데이터 부족 | 낮음 | 낮음 | 풍부한 샘플 데이터 사전 생성 |

### 13.2 기술적 리스크

| 리스크 | 영향 | 확률 | 대응 방안 |
|--------|------|------|-----------|
| Google Sheets API 제한 | 중간 | 낮음 | 캐싱 전략, 데모용 소량 데이터 |
| Claude API 비용 | 낮음 | 낮음 | 사용량 제한, 캐싱 |
| Naver Maps API 오류 | 중간 | 낮음 | 에러 핸들링, 폴백 UI |

---

## 14. 심사위원용 README

### 14.1 빠른 시작 가이드
1. **URL 접속**: https://tidal-flat-carbon-savings.vercel.app
2. **"데모 체험하기" 버튼 클릭**
3. **계정 선택**: 홍길동 (추천: 풍부한 데이터)
4. **"심사위원 가이드 투어 시작하기" 체크**
5. **5분 투어 완료 후 자유 탐색**

### 14.2 주요 체험 포인트
1. ✅ **원클릭 로그인**: 회원가입 없이 즉시 체험
2. ✅ **네이버 지도 연동**: 실제 화성시 갯벌 위치 표시
3. ✅ **GPS & QR 시뮬레이션**: 현장 인증 프로세스 체험
4. ✅ **포인트 적립/사용**: 실시간 거래 내역 확인
5. ✅ **AI 리포트**: Claude가 생성한 개인화 리포트
6. ✅ **대시보드**: 시각화된 환경 기여도

### 14.3 문의 및 피드백
- **이메일**: heisenbug0306@gmail.com
- **GitHub**: [저장소 링크]

---

## 15. 결론

'갯벌 탄소예금'은 **2025년 화성에서 ON 탄소중립 아이디어 경진대회**를 위해 설계된 혁신적인 플랫폼입니다. 심사위원들이 번거로운 회원가입 없이 원클릭으로 모든 기능을 체험할 수 있도록 데모 계정과 가이드 투어를 제공합니다.

### 핵심 경쟁력
1. ✅ **즉시 체험 가능**: 원클릭 로그인 + 5분 가이드 투어
2. ✅ **실제 동작하는 프로토타입**: 모든 기능 시연 가능
3. ✅ **AI 차별화**: Claude API 기반 개인화 리포트
4. ✅ **지역 특화**: 화성시 실제 갯벌 위치 (네이버 지도)
5. ✅ **혁신적 모델**: 환경보호 + 금융 융합

본 PRD는 경진대회 제출을 최우선 목표로 하며, 수상 후 실제 서비스 런칭을 위한 로드맵도 포함하고 있습니다. 화성시의 탄소중립 목표 달성과 지역 경제 활성화에 실질적으로 기여하는 지속가능한 플랫폼을 구축합니다.

---

## 문서 버전 히스토리

| 버전 | 날짜 | 작성자 | 변경 내용 |
|------|------|--------|-----------|
| 1.0 | 2025-10-22 | heisenbug0306@gmail.com | 초안 작성 |
| 2.0 | 2025-10-22 | heisenbug0306@gmail.com | 경진대회 최적화: 데모 계정, 가이드 투어, 네이버 맵스만 사용 |

---

## 참고 문서
- [제안서 (proposal.md)](./proposal.md)
- [심사위원 가이드](./demo-guide.md) (작성 예정)
- [배포 가이드](./deployment.md) (작성 예정)
