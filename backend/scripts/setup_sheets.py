"""
Google Sheets 자동 설정 스크립트
- 나머지 시트 5개 생성
- 헤더 및 데모 데이터 일괄 입력
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
from datetime import datetime, timedelta

# .env 파일 로드
load_dotenv()

def get_sheets_client():
    """Google Sheets 클라이언트 가져오기"""
    credentials_json = os.getenv('GOOGLE_SHEETS_CREDENTIALS')
    sheet_id = os.getenv('GOOGLE_SHEET_ID')

    if not credentials_json or not sheet_id:
        print("❌ 오류: .env 파일에 GOOGLE_SHEETS_CREDENTIALS와 GOOGLE_SHEET_ID를 설정하세요!")
        return None, None

    try:
        creds_dict = json.loads(credentials_json)
        scope = [
            'https://spreadsheets.google.com/feeds',
            'https://www.googleapis.com/auth/drive'
        ]
        creds = ServiceAccountCredentials.from_json_keyfile_dict(creds_dict, scope)
        client = gspread.authorize(creds)
        sheet = client.open_by_key(sheet_id)
        return client, sheet
    except Exception as e:
        print(f"❌ 오류: {e}")
        return None, None

def create_worksheet_if_not_exists(sheet, title, rows=1000, cols=20):
    """워크시트가 없으면 생성"""
    try:
        ws = sheet.worksheet(title)
        print(f"  ✅ '{title}' 시트가 이미 존재합니다.")
        return ws
    except gspread.exceptions.WorksheetNotFound:
        ws = sheet.add_worksheet(title=title, rows=rows, cols=cols)
        print(f"  ✨ '{title}' 시트를 생성했습니다.")
        return ws

def setup_activities_sheet(sheet):
    """activities 시트 설정"""
    print("\n📋 activities 시트 설정 중...")
    ws = create_worksheet_if_not_exists(sheet, 'activities')

    # 헤더
    headers = [
        'activity_id', 'title', 'description', 'date', 'start_time',
        'duration_hours', 'location_name', 'latitude', 'longitude',
        'max_participants', 'points_per_hour', 'image_url', 'status'
    ]

    # 샘플 데이터
    data = [
        ['act_001', '매향리 갯벌 정화', '쓰레기 수거 및 분류', '2025-10-25', '10:00', 2, '매향리 갯벌', 37.0447219, 126.7508202, 30, 100, '', 'open'],
        ['act_002', '화성습지 생태 모니터링', '생물 다양성 조사', '2025-10-26', '14:00', 2, '화성습지', 37.2611471, 126.8489036, 20, 100, '', 'open'],
        ['act_003', '갯끈풀 제거 봉사', '외래종 제거 활동', '2025-10-27', '09:00', 3, '전곡항 갯벌', 37.1869636, 126.6522902, 25, 100, '', 'open'],
        ['act_004', '염생식물 군락 조성', '갯벌 복원 활동', '2025-10-28', '13:00', 4, '궁평항 갯벌', 37.1155292, 126.6773447, 15, 100, '', 'open'],
        ['act_005', '갯벌 생태 교육', '시민 대상 갯벌 교육', '2025-10-29', '10:00', 2, '매향리 갯벌', 37.0447219, 126.7508202, 40, 100, '', 'open'],
    ]

    # 헤더 + 데이터 입력
    ws.clear()
    ws.update('A1', [headers] + data)
    print(f"  ✅ {len(data)}개 활동 데이터 입력 완료")

def setup_participations_sheet(sheet):
    """participations 시트 설정"""
    print("\n📋 participations 시트 설정 중...")
    ws = create_worksheet_if_not_exists(sheet, 'participations')

    headers = [
        'participation_id', 'user_id', 'activity_id', 'applied_at',
        'checked_in_at', 'verified_at', 'actual_hours', 'earned_points', 'status'
    ]

    # 홍길동 참여 기록 (15회)
    data = []
    for i in range(1, 16):
        part_id = f'par_{str(i).zfill(3)}'
        act_id = f'act_{str((i % 5) + 1).zfill(3)}'
        applied_date = (datetime(2025, 9, 1) + timedelta(days=i*2)).strftime('%Y-%m-%d %H:%M:%S')
        checkin_date = (datetime(2025, 9, 1) + timedelta(days=i*2, hours=10)).strftime('%Y-%m-%d %H:%M:%S')
        verified_date = (datetime(2025, 9, 1) + timedelta(days=i*2, hours=12)).strftime('%Y-%m-%d %H:%M:%S')

        data.append([part_id, 'demo_hong', act_id, applied_date, checkin_date, verified_date, 2, 200, 'verified'])

    # 이영희 참여 기록 (2회)
    data.append(['par_016', 'demo_lee', 'act_001', '2025-10-15 14:00:00', '2025-10-15 10:00:00', '2025-10-15 12:00:00', 2, 200, 'verified'])
    data.append(['par_017', 'demo_lee', 'act_002', '2025-10-20 14:00:00', '2025-10-20 14:00:00', '2025-10-20 16:00:00', 2, 200, 'verified'])

    # 김철수 참여 기록 (8회)
    for i in range(18, 26):
        part_id = f'par_{str(i).zfill(3)}'
        act_id = f'act_{str((i % 5) + 1).zfill(3)}'
        applied_date = (datetime(2025, 8, 1) + timedelta(days=i*2)).strftime('%Y-%m-%d %H:%M:%S')
        checkin_date = (datetime(2025, 8, 1) + timedelta(days=i*2, hours=10)).strftime('%Y-%m-%d %H:%M:%S')
        verified_date = (datetime(2025, 8, 1) + timedelta(days=i*2, hours=12)).strftime('%Y-%m-%d %H:%M:%S')

        data.append([part_id, 'demo_kim', act_id, applied_date, checkin_date, verified_date, 2, 200, 'verified'])

    # 박민지 참여 기록 (30회)
    for i in range(26, 56):
        part_id = f'par_{str(i).zfill(3)}'
        act_id = f'act_{str((i % 5) + 1).zfill(3)}'
        applied_date = (datetime(2025, 7, 1) + timedelta(days=i)).strftime('%Y-%m-%d %H:%M:%S')
        checkin_date = (datetime(2025, 7, 1) + timedelta(days=i, hours=10)).strftime('%Y-%m-%d %H:%M:%S')
        verified_date = (datetime(2025, 7, 1) + timedelta(days=i, hours=12)).strftime('%Y-%m-%d %H:%M:%S')

        data.append([part_id, 'demo_park', act_id, applied_date, checkin_date, verified_date, 2, 200, 'verified'])

    ws.clear()
    ws.update('A1', [headers] + data)
    print(f"  ✅ {len(data)}개 참여 기록 입력 완료")

def setup_transactions_sheet(sheet):
    """transactions 시트 설정"""
    print("\n📋 transactions 시트 설정 중...")
    ws = create_worksheet_if_not_exists(sheet, 'transactions')

    headers = [
        'transaction_id', 'user_id', 'type', 'amount', 'balance_after',
        'reference_id', 'description', 'created_at'
    ]

    data = []

    # 홍길동 거래 내역
    # 적립 15건
    balance = 0
    for i in range(1, 16):
        txn_id = f'txn_{str(i).zfill(3)}'
        balance += 200
        created = (datetime(2025, 9, 1) + timedelta(days=i*2, hours=12)).strftime('%Y-%m-%d %H:%M:%S')
        data.append([txn_id, 'demo_hong', 'earn', 200, balance, f'par_{str(i).zfill(3)}', '갯벌 정화 활동 (2시간)', created])

    # 이자 지급 (10월 1일)
    balance += 37.5
    data.append(['txn_016', 'demo_hong', 'interest', 37.5, balance, '', '2025년 3분기 이자 (1.5%)', '2025-10-01 00:00:00'])

    # 사용 5건
    balance -= 100
    data.append(['txn_017', 'demo_hong', 'spend', -100, balance, '', '에코카페 결제', '2025-10-05 15:30:00'])
    balance -= 200
    data.append(['txn_018', 'demo_hong', 'spend', -200, balance, '', '화성로컬푸드 결제', '2025-10-10 12:00:00'])
    balance -= 150
    data.append(['txn_019', 'demo_hong', 'spend', -150, balance, '', '제로웨이스트샵 그린 결제', '2025-10-15 16:00:00'])
    balance -= 50
    data.append(['txn_020', 'demo_hong', 'spend', -50, balance, '', '화성시 공영주차장 할인', '2025-10-18 09:00:00'])
    balance -= 37.5
    data.append(['txn_021', 'demo_hong', 'spend', -37.5, balance, '', '반석산 에코스쿨 수강료', '2025-10-20 14:00:00'])

    # 이영희 거래 내역 (적립 2건)
    data.append(['txn_022', 'demo_lee', 'earn', 200, 200, 'par_016', '갯벌 정화 활동 (2시간)', '2025-10-15 12:00:00'])
    data.append(['txn_023', 'demo_lee', 'earn', 100, 300, 'par_017', '생태 모니터링 (2시간)', '2025-10-20 16:00:00'])

    # 김철수 거래 내역
    kim_balance = 0
    for i in range(24, 32):
        txn_id = f'txn_{str(i).zfill(3)}'
        kim_balance += 200
        created = (datetime(2025, 8, 1) + timedelta(days=(i-24)*3, hours=12)).strftime('%Y-%m-%d %H:%M:%S')
        data.append([txn_id, 'demo_kim', 'earn', 200, kim_balance, f'par_{str(i-6).zfill(3)}', '갯벌 정화 활동 (2시간)', created])

    # 이자
    kim_balance += 18
    data.append(['txn_032', 'demo_kim', 'interest', 18, kim_balance, '', '2025년 3분기 이자 (1.5%)', '2025-10-01 00:00:00'])

    # 사용 여러건 (자주 사용하는 사용자)
    kim_balance -= 200
    data.append(['txn_033', 'demo_kim', 'spend', -200, kim_balance, '', '에코카페 결제', '2025-10-03 11:00:00'])
    kim_balance -= 100
    data.append(['txn_034', 'demo_kim', 'spend', -100, kim_balance, '', '로컬푸드 결제', '2025-10-08 13:00:00'])
    kim_balance -= 118
    data.append(['txn_035', 'demo_kim', 'spend', -118, kim_balance, '', '제로웨이스트샵 결제', '2025-10-12 15:00:00'])

    # 박민지 거래 내역 (간단히 요약)
    park_balance = 0
    for i in range(36, 66):
        txn_id = f'txn_{str(i).zfill(3)}'
        park_balance += 200
        created = (datetime(2025, 7, 1) + timedelta(days=(i-36), hours=12)).strftime('%Y-%m-%d %H:%M:%S')
        data.append([txn_id, 'demo_park', 'earn', 200, park_balance, f'par_{str(i-10).zfill(3)}', '갯벌 정화 활동 (2시간)', created])

    # 이자
    park_balance += 90
    data.append(['txn_066', 'demo_park', 'interest', 90, park_balance, '', '2025년 3분기 이자 (1.5%)', '2025-10-01 00:00:00'])

    # 사용
    park_balance -= 1090
    data.append(['txn_067', 'demo_park', 'spend', -1090, park_balance, '', '다양한 제휴처 사용', '2025-10-15 12:00:00'])

    ws.clear()
    ws.update('A1', [headers] + data)
    print(f"  ✅ {len(data)}개 거래 내역 입력 완료")

def setup_partners_sheet(sheet):
    """partners 시트 설정"""
    print("\n📋 partners 시트 설정 중...")
    ws = create_worksheet_if_not_exists(sheet, 'partners')

    headers = [
        'partner_id', 'name', 'category', 'address', 'latitude', 'longitude',
        'phone', 'description', 'image_url', 'status'
    ]

    data = [
        ['ptn_001', '에코카페', 'cafe', '화성시 동탄1동 123', 37.2010, 127.0738, '031-1234-5678', '친환경 제로웨이스트 카페', '', 'active'],
        ['ptn_002', '화성로컬푸드 직매장', 'restaurant', '화성시 봉담읍 456', 37.2158, 126.9543, '031-2345-6789', '화성시 로컬푸드 직매장', '', 'active'],
        ['ptn_003', '제로웨이스트샵 그린', 'shop', '화성시 동탄2동 789', 37.2050, 127.0800, '031-3456-7890', '친환경 제로웨이스트 상점', '', 'active'],
        ['ptn_004', '화성시 공영주차장', 'public', '화성시 매송면 101', 37.1800, 126.9500, '031-4567-8901', '공영주차장 요금 할인', '', 'active'],
        ['ptn_005', '반석산 에코스쿨', 'education', '화성시 서신면 202', 37.1500, 126.8800, '031-5678-9012', '환경 교육 프로그램', '', 'active'],
        ['ptn_006', '녹색카페 힐링', 'cafe', '화성시 향남읍 303', 37.1200, 126.8000, '031-6789-0123', '유기농 음료 전문', '', 'active'],
        ['ptn_007', '화성 친환경마트', 'shop', '화성시 우정읍 404', 37.1000, 126.7500, '031-7890-1234', '친환경 생활용품', '', 'active'],
        ['ptn_008', '갯벌생태관', 'public', '화성시 매향리 505', 37.2036, 126.8290, '031-8901-2345', '갯벌 생태 체험관 입장료 할인', '', 'active'],
        ['ptn_009', '로컬베이커리', 'restaurant', '화성시 병점동 606', 37.2200, 127.0500, '031-9012-3456', '유기농 빵집', '', 'active'],
        ['ptn_010', '화성시립도서관', 'public', '화성시 동탄1동 707', 37.2015, 127.0700, '031-0123-4567', '환경 도서 대여 할인', '', 'active'],
    ]

    ws.clear()
    ws.update('A1', [headers] + data)
    print(f"  ✅ {len(data)}개 제휴처 데이터 입력 완료")

def setup_environment_data_sheet(sheet):
    """environment_data 시트 설정"""
    print("\n📋 environment_data 시트 설정 중...")
    ws = create_worksheet_if_not_exists(sheet, 'environment_data')

    headers = [
        'data_id', 'measurement_date', 'location', 'carbon_absorption_rate',
        'vegetation_area', 'biodiversity_index', 'improvement_rate', 'notes'
    ]

    data = [
        ['env_001', '2025-10-01', '매향리 갯벌', 125.5, 50000, 0.75, 1.5, '전분기 대비 1.5% 개선'],
        ['env_002', '2025-10-01', '화성습지', 98.3, 38000, 0.68, 1.2, '전분기 대비 1.2% 개선'],
        ['env_003', '2025-10-01', '전곡항 갯벌', 82.7, 30000, 0.62, 0.8, '전분기 대비 0.8% 개선'],
        ['env_004', '2025-07-01', '매향리 갯벌', 123.6, 49200, 0.74, 1.0, '2분기 측정'],
        ['env_005', '2025-07-01', '화성습지', 97.1, 37500, 0.67, 0.9, '2분기 측정'],
    ]

    ws.clear()
    ws.update('A1', [headers] + data)
    print(f"  ✅ {len(data)}개 환경 데이터 입력 완료")

def main():
    """메인 함수"""
    print("=" * 60)
    print("🚀 Google Sheets 자동 설정 스크립트")
    print("=" * 60)

    # Google Sheets 연결
    print("\n🔗 Google Sheets 연결 중...")
    client, sheet = get_sheets_client()

    if not client or not sheet:
        print("\n❌ Google Sheets 연결 실패!")
        print("\n해결 방법:")
        print("  1. backend/.env 파일에 GOOGLE_SHEETS_CREDENTIALS 설정")
        print("  2. backend/.env 파일에 GOOGLE_SHEET_ID 설정")
        print("  3. Service Account와 Google Sheets 공유 (편집자 권한)")
        return

    print(f"✅ 연결 성공: {sheet.title}")

    # 기존 시트 확인
    print("\n📄 기존 시트:")
    for ws in sheet.worksheets():
        print(f"  - {ws.title}")

    # 나머지 시트 설정
    try:
        setup_activities_sheet(sheet)
        setup_participations_sheet(sheet)
        setup_transactions_sheet(sheet)
        setup_partners_sheet(sheet)
        setup_environment_data_sheet(sheet)

        print("\n" + "=" * 60)
        print("🎉 모든 시트 설정 완료!")
        print("=" * 60)
        print("\n✅ 완료된 작업:")
        print("  - activities 시트: 5개 활동")
        print("  - participations 시트: 55개 참여 기록")
        print("  - transactions 시트: 67개 거래 내역")
        print("  - partners 시트: 10개 제휴처")
        print("  - environment_data 시트: 5개 환경 데이터")
        print("\n💡 Google Sheets에서 확인해보세요!")
        print(f"   https://docs.google.com/spreadsheets/d/{os.getenv('GOOGLE_SHEET_ID')}/edit")

    except Exception as e:
        print(f"\n❌ 오류 발생: {e}")
        print("\n해결 방법:")
        print("  1. Service Account가 Google Sheets에 '편집자' 권한으로 추가되었는지 확인")
        print("  2. Google Sheets API가 활성화되었는지 확인")

if __name__ == "__main__":
    main()
