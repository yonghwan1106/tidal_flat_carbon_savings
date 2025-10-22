"""
API 데이터 테스트 스크립트
"""
import sys
import io

# Windows 인코딩 문제 해결
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

from database import get_db

def test_activities():
    print("=" * 60)
    print("Activities 데이터 테스트")
    print("=" * 60)

    db = get_db()

    # 모든 activities 가져오기
    activities = db.get_all_records("activities")

    print(f"\n총 {len(activities)}개 활동 발견\n")

    for act in activities:
        print(f"활동 ID: {act.get('activity_id')}")
        print(f"이름: {act.get('name')}")
        print(f"상태: {act.get('status')}")
        print(f"위도: {act.get('latitude')}")
        print(f"경도: {act.get('longitude')}")
        print("-" * 40)

if __name__ == "__main__":
    test_activities()
