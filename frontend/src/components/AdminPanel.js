import { useEffect, useState } from "react";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [scores, setScores] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    fetch("http://localhost:5000/admin/users", { headers })
      .then((res) => res.json())
      .then(setUsers)
      .catch(() => setError("Failed to load users"));

    fetch("http://localhost:5000/admin/scores", { headers })
      .then((res) => res.json())
      .then(setScores)
      .catch(() => setError("Failed to load scores"));
  }, []);

  return (
    <div>
      <h2>Admin Panel</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>Users</h3>
      <table border="1" cellPadding="8">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th></tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td><td>{u.email}</td><td>{u.role}</td>
              <td>{new Date(u.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>All Scores</h3>
      <table border="1" cellPadding="8">
        <thead>
          <tr><th>User</th><th>Score</th><th>Loan Limit</th><th>Rate</th><th>Date</th></tr>
        </thead>
        <tbody>
          {scores.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td><td>{s.score}</td><td>{s.loan_limit}</td>
              <td>{s.interest_rate}%</td>
              <td>{new Date(s.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
