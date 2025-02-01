import { createContext, useState, ReactNode, useRef, useEffect } from "react";

interface AudioContextType {
  audio: {
    id: number;
    urls: {
      high_mp3: string;
    };
    title: string;
    channel: {
      urls: {
        logo_image: {
          original: string;
        };
      };
    };
    episode_number?: number;
  } | null;
  isPlaying: boolean;
  setAudio: (audio: AudioContextType["audio"]) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  volume: number;
  setVolume: (volume: number) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

export const AudioContext = createContext<AudioContextType>({
  audio: null,
  isPlaying: false,
  setAudio: () => {},
  setIsPlaying: () => {},
  volume: 1,
  setVolume: () => {},
  audioRef: { current: null },
});

export function AudioProvider({ children }: { children: ReactNode }) {
  const [audio, setAudio] = useState<AudioContextType["audio"]>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current || !audio) return;

    // Actualizar volumen
    audioRef.current.volume = volume;

    const handlePlayback = async () => {
      try {
        if (isPlaying) {
          const playPromise = audioRef.current?.play();
          if (playPromise !== undefined) {
            await playPromise;
          }
        } else {
          audioRef.current?.pause();
        }
      } catch (error) {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      }
    };

    handlePlayback();
  }, [audio, isPlaying, volume]);

  return (
    <AudioContext.Provider
      value={{
        audio,
        isPlaying,
        setAudio,
        setIsPlaying,
        volume,
        setVolume,
        audioRef,
      }}
    >
      <audio ref={audioRef} src={audio?.urls.high_mp3 || ""} />
      {children}
    </AudioContext.Provider>
  );
}
