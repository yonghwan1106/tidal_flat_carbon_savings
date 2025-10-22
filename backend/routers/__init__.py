from .auth import router as auth_router
from .activities import router as activities_router
from .users import router as users_router
from .partners import router as partners_router
from .dashboard import router as dashboard_router

__all__ = ['auth_router', 'activities_router', 'users_router', 'partners_router', 'dashboard_router']
