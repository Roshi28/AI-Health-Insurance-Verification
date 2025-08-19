import re
from typing import Dict


def extract_insurance_entities(text: str) -> Dict[str, str]:
    """
    Simple NLP extractor for insurance documents.
    In production, replace with spaCy or transformers.
    """
    result = {}

    # Regex-based extraction (demo only)
    name_match = re.search(r"Name:\s*([A-Za-z ]+)", text)
    if name_match:
        result["patient_name"] = name_match.group(1).strip()

    policy_match = re.search(r"Policy\s*#:\s*(\w+)", text)
    if policy_match:
        result["policy_number"] = policy_match.group(1).strip()

    hosp_match = re.search(r"Hospital:\s*([A-Za-z ]+)", text)
    if hosp_match:
        result["hospital"] = hosp_match.group(1).strip()

    return result
