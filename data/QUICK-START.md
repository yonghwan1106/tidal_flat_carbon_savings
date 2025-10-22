# 🚀 Google Sheets 설정 - 빠른 시작 가이드

## ⚠️ 먼저 꼭 하세요!

**보안 경고**: 절대로 계정 비밀번호를 공유하지 마세요!
- 즉시 비밀번호 변경: https://myaccount.google.com/security

---

## 📋 전체 프로세스 (30분 소요)

### ✅ Step 1: Google Sheets 만들기 (5분)
📖 가이드: `STEP1-sheets-creation.md`

1. https://sheets.google.com/ 접속
2. 빈 스프레드시트 생성
3. 이름: `갯벌탄소예금_데이터베이스`
4. 시트 6개 만들기: users, activities, participations, transactions, partners, environment_data
5. **Sheet ID 복사** (URL에서)

---

### ✅ Step 2: 헤더 추가 (5분)
📖 가이드: `STEP2-add-headers.md`

각 시트의 첫 번째 행에 헤더 추가 (복사 붙여넣기 사용)

---

### ✅ Step 3: Service Account 만들기 (10분)
📖 가이드: `STEP3-service-account.md`

1. https://console.cloud.google.com/ 접속
2. 프로젝트 생성: `tidal-flat-carbon-savings`
3. Google Sheets API 활성화
4. Service Account 생성: `sheets-api-service`
5. **JSON 키 다운로드**
6. **Service Account 이메일 복사**

---

### ✅ Step 4: 공유 및 환경 변수 (10분)
📖 가이드: `STEP4-share-and-env.md`

1. Google Sheets에 Service Account 공유 (편집자 권한)
2. JSON 키를 한 줄로 변환
3. `backend/.env` 파일 수정:
   ```
   GOOGLE_SHEETS_CREDENTIALS={"type":"service_account",...}
   GOOGLE_SHEET_ID=1a2b3c4d5e6f...
   ```

---

## 🧪 테스트

### 1. Python 패키지 설치

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### 2. 연결 테스트

```bash
python test_sheets.py
```

**성공 시 출력**:
```
🎉 Google Sheets 연결 테스트 성공!
```

---

## 🆘 문제 해결

### 오류: "The caller does not have permission"
→ Google Sheets를 Service Account와 공유하지 않았습니다.
→ **해결**: Step 4의 1번 (공유) 다시 확인

### 오류: "API has not been used"
→ Google Sheets API를 활성화하지 않았습니다.
→ **해결**: Step 3의 3번 (API 활성화) 다시 확인

### 오류: "JSON 파싱 오류"
→ JSON 형식이 잘못되었습니다.
→ **해결**: 줄바꿈 없이 한 줄로 입력, 따옴표 없이 그대로 붙여넣기

---

## 📞 도움이 필요하면

각 단계를 완료할 때마다 저에게 알려주세요:
- "Step 1 완료"
- "Step 2 완료"
- "Step 3 완료"
- "Step 4 완료"

막히는 부분이 있으면 스크린샷과 함께 질문해주세요!

---

## ✨ 완료 후 다음 단계

Google Sheets 설정이 완료되면:
1. ✅ 데모 데이터 생성 스크립트 실행
2. ✅ Week 2 개발 시작!
