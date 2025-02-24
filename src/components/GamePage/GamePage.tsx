import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./GamePage.css";

const GamePage = () => {
  const [question, setQuestion] = useState("");
  const [solution, setSolution] = useState<number | null>(null);
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const fetchQuestion = async () => {
    try {
      const response = await fetch("https://marcconrad.com/uob/banana/api.php");
      const data = await response.json();
      console.log(data.solution);
      setQuestion(data.question);
      setSolution(data.solution);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  useEffect(() => {
    fetchQuestion();

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          navigate("/score", { state: { score } });
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(answer) === solution) {
      setScore((prev) => prev + 10);
      fetchQuestion();
      setAnswer("");
      setTimeLeft(60);
    } else {
      navigate("/score", { state: { score } });
    }
  };

  return (
    <div className="game-container d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="timer display-4 mb-4">Time Left: {timeLeft}s</h1>

      {question && (
        <img src={question} alt="Puzzle" className="puzzle-image mb-4" />
      )}

      <form
        onSubmit={handleSubmit}
        className="answer-form d-flex flex-column align-items-center"
      >
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter your answer"
          className="form-control mb-3"
          required
        />
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
};

export default GamePage;
