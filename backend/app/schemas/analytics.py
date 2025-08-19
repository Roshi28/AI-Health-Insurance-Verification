from pydantic import BaseModel
from typing import List, Optional


class ClaimStats(BaseModel):
    total_claims: int
    approved_claims: int
    denied_claims: int
    approval_rate: float  # percentage
    denial_rate: float    # percentage

    class Config:
        orm_mode = True


class DenialReasonStats(BaseModel):
    reason: str
    count: int
    percentage: float

    class Config:
        orm_mode = True


class CostAnalysis(BaseModel):
    total_claim_amount: float
    approved_amount: float
    denied_amount: float
    average_claim_amount: float

    class Config:
        orm_mode = True


class AnalyticsResponse(BaseModel):
    claim_stats: ClaimStats
    denial_reasons: List[DenialReasonStats]
    cost_analysis: CostAnalysis
    top_hospitals: Optional[List[str]] = None  # Example: hospitals with highest claim volume
