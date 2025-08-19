from sqlalchemy import Column, Integer, String
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)  # added username field from second snippet
    password = Column(String, nullable=False)                          # added password field for authentication
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)

