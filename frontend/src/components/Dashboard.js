import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const SCORE_VALUE = { Low: 1, Medium: 2, High: 3 };
const VALUE_LABEL = { 1: "Low", 2: "Medium", 3: "High" };

function Dashboard() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/history", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setHistory(data);
        } else {
          setError(data.error || "Session expired. Please login again.");
        }
      })
      .catch(() => setError("Failed to load history"));
  }, []);

  const trendData = Array.isArray(history)
    ? [...history].reverse().map((row) => ({
        date: new Date(row.created_at).toLocaleDateString(),
        scoreValue: SCORE_VALUE[row.score] || 0
      }))
    : [];

  return (
    <div className="card" style={{ maxWidth: "700px" }}>
      <h2>Score History</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {trendData.length > 1 && (
        <div className="chart-container" style={{ height: "200px", marginBottom: "24px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="date" tick={{ fill: "#b6aed9", fontSize: 11 }} />
              <YAxis domain={[0, 4]} ticks={[1, 2, 3]} tickFormatter={(v) => VALUE_LABEL[v] || ""} tick={{ fill: "#b6aed9", fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: "#2f2166", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#f2eefc" }}
                formatter={(v) => VALUE_LABEL[v] || v}
              />
              <Line type="monotone" dataKey="scoreValue" stroke="#4a8fa6" strokeWidth={2} dot={{ fill: "#4a8fa6", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Score</th>
            <th>Loan Limit</th>
            <th>Interest Rate</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(history) && history.map((row) => (
            <tr key={row.id}>
              <td>{row.score}</td>
              <td>{row.loan_limit}</td>
              <td>{row.interest_rate}%</td>
              <td>{new Date(row.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
