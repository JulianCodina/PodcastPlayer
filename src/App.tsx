import { useEffect, useRef, useState } from "react";
import "./App.css";
import Home from "./components/Home";
import SideBar from "./components/SideBar";
import PlaylistForm from "./components/PlaylistForm";
import PlayBar from "./components/PlayBar";

export default function App() {
  const [view, setView] = useState<"home" | "playlist">("home");
  const [item, setItem] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });
  const [list, setList] = useState<
    Array<{ title: string; description: string; imageUrl?: string }>
  >([]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setList([...list, item]);
    setItem({ title: "", description: "", imageUrl: "" });
  }

  //TODO SOBRE EL MANEJO DE AUDIOS
  const [isPlaying, setIsPlaying] = useState(false);
  const [Audio, setAudio] = useState<{
    urls: { high_mp3: string };
    title: string;
    channel: { urls: { logo_image: { original: string } } };
  } | null>(null);

  const [volume, setVolume] = useState(1);
  const AudioRef = useRef<HTMLAudioElement | null>(null); // { current: audio }

  useEffect(() => {
    if (AudioRef.current) {
      AudioRef.current.volume = volume; // Ajusta el volumen del audio
      if (isPlaying) {
        AudioRef.current.play();
      } else {
        AudioRef.current.pause();
      }
    }
  }, [isPlaying, Audio, volume]);

  return (
    <>
      <audio ref={AudioRef} src={Audio?.urls.high_mp3 || ""} />

      <header>
        <img className="logo" src="/assets/youtube-logo.png" alt="logo" />
        <input className="buscador" type="text" placeholder="Search" />
        <img className="share" src="/assets/tv.png" alt="share" />
        <img className="avatar" src="/assets/perfil.jpg" alt="avatar" />
      </header>
      <div className="main-container">
        <SideBar setView={setView} list={list} />
        {view === "home" ? (
          <Home setAudio={setAudio} setIsPlaying={setIsPlaying} />
        ) : (
          <PlaylistForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}
      </div>

      <PlayBar
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        volume={volume}
        setVolume={setVolume}
        audio={Audio}
        audioRef={AudioRef} // Se pasa la referencia del audio
      />
    </>
  );
}
