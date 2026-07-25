import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../LanguageContext";

function Signup() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Signup failed");
        return;
      }
      setDone(true);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError("Backend not reachable");
    }
  };

  if (done) return <div className="card"><p>Registered. Redirecting...</p></div>;

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <h2>{t("signupTitle")}</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="form-group">
          <label>{t("name")}</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>{t("email")}</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>{t("password")}</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn">{t("signupBtn")}</button>
      </form>
    </div>
  );
}

export default Signup;
