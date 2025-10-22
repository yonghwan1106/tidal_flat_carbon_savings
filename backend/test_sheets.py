"""
Google Sheets 연결 테스트 스크립트
"""
import sys
import io

# Windows 인코딩 문제 해결
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

import gspread
from oauth2client.service_account import ServiceAccountCredentials
import json
import os
from dotenv import load_dotenv

# .env 파일 로드
load_dotenv()

def test_google_sheets_connection():
    print("=" * 60)
    print("🧪 Google Sheets 연결 테스트")
    print("=" * 60)

    # 환경 변수 확인
    credentials_json = os.getenv('GOOGLE_SHEETS_CREDENTIALS')
    sheet_id = os.getenv('GOOGLE_SHEET_ID')

    print("\n🔍 Step 1: 환경 변수 확인")
    print(f"  Sheet ID: {sheet_id[:20]}..." if sheet_id else "  Sheet ID: ❌ 없음")
    print(f"  Credentials: {'✅ 있음' if credentials_json else '❌ 없음'}")

    if not credentials_json or not sheet_id:
        print("\n❌ 오류: 환경 변수가 설정되지 않았습니다!")
        print("\n해결 방법:")
        print("  1. backend/.env 파일을 확인하세요")
        print("  2. GOOGLE_SHEETS_CREDENTIALS와 GOOGLE_SHEET_ID가 입력되었는지 확인하세요")
        return False

    try:
        print("\n🔍 Step 2: JSON 파싱")
        creds_dict = json.loads(credentials_json)
        print(f"  Project ID: {creds_dict.get('project_id', 'N/A')}")
        print(f"  Client Email: {creds_dict.get('client_email', 'N/A')}")

        print("\n🔍 Step 3: Google Sheets 인증")
        scope = [
            'https://spreadsheets.google.com/feeds',
            'https://www.googleapis.com/auth/drive'
        ]
        creds = ServiceAccountCredentials.from_json_keyfile_dict(creds_dict, scope)
        client = gspread.authorize(creds)
        print("  ✅ 인증 성공")

        print("\n🔍 Step 4: Spreadsheet 열기")
        sheet = client.open_by_key(sheet_id)
        print(f"  ✅ Sheet 이름: {sheet.title}")

        print("\n📄 워크시트 목록:")
        worksheets = sheet.worksheets()
        for ws in worksheets:
            print(f"  - {ws.title}")

        # users 시트 헤더 확인
        print("\n🔍 Step 5: users 시트 헤더 확인")
        try:
            users_sheet = sheet.worksheet('users')
            headers = users_sheet.row_values(1)
            if headers:
                print(f"  ✅ 헤더: {headers}")
            else:
                print("  ⚠️ 헤더가 비어있습니다. Step 2를 완료하세요!")
        except gspread.exceptions.WorksheetNotFound:
            print("  ❌ 'users' 시트를 찾을 수 없습니다.")
            print("  해결 방법: Google Sheets에서 'users' 시트를 만드세요!")

        print("\n" + "=" * 60)
        print("🎉 Google Sheets 연결 테스트 성공!")
        print("=" * 60)
        return True

    except json.JSONDecodeError as e:
        print(f"\n❌ JSON 파싱 오류: {e}")
        print("\n해결 방법:")
        print("  1. GOOGLE_SHEETS_CREDENTIALS가 올바른 JSON 형식인지 확인하세요")
        print("  2. 줄바꿈 없이 한 줄로 입력되었는지 확인하세요")
        return False

    except Exception as e:
        print(f"\n❌ 오류 발생: {type(e).__name__}")
        print(f"  메시지: {e}")

        if "PERMISSION_DENIED" in str(e) or "The caller does not have permission" in str(e):
            print("\n해결 방법:")
            print("  1. Google Sheets를 Service Account와 공유했는지 확인하세요")
            print("  2. Service Account 이메일을 '편집자' 권한으로 추가하세요")
        elif "API has not been used" in str(e):
            print("\n해결 방법:")
            print("  1. Google Cloud Console에서 Google Sheets API를 활성화하세요")
            print("  2. https://console.cloud.google.com/apis/library")

        return False

if __name__ == "__main__":
    test_google_sheets_connection()
