from sqlalchemy import Column, Integer, String, DateTime
from app.database import Base
import datetime

class BatchJob(Base):
    __tablename__ = "batch_jobs"

    id = Column(Integer, primary_key=True, index=True)
    uploaded_at = Column(DateTime, default=datetime.datetime.utcnow)
    file_name = Column(String, nullable=False)
    status = Column(String, nullable=True)
