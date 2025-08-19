from fastapi.testclient import TestClient
from app import app

client = TestClient(app)


def test_signup_and_login():
    # Signup
    response = client.post(
        "/auth/signup",
        json={
            "email": "testuser@example.com",
            "password": "testpassword",
            "full_name": "Test User",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "testuser@example.com"

    # Login
    response = client.post(
        "/auth/login",
        data={"username": "testuser@example.com", "password": "testpassword"},
    )
    assert response.status_code == 200
    token_data = response.json()
    assert "access_token" in token_data
    assert token_data["token_type"] == "bearer"
