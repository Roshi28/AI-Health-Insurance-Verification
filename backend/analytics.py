from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class DashboardStats(BaseModel):
    verifications_today: int
    success_rate: float
    avg_response_time_ms: int
    high_risk_alerts: int

class RecentVerification(BaseModel):
    id: int
    patient_name: str
    insurance_company: str
    status: str
    risk_score: float
    created_at: datetime
    processing_time_ms: Optional[int]

class AnalyticsData(BaseModel):
    period: str  # daily, weekly, monthly
    verification_count: int
    success_rate: float
    avg_processing_time: float
    top_insurers: List[Dict[str, Any]]
    risk_distribution: Dict[str, int]

class AIPerformanceMetrics(BaseModel):
    ocr_accuracy: Dict[str, float]
    prediction_model: Dict[str, float]
    processing_stats: Dict[str, Any]
