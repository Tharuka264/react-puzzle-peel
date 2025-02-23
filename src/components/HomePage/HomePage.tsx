import "./HomePage.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  return (
    <div className="home-container vh-100 d-flex flex-column justify-content-center align-items-center">
      {email ? <p>Your email is: {email}</p> : <p>Email not available.</p>}
      <h1 className="text-center" style={{ color: "#4F0640" }}>
        PUZZLE PEEL
      </h1>

      <img
        src="/src/assets/home-page-img.png"
        alt="Puzzle Peel"
        className="img-fluid mt-4"
        style={{ maxWidth: "200px" }}
      />

      <div className="mt-5 d-flex flex-column gap-4">
        <button className="custom-button">Play</button>
        <button
          className="custom-button"
          onClick={() => navigate("/dashboard", { state: { email } })}
        >
          Dashboard
        </button>
      </div>
    </div>
  );
};

export default HomePage;
