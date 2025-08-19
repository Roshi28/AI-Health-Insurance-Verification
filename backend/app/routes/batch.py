from fastapi import APIRouter, UploadFile, File, BackgroundTasks, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session
from app.utils.database import get_db
from app.schemas.batch import BatchRequest, BatchResponse
from app.schemas.batch import BatchCreateResponse, BatchOut
from app.services.batch_service import create_batch_service, get_batch_service, process_batch_background

router = APIRouter(prefix="/batch", tags=["Batch"])

@router.post("", response_model=BatchCreateResponse)
async def create_batch(
    background: BackgroundTasks,
    files: List[UploadFile] = File(...),
    db: Session = Depends(get_db)
):
    if not files:
        raise HTTPException(400, "No files uploaded")

    batch = await create_batch_service(db, files)

    # Background processing (async task)
    background.add_task(process_batch_background, db, batch.id)

    return BatchCreateResponse(
        batch_id=batch.id,
        status=batch.status,
        file_count=batch.file_count,
    )


@router.get("/{batch_id}", response_model=BatchOut)
def get_batch(batch_id: int, db: Session = Depends(get_db)):
    batch = get_batch_service(db, batch_id)
    if not batch:
        raise HTTPException(404, "Batch not found")
    return batch


def _process_batch(db: Session, batch_id: int):
    # Fetch the batch
    batch: models.Batch = db.get(models.Batch, batch_id)
    if not batch:
        return

    # Mark as processing
    batch.status = models.BatchStatus.processing
    db.commit()
    db.refresh(batch)

    try:
        # Get all verifications for this batch that are still "created"
        q = db.execute(
            select(models.Verification).where(
                models.Verification.batch_id == batch_id,
                models.Verification.status == "created"
            )
        )
        items = [row[0] for row in q.all()]

        # Process each verification
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

        # Mark batch completed
        batch.status = models.BatchStatus.completed
        db.commit()

    except Exception as e:
        # If something goes wrong at batch level
        batch.status = models.BatchStatus.failed
        batch.error = str(e)
        db.commit()