import { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import SideBar from "./components/SideBar";
import PlaylistForm from "./components/PlaylistForm";

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

  return (
    <>
      <header>
        <img className="logo" src="./src/assets/youtube-logo.png" alt="logo" />
        <input className="buscador" type="text" placeholder="Search" />
        <img className="share" src="./src/assets/tv.png" alt="share" />
        <img className="avatar" src="./src/assets/perfil.png" alt="avatar" />
      </header>
      <div className="main-container">
        <SideBar setView={setView} list={list} />
        {view === "home" ? (
          <Home />
        ) : (
          <PlaylistForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
      <footer className="reproductor">
        <img
          className="botonesIzq"
          src="/src/assets/botonesizq.png"
          alt="left buttons"
        />
        <div className="cancion">
          <img src="/src/assets/michael.jpeg" alt="song" />
          <div className="text">
            <h4>Thiller</h4>
            <p>Michael Jackson - 37K views - 603 likes</p>
          </div>
          <img className="botonesMed" src="/src/assets/likes.png" alt="likes" />
        </div>
        <img
          className="botonesDer"
          src="/src/assets/botonesder.png"
          alt="right buttons"
        />
      </footer>
    </>
  );
}
