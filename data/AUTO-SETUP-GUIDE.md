# 🚀 자동 설정 가이드 (5분 완료!)

## ✅ 현재 상태
- [x] Google Sheets 생성 완료
- [x] users 시트 데이터 입력 완료
- [ ] Service Account 설정 (필요)
- [ ] 나머지 5개 시트 자동 생성 (이 가이드로 해결!)

---

## 📋 필요한 3단계

### Step 1: Service Account 만들기 (5분)

1. https://console.cloud.google.com/ 접속
2. **새 프로젝트 만들기**
   - 프로젝트 이름: `tidal-flat-carbon-savings`
   - 만들기 클릭

3. **Google Sheets API 활성화**
   - 왼쪽 메뉴 ≡ → **API 및 서비스** → **라이브러리**
   - 검색: `Google Sheets API`
   - **사용 설정** 클릭

4. **Service Account 만들기**
   - 왼쪽 메뉴 ≡ → **IAM 및 관리자** → **서비스 계정**
   - **+ 서비스 계정 만들기**
   - 이름: `sheets-api-service`
   - **만들기 및 계속하기** (역할 부여는 건너뛰기)
   - **완료**

5. **JSON 키 다운로드**
   - 방금 만든 서비스 계정 클릭
   - **키** 탭 → **키 추가** → **새 키 만들기**
   - **JSON** 선택 → **만들기**
   - JSON 파일 자동 다운로드 ✅

6. **Service Account 이메일 복사**
   - JSON 파일 열기
   - `client_email` 값 복사
   - 예: `sheets-api-service@...iam.gserviceaccount.com`

---

### Step 2: Google Sheets 공유

1. 만들어둔 **Google Sheets** 열기
2. 우측 상단 **공유** 버튼 클릭
3. Service Account 이메일 붙여넣기
4. 권한: **편집자** 선택
5. **알림 보내지 않음** 체크
6. **완료** 클릭

---

### Step 3: 환경 변수 설정

#### 3-1. Sheet ID 복사

Google Sheets URL에서:
```
https://docs.google.com/spreadsheets/d/[이부분]/edit
```

예: `1a2b3c4d5e6f...`

#### 3-2. JSON을 한 줄로 변환

**방법 1: PowerShell 사용 (추천)**
```powershell
# 다운로드한 JSON 파일 경로를 입력하세요
$json = Get-Content "C:\Users\user\Downloads\tidal-flat-carbon-savings-xxx.json" -Raw
$json = $json -replace '\s+', ' '
$json | Set-Clipboard
Write-Host "✅ 클립보드에 복사되었습니다!"
```

**방법 2: 수동**
- JSON 파일을 메모장으로 열기
- 모든 줄바꿈 제거하여 한 줄로 만들기

#### 3-3. .env 파일 수정

`C:\Users\user\tidal_flat_carbon_savings\backend\.env` 파일 열기:

```bash
# Google Sheets Database
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"...전체JSON..."}
GOOGLE_SHEET_ID=1a2b3c4d5e6f...
```

**주의**: 따옴표 없이 그대로 붙여넣기!

---

## 🎯 자동 설정 스크립트 실행

이제 Python 스크립트로 나머지 모든 것을 자동화합니다!

### 1. Python 패키지 설치

```bash
cd C:\Users\user\tidal_flat_carbon_savings\backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### 2. 스크립트 실행

```bash
python scripts/setup_sheets.py
```

### 3. 완료! 🎉

**자동으로 처리되는 것**:
- ✅ activities 시트 생성 + 5개 활동 데이터
- ✅ participations 시트 생성 + 55개 참여 기록
- ✅ transactions 시트 생성 + 67개 거래 내역
- ✅ partners 시트 생성 + 10개 제휴처
- ✅ environment_data 시트 생성 + 5개 환경 데이터

**예상 출력**:
```
🚀 Google Sheets 자동 설정 스크립트
✅ 연결 성공: 갯벌탄소예금_데이터베이스

📋 activities 시트 설정 중...
  ✨ 'activities' 시트를 생성했습니다.
  ✅ 5개 활동 데이터 입력 완료

📋 participations 시트 설정 중...
  ✨ 'participations' 시트를 생성했습니다.
  ✅ 55개 참여 기록 입력 완료

...

🎉 모든 시트 설정 완료!
```

---

## 🔍 확인

Google Sheets에서 확인:
- 총 6개 시트 (users + 5개 자동 생성)
- 각 시트에 헤더 + 데모 데이터

---

## 🆘 문제 해결

### "The caller does not have permission"
→ Google Sheets를 Service Account와 공유하지 않았습니다.
→ **해결**: Step 2 다시 확인

### "API has not been used"
→ Google Sheets API를 활성화하지 않았습니다.
→ **해결**: Step 1의 3번 다시 확인

### "JSON 파싱 오류"
→ JSON 형식이 잘못되었습니다.
→ **해결**: 줄바꿈 없이 한 줄로, 따옴표 없이 붙여넣기

---

## ✨ 완료 후

모든 설정이 끝나면:
1. `python test_sheets.py` 실행하여 연결 확인
2. Week 2 개발 시작! 🚀
