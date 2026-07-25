from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import json
import os

from auth import auth_bp, get_db, token_required
from history import history_bp
from admin_routes import admin_bp
from loan import get_loan_recommendation

app = Flask(__name__)
app.register_blueprint(auth_bp)
app.register_blueprint(history_bp)
app.register_blueprint(admin_bp)
CORS(app)

model = joblib.load("model.pkl")
le_emp = joblib.load("le_emp.pkl")
le_debt = joblib.load("le_debt.pkl")
le_score = joblib.load("le_score.pkl")


def generate_explanation(data, score):
    reasons = []
    if data["utility_bill_ontime_pct"] > 80: reasons.append("excellent bill payments")
    elif data["utility_bill_ontime_pct"] < 50: reasons.append("low bill payments")

    if data["monthly_income"] > 100000: reasons.append("strong monthly income")
    elif data["monthly_income"] < 40000: reasons.append("low monthly income")

    if data["existing_debt"] == "no": reasons.append("no existing debt")
    else: reasons.append("existing debt on record")

    if data["employment_type"] in ["salaried", "self-employed"]: reasons.append("stable employment")
    elif data["employment_type"] == "unemployed": reasons.append("unemployed status")

    if not reasons: reasons.append("average metrics")
    joined = ", ".join(reasons[:2])
    return f"Score is {score}, mainly because of {joined}."


@app.route("/predict", methods=["POST"])
@token_required
def predict():
    data = request.json

    emp_encoded = le_emp.transform([data["employment_type"]])[0]
    debt_encoded = le_debt.transform([data["existing_debt"]])[0]

    features = np.array([[
        data["mobile_recharge_avg"],
        data["utility_bill_ontime_pct"],
        data["monthly_transactions"],
        emp_encoded,
        data["monthly_income"],
        debt_encoded,
        data["mobile_wallet_txn_volume"],
        data["residence_years"]
    ]])

    pred_encoded = model.predict(features)[0]
    score = le_score.inverse_transform([pred_encoded])[0]
    explanation = generate_explanation(data, score)
    loan_info = get_loan_recommendation(score)

    conn = get_db()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO score_history (user_id, score, input_data, loan_limit, interest_rate) "
                "VALUES (%s, %s, %s, %s, %s)",
                (request.user_id, score, json.dumps(data), loan_info["loan_limit"], loan_info["interest_rate"])
            )
            conn.commit()
    finally:
        conn.close()

    return jsonify({
        "score": score,
        "explanation": explanation,
        "loan_limit": loan_info["loan_limit"],
        "interest_rate": loan_info["interest_rate"]
    })


@app.route("/", methods=["GET"])
def health():
    return jsonify({"status": "CreditPul backend running"})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
