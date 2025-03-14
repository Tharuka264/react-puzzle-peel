import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";

interface AudioContextType {
  isMuted: boolean;
  toggleAudio: () => void;
  playAudio: () => void;
  pauseAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider = ({ children }: AudioProviderProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/game-audio.mp3");
      audioRef.current.loop = true;
    }
  }, []);

  const playAudio = async () => {
    try {
      await audioRef.current?.play();
    } catch (error) {
      console.error("Audio play failed:", error);
    }
  };

  const pauseAudio = () => {
    audioRef.current?.pause();
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <AudioContext.Provider
      value={{ isMuted, toggleAudio, playAudio, pauseAudio }}
    >
      {children}
    </AudioContext.Provider>
  );
};
