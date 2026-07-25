CREATE DATABASE IF NOT EXISTS creditpul_db;
USE creditpul_db;

CREATE TABLE score_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mobile_recharge_avg FLOAT,
  utility_bill_ontime_pct FLOAT,
  monthly_transactions INT,
  employment_type VARCHAR(50),
  credit_score VARCHAR(10),
  explanation TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);