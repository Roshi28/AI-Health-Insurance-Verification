from fastapi import FastAPI
from .database import Base, engine
from .utils import error_handlers
from .routes import auth, batch, verification, analytics, dashboard

# Create tables if they don’t exist
Base.metadata.create_all(bind=engine)

def create_app() -> FastAPI:
    app = FastAPI(
        title="Insurance Verification API",
        description="Backend for insurance claim verification and batch processing",
        version="1.0.0",
    )

    # Register Routers
    app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
    app.include_router(batch.router, prefix="/batch", tags=["Batch Processing"])
    app.include_router(verification.router, prefix="/verification", tags=["Verification"])
    app.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])
    app.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])

    # Add custom error handlers
    error_handlers.register_error_handlers(app)

    return app


# Expose app for running via `uvicorn backend.app:app`
app = create_app()
