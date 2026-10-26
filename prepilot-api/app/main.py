from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import courses,technology_stack

from app.db.database import Base,engine
from app.models.Course import Course

Base.metadata.create_all(bind=engine)
app=FastAPI(title="PrePilot", description="User/admin")
# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(courses.router, prefix="/api/courses", tags=["courses"])
app.include_router(technology_stack.router,prefix="/api",tags=["technonlogy"])
    
   
