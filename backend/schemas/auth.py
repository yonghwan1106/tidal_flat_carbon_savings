"""
인증 관련 스키마
"""
from pydantic import BaseModel
from typing import Optional

class DemoLoginRequest(BaseModel):
    """데모 로그인 요청"""
    user_id: str  # demo_hong, demo_lee, demo_kim, demo_park

class TokenResponse(BaseModel):
    """토큰 응답"""
    access_token: str
    token_type: str = "bearer"
    user_id: str
    name: str

class TokenData(BaseModel):
    """JWT 토큰 데이터"""
    user_id: Optional[str] = None
