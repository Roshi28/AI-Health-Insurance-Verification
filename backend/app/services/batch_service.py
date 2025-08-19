import csv
from io import TextIOWrapper
from sqlalchemy.orm import Session
from sqlalchemy import select
from app import models
from app.services import ml_service

async def create_batch_service(db: Session, files):
    batch = models.Batch(status=models.BatchStatus.queued, file_count=len(files))
    db.add(batch)
    db.commit()
    db.refresh(batch)

    for f in files:
        try:
            text_stream = TextIOWrapper(f.file, encoding="utf-8")
            reader = csv.DictReader(text_stream)
            for row in reader:
                v = models.Verification(
                    batch_id=batch.id,
                    claim_id=row.get("claim_id"),
                    provider_id=row.get("provider_id"),
                    patient_id=row.get("patient_id"),
                    amount=float(row.get("amount") or 0) if row.get("amount") else None,
                    diagnosis_code=row.get("diagnosis_code"),
                    procedure_code=row.get("procedure_code"),
                    raw=row,
                    status="created",
                )
                db.add(v)
            db.commit()
        finally:
            await f.close()
    return batch


def process_batch_background(db: Session, batch_id: int):
    batch: models.Batch = db.get(models.Batch, batch_id)
    if not batch:
        return
    batch.status = models.BatchStatus.processing
    db.commit()
    db.refresh(batch)

    try:
        q = db.execute(
            select(models.Verification).where(
                models.Verification.batch_id == batch_id,
                models.Verification.status == "created"
            )
        )
        items = [row[0] for row in q.all()]

        for v in items:
            try:
                score = ml_service.compute_risk_score(v.raw or {})
                v.risk_score = score
                v.risk_label = ml_service.label_from_score(score)
                v.status = "processed"
            except Exception as e:
                v.status = "error"
                v.error = str(e)
            db.add(v)

        batch.status = models.BatchStatus.completed
        db.commit()
    except Exception as e:
        batch.status = models.BatchStatus.failed
        batch.error = str(e)
        db.commit()


def get_batch_service(db: Session, batch_id: int):
    return db.get(models.Batch, batch_id)
