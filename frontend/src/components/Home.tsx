import { SeccionBox, SeccionSongs, SeccionCircle } from "../components/Seccion";
import useFetchData from "./useFetchData";

type AudioInfo = {
  id: number; // Asegúrate de incluir 'id'
  urls: {
    high_mp3: string;
  };
  title: string;
  channel: {
    urls: {
      logo_image: {
        original: string;
      };
    };
  };
  episode_number?: number;
};

type HomeProps = {
  setAudio: (audioInfo: AudioInfo) => void; // Asegúrate de que acepte AudioInfo
  setIsPlaying: (isPlaying: boolean) => void;
};

const user = {
  name: "Julian Codina",
  img: "/assets/perfil.jpg",
};

export default function Home({ setAudio, setIsPlaying }: HomeProps) {
  const API_URL = "https://api.audioboom.com/audio_clips";
  const { data, isLoading, error } = useFetchData(API_URL);

  const arrayPL = Array.isArray(data)
    ? data.map((dat) => ({
        id: dat.id, // Incluye el id aquí
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
        arrayCard={arrayPL}
        setAudio={setAudio}
        setIsPlaying={setIsPlaying}
      />
      <SeccionBox
        user={user}
        texto1=""
        texto2="Recommended albums"
        arrayCard={arrayPL}
        setAudio={setAudio}
        setIsPlaying={setIsPlaying}
      />
      <SeccionCircle
        user={user}
        texto1="SIMILAR TO"
        texto2="A GENERIC ARTIST"
        arrayCard={arrayPL}
        setAudio={setAudio}
        setIsPlaying={setIsPlaying}
      />
    </main>
  );
}
