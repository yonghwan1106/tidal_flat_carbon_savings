from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # App Config
    APP_NAME: str = "갯벌 탄소예금 API"
    DEBUG: bool = True
    DEMO_MODE: bool = True

    # Security
    JWT_SECRET_KEY: str = "your-secret-key-change-in-production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440  # 24 hours

    # Google Sheets
    GOOGLE_SHEETS_CREDENTIALS: Optional[str] = None
    GOOGLE_SHEET_ID: Optional[str] = None

    # Claude API
    CLAUDE_API_KEY: Optional[str] = None
    CLAUDE_MODEL: str = "claude-haiku-4.5-20250925"

    # Naver Maps (for geocoding in admin)
    NAVER_CLIENT_ID: Optional[str] = None
    NAVER_CLIENT_SECRET: Optional[str] = None

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
