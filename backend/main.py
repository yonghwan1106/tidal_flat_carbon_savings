from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from routers.auth import router as auth_router
from routers.activities import router as activities_router
from routers.users import router as users_router
from routers.partners import router as partners_router
from routers.dashboard import router as dashboard_router
from routers.ai import router as ai_router

# Load environment variables
load_dotenv()

app = FastAPI(
    title="갯벌 탄소예금 API",
    description="Tidal Flat Carbon Savings API - Partners Support",
    version="1.0.0",
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 개발 중에는 모든 origin 허용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "갯벌 탄소예금 API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# API Routes
app.include_router(auth_router, prefix="/api")
app.include_router(activities_router, prefix="/api")
app.include_router(users_router, prefix="/api")
app.include_router(partners_router, prefix="/api")
app.include_router(dashboard_router, prefix="/api")
app.include_router(ai_router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
