import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLanguage } from "../LanguageContext";

const FormPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    mobile_recharge_avg: "",
    mobile_wallet_txn_volume: "",
    monthly_transactions: "",
    utility_bill_ontime_pct: "",
    monthly_income: "",
    existing_debt: "",
    employment_type: "",
    residence_years: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const stepFields = [
    ["mobile_recharge_avg", "mobile_wallet_txn_volume", "monthly_transactions"],
    ["utility_bill_ontime_pct", "monthly_income", "existing_debt"],
    ["employment_type", "residence_years"]
  ];

  const validateStep = () => {
    const tempErrors = {};
    stepFields[step].forEach((field) => {
      if (formData[field] === "" || formData[field] === null) {
        tempErrors[field] = "Required";
      }
    });
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    try {
      const payload = {
        ...formData,
        mobile_recharge_avg: parseFloat(formData.mobile_recharge_avg),
        utility_bill_ontime_pct: parseFloat(formData.utility_bill_ontime_pct),
        monthly_transactions: parseInt(formData.monthly_transactions),
        monthly_income: parseFloat(formData.monthly_income),
        mobile_wallet_txn_volume: parseFloat(formData.mobile_wallet_txn_volume),
        residence_years: parseInt(formData.residence_years)
      };

      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:5000/predict", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate("/result", { state: { ...payload, result: response.data } });
    } catch (error) {
      console.error("Prediction failed:", error);
      alert("Failed to get prediction. Is the backend running?");
    }
  };

  const stepTitles = [t("step1Title"), t("step2Title"), t("step3Title")];

  return (
    <div className="card">
      <div className="wizard-progress">
        {[0, 1, 2].map((i) => (
          <React.Fragment key={i}>
            <div className={`wizard-dot ${step === i ? "active" : ""} ${step > i ? "done" : ""}`}>
              {step > i ? "✓" : i + 1}
            </div>
            {i < 2 && <div className={`wizard-connector ${step > i ? "done" : ""}`} />}
          </React.Fragment>
        ))}
      </div>

      <div className="step-title">{stepTitles[step]}</div>
      <h2>{t("formTitle")}</h2>
      <p style={{ color: "#8d96ae", marginBottom: "20px" }}>{t("formSubtitle")}</p>

      <form onSubmit={step === 2 ? handleSubmit : (e) => e.preventDefault()}>
        <div className="step-fade" key={step}>
          {step === 0 && (
            <>
              <div className="form-group">
                <label>{t("mobileRecharge")}</label>
                <input type="number" name="mobile_recharge_avg" value={formData.mobile_recharge_avg} onChange={handleChange} placeholder="e.g. 1500" />
                {errors.mobile_recharge_avg && <div className="error-msg">{errors.mobile_recharge_avg}</div>}
              </div>
              <div className="form-group">
                <label>{t("mobileWallet")}</label>
                <input type="number" name="mobile_wallet_txn_volume" value={formData.mobile_wallet_txn_volume} onChange={handleChange} placeholder="e.g. 12000" />
                {errors.mobile_wallet_txn_volume && <div className="error-msg">{errors.mobile_wallet_txn_volume}</div>}
              </div>
              <div className="form-group">
                <label>{t("monthlyTransactions")}</label>
                <input type="number" name="monthly_transactions" value={formData.monthly_transactions} onChange={handleChange} placeholder="e.g. 25" />
                {errors.monthly_transactions && <div className="error-msg">{errors.monthly_transactions}</div>}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="form-group">
                <label>{t("utilityBill")}</label>
                <input type="number" name="utility_bill_ontime_pct" value={formData.utility_bill_ontime_pct} onChange={handleChange} placeholder="e.g. 85" />
                {errors.utility_bill_ontime_pct && <div className="error-msg">{errors.utility_bill_ontime_pct}</div>}
              </div>
              <div className="form-group">
                <label>{t("monthlyIncome")}</label>
                <input type="number" name="monthly_income" value={formData.monthly_income} onChange={handleChange} placeholder="e.g. 45000" />
                {errors.monthly_income && <div className="error-msg">{errors.monthly_income}</div>}
              </div>
              <div className="form-group">
                <label>{t("existingDebt")}</label>
                <select name="existing_debt" value={formData.existing_debt} onChange={handleChange}>
                  <option value="">{t("selectOption")}</option>
                  <option value="yes">{t("yes")}</option>
                  <option value="no">{t("no")}</option>
                </select>
                {errors.existing_debt && <div className="error-msg">{errors.existing_debt}</div>}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="form-group">
                <label>{t("employmentType")}</label>
                <select name="employment_type" value={formData.employment_type} onChange={handleChange}>
                  <option value="">{t("selectOption")}</option>
                  <option value="salaried">{t("salaried")}</option>
                  <option value="self-employed">{t("selfEmployed")}</option>
                  <option value="daily-wage">{t("dailyWage")}</option>
                  <option value="unemployed">{t("unemployed")}</option>
                </select>
                {errors.employment_type && <div className="error-msg">{errors.employment_type}</div>}
              </div>
              <div className="form-group">
                <label>{t("residenceYears")}</label>
                <input type="number" name="residence_years" value={formData.residence_years} onChange={handleChange} placeholder="e.g. 5" />
                {errors.residence_years && <div className="error-msg">{errors.residence_years}</div>}
              </div>
            </>
          )}
        </div>

        <div className="wizard-nav">
          {step > 0 && (
            <button type="button" className="btn btn-secondary" onClick={handleBack}>{t("back")}</button>
          )}
          {step < 2 && (
            <button type="button" className="btn" onClick={handleNext}>{t("next")}</button>
          )}
          {step === 2 && (
            <button type="submit" className="btn">{t("generateScore")}</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormPage;
