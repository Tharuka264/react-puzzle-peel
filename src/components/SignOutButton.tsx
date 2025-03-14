import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAudio } from "../context/AudioContext";

const SignOutButton = () => {
  const navigate = useNavigate();
  const { isMuted, pauseAudio } = useAudio();

  const handleSignOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    pauseAudio();
    navigate("/");
  };

  return (
    <button
      onClick={handleSignOut}
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        background: "linear-gradient(to bottom, #D32F2F, #9A0007)",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "50%",
        cursor: "pointer",
        zIndex: 9999,
      }}
    >
      <LogOut size={32} />
    </button>
  );
};

export default SignOutButton;
