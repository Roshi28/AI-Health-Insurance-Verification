from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI(
    title="AI-Health Backend",
    description="Backend API for claim verification, analytics, and batch processing",
    version="1.0.0",
)

# Enable CORS (for frontend integration)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import routers
from app.routes.verification import router as verification_router
from app.routes.dashboard import router as dashboard_router
from app.routes.auth import router as auth_router
from app.routes.batch import router as batch_router
from app.routes.analytics import router as analytics_router
from app.database import init_db
from app.routes import batch

app.include_router(batch.router)

@app.on_event("startup")
def on_startup():
    init_db()


# Include routers
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(batch_router, prefix="/batch", tags=["Batch Processing"])
app.include_router(verification_router, prefix="/verification", tags=["Verification"])
app.include_router(analytics_router, prefix="/analytics", tags=["Analytics"])
app.include_router(dashboard_router, prefix="/dashboard", tags=["Dashboard"])


# Root health check endpoint
@app.get("/")
def root():
    return {"message": "AI-Health Backend is running 🚀"}
