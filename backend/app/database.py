import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Get the database URL from environment, fallback to SQLite local file
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./dev.db")

# Create the SQLAlchemy engine
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
)

# Create a configured "Session" class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models to inherit
Base = declarative_base()

# Dependency generator to inject database session into FastAPI routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Utility function to create tables, to be called at startup or manually
def init_db():
    import app.models  # Ensure all models are imported and registered before create_all
    Base.metadata.create_all(bind=engine)
