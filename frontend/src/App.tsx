import { useState } from "react";
import "./App.css";
import { AudioProvider } from "./components/AudioContext";
import Home from "./components/Home";
import SideBar from "./components/SideBar";
import PlaylistForm from "./components/PlaylistForm";
import PlayBar from "./components/PlayBar";
import { Login } from "./components/Login";
import { useAuth } from './components/AuthContext';
import Swal from "sweetalert2";

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

type AuthMode = 'login' | 'register';

export default function App() {
  //TODO SOBRE EL MANEJO DE LOGIN
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [inicialMode, setInicialMode] = useState<AuthMode>("login");
  const { user, signOut, isLogged, loading } = useAuth();

  //TODO SOBRE EL MANEJO DE VISTA
  const [view, setView] = useState<"home" | "playlist">("home");

  //TODO SOBRE EL MANEJO DE PLAYLISTS
  const [isOpenAside, setIsOpenAside] = useState(false);
  const [item, setItem] = useState({
    title: "",
    mp3Url: "",
    imageUrl: "",
  });
  const [list, setList] = useState<
    Array<{ title: string; mp3Url: string; imageUrl?: string }>
  >([]);
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setList([...list, item]);
    setItem({ title: "", mp3Url: "", imageUrl: "" });
    setView("home");
  }
  //TODO SOBRE LA BUSQUEDA
  const [busqueda, setBusqueda] = useState("");

  //TODO SOBRE LA CARGA DE LA API
  const [data, setData] = useState<AudioClip[]>([]);
  
  return (
      <AudioProvider>
        <div className="page">
          <header>
            <div className="absolute">
              <img className="logo" src="/assets/logo.png" alt="logo" />
              {loading ? (
                <div className="loadingLogin animation"/>
                ) : (
                !isLogged ? (
                  <div className="perfil">
                    <button
                      className="accept"
                      onClick={() => {
                      setInicialMode("login")
                      setIsOpenLogin(true);
                    }}
                  >
                    Login
                  </button>
                  <button
                    className="cancel"
                    onClick={() => {
                      setInicialMode("register")
                      setIsOpenLogin(true);
                    }}
                  >
                    Register
                  </button>
                </div>
              ) : (
                <div className="perfil">
                  <p>{user && user?.email?.split('@')[0]}</p>
                  <img
                    className="logout"
                    src="/assets/logout.png"
                    alt="Log Out"
                    onClick={() => {
                      signOut()
                      Swal.fire({
                        icon: 'success',
                        title: 'Good Bye!',
                        text: 'See you soon!',
                        timer: 1500,
                        showConfirmButton: false,
                        background: '#1a1a1a', // Color de fondo oscuro
                        color: '#ffffff', // Color del texto
                        customClass: {
                          popup: 'small-alert' // Clase personalizada
                        },
                        width: 250,
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          </header>
          <div className="main-container">
            {isOpenLogin && (
              <Login
                setIsOpen={setIsOpenLogin}
                initialMode={inicialMode}
              />
            )}

            <SideBar
              setBusqueda={setBusqueda}
              setView={setView}
              list={list}
              isOpen={isOpenAside}
              setIsOpen={setIsOpenAside}
              setIsOpenLogin={setIsOpenLogin}
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
                  <img src="/assets/busqueda.png" alt="Search" />
                </div>
                <Home busqueda={busqueda} user={user?.email?.split('@')[0] ?? ""} setData={setData} />
              </>
            ) : view === "playlist" ? (
              <PlaylistForm
                setView={setView}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            ) : null}
          </div>
          <PlayBar isOpenAside={isOpenAside} setIsOpenAside={setIsOpenAside} setIsOpenLogin={setIsOpenLogin} data={data} list={list} setList={setList} />
        </div>
      </AudioProvider>
  );
}
