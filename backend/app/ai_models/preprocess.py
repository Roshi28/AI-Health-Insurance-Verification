import pandas as pd
from typing import Dict, Any


def preprocess_input(data: Dict[str, Any]) -> pd.DataFrame:
    """
    Preprocess input dictionary into a DataFrame suitable for model prediction.

    Args:
        data (dict): Input data, e.g. {
            "age": 45,
            "claim_amount": 12000,
            "pre_existing": 1
        }

    Returns:
        pd.DataFrame: Processed features
    """
    # Convert to DataFrame
    df = pd.DataFrame([data])

    # Ensure correct data types
    df["age"] = df["age"].astype(int)
    df["claim_amount"] = df["claim_amount"].astype(float)
    df["pre_existing"] = df["pre_existing"].astype(int)

    # If you had categorical variables, you'd encode them here
    # Example: df["gender"] = df["gender"].map({"male": 0, "female": 1})

    return df
