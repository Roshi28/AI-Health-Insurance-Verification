from fastapi.testclient import TestClient
from app import app

client = TestClient(app)


def test_batch_upload_and_processing():
    # Simulate batch upload
    response = client.post(
        "/batch/upload",
        json={
            "batch_name": "Test Batch",
            "claims": [
                {"age": 45, "claim_amount": 12000, "pre_existing": 1},
                {"age": 30, "claim_amount": 5000, "pre_existing": 0},
            ],
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert "batch_id" in data
    assert len(data["claims"]) == 2
