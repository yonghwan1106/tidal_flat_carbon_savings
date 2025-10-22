"""
활동 관련 API 라우터
"""
from fastapi import APIRouter, HTTPException, Depends
from typing import List
from schemas.activity import Activity, ActivityList, ActivityDetail
from database import get_db
from core.auth import get_current_user

router = APIRouter(prefix="/activities", tags=["activities"])

@router.get("/", response_model=ActivityList)
async def get_activities(
    status: str = "open",
    limit: int = 100
):
    """
    활동 목록 조회

    **Parameters**:
    - status: 활동 상태 (open, closed, completed, all)
    - limit: 최대 결과 수
    """
    db = get_db()

    # Google Sheets에서 활동 목록 가져오기
    all_activities = db.get_all_records("activities")

    # 상태 필터링
    if status != "all":
        all_activities = [a for a in all_activities if a.get("status") == status]

    # 제한
    all_activities = all_activities[:limit]

    # Activity 스키마로 변환
    activities = []
    for act in all_activities:
        try:
            activity = Activity(
                activity_id=str(act.get("activity_id", "")),
                title=str(act.get("title", "")),
                description=str(act.get("description", "")),
                date=str(act.get("date", "")),
                start_time=str(act.get("start_time", "")),
                duration_hours=float(act.get("duration_hours", 0)),
                location_name=str(act.get("location_name", "")),
                latitude=float(act.get("latitude", 0)),
                longitude=float(act.get("longitude", 0)),
                max_participants=int(act.get("max_participants", 0)),
                points_per_hour=float(act.get("points_per_hour", 0)),
                image_url=str(act.get("image_url", "")),
                status=str(act.get("status", "open"))
            )
            activities.append(activity)
        except Exception as e:
            print(f"활동 변환 오류: {e}, 데이터: {act}")
            continue

    return ActivityList(
        activities=activities,
        total=len(activities)
    )

@router.get("/{activity_id}", response_model=ActivityDetail)
async def get_activity_detail(activity_id: str):
    """
    활동 상세 정보 조회
    """
    db = get_db()

    # 활동 정보 가져오기
    activity_data = db.get_record_by_id("activities", "activity_id", activity_id)

    if not activity_data:
        raise HTTPException(status_code=404, detail="Activity not found")

    # 참가자 목록 가져오기
    participations = db.find_records("participations", {"activity_id": activity_id})
    participant_ids = [p.get("user_id") for p in participations if p.get("user_id")]

    # ActivityDetail 생성
    activity = ActivityDetail(
        activity_id=str(activity_data.get("activity_id", "")),
        title=str(activity_data.get("title", "")),
        description=str(activity_data.get("description", "")),
        date=str(activity_data.get("date", "")),
        start_time=str(activity_data.get("start_time", "")),
        duration_hours=float(activity_data.get("duration_hours", 0)),
        location_name=str(activity_data.get("location_name", "")),
        latitude=float(activity_data.get("latitude", 0)),
        longitude=float(activity_data.get("longitude", 0)),
        max_participants=int(activity_data.get("max_participants", 0)),
        points_per_hour=float(activity_data.get("points_per_hour", 0)),
        image_url=str(activity_data.get("image_url", "")),
        status=str(activity_data.get("status", "open")),
        participants=participant_ids
    )

    return activity

@router.post("/{activity_id}/join")
async def join_activity(
    activity_id: str,
    current_user: str = Depends(get_current_user)
):
    """
    활동 참가하기 (인증 필요)
    """
    db = get_db()

    # 활동 존재 확인
    activity = db.get_record_by_id("activities", "activity_id", activity_id)
    if not activity:
        raise HTTPException(status_code=404, detail="Activity not found")

    # 이미 참가했는지 확인
    existing = db.find_records("participations", {
        "user_id": current_user,
        "activity_id": activity_id
    })

    if existing:
        raise HTTPException(status_code=400, detail="Already joined this activity")

    # 참가 인원 확인
    current_participants = int(activity.get("current_participants", 0))
    max_participants = int(activity.get("max_participants", 0))

    if current_participants >= max_participants:
        raise HTTPException(status_code=400, detail="Activity is full")

    # 참가 기록 추가
    from datetime import datetime
    participation_data = {
        "participation_id": f"part_{datetime.now().strftime('%Y%m%d%H%M%S')}_{current_user}",
        "user_id": current_user,
        "activity_id": activity_id,
        "joined_at": datetime.now().isoformat(),
        "status": "joined",
        "points_earned": 0
    }

    success = db.add_record("participations", participation_data)
    if not success:
        raise HTTPException(status_code=500, detail="Failed to join activity")

    # 활동의 current_participants 업데이트
    db.update_record(
        "activities",
        "activity_id",
        activity_id,
        {"current_participants": current_participants + 1}
    )

    return {"message": "Successfully joined activity", "participation": participation_data}
