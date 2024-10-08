import { useEffect, useState } from "react";
import "./PlayBar.css";

type PlayBarProps = {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  volume: number;
  setVolume: (volume: number) => void;
  audio: {
    urls: { high_mp3: string };
    title: string;
    channel: { urls: { logo_image: { original: string } } };
  } | null;
  audioRef: React.RefObject<HTMLAudioElement>;
};

const PlayBar = ({
  isPlaying,
  setIsPlaying,
  volume,
  setVolume,
  audio,
  audioRef,
}: PlayBarProps) => {
  const [time, setTime] = useState(0); // Tiempo actual del audio
  const [duration, setDuration] = useState(0); // Duración total del audio

  const [isOpen, setIsOpen] = useState(true);

  // Actualizamos el tiempo de la canción en función de la reproducción
  useEffect(() => {
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setTime(audioRef.current.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    };

    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener("timeupdate", handleTimeUpdate);
      audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
        audioElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      }
    };
  }, [audioRef]);

  // Manejador de cambio de tiempo desde el input range
  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(event.target.value);
    setTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime; // Cambiamos el tiempo del audio
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.target.value));
  };

  return (
    <div className="componente">
      <div className="openButton" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "⨉" : "↑"}
      </div>
      <input
        className="time"
        type="range"
        min="0"
        max={duration}
        step="0.1"
        value={time}
        onChange={handleTimeChange} // Permitir adelantar y retroceder el audio
      />
      {isOpen && (
        <footer>
          <div className="footer">
            <div className="botonesIzq">
              <img
                onClick={() => setIsPlaying(!isPlaying)}
                src={isPlaying ? "/assets/pausa.png" : "/assets/play.png"}
                alt="play"
              />
            </div>
            <div className="cancion">
              {audio ? (
                <>
                  <img
                    src={audio.channel.urls.logo_image.original}
                    alt="song"
                  />
                  <div className="text">
                    <h4>
                      {audio.title.slice(0, 60)}
                      {audio.title.length > 60 ? "..." : ""}
                    </h4>
                  </div>
                  <img
                    className="botonesMed"
                    src="/assets/likes.png"
                    alt="likes"
                  />
                </>
              ) : null}
            </div>
            <div className="cancion">
              <input
                className="volume"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
              />
              <img
                className="botonesDer"
                src="/assets/botonesder.png"
                alt="right buttons"
              />
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default PlayBar;
