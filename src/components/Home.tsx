import { SeccionBox } from "../components/Seccion";
import { SeccionSongs } from "../components/Seccion";
import { SeccionCircle } from "../components/Seccion";
import "../components/Home.css";

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

const createPlaylist = (
  img: string,
  texto1: string,
  texto2: string,
  songs?: string
): playlist => ({
  img,
  texto1,
  texto2,
  songs,
});

const defaultImg = "/src/assets/portada.jpg";

const arrayPL: playlist[] = Array.from({ length: 7 }, (_, i) =>
  createPlaylist(
    defaultImg,
    `PlayList Name ${i + 1}`,
    "Artist Name",
    "20 songs"
  )
);

const arrayALB: playlist[] = Array.from({ length: 7 }, () =>
  createPlaylist(defaultImg, "Listen Again", "Listen Again")
);

const arrayART: playlist[] = Array.from({ length: 7 }, () =>
  createPlaylist(defaultImg, "Listen Again", "4,53 suscribers")
);

const arrayCAN: playlist[] = Array.from({ length: 16 }, () =>
  createPlaylist(
    "/src/assets/michael.jpeg",
    "Nombre de cancion",
    "Nombre de Artista"
  )
);

export default function Home() {
  return (
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
  );
}
