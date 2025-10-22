"""
활동 관련 스키마
"""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Activity(BaseModel):
    """활동"""
    activity_id: str
    title: str
    description: str
    date: str
    start_time: str
    duration_hours: float
    location_name: str
    latitude: float
    longitude: float
    max_participants: int
    points_per_hour: float
    image_url: Optional[str] = ""
    status: str  # open, closed, completed

class ActivityList(BaseModel):
    """활동 목록"""
    activities: list[Activity]
    total: int

class ActivityDetail(Activity):
    """활동 상세 정보 (참가자 목록 포함)"""
    participants: Optional[list[str]] = None
