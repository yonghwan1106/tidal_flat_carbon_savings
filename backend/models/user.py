from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class User(BaseModel):
    user_id: str
    name: str
    address: Optional[str] = None
    created_at: datetime
    total_points: float = 0.0
    profile_type: Optional[str] = None  # active, new, spender, top

class UserCreate(BaseModel):
    user_id: str
    name: str
    address: Optional[str] = None

class UserResponse(BaseModel):
    user_id: str
    name: str
    address: Optional[str] = None
    total_points: float
    profile_type: Optional[str] = None
