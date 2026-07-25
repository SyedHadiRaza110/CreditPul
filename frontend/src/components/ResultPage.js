import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useLanguage } from "../LanguageContext";

const TIER_ANGLE = { Low: -60, Medium: 0, High: 60 };

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  if (!location.state || !location.state.result) {
    return (
      <div className="card">
        <p>No result found. Please submit the form first.</p>
        <button className="btn btn-secondary" onClick={() => navigate("/")}>{t("checkAnother")}</button>
      </div>
    );
  }

  const { mobile_recharge_avg, utility_bill_ontime_pct, monthly_transactions } = location.state;
  const { score, explanation, loan_limit, interest_rate } = location.state.result;
  const scoreClass = score.toLowerCase();
  const angle = TIER_ANGLE[score] ?? 0;
  const userName = localStorage.getItem("name") || "User";
  const today = new Date().toLocaleDateString();

  const chartData = [
    { name: "Recharge", value: mobile_recharge_avg },
    { name: "Bill Pay %", value: utility_bill_ontime_pct },
    { name: "Transactions", value: monthly_transactions }
  ];

  return (
    <>
      <div className="card result-card">
        <h2>{t("resultTitle")}</h2>

        <div className="gauge-wrap">
          <svg width="220" height="130" viewBox="0 0 220 130">
            <path d="M 25 110 A 85 85 0 0 1 67.5 36.4" stroke="#c94f7c" strokeWidth="14" fill="none" strokeLinecap="round" />
            <path d="M 67.5 36.4 A 85 85 0 0 1 152.5 36.4" stroke="#8c5fc0" strokeWidth="14" fill="none" />
            <path d="M 152.5 36.4 A 85 85 0 0 1 195 110" stroke="#4a8fa6" strokeWidth="14" fill="none" strokeLinecap="round" />
            <g className="gauge-needle" style={{ transform: `rotate(${angle}deg)`, transformOrigin: "110px 110px" }}>
              <line x1="110" y1="110" x2="110" y2="40" stroke="#f2eefc" strokeWidth="3" strokeLinecap="round" />
            </g>
            <circle cx="110" cy="110" r="8" fill="#f2eefc" />
          </svg>
        </div>

        <div className={`score-label ${scoreClass}`}>{score}</div>
        <p className="caption-text">{explanation}</p>

        <div className="stat-row">
          <div className="stat-card">
            <div className="stat-value">PKR {Number(loan_limit).toLocaleString()}</div>
            <div className="stat-label">{t("loanLimit")}</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{interest_rate}%</div>
            <div className="stat-label">{t("interestRate")}</div>
          </div>
        </div>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="name" tick={{ fill: "#b6aed9", fontSize: 11 }} />
              <YAxis tick={{ fill: "#b6aed9", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "#2f2166", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#f2eefc" }} />
              <Bar dataKey="value" fill="#4a8fa6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <button className="btn" style={{ marginBottom: "10px" }} onClick={() => window.print()}>
          Download Certificate (PDF)
        </button>
        <button className="btn btn-secondary" onClick={() => navigate("/")}>{t("checkAnother")}</button>
      </div>

      <div className="certificate-print">
        <div className="cert-border">
          <h1>CreditPul</h1>
          <div className="cert-sub">Micro-Credit Score Certificate</div>
          <div className="cert-score">{score}</div>
          <div className="cert-row"><span>Name</span><span>{userName}</span></div>
          <div className="cert-row"><span>Date Issued</span><span>{today}</span></div>
          <div className="cert-row"><span>Loan Limit</span><span>PKR {Number(loan_limit).toLocaleString()}</span></div>
          <div className="cert-row"><span>Interest Rate</span><span>{interest_rate}%</span></div>
          <div className="cert-footer">Generated via alternative data assessment. Not a bank-issued credit report.</div>
        </div>
      </div>
    </>
  );
};

export default ResultPage;
