import { SeccionBox } from "../components/Seccion";
import { SeccionSongs } from "../components/Seccion";
import { SeccionCircle } from "../components/Seccion";
import "../components/Home.css";
import useFetchData from "./useFetchData";
import { Dispatch } from "react";

const user = {
  name: "Julian Codina",
  img: "../assets/perfil.png",
};

type playlist = {
  audio: string;
  img: string;
  texto1: string;
  texto2?: string;
  songs?: string;
};

const createPlaylist = (
  audio: string,
  img: string,
  texto1: string,
  texto2?: string,
  songs?: string
): playlist => ({
  img,
  texto1,
  texto2,
  songs,
  audio,
});

const defaultImg = "../assets/portada.jpg";

const arrayALB: playlist[] = Array.from({ length: 7 }, () =>
  createPlaylist("", defaultImg, "Listen Again", "Listen Again")
);

const arrayART: playlist[] = Array.from({ length: 7 }, () =>
  createPlaylist("", defaultImg, "Listen Again", "4,53 suscribers")
);

const arrayCAN: playlist[] = Array.from({ length: 16 }, () =>
  createPlaylist(
    "",
    "../assets/michael.jpeg",
    "Nombre de cancion",
    "Nombre de Artista"
  )
);

type AudioType = {
  urls: { high_mp3: string };
  title: string;
  channel: {
    urls: {
      logo_image: { original: string };
    };
  };
};

type Props = {
  setAudio: Dispatch<React.SetStateAction<AudioType | null>>;
  setIsPlaying: Dispatch<React.SetStateAction<boolean>>;
};

export default function Home({ setAudio, setIsPlaying }: Props) {
  const API_URL = "https://api.audioboom.com/audio_clips";
  const { data, isLoading, error } = useFetchData(API_URL);

  const arrayPL = Array.isArray(data)
    ? data.map((dat) => ({
        key: dat.id,
        audio: dat.urls.high_mp3,
        img: dat.channel.urls.logo_image.original,
        texto1: dat.title,
        songs:
          dat.episode_number !== undefined
            ? String(dat.episode_number)
            : undefined,
      }))
    : [];

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <SeccionBox
        user={user}
        texto1={user.name}
        texto2="Listen Again"
        arrayCard={arrayPL}
        setAudio={setAudio}
        setIsPlaying={setIsPlaying}
      />
      <SeccionSongs
        user={user}
        texto1="START RADIO FROM A SONG"
        texto2="Quick picks"
        arrayCard={arrayCAN}
        setAudio={setAudio}
        setIsPlaying={setIsPlaying}
      />
      <SeccionBox
        user={user}
        texto1=""
        texto2="Recommended albums"
        arrayCard={arrayALB}
        setAudio={setAudio}
        setIsPlaying={setIsPlaying}
      />
      <SeccionCircle
        user={user}
        texto1="SIMILAR TO"
        texto2="A GENERIC ARTIST"
        arrayCard={arrayART}
        setAudio={setAudio}
        setIsPlaying={setIsPlaying}
      />
    </main>
  );
}
