# Google Sheets 데이터베이스 설정 가이드

## 1. Google Sheets 생성

1. [Google Sheets](https://sheets.google.com/) 접속
2. **새 스프레드시트 만들기**
3. 이름: `갯벌탄소예금_데이터베이스`

---

## 2. 시트 구조 생성

아래 6개 시트를 생성하고 각 시트에 헤더를 추가하세요.

### Sheet 1: users
| user_id | name | address | created_at | total_points | profile_type |
|---------|------|---------|------------|--------------|--------------|
| demo_hong | 홍길동 | 화성시 동탄1동 | 2025-09-01 10:00:00 | 2500 | active |
| demo_lee | 이영희 | 화성시 봉담읍 | 2025-10-15 10:00:00 | 300 | new |
| demo_kim | 김철수 | 화성시 동탄2동 | 2025-08-01 10:00:00 | 800 | spender |
| demo_park | 박민지 | 화성시 매송면 | 2025-07-01 10:00:00 | 5000 | top |

### Sheet 2: activities
| activity_id | title | description | date | start_time | duration_hours | location_name | latitude | longitude | max_participants | points_per_hour | image_url | status |
|-------------|-------|-------------|------|------------|----------------|---------------|----------|-----------|------------------|-----------------|-----------|--------|
| act_001 | 매향리 갯벌 정화 | 쓰레기 수거 및 분류 | 2025-10-25 | 10:00 | 2 | 매향리 갯벌 | 37.2036 | 126.8290 | 30 | 100 | | open |
| act_002 | 화성습지 생태 모니터링 | 생물 다양성 조사 | 2025-10-26 | 14:00 | 2 | 화성습지 | 37.2158 | 126.7625 | 20 | 100 | | open |
| act_003 | 갯끈풀 제거 봉사 | 외래종 제거 | 2025-10-27 | 09:00 | 3 | 전곡항 갯벌 | 37.0681 | 126.6411 | 25 | 100 | | open |

### Sheet 3: participations
| participation_id | user_id | activity_id | applied_at | checked_in_at | verified_at | actual_hours | earned_points | status |
|------------------|---------|-------------|------------|---------------|-------------|--------------|---------------|--------|
| par_001 | demo_hong | act_001 | 2025-10-20 14:30:00 | 2025-10-25 10:05:00 | 2025-10-25 12:05:00 | 2 | 200 | verified |

### Sheet 4: transactions
| transaction_id | user_id | type | amount | balance_after | reference_id | description | created_at |
|----------------|---------|------|--------|---------------|--------------|-------------|------------|
| txn_001 | demo_hong | earn | 200 | 2500 | par_001 | 매향리 갯벌 정화 활동 (2시간) | 2025-10-25 12:10:00 |
| txn_002 | demo_hong | interest | 37.5 | 2300 | | 2025년 3분기 이자 (1.5%) | 2025-10-01 00:00:00 |

### Sheet 5: partners
| partner_id | name | category | address | latitude | longitude | phone | description | image_url | status |
|------------|------|----------|---------|----------|-----------|-------|-------------|-----------|--------|
| ptn_001 | 에코카페 | cafe | 화성시 동탄1동 123 | 37.2010 | 127.0738 | 031-1234-5678 | 친환경 제로웨이스트 카페 | | active |
| ptn_002 | 화성로컬푸드 직매장 | restaurant | 화성시 봉담읍 456 | 37.2158 | 126.9543 | 031-2345-6789 | 화성시 로컬푸드 | | active |

### Sheet 6: environment_data
| data_id | measurement_date | location | carbon_absorption_rate | vegetation_area | biodiversity_index | improvement_rate | notes |
|---------|------------------|----------|------------------------|-----------------|-------------------|------------------|-------|
| env_001 | 2025-10-01 | 매향리 갯벌 | 125.5 | 50000 | 0.75 | 1.5 | 전분기 대비 1.5% 개선 |

---

## 3. Google Cloud Console 설정

### 3.1 Service Account 생성

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 새 프로젝트 생성: `tidal-flat-carbon-savings`
3. **IAM 및 관리자 > 서비스 계정** 이동
4. **서비스 계정 만들기**
   - 이름: `sheets-api-service`
   - 역할: **편집자**
5. **키 추가 > 새 키 만들기 > JSON**
6. JSON 파일 다운로드

### 3.2 Google Sheets API 활성화

1. **API 및 서비스 > 라이브러리**
2. 검색: `Google Sheets API`
3. **사용 설정** 클릭

### 3.3 Sheets 공유

1. 생성한 Google Sheets 열기
2. **공유** 버튼 클릭
3. Service Account 이메일 추가 (JSON 파일의 `client_email`)
4. 권한: **편집자**

---

## 4. 환경 변수 설정

### 4.1 GOOGLE_SHEETS_CREDENTIALS 설정

1. 다운로드한 JSON 파일 열기
2. 내용 전체를 한 줄로 복사
3. `backend/.env` 파일 열기
4. `GOOGLE_SHEETS_CREDENTIALS=` 뒤에 붙여넣기

### 4.2 GOOGLE_SHEET_ID 설정

1. Google Sheets URL 확인
   ```
   https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
   ```
2. `[SHEET_ID]` 부분 복사
3. `backend/.env` 파일에 입력

---

## 5. 연결 테스트

```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
python -c "import gspread; print('gspread installed successfully')"
```

---

## 완료!

Google Sheets 데이터베이스 설정이 완료되었습니다! 🎉

다음 단계: 데모 데이터 생성 스크립트 실행
