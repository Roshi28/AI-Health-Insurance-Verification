from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Enum, JSON
from sqlalchemy.orm import relationship
from ..utils.database import Base
import enum

class BatchStatus(str, enum.Enum):
    queued = "queued"
    processing = "processing"
    completed = "completed"
    failed = "failed"

class Batch(Base):  # Consolidated Batch and BatchJob into single Batch model
    __tablename__ = "batches"

    id = Column(Integer, primary_key=True, index=True)
    uploaded_at = Column(DateTime, default=datetime.utcnow, nullable=False)  # merged created_at + uploaded_at
    file_name = Column(String, nullable=True)  # added from BatchJob, nullable to allow missing filename if needed
    status = Column(Enum(BatchStatus), default=BatchStatus.queued, nullable=False)
    file_count = Column(Integer, default=0, nullable=False)
    error = Column(String, nullable=True)

    verifications = relationship("Verification", back_populates="batch", cascade="all, delete-orphan")

class Verification(Base):
    __tablename__ = "verifications"

    id = Column(Integer, primary_key=True, index=True)
    batch_id = Column(Integer, ForeignKey("batches.id"), nullable=False)

    claim_id = Column(String, index=True)
    provider_id = Column(String, index=True)
    patient_id = Column(String, index=True)

    amount = Column(Float, nullable=True)
    diagnosis_code = Column(String, nullable=True)
    procedure_code = Column(String, nullable=True)

    raw = Column(JSON, nullable=True)

    risk_score = Column(Float, nullable=True)
    risk_label = Column(String, nullable=True)

    status = Column(String, default="created")  # values: created | processed | error
    error = Column(String, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    batch = relationship("Batch", back_populates="verifications")
