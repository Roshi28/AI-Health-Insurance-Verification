from fastapi import APIRouter

router = APIRouter()

@router.get("/dashboard")
async def dashboard_stats():
    # Simulated dashboard data
    return {
        "verifications": 127,
        "successRate": 94,
        "highRiskAlerts": 12,
        "recentVerifications": [
            {
                "patient": "John Smith",
                "insurance": "Blue Cross Blue Shield",
                "status": "Verified",
                "riskScore": 85,
                "time": "2 min ago"
            },
            {
                "patient": "Maria Garcia",
                "insurance": "Aetna",
                "status": "Needs Auth",
                "riskScore": 25,
                "time": "5 min ago"
            },
            {
                "patient": "David Wilson",
                "insurance": "United Healthcare",
                "status": "Verified",
                "riskScore": 92,
                "time": "8 min ago"
            }
        ]
    }