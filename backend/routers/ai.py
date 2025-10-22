"""
AI 리포트 생성 API 라우터 (Claude API)
"""
from fastapi import APIRouter, HTTPException, Depends
from database import get_db
import os
from anthropic import Anthropic
from auth import get_current_user

router = APIRouter(prefix="/ai", tags=["ai"])

# Claude API 클라이언트 초기화
anthropic_client = Anthropic(api_key=os.getenv("CLAUDE_API_KEY"))

@router.post("/generate-report")
async def generate_ai_report(current_user: dict = Depends(get_current_user)):
    """AI 환경 기여 리포트 생성"""
    db = get_db()
    user_id = current_user["user_id"]

    try:
        # 사용자 활동 데이터 조회
        participations = db.get_all_records("participations")
        user_participations = [p for p in participations if p.get("user_id") == user_id and p.get("status") == "verified"]

        # 사용자 정보 조회
        user = db.get_record_by_id("users", "user_id", user_id)
        if not user:
            raise HTTPException(status_code=404, detail="사용자를 찾을 수 없습니다")

        # 통계 계산
        total_activities = len(user_participations)
        total_hours = sum(p.get("actual_hours", 0) for p in user_participations)
        total_points = user.get("total_points", 0)

        # 가장 많이 참여한 활동 찾기
        activity_counts = {}
        activities = db.get_all_records("activities")

        for p in user_participations:
            activity_id = p.get("activity_id")
            activity = next((a for a in activities if a.get("activity_id") == activity_id), None)
            if activity:
                location = activity.get("location_name", "")
                activity_counts[location] = activity_counts.get(location, 0) + 1

        favorite_location = max(activity_counts.items(), key=lambda x: x[1])[0] if activity_counts else "없음"
        favorite_count = activity_counts.get(favorite_location, 0) if favorite_location != "없음" else 0

        # 탄소 흡수량 계산 (1시간 = 약 8.3kg CO2 흡수)
        carbon_absorption = total_hours * 8.3

        # Claude API로 리포트 생성
        prompt = f"""
당신은 환경 보호 활동 코치이자 동기부여 전문가입니다.
아래 사용자의 화성시 갯벌 보전 활동 데이터를 바탕으로 개인화된 환경 기여 리포트를 작성해주세요.

**사용자 정보:**
- 이름: {user.get("name")}
- 총 활동 횟수: {total_activities}회
- 총 활동 시간: {total_hours}시간
- 적립 포인트: {total_points} CP
- 가장 많이 참여한 장소: {favorite_location} ({favorite_count}회)
- 추정 탄소 흡수량: {carbon_absorption:.1f}kg CO2

**리포트 작성 가이드:**
1. **칭찬과 격려** (3-4문장):
   - 사용자의 노력을 구체적으로 칭찬하세요
   - 활동이 갯벌 생태계에 미친 긍정적 영향을 강조하세요
   - 따뜻하고 친근한 톤으로 작성하세요

2. **주요 성과** (3개 bullet points):
   - 활동 횟수, 시간, 탄소 흡수량 등 구체적 수치 포함
   - 비유를 활용하여 이해하기 쉽게 설명 (예: "나무 X그루 심은 효과")

3. **추천 활동** (1-2개):
   - 사용자가 관심있어 할 만한 다른 갯벌 활동 제안
   - 화성시 갯벌 관련 활동 (매향리 갯벌, 화성습지, 전곡항, 궁평항 등)

4. **환경 팁** (1-2문장):
   - 갯벌 보전의 중요성과 효과에 대한 흥미로운 사실
   - 탄소중립 목표 달성에 대한 기여 강조

**출력 형식:** 마크다운 형식으로 작성하되, 과도한 서식은 피하고 가독성을 우선하세요.
이모지를 적절히 활용하여 친근하고 긍정적인 분위기를 조성하세요.
"""

        # Claude API 호출
        message = anthropic_client.messages.create(
            model="claude-haiku-4.5-20250925",
            max_tokens=1024,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )

        # 응답 추출
        report_content = message.content[0].text

        return {
            "report": report_content,
            "statistics": {
                "total_activities": total_activities,
                "total_hours": total_hours,
                "total_points": total_points,
                "favorite_location": favorite_location,
                "carbon_absorption_kg": round(carbon_absorption, 1)
            }
        }

    except Exception as e:
        print(f"AI 리포트 생성 오류: {str(e)}")
        raise HTTPException(status_code=500, detail=f"AI 리포트 생성 실패: {str(e)}")
