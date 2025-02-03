import { Dispatch, SetStateAction, useEffect } from "react";
import {
  SeccionBox,
  SeccionSongs,
  SeccionCircle,
  SeccionSearch,
  LoadingSection,
} from "../components/Seccion";
import useFetchData from "./useFetchData";

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

type Props = {
  busqueda: string;
  user: string;
  setData: Dispatch<SetStateAction<Array<AudioClip>>>;
};

export default function Home({ busqueda, user, setData }: Props) {
  const API_URL = "https://api.audioboom.com/audio_clips";
  const { data, isLoading } = useFetchData(API_URL);

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data, setData]);

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
            texto1={user}
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
