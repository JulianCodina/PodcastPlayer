import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { AudioContext } from "./AudioContext";
import "./PlayBar.css";
import { useAuth } from "./AuthContext";

type AudioClip = {
  urls: {
    high_mp3: string;
  };
  id: number;
  title: string;
  channel: {
    title: string;
    urls: {
      logo_image: {
        original: string;
      };
    };
  };
  episode_number?: number;
}

type PlayBarProps = {
  isOpenAside: boolean;
  setIsOpenAside: Dispatch<SetStateAction<boolean>>;
  setIsOpenLogin: Dispatch<SetStateAction<boolean>>;
  data: AudioClip[];
  list: Array<{ title: string; mp3Url: string; imageUrl?: string }>;
  setList: Dispatch<SetStateAction<Array<{ title: string; mp3Url: string; imageUrl?: string }>>>;
};

  const PlayBar = ({ isOpenAside, setIsOpenAside, setIsOpenLogin, data, list, setList }: PlayBarProps) => {

  const { isLogged } = useAuth();

  const { audio, setAudio, isPlaying, setIsPlaying, volume, setVolume, audioRef } =
    useContext(AudioContext);

  const [time, setTime] = useState(0); // Tiempo actual del audio
  const [duration, setDuration] = useState(0); // Duración total del audio

  const [isOpen, setIsOpen] = useState(true);

  const [gusta, setGusta] = useState(false);

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

  const handleGustaChange = () => {
    if(isLogged){
      setGusta(!gusta);
      if (audio?.title && audio?.urls.high_mp3) {
        setList([...list, { 
          title: audio.title,
          mp3Url: audio.urls.high_mp3,
          imageUrl: audio?.channel.urls.logo_image.original 
        }]);
      }
    }else{
      setIsOpenLogin(true)
    }
  };
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.target.value));
  };

  const [temp, setTemp] = useState(volume);
  const handleChangeVolumenState = () => {
    if (volume > 0) {
      setTemp(volume);
      setVolume(0);
    } else {
      setVolume(temp);
    }
  };

  const handlePlayPause = () => {
    if (!audio) return;

    try {
      if (audioRef.current) {
        if (!isPlaying) {
          // Si vamos a reproducir
          setIsPlaying(true);
        } else {
          // Si vamos a pausar
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }
    } catch (error) {
      console.error("Error al reproducir/pausar:", error);
    }
  };

  const handleNext = () => {
    if (!audio || !data) return; // Check if audio and data are defined
    const currentIndex = data.findIndex(audioItem => audioItem.id === audio.id);
    const nextIndex = currentIndex + 1;
    if (nextIndex < data.length) {
      const nextAudio = data[nextIndex];
      setAudio(nextAudio);
      setIsPlaying(true);
    }
  }
  const handleBefore = () => {
    if (!audio || !data) return; // Check if audio and data are defined
    const currentIndex = data.findIndex(audioItem => audioItem.id === audio.id);
    const beforeIndex = currentIndex - 1;
    if (beforeIndex >= 0) {
      const nextAudio = data[beforeIndex];
      setAudio(nextAudio);
      setIsPlaying(true);
    }
  }

  useEffect(() => {
    setGusta(false)
    if (audio?.urls?.high_mp3 && list) {
      const exists = list.some(item => item.mp3Url === audio.urls.high_mp3);
      setGusta(exists);
    }
  }, [audio, list, isLogged]);

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
      <footer className={`playbar ${isOpen ? "open" : "closed"}`}>
        <div className="footer">
          <div className="cancion">
            {audio ? (
              <>
              <img
                  className="botonMed"
                  src={gusta ? "/assets/gustaon.png" : "/assets/gustaoff.png"}
                  alt="likes"
                  onClick={() => handleGustaChange()}
                />
                <img
                  className="Portada"
                  src={audio.channel.urls.logo_image.original}
                  alt="song"
                />
                <div className="text">
                  <h4>
                    {audio.title.slice(0, 60)}
                    {audio.title.length > 60 ? "..." : ""}
                  </h4>
                </div>
              </>
            ) : null}
          </div>
          <div className="botones">
            <div className="playlistButton">
              <img
                src="assets/playlist.png"
                alt="playlist"
                className="botonPry"
                onClick={() => setIsOpenAside(!isOpenAside)}
              />
            </div>
            <div className="play">
              <img
                src="/assets/botonizq.png"
                alt="preview"
                className="botonMed"
                onClick={() => handleBefore()}
              />
              <img
                className="botonPry"
                onClick={handlePlayPause}
                src={isPlaying ? "/assets/pausa.png" : "/assets/play.png"}
                alt="play"
              />
              <img src="/assets/botonder.png" alt="next" className="botonMed" onClick={() => handleNext()} />
            </div>

            <div className="volumen">
              <img
                className="botonMed"
                src={volume == 0 ? "/assets/noaudio.png" : "/assets/audio.png"}
                alt="song"
                onClick={() => handleChangeVolumenState()}
              />
              <input
                className="volume"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PlayBar;
