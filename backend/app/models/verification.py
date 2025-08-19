from sqlalchemy import Column, Integer, String, DateTime
from app.database import Base
import datetime

class Verification(Base):
    __tablename__ = "verifications"

    id = Column(Integer, primary_key=True, index=True)
    patient_name = Column(String, nullable=False)
    policy_number = Column(String, nullable=False)
    insurance_company = Column(String, nullable=False)
    group_number = Column(String, nullable=True)
    risk_score = Column(Integer, nullable=True)
    status = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
