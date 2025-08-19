from app.database import Base, engine
from app.models import verification, user, batch

# This will create tables for all models imported above
Base.metadata.create_all(bind=engine)
print("Database tables created!")
