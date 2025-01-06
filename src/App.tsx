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
  const [isOpenAside, setIsOpenAside] = useState(false);


  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setList([...list, item]);
    setItem({ title: "", description: "", imageUrl: "" });
    setView("home");
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

useEffect(() => {
  console.log(isOpenAside)
} , [isOpenAside]);

  return (
    <div className="page">
      <audio ref={AudioRef} src={Audio?.urls.high_mp3 || ""} />

      <header>
        <div className="absolute">
          <img className="logo" src="/assets/logo.png" alt="logo" />
          <div className="perfil">
            <a href="">Perfil</a>
            <img className="avatar" src="/assets/perfil.jpg" alt="avatar" />
          </div>
        </div>
      </header>
      <div className="main-container">
        <SideBar setView={setView} list={list} isOpen={isOpenAside} setIsOpen={setIsOpenAside}/>
        {view === "home" ? (
          <>
            <input className="buscador" type="text" placeholder="Search" />
            <Home setAudio={setAudio} setIsPlaying={setIsPlaying} />
          </>
        ) : view === "playlist" ? (
          <PlaylistForm
            setView={setView}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        ) : ( null)}
      </div>
      <PlayBar
        isOpenAside={isOpenAside}
        setIsOpenAside={setIsOpenAside}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        volume={volume}
        setVolume={setVolume}
        audio={Audio}
        audioRef={AudioRef} // Se pasa la referencia del audio
      />
    </div>
  );
}
