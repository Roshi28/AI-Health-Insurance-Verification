from typing import Dict, Any
import random


def submit_claim_to_clearinghouse(claim_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Simulates sending a claim to a clearinghouse and getting a response.
    In production, this would be an API integration.
    """
    # Randomly simulate approval or denial
    decision = random.choice(["approved", "denied"])

    response = {
        "claim_id": claim_data.get("claim_id"),
        "status": decision,
        "reason": None if decision == "approved" else "Incomplete documentation",
        "processed_amount": (
            claim_data.get("claim_amount", 0) if decision == "approved" else 0
        ),
    }
    return response
