from datetime import datetime
from typing import List, Optional, Dict, Any
from pydantic import BaseModel
from enum import Enum

# Batch status enum
class BatchStatus(str, Enum):
    queued = "queued"
    processing = "processing"
    completed = "completed"
    failed = "failed"

# Base schema for Batch input
class BatchBase(BaseModel):
    file_name: str

class BatchCreate(BatchBase):
    pass

# Schema for Batch creation response
class BatchCreateResponse(BaseModel):
    batch_id: int
    status: BatchStatus
    file_count: int

# General Batch response with details and nested verifications
class BatchOut(BaseModel):
    id: int
    uploaded_at: datetime
    status: BatchStatus
    file_count: int
    error: Optional[str] = None
    verifications: List["VerificationOut"] = []  # forward reference

    class Config:
        orm_mode = True

# Request schema to represent a list of claim IDs (e.g. for batch operations)
class BatchRequest(BaseModel):
    claim_ids: List[int]

# Base schema for Verification input
class VerificationBase(BaseModel):
    claim_id: Optional[str] = None
    provider_id: Optional[str] = None
    patient_id: Optional[str] = None
    amount: Optional[float] = None
    diagnosis_code: Optional[str] = None
    procedure_code: Optional[str] = None
    raw: Optional[Dict[str, Any]] = None

# Extended schema for output with DB fields
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

# Analytics output schema
class AnalyticsOut(BaseModel):
    total_verifications: int
    processed: int
    avg_risk: Optional[float]
    high_risk_count: int
    by_provider: Dict[str, int]
    risk_histogram: Dict[str, int]

# For forward references in nested models (VerificationOut inside BatchOut)
BatchOut.update_forward_refs()
