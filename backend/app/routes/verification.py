from fastapi import APIRouter, UploadFile, File, Request

router = APIRouter()

@router.post("/upload")
async def upload_card(file: UploadFile = File(...)):
    # Simulate extraction
    return {
        "patientName": "John Smith",
        "policyNumber": "BC12345678",
        "insuranceCompany": "Blue Cross Blue Shield",
        "groupNumber": "GRP001",
        "riskScore": 85,
        "status": "Verified"
    }

@router.post("/verify")
async def verify_coverage(request: Request):
    data = await request.json()
    # Simulate verification response
    return {
        "coverageStatus": "Active",
        "riskScore": 85,
        "details": {
            "policyNumber": data.get("policyNumber"),
            "insuranceCompany": data.get("insuranceCompany"),
            "patientName": data.get("patientName")
        }
    }
