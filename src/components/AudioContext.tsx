import { createContext, useState, ReactNode } from "react";

// Tipo para el audio
type AudioType = {
  urls: { high_mp3: string };
  title: string;
  channel: {
    urls: {
      logo_image: { original: string };
    };
  };
};

// Crear el contexto de audio
export const AudioContext = createContext<{
  audio: AudioType | null;
  setAudio: (audio: AudioType | null) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}>({
  audio: null,
  setAudio: () => {},
  isPlaying: false,
  setIsPlaying: () => {},
});

// Proveedor de audio
export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [audio, setAudio] = useState<AudioType | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <AudioContext.Provider value={{ audio, setAudio, isPlaying, setIsPlaying }}>
      {children}
    </AudioContext.Provider>
  );
};
