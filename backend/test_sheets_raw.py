"""
Google Sheets Raw 데이터 테스트
"""
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

from database import get_db

def test_raw_data():
    print("=" * 60)
    print("Google Sheets Raw 데이터 확인")
    print("=" * 60)

    db = get_db()
    ws = db.get_worksheet("activities")

    # 모든 값 가져오기
    all_values = ws.get_all_values()

    print(f"\n총 {len(all_values)}개 행\n")

    for idx, row in enumerate(all_values[:10], 1):  # 처음 10행만
        print(f"행 {idx}: {row}")

    print("\n" + "=" * 60)
    print("get_all_records() 결과:")
    print("=" * 60)

    records = ws.get_all_records()
    print(f"총 {len(records)}개 레코드")

    for rec in records[:3]:  # 처음 3개만
        print(f"\n{rec}")

if __name__ == "__main__":
    test_raw_data()
