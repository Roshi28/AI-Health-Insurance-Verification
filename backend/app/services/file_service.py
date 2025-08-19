import os
from fastapi import UploadFile
from app.config import settings


def save_uploaded_file(file: UploadFile, subdir: str = "claims") -> str:
    """
    Save an uploaded file to the server.
    Returns the file path.
    """
    upload_dir = os.path.join(settings.UPLOAD_DIR, subdir)
    os.makedirs(upload_dir, exist_ok=True)

    file_path = os.path.join(upload_dir, file.filename)
    with open(file_path, "wb") as f:
        f.write(file.file.read())

    return file_path
