import React, { useState, useEffect } from "react";
import http from "../../../api/http.js";
// import "./AIHistory.css";

export default function AIHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const { data } = await http.get("/api/admin/ai/history");
      setHistory(data.history || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-history-page">
      <h1>🤖 AI Conversation History</h1>
      <button onClick={fetchHistory} className="btn">Refresh</button>

      <div className="history-list">
        {history.length === 0 && !loading && <p>No conversation history yet.</p>}

        {history.map((session, idx) => (
          <div key={idx} className="history-session">
            <div className="session-header">
              <span>Session {idx + 1}</span>
              <span className="time">{new Date(session.timestamp).toLocaleString()}</span>
            </div>
            <div className="messages">
              {session.messages?.map((msg, i) => (
                <div key={i} className={`history-msg ${msg.role}`}>
                  <strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.content}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}