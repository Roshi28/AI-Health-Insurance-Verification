def compute_risk_score(row: dict) -> float:
    """
    Dummy scoring logic. Replace with your actual ML model.
    """
    amount = float(row.get("amount") or 0)
    score = min(amount / 10000.0, 1.0)  # naive heuristic
    return score

def label_from_score(score: float) -> str:
    if score is None:
        return "unknown"
    if score >= 0.7:
        return "high"
    if score >= 0.4:
        return "medium"
    return "low"
