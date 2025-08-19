from typing import Optional
try:
    import pytesseract
    from PIL import Image
except ImportError:
    pytesseract = None
    Image = None


def extract_text_from_image(image_path: str) -> Optional[str]:
    """
    Perform OCR on an image file to extract text.
    Requires Tesseract to be installed.
    """
    if pytesseract is None or Image is None:
        raise ImportError("pytesseract and Pillow are required for OCR.")

    img = Image.open(image_path)
    text = pytesseract.image_to_string(img)
    return text.strip()
