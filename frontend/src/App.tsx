import { useState } from "react";
import "./App.css";
import { AudioProvider } from "./components/AudioContext";
import Home from "./components/Home";
import SideBar from "./components/SideBar";
import PlaylistForm from "./components/PlaylistForm";
import PlayBar from "./components/PlayBar";
import { Login, Signin } from "./components/Login";

export default function App() {
  //TODO SOBRE EL MANEJO DE VISTA
  const [view, setView] = useState<"home" | "playlist">("home");

  //TODO SOBRE EL MANEJO DE LOGIN
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenSignin, setIsOpenSignin] = useState(false);
  const [isLogged, setIsLogged] = useState(true);

  //TODO SOBRE EL MANEJO DE PLAYLISTS
  const [isOpenAside, setIsOpenAside] = useState(false);
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
    setView("home");
  }
  //TODO SOBRE LA BUSQUEDA
  const [busqueda, setBusqueda] = useState("");

  return (
    <AudioProvider>
      <div className="page">
        <header>
          <div className="absolute">
            <img className="logo" src="/assets/logo.png" alt="logo" />
            {!isLogged ? (
              <div className="perfil">
                <button
                  className="accept"
                  onClick={() => {
                    setIsOpenLogin(true);
                    setIsOpenSignin(false);
                  }}
                >
                  Login
                </button>
                <button
                  className="cancel"
                  onClick={() => {
                    setIsOpenLogin(false);
                    setIsOpenSignin(true);
                  }}
                >
                  Register
                </button>
              </div>
            ) : (
              <div className="perfil">
                <p>Usuario</p>
                <img
                  className="logout"
                  src="/assets/logout.png"
                  alt="Log Out"
                  onClick={() => setIsLogged(false)}
                />
              </div>
            )}
          </div>
        </header>
        <div className="main-container">
          {isOpenLogin && <Login setIsOpen={setIsOpenLogin} />}
          {isOpenSignin && <Signin setIsOpen={setIsOpenSignin} />}
          <SideBar
            setBusqueda={setBusqueda}
            setView={setView}
            list={list}
            isOpen={isOpenAside}
            setIsOpen={setIsOpenAside}
          />
          {view === "home" ? (
            <>
              <div className="buscador">
                <input
                  type="text"
                  placeholder="Search"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
                <img src="assets/busqueda.png" />
              </div>
              <Home busqueda={busqueda} />
            </>
          ) : view === "playlist" ? (
            <PlaylistForm
              setView={setView}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          ) : null}
        </div>
        <PlayBar isOpenAside={isOpenAside} setIsOpenAside={setIsOpenAside} />
      </div>
    </AudioProvider>
  );
}
