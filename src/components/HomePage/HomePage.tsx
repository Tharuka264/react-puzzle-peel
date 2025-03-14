import "./HomePage.css";
import { useAudio } from "../../context/AudioContext";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import MuteButton from "../MuteButton";
import SignOutButton from "../SignOutButton";

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { playAudio } = useAudio();

  useEffect(() => {
    playAudio();
  }, [playAudio]);

  return (
    <div className="home-container vh-100 d-flex flex-column justify-content-center align-items-center position-relative">
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
        <SignOutButton />
        <MuteButton />
      </div>
    </div>
  );
};

export default HomePage;
