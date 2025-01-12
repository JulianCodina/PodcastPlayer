import {
  SeccionBox,
  SeccionSongs,
  SeccionCircle,
  SeccionSearch,
  LoadingSection,
} from "../components/Seccion";
import useFetchData from "./useFetchData";

const user = {
  name: "Diego Martinez",
};
type Props = {
  busqueda: string;
};

export default function Home({ busqueda }: Props) {
  const API_URL = "https://api.audioboom.com/audio_clips";
  const { data, isLoading } = useFetchData(API_URL);

  const arrayPL = Array.isArray(data)
    ? data.map((dat) => ({
        id: dat.id,
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
    return (
      <main>
        <LoadingSection />
        <LoadingSection />
      </main>
    );
  }

  const arrayBusqueda = Array.isArray(data)
    ? data
        .filter((dat) =>
          dat.title.toLowerCase().includes(busqueda.toLowerCase())
        )
        .map((dat) => ({
          id: dat.id,
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
    return (
      <main>
        <LoadingSection />
        <LoadingSection />
      </main>
    );
  }

  return (
    <main>
      {busqueda === "" ? (
        <>
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
        </>
      ) : (
        <>
          <SeccionSearch busqueda={busqueda} arrayCard={arrayBusqueda} />
        </>
      )}
    </main>
  );
}
