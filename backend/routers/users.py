"""
사용자 관련 API 라우터
"""
from fastapi import APIRouter, HTTPException, Depends
from database import get_db
from core.auth import get_current_user

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/me")
async def get_current_user_info(current_user: str = Depends(get_current_user)):
    """
    현재 로그인한 사용자 정보 조회
    """
    db = get_db()

    user = db.get_record_by_id("users", "user_id", current_user)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "user_id": user.get("user_id"),
        "name": user.get("name"),
        "address": user.get("address"),
        "total_points": float(user.get("total_points", 0)),
        "profile_type": user.get("profile_type"),
        "created_at": user.get("created_at")
    }

@router.get("/{user_id}")
async def get_user_by_id(user_id: str):
    """
    특정 사용자 정보 조회 (공개 정보만)
    """
    db = get_db()

    user = db.get_record_by_id("users", "user_id", user_id)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "user_id": user.get("user_id"),
        "name": user.get("name"),
        "total_points": float(user.get("total_points", 0)),
        "profile_type": user.get("profile_type")
    }

@router.get("/me/participations")
async def get_my_participations(current_user: str = Depends(get_current_user)):
    """
    내 활동 참여 기록 조회
    """
    db = get_db()

    participations = db.find_records("participations", {"user_id": current_user})

    return {
        "participations": participations,
        "total": len(participations)
    }

@router.get("/me/transactions")
async def get_my_transactions(
    current_user: str = Depends(get_current_user),
    limit: int = 50
):
    """
    내 거래 내역 조회
    """
    db = get_db()

    transactions = db.find_records("transactions", {"user_id": current_user})

    # 최근순 정렬 (transaction_date 기준)
    transactions.sort(key=lambda x: x.get("transaction_date", ""), reverse=True)

    # 제한
    transactions = transactions[:limit]

    return {
        "transactions": transactions,
        "total": len(transactions)
    }
