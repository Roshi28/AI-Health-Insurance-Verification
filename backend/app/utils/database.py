# utils/database.py

from app.database import Base, engine, SessionLocal
from app import models

# Create all tables (useful for local dev without Alembic)
def init_db():
    """
    Initialize the database by creating all tables defined in models.
    Only for development; in production use Alembic migrations.
    """
    Base.metadata.create_all(bind=engine)


def reset_db():
    """
    Drops all tables and recreates them.
    CAUTION: This will erase all data.
    """
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)


def get_db_session():
    """
    Simple context manager to get a session.
    Usage:
        with get_db_session() as db:
            db.query(models.User).all()
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
