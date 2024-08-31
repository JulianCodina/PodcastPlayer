import "./App.css";
import { SeccionBox } from "./components/Seccion";
import { SeccionSongs } from "./components/Seccion";
import { SeccionCircle } from "./components/Seccion";

const user = {
  name: "Julian Codina",
  img: "/src/assets/perfil.png",
};
type playlist = {
  img: string;
  texto1: string;
  texto2: string;
  songs?: string;
};
const arrayPL: playlist[] = [
  {
    img: "/src/assets/portada.jpg",
    texto1: "PlayList Name 1",
    texto2: "Artist Name",
    songs: "20 songs",
  },
  {
    img: "/src/assets/portada.jpg",
    texto1: "PlayList Name 2",
    texto2: "Artist Name",
    songs: "20 songs",
  },
  {
    img: "/src/assets/portada.jpg",
    texto1: "PlayList Name 3",
    texto2: "Artist Name",
    songs: "20 songs",
  },
  {
    img: "/src/assets/portada.jpg",
    texto1: "PlayList Name 4",
    texto2: "Artist Name",
    songs: "20 songs",
  },
  {
    img: "/src/assets/portada.jpg",
    texto1: "PlayList Name 5",
    texto2: "Artist Name",
    songs: "20 songs",
  },
  {
    img: "/src/assets/portada.jpg",
    texto1: "PlayList Name 6",
    texto2: "Artist Name",
    songs: "20 songs",
  },
  {
    img: "/src/assets/portada.jpg",
    texto1: "PlayList Name 7",
    texto2: "Artist Name",
    songs: "20 songs",
  },
];
const arrayALB: playlist[] = [
  {
    img: "/src/assets/portada.jpg",
    texto1: "Listen Again",
    texto2: "Listen Again",
  },
  {
    img: "/src/assets/portada.jpg",
    texto1: "Listen Again",
    texto2: "Listen Again",
  },
  {
    img: "/src/assets/portada.jpg",
    texto1: "Listen Again",
    texto2: "Listen Again",
  },
  {
    img: "/src/assets/portada.jpg",
    texto1: "Listen Again",
    texto2: "Listen Again",
  },
  {
    img: "/src/assets/portada.jpg",
    texto1: "Listen Again",
    texto2: "Listen Again",
  },
  {
    img: "/src/assets/portada.jpg",
    texto1: "Listen Again",
    texto2: "Listen Again",
  },
  {
    img: "/src/assets/portada.jpg",
    texto1: "Listen Again",
    texto2: "Listen Again",
  },
];
const arrayART: playlist[] = [
  {
    img: "/src/assets/portada.jpg",
    texto1: "Listen Again",
    texto2: "4,53 suscribers",
  },
  {
    img: "/src/assets/portada.jpg",
    texto1: "Listen Again",
    texto2: "4,53 suscribers",
  },
  {
    img: "/src/assets/portada.jpg",
    texto1: "Listen Again",
    texto2: "4,53 suscribers",
  },
  {
    img: "/src/assets/portada.jpg",
    texto1: "Listen Again",
    texto2: "4,53 suscribers",
  },
  {
    img: "/src/assets/portada.jpg",
    texto1: "Listen Again",
    texto2: "4,53 suscribers",
  },
  {
    img: "/src/assets/portada.jpg",
    texto1: "Listen Again",
    texto2: "4,53 suscribers",
  },
  {
    img: "/src/assets/portada.jpg",
    texto1: "Listen Again",
    texto2: "4,53 suscribers",
  },
];
const arrayCAN: playlist[] = [
  {
    img: "/src/assets/michael.jpeg",
    texto1: "Nombre de cancion",
    texto2: "Nombre de Artista",
  },
  {
    img: "/src/assets/michael.jpeg",
    texto1: "Nombre de cancion",
    texto2: "Nombre de Artista",
  },
  {
    img: "/src/assets/michael.jpeg",
    texto1: "Nombre de cancion",
    texto2: "Nombre de Artista",
  },
  {
    img: "/src/assets/michael.jpeg",
    texto1: "Nombre de cancion",
    texto2: "Nombre de Artista",
  },
  {
    img: "/src/assets/michael.jpeg",
    texto1: "Nombre de cancion",
    texto2: "Nombre de Artista",
  },
  {
    img: "/src/assets/michael.jpeg",
    texto1: "Nombre de cancion",
    texto2: "Nombre de Artista",
  },
  {
    img: "/src/assets/michael.jpeg",
    texto1: "Nombre de cancion",
    texto2: "Nombre de Artista",
  },
  {
    img: "/src/assets/michael.jpeg",
    texto1: "Nombre de cancion",
    texto2: "Nombre de Artista",
  },
  {
    img: "/src/assets/michael.jpeg",
    texto1: "Nombre de cancion",
    texto2: "Nombre de Artista",
  },
  {
    img: "/src/assets/michael.jpeg",
    texto1: "Nombre de cancion",
    texto2: "Nombre de Artista",
  },
  {
    img: "/src/assets/michael.jpeg",
    texto1: "Nombre de cancion",
    texto2: "Nombre de Artista",
  },
  {
    img: "/src/assets/michael.jpeg",
    texto1: "Nombre de cancion",
    texto2: "Nombre de Artista",
  },
  {
    img: "/src/assets/michael.jpeg",
    texto1: "Nombre de cancion",
    texto2: "Nombre de Artista",
  },
  {
    img: "/src/assets/michael.jpeg",
    texto1: "Nombre de cancion",
    texto2: "Nombre de Artista",
  },
  {
    img: "/src/assets/michael.jpeg",
    texto1: "Nombre de cancion",
    texto2: "Nombre de Artista",
  },
  {
    img: "/src/assets/michael.jpeg",
    texto1: "Nombre de cancion",
    texto2: "Nombre de Artista",
  },
  {
    img: "/src/assets/michael.jpeg",
    texto1: "Nombre de cancion",
    texto2: "Nombre de Artista",
  },
  {
    img: "/src/assets/michael.jpeg",
    texto1: "Nombre de cancion",
    texto2: "Nombre de Artista",
  },
  {
    img: "/src/assets/michael.jpeg",
    texto1: "Nombre de cancion",
    texto2: "Nombre de Artista",
  },
];

