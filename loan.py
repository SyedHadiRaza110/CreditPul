def get_loan_recommendation(score_label):
    tiers = {
        "High": {"loan_limit": 100000, "interest_rate": 8.5},
        "Medium": {"loan_limit": 50000, "interest_rate": 14.0},
        "Low": {"loan_limit": 15000, "interest_rate": 22.0},
    }
    return tiers.get(score_label, {"loan_limit": 0, "interest_rate": 0})
