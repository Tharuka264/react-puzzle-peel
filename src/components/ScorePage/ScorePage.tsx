import { useLocation, useNavigate } from "react-router-dom";
import "./ScorePage.css";

const ScorePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score || 0;

  const handleRestart = () => {
    navigate("/game");
  };

  return (
    <div className="score-container d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="display-3 mb-4">Your Score: {score}</h1>
      <button onClick={handleRestart} className="btn btn-primary">
        Play Again
      </button>
    </div>
  );
};

export default ScorePage;
