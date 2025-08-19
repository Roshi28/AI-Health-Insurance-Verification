from datetime import datetime
from typing import List, Optional, Dict, Any
from pydantic import BaseModel
from enum import Enum

class BatchRequest(BaseModel):
    claim_ids: List[int]

class BatchResponse(BaseModel):
    processed: int
    failed: int

class BatchStatus(str, Enum):
    queued = "queued"
    processing = "processing"
    completed = "completed"
    failed = "failed"

class VerificationBase(BaseModel):
    claim_id: Optional[str] = None
    provider_id: Optional[str] = None
    patient_id: Optional[str] = None
    amount: Optional[float] = None
    diagnosis_code: Optional[str] = None
    procedure_code: Optional[str] = None
    raw: Optional[Dict[str, Any]] = None

class VerificationOut(VerificationBase):
    id: int
    batch_id: int
    risk_score: Optional[float] = None
    risk_label: Optional[str] = None
    status: str
    error: Optional[str] = None
    created_at: datetime

    class Config:
        orm_mode = True

class BatchOut(BaseModel):
    id: int
    created_at: datetime
    status: BatchStatus
    file_count: int
    error: Optional[str] = None
    verifications: List[VerificationOut] = []

    class Config:
        orm_mode = True

class BatchCreateResponse(BaseModel):
    batch_id: int
    status: BatchStatus
    file_count: int

class AnalyticsOut(BaseModel):
    total_verifications: int
    processed: int
    avg_risk: Optional[float]
    high_risk_count: int
    by_provider: dict
    risk_histogram: dict
