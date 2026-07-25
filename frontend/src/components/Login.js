import { useState } from "react";
import { useLanguage } from "../LanguageContext";

function Login({ onLogin }) {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);
      onLogin(data);
      window.location.href = "/";
    } catch (err) {
      setError("Backend not reachable");
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <h2>{t("loginTitle")}</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="form-group">
          <label>{t("email")}</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>{t("password")}</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn">{t("loginBtn")}</button>
      </form>
    </div>
  );
}

export default Login;
