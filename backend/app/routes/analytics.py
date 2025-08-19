from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from ..utils.database import get_db
from .. import models, schemas

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("", response_model=schemas.AnalyticsOut)
def analytics(db: Session = Depends(get_db)):
    total = db.query(func.count(models.Verification.id)).scalar() or 0
    processed = db.query(func.count(models.Verification.id)).filter(
        models.Verification.status == "processed").scalar() or 0

    avg_risk = db.query(func.avg(models.Verification.risk_score)).filter(
        models.Verification.risk_score != None).scalar()
    avg_risk = float(avg_risk) if avg_risk is not None else None

    high_risk_count = db.query(func.count(models.Verification.id)).filter(
        models.Verification.risk_score != None,
        models.Verification.risk_score >= 0.7
    ).scalar() or 0

    by_provider_rows = db.query(
        models.Verification.provider_id,
        func.count(models.Verification.id)
    ).group_by(models.Verification.provider_id).all()
    by_provider = {pid or "unknown": int(c) for pid, c in by_provider_rows}

    bins = [(0.0,0.2),(0.2,0.4),(0.4,0.6),(0.6,0.8),(0.8,1.0)]
    hist = {f"{a:.1f}-{b:.1f}": 0 for a,b in bins}
    rows = db.query(models.Verification.risk_score).filter(models.Verification.risk_score != None).all()
    for (score,) in rows:
        s = float(score)
        for a, b in bins:
            if (a <= s < b) or (a == 0.8 and s <= 1.0 and b == 1.0):
                hist[f"{a:.1f}-{b:.1f}"] += 1
                break

    return schemas.AnalyticsOut(
        total_verifications=int(total),
        processed=int(processed),
        avg_risk=avg_risk,
        high_risk_count=int(high_risk_count),
        by_provider=by_provider,
        risk_histogram=hist
    )
