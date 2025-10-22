"""
대시보드 통계 API 라우터
"""
from fastapi import APIRouter, HTTPException
from database import get_db
from typing import List, Dict
from datetime import datetime

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

@router.get("/stats")
async def get_dashboard_stats():
    """
    대시보드 전체 통계 조회

    Returns:
        - tidal_flat_health: 갯벌 건강도 (0-100)
        - total_users: 총 사용자 수
        - total_activities: 총 활동 수
        - total_points: 총 포인트
        - total_participations: 총 참여 횟수
        - active_users_month: 이번 달 활동 사용자
    """
    db = get_db()

    try:
        # 데이터 가져오기
        users = db.get_all_records("users")
        activities = db.get_all_records("activities")
        participations = db.get_all_records("participations")

        # 기본 통계
        total_users = len(users)
        total_activities = len(activities)
        total_participations = len(participations)

        # 총 포인트 계산
        total_points = sum(user.get("total_points", 0) for user in users)

        # 이번 달 활동 사용자 수
        current_month = datetime.now().strftime("%Y-%m")
        active_users_month = len(set(
            p.get("user_id") for p in participations
            if p.get("participation_date", "").startswith(current_month)
        ))

        # 갯벌 건강도 계산 (참여율 기반)
        # 공식: (이번 달 활동 사용자 / 전체 사용자) * 100
        if total_users > 0:
            participation_rate = (active_users_month / total_users) * 100
            tidal_flat_health = min(100, int(participation_rate * 1.5))  # 1.5배로 조정
        else:
            tidal_flat_health = 0

        return {
            "tidal_flat_health": tidal_flat_health,
            "total_users": total_users,
            "total_activities": total_activities,
            "total_points": int(total_points),
            "total_participations": total_participations,
            "active_users_month": active_users_month,
            "participation_rate": round(participation_rate, 1) if total_users > 0 else 0
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"통계 조회 실패: {str(e)}")

@router.get("/rankings")
async def get_user_rankings(limit: int = 10):
    """
    사용자 포인트 랭킹 조회

    Args:
        limit: 반환할 랭킹 수 (기본 10)

    Returns:
        rankings: 사용자 랭킹 목록 (rank, user_id, name, total_points)
    """
    db = get_db()

    try:
        users = db.get_all_records("users")

        # 포인트 기준 정렬
        sorted_users = sorted(
            users,
            key=lambda x: x.get("total_points", 0),
            reverse=True
        )

        # 랭킹 생성
        rankings = []
        for idx, user in enumerate(sorted_users[:limit], start=1):
            rankings.append({
                "rank": idx,
                "user_id": user.get("user_id"),
                "name": user.get("name"),
                "total_points": user.get("total_points", 0),
                "profile_type": user.get("profile_type", "일반")
            })

        return {
            "rankings": rankings,
            "total": len(sorted_users)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"랭킹 조회 실패: {str(e)}")

@router.get("/activities/recent")
async def get_recent_activities(limit: int = 5):
    """
    최근 활동 목록 조회

    Args:
        limit: 반환할 활동 수 (기본 5)
    """
    db = get_db()

    try:
        activities = db.get_all_records("activities")

        # 날짜 기준 정렬 (최신순)
        sorted_activities = sorted(
            activities,
            key=lambda x: x.get("date", ""),
            reverse=True
        )

        return {
            "activities": sorted_activities[:limit],
            "total": len(activities)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"최근 활동 조회 실패: {str(e)}")

@router.get("/monthly-trend")
async def get_monthly_trend():
    """
    월별 참여 트렌드 조회 (최근 6개월)
    """
    db = get_db()

    try:
        participations = db.get_all_records("participations")

        # 월별 집계
        monthly_data = {}
        for p in participations:
            date_str = p.get("participation_date", "")
            if date_str:
                month = date_str[:7]  # YYYY-MM
                if month not in monthly_data:
                    monthly_data[month] = 0
                monthly_data[month] += 1

        # 최근 6개월 데이터 정렬
        sorted_months = sorted(monthly_data.items(), reverse=True)[:6]
        sorted_months.reverse()  # 오래된 것부터

        trend = [
            {"month": month, "count": count}
            for month, count in sorted_months
        ]

        return {"trend": trend}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"트렌드 조회 실패: {str(e)}")
