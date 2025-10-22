"""
제휴처 관련 API 라우터
"""
from fastapi import APIRouter, HTTPException
from database import get_db
from typing import List

router = APIRouter(prefix="/partners", tags=["partners"])

@router.get("/")
async def get_partners(category: str = None):
    """
    제휴처 목록 조회

    Args:
        category: 카테고리 필터 (선택사항)
    """
    db = get_db()

    partners = db.get_all_records("partners")

    # 카테고리 필터링
    if category:
        partners = [p for p in partners if p.get("category") == category]

    return {
        "partners": partners,
        "total": len(partners)
    }

@router.get("/{partner_id}")
async def get_partner_detail(partner_id: str):
    """
    특정 제휴처 상세 정보 조회
    """
    db = get_db()

    partner = db.get_record_by_id("partners", "partner_id", partner_id)

    if not partner:
        raise HTTPException(status_code=404, detail="Partner not found")

    return partner
