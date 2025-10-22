# Step 4: Sheets 공유 및 환경 변수 설정

## 1. Google Sheets에 Service Account 공유

1. 아까 만든 Google Sheets 열기
   - https://sheets.google.com/
   - `갯벌탄소예금_데이터베이스` 클릭

2. 우측 상단의 **공유** 버튼 클릭

3. **사용자 및 그룹 추가** 입력란에:
   - Step 3에서 복사한 **Service Account 이메일** 붙여넣기
   - 예: `sheets-api-service@tidal-flat-carbon-savings.iam.gserviceaccount.com`

4. 권한을 **편집자**로 선택

5. **알림 보내지 않음** 체크 (서비스 계정은 이메일을 받을 수 없음)

6. **완료** 또는 **전송** 클릭

✅ 이제 Python에서 Google Sheets에 접근할 수 있습니다!

---

## 2. 환경 변수 설정 (.env)

### 2-1. JSON 키를 한 줄로 변환

다운로드한 JSON 파일을 메모장으로 열고:
- 모든 줄바꿈을 제거하여 **한 줄**로 만들기
- 또는 아래 명령어 사용:

**Windows (PowerShell)**:
```powershell
(Get-Content "다운로드한파일.json" -Raw) | Set-Clipboard
```

**결과 예시** (한 줄):
```
{"type":"service_account","project_id":"tidal-flat-carbon-savings","private_key_id":"abc123...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"sheets-api-service@...","client_id":"123456..."}
```

### 2-2. backend/.env 파일 수정

`C:\Users\user\tidal_flat_carbon_savings\backend\.env` 파일을 열어서:

```bash
# Google Sheets Database
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account",...전체JSON내용...}
GOOGLE_SHEET_ID=1a2b3c4d5e6f...  # Step 1에서 복사한 Sheet ID
```

**주의사항**:
- JSON 전체를 **작은따옴표나 큰따옴표 없이** 그대로 붙여넣기
- 줄바꿈 없이 한 줄로!

---

## 3. 설정 확인 (Python 테스트)

### 3-1. Python 패키지 설치

```bash
cd C:\Users\user\tidal_flat_carbon_savings\backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### 3-2. 연결 테스트 스크립트 실행

저장 위치: `backend/test_sheets.py`

```python
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import json
import os
from dotenv import load_dotenv

load_dotenv()

# 환경 변수 로드
credentials_json = os.getenv('GOOGLE_SHEETS_CREDENTIALS')
sheet_id = os.getenv('GOOGLE_SHEET_ID')

print("🔍 환경 변수 확인...")
print(f"Sheet ID: {sheet_id[:20]}..." if sheet_id else "Sheet ID: ❌ 없음")
print(f"Credentials: {'✅ 있음' if credentials_json else '❌ 없음'}")

if not credentials_json or not sheet_id:
    print("\n❌ 환경 변수가 설정되지 않았습니다!")
    exit(1)

try:
    # JSON 파싱
    creds_dict = json.loads(credentials_json)

    # Google Sheets 인증
    scope = ['https://spreadsheets.google.com/feeds',
             'https://www.googleapis.com/auth/drive']
    creds = ServiceAccountCredentials.from_json_keyfile_dict(creds_dict, scope)
    client = gspread.authorize(creds)

    # Sheets 열기
    sheet = client.open_by_key(sheet_id)

    print(f"\n✅ 연결 성공!")
    print(f"📋 Sheet 이름: {sheet.title}")
    print(f"📄 워크시트 목록:")
    for ws in sheet.worksheets():
        print(f"  - {ws.title}")

    # users 시트에서 헤더 읽기 테스트
    users_sheet = sheet.worksheet('users')
    headers = users_sheet.row_values(1)
    print(f"\n✅ users 시트 헤더: {headers}")

except Exception as e:
    print(f"\n❌ 오류 발생: {e}")
```

### 3-3. 테스트 실행

```bash
python test_sheets.py
```

**성공 시 출력**:
```
✅ 연결 성공!
📋 Sheet 이름: 갯벌탄소예금_데이터베이스
📄 워크시트 목록:
  - users
  - activities
  - participations
  - transactions
  - partners
  - environment_data
✅ users 시트 헤더: ['user_id', 'name', 'address', ...]
```

---

**완료되면 제게 "Step 4 완료"라고 알려주세요!**
Google Sheets 설정이 모두 끝납니다! 🎉
