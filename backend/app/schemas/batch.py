from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class BatchBase(BaseModel):
    file_name: str

class BatchCreate(BatchBase):
    pass

class BatchResponse(BatchBase):
    id: int
    uploaded_at: datetime
    status: Optional[str] = None

    class Config:
        orm_mode = True