function App() {
  return (
    <>
      <header>
        <img className="logo" src="./src/assets/youtube-logo.png"></img>
        <input className="buscador" type="text" placeholder="Search"></input>
        <img className="share" src="./src/assets/tv.png"></img>
        <img className="avatar" src="./src/assets/perfil.png"></img>
      </header>

      <main>
        <SeccionBox
          user={user}
          texto1={user.name}
          texto2="Listen Again"
          arrayCard={arrayPL}
        />
        <SeccionSongs
          user={user}
          texto1="START RADIO FROM A SONG"
          texto2="Quick picks"
          arrayCard={arrayCAN}
        />
        <SeccionBox
          user={user}
          texto1=""
          texto2="Recommended albums"
          arrayCard={arrayALB}
        />
        <SeccionCircle
          user={user}
          texto1="SIMILAR TO"
          texto2="A GENERIC ARTIST"
          arrayCard={arrayART}
        />
      </main>

      <footer className="reproductor">
        <img className="botonesIzq" src="/src/assets/botonesizq.png" alt="" />
        <div className="cancion">
          <img src="/src/assets/michael.jpeg" alt="" />
          <div className="text">
            <h4>Thiller</h4>
            <p>Michael Jackson - 37K vies - 603 likes</p>
          </div>
          <img className="botonesMed" src="/src/assets/likes.png" alt="" />
        </div>
        <img className="botonesDer" src="/src/assets/botonesder.png" alt="" />
      </footer>
    </>
  );
}
export default App;
