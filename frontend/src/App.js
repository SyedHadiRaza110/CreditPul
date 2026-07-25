import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import FormPage from "./components/FormPage";
import ResultPage from "./components/ResultPage";
import HistoryPage from "./components/HistoryPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import AdminPanel from "./components/AdminPanel";
import BackgroundShapes from "./components/BackgroundShapes";
import { LanguageProvider, useLanguage } from "./LanguageContext";
import "./App.css";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (!token) return <Navigate to="/login" />;
  if (role !== "admin") return <Navigate to="/" />;
  return children;
}

function AppContent() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const { lang, setLanguage, t } = useLanguage();

  return (
    <Router>
      <div className="app-container" dir={lang === "ur" ? "rtl" : "ltr"}>
        <BackgroundShapes />
        <nav className="navbar">
          <h1>
            <svg className="bridge-logo" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 26C4 26 10 14 20 14C30 14 36 26 36 26" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="10" y1="18" x2="10" y2="30" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="30" y1="18" x2="30" y2="30" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="4" y1="30" x2="36" y2="30" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
            CreditPul
          </h1>
          <div className="nav-links">
            {loggedIn ? (
              <>
                <Link to="/">{t("navNewCheck")}</Link>
                <Link to="/dashboard">{t("navHistory")}</Link>
                {localStorage.getItem("role") === "admin" && <Link to="/admin">{t("navAdmin")}</Link>}
                <button onClick={() => {
                  localStorage.clear();
                  setLoggedIn(false);
                  window.location.href = "/login";
                }}>{t("navLogout")}</button>
              </>
            ) : (
              <>
                <Link to="/login">{t("navLogin")}</Link>
                <Link to="/signup">{t("navSignup")}</Link>
              </>
            )}
            <select value={lang} onChange={(e) => setLanguage(e.target.value)} className="lang-select">
              <option value="en">English</option>
              <option value="ur">اردو</option>
            </select>
          </div>
        </nav>

        <div className="page-content">
          <Routes>
            <Route path="/login" element={<Login onLogin={() => setLoggedIn(true)} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<ProtectedRoute><FormPage /></ProtectedRoute>} />
            <Route path="/result" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
