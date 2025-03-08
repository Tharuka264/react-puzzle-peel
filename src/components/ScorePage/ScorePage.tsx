import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ScorePage.css";

const ScorePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const score = location.state?.score || 0;
  const email = sessionStorage.getItem("userEmail");

  useEffect(() => {
    console.log("Updating score");
    if (email) {
      fetch("http://localhost:8081/updateScore", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newScore: score }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to update score");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Score updated successfully:", data);
        })
        .catch((err) => {
          console.error("Error updating score:", err);
        });
    }
  }, [email, score]);

  const handleRestart = () => {
    navigate("/game");
  };

  const handleHome = () => {
    navigate("/home");
  };

  const getStarCount = (score: number): number => {
    if (score <= 0) return 0;
    if (score > 0 && score <= 50) return 1;
    if (score > 50 && score <= 100) return 2;
    return 3;
  };

  const starCount = getStarCount(score);

  const starsArray = Array.from({ length: starCount }, (_, i) => (
    <span key={i} className="star">
      &#9733;
    </span>
  ));

  return (
    <>
      <div className="score-container d-flex flex-column align-items-center justify-content-center vh-100">
        <div className="level-complete-container">
          <div className="content-box">
            <h2 className="level-title">Complete</h2>

            <div className="stars">{starsArray}</div>

            <div className="score">Score: {score.toLocaleString()}</div>
          </div>

          <div className="nav-buttons">
            <button onClick={handleRestart} className="custom-button">
              Play Again
            </button>

            <button className="home-button custom-button" onClick={handleHome}>
              Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScorePage;
