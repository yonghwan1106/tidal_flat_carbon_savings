from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(
    title="갯벌 탄소예금 API",
    description="Tidal Flat Carbon Savings API",
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

# API Routes (추후 추가)
# from api import auth, activities, points, partners, dashboard, ai
# app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
# app.include_router(activities.router, prefix="/api/activities", tags=["activities"])
# app.include_router(points.router, prefix="/api/points", tags=["points"])
# app.include_router(partners.router, prefix="/api/partners", tags=["partners"])
# app.include_router(dashboard.router, prefix="/api/dashboard", tags=["dashboard"])
# app.include_router(ai.router, prefix="/api/ai", tags=["ai"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
