from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class VerificationBase(BaseModel):
    patient_name: str
    policy_number: str
    insurance_company: str
    group_number: Optional[str] = None

class VerificationCreate(VerificationBase):
    pass  # Use this for POST/create endpoints

class VerificationResponse(VerificationBase):
    id: int
    risk_score: Optional[int] = None
    status: Optional[str] = None
    created_at: datetime

    class Config:
        orm_mode = True
