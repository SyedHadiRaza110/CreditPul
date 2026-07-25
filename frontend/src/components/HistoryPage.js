import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('https://creditpul-production.up.railway.app/history');
        setHistory(response.data);
      } catch (error) {
        console.error("Failed to fetch history", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const getScoreClass = (score) => {
    if (score === 'High') return 'high';
    if (score === 'Medium') return 'medium';
    return 'low';
  };

  if (loading) return <div className="card">Loading history...</div>;

  return (
    <div className="card" style={{maxWidth: '900px'}}>
      <h2>Prediction History</h2>
      <p style={{color:'#666', marginBottom:'20px'}}>Last 20 credit assessments.</p>
      
      {history.length === 0 ? (
        <p>No history available yet.</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Employment</th>
              <th>Recharge (PKR)</th>
              <th>Bill %</th>
              <th>Transactions</th>
              <th>Score</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {history.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.employment_type}</td>
                <td>{row.mobile_recharge_avg}</td>
                <td>{row.utility_bill_ontime_pct}</td>
                <td>{row.monthly_transactions}</td>
                <td><span className={`score-badge ${getScoreClass(row.credit_score)}`} style={{fontSize:'0.9rem', padding:'5px 10px', margin:0, display:'inline-block'}}>{row.credit_score}</span></td>
                <td>{new Date(row.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistoryPage;