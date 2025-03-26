import { useAudio } from "../context/AudioContext";
import { Volume2, VolumeX } from "lucide-react";
const MuteButton = () => {
  const { isMuted, toggleAudio } = useAudio();

  return (
    <button
      onClick={toggleAudio}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "linear-gradient(to bottom, #45982E, #17320F)",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "50%",
        cursor: "pointer",
        zIndex: 9999,
      }}
    >
      {isMuted ? <VolumeX size={32} /> : <Volume2 size={32} />}
    </button>
  );
};

export default MuteButton;
