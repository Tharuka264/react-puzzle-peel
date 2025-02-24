import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import HomePage from "./components/HomePage/HomePage";
import Dashboard from "./components/Dashboard/Dashboard";
import GamePage from "./components/GamePage/GamePage";
import ScorePage from "./components/ScorePage/ScorePage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/score" element={<ScorePage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
