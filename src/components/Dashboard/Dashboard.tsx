import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";
import MuteButton from "../MuteButton";
import SignOutButton from "../SignOutButton";

interface Score {
  userName: string;
  email: string;
  highest_score: number;
}

const Dashboard: React.FC = () => {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const currentUserEmail = sessionStorage.getItem("userEmail");
  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get("http://localhost:8081/getScores");
        setScores(response.data);
      } catch (err) {
        setError("Failed to fetch scores. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  const getListItemClass = (email: string) => {
    return email === currentUserEmail ? "highlighted" : "";
  };

  const handleHome = () => {
    navigate("/home");
  };

  return (
    <div className="dash-container ">
      <div className="dashboard-container">
        <div className="background-shapes"></div>

        <div className="leaderboard-box">
          <h1 className="leaderboard-title">LEADERBOARD</h1>

          {loading ? (
            <div className="loading">Loading...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <div className="leaderboard-list">
              {scores.map((score, index) => (
                <div
                  className={`leaderboard-item ${getListItemClass(
                    score.email
                  )}`}
                  key={score.email}
                >
                  <div className="rank">{index + 1}</div>

                  <div className="user-details">
                    <span className="user-name">{score.userName}</span>
                    <span className="user-score">{score.highest_score}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="btn-container">
            <button className="dashhome-btn custom-button" onClick={handleHome}>
              Home
            </button>
          </div>
        </div>
      </div>
      <SignOutButton />
      <MuteButton />
    </div>
  );
};

export default Dashboard;
