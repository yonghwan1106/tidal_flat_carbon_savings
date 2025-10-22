"""
Vercel Serverless Function Entry Point
"""
from mangum import Mangum
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from main import app

# Vercel handler
handler = Mangum(app, lifespan="off")
