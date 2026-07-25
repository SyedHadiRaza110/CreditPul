import pandas as pd
import numpy as np
import random

random.seed(42)
np.random.seed(42)

n = 300
data = []

for _ in range(n):
    mobile_recharge_avg = round(np.random.uniform(100, 3000), 2)
    utility_bill_ontime_pct = round(np.random.uniform(0, 100), 2)
    monthly_transactions = random.randint(0, 50)
    employment_type = random.choice(['salaried', 'self-employed', 'daily-wage', 'unemployed'])
    monthly_income = round(np.random.uniform(8000, 150000), 2)
    existing_debt = random.choice(['yes', 'no'])
    mobile_wallet_txn_volume = round(np.random.uniform(500, 50000), 2)
    residence_years = random.randint(0, 20)

    score_points = 0
    if utility_bill_ontime_pct > 80: score_points += 2
    elif utility_bill_ontime_pct > 50: score_points += 1

    if monthly_transactions > 30: score_points += 2
    elif monthly_transactions > 15: score_points += 1

    if mobile_recharge_avg > 1500: score_points += 1

    if employment_type in ['salaried', 'self-employed']: score_points += 1

    if monthly_income > 100000: score_points += 2
    elif monthly_income > 40000: score_points += 1

    if existing_debt == 'no': score_points += 1

    if mobile_wallet_txn_volume > 20000: score_points += 1

    if residence_years > 3: score_points += 1

    if score_points >= 7: credit_score = 'High'
    elif score_points >= 4: credit_score = 'Medium'
    else: credit_score = 'Low'

    data.append([mobile_recharge_avg, utility_bill_ontime_pct, monthly_transactions, employment_type,
                 monthly_income, existing_debt, mobile_wallet_txn_volume, residence_years, credit_score])

df = pd.DataFrame(data, columns=['mobile_recharge_avg', 'utility_bill_ontime_pct', 'monthly_transactions',
                                  'employment_type', 'monthly_income', 'existing_debt',
                                  'mobile_wallet_txn_volume', 'residence_years', 'credit_score'])
df.to_csv('dataset.csv', index=False)
print("Dataset generated successfully!")
