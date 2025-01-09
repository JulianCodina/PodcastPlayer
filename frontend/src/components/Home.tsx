import { SeccionBox, SeccionSongs, SeccionCircle } from "../components/Seccion";
import useFetchData from "./useFetchData";

const user = {
  name: "Julian Codina",
};

export default function Home() {
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
        img="assets/repetir.png"
        texto1={user.name}
        texto2="Listen Again"
        arrayCard={arrayPL}
      />
      <SeccionSongs
        img="assets/radio.png"
        texto1="START RADIO FROM A SONG"
        texto2="Quick picks"
        arrayCard={arrayPL}
      />
      <SeccionBox
        img="assets/recomendacion.png"
        texto1=""
        texto2="Recommended albums"
        arrayCard={arrayPL}
      />
      <SeccionCircle
        img="assets/similar.png"
        texto1="SIMILAR TO"
        texto2="A GENERIC ARTIST"
        arrayCard={arrayPL}
      />
    </main>
  );
}
