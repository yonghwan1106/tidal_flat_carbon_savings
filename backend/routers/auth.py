"""
인증 관련 API 라우터
"""
from fastapi import APIRouter, HTTPException, status
from schemas.auth import DemoLoginRequest, TokenResponse
from core.auth import create_access_token
from database import get_db

router = APIRouter(prefix="/auth", tags=["auth"])

# 데모 계정 목록
DEMO_ACCOUNTS = {
    "demo_hong": "홍길동",
    "demo_lee": "이영희",
    "demo_kim": "김철수",
    "demo_park": "박민수"
}

@router.post("/demo-login", response_model=TokenResponse)
async def demo_login(request: DemoLoginRequest):
    """
    데모 계정 로그인 (비밀번호 불필요)

    **사용 가능한 계정**:
    - demo_hong (홍길동) - 활발한 사용자
    - demo_lee (이영희) - 신규 사용자
    - demo_kim (김철수) - 포인트 많이 사용
    - demo_park (박민수) - 랭킹 1위
    """
    # 데모 계정 확인
    if request.user_id not in DEMO_ACCOUNTS:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Demo account not found"
        )

    # Google Sheets에서 사용자 확인
    db = get_db()
    user = db.get_record_by_id("users", "user_id", request.user_id)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found in database"
        )

    # JWT 토큰 생성
    access_token = create_access_token(data={"sub": request.user_id})

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user_id=request.user_id,
        name=user.get("name", DEMO_ACCOUNTS[request.user_id])
    )

@router.get("/demo-accounts")
async def get_demo_accounts():
    """사용 가능한 데모 계정 목록"""
    return {
        "accounts": [
            {"user_id": uid, "name": name}
            for uid, name in DEMO_ACCOUNTS.items()
        ]
    }
