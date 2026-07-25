import React, { createContext, useContext, useState } from "react";

const translations = {
  en: {
    navNewCheck: "New Check", navHistory: "History", navAdmin: "Admin",
    navLogin: "Login", navSignup: "Signup", navLogout: "Logout",
    formTitle: "Assess Credit Worthiness",
    formSubtitle: "Enter alternative data metrics to generate a micro-credit score.",
    mobileRecharge: "Mobile Recharge Average (PKR)",
    utilityBill: "Utility Bill On-Time Percentage (%)",
    monthlyTransactions: "Monthly Transactions Count",
    employmentType: "Employment Type",
    selectOption: "-- Select --",
    salaried: "Salaried", selfEmployed: "Self-Employed", dailyWage: "Daily-Wage", unemployed: "Unemployed",
    monthlyIncome: "Monthly Income (PKR)",
    existingDebt: "Existing Loan / Debt",
    yes: "Yes", no: "No",
    mobileWallet: "Mobile Wallet Transaction Volume (PKR/month)",
    residenceYears: "Years at Current Residence",
    generateScore: "Generate Score",
    loginTitle: "Login", email: "Email", password: "Password", loginBtn: "Login",
    signupTitle: "Signup", name: "Name", signupBtn: "Signup",
    resultTitle: "Credit Assessment Result", checkAnother: "Check Another",
    loanLimit: "Loan Limit", interestRate: "Interest Rate",
    next: "Next", back: "Back",
    step1Title: "Financial Activity", step2Title: "Bills & Income", step3Title: "Employment & Home"
  },
  ur: {
    navNewCheck: "نیا چیک", navHistory: "ہسٹری", navAdmin: "ایڈمن",
    navLogin: "لاگ ان", navSignup: "سائن اپ", navLogout: "لاگ آؤٹ",
    formTitle: "کریڈٹ کی اہلیت کا تعین کریں",
    formSubtitle: "مائیکرو کریڈٹ سکور بنانے کے لیے متبادل ڈیٹا درج کریں۔",
    mobileRecharge: "موبائل ریچارج اوسط (روپے)",
    utilityBill: "یوٹیلیٹی بل بروقت ادائیگی (%)",
    monthlyTransactions: "ماہانہ لین دین کی تعداد",
    employmentType: "روزگار کی قسم",
    selectOption: "-- منتخب کریں --",
    salaried: "تنخواہ دار", selfEmployed: "خود روزگار", dailyWage: "یومیہ اجرت", unemployed: "بے روزگار",
    monthlyIncome: "ماہانہ آمدنی (روپے)",
    existingDebt: "موجودہ قرض",
    yes: "جی ہاں", no: "نہیں",
    mobileWallet: "موبائل والٹ لین دین (روپے ماہانہ)",
    residenceYears: "موجودہ رہائش پر سال",
    generateScore: "سکور بنائیں",
    loginTitle: "لاگ ان", email: "ای میل", password: "پاس ورڈ", loginBtn: "لاگ ان کریں",
    signupTitle: "سائن اپ", name: "نام", signupBtn: "سائن اپ کریں",
    resultTitle: "کریڈٹ اسسمنٹ نتیجہ", checkAnother: "دوبارہ چیک کریں",
    loanLimit: "قرض کی حد", interestRate: "شرح سود",
    next: "اگلا", back: "پیچھے",
    step1Title: "مالی سرگرمی", step2Title: "بل اور آمدنی", step3Title: "روزگار اور رہائش"
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(localStorage.getItem("lang") || "en");

  const setLanguage = (code) => {
    setLangState(code);
    localStorage.setItem("lang", code);
  };

  const t = (key) => translations[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
