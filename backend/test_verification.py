from fastapi.testclient import TestClient
from app import app

client = TestClient(app)


def test_claim_verification():
    response = client.post(
        "/verification/verify",
        json={
            "age": 50,
            "claim_amount": 20000,
            "pre_existing": 1,
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert "status" in data
    assert data["status"] in ["approved", "denied"]
