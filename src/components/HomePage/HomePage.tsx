import "./HomePage.css";
import { useLocation, useNavigate } from "react-router-dom";

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="home-container vh-100 d-flex flex-column justify-content-center align-items-center position-relative">
      <button
        className="signout-button position-absolute top-0 end-0 m-3 custom-button btn-success"
        onClick={handleSignOut}
      >
        Sign Out
      </button>

      <h1
        className="text-center spicy-rice-regular"
        style={{ color: "#4F0640" }}
      >
        PUZZLE PEEL
      </h1>
      <img
        src="/src/assets/home-page-img.png"
        alt="Puzzle Peel"
        className="img-fluid mt-4"
        style={{ maxWidth: "200px" }}
      />

      <div className="mt-5 d-flex flex-column gap-4">
        <button
          className="custom-button btn-success w-100"
          onClick={() => navigate("/game")}
        >
          Play
        </button>
        <button
          className="custom-button btn-success w-100"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>
      </div>
    </div>
  );
};

export default HomePage;
