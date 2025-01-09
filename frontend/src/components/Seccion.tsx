import style from "./Seccion.module.css";
import { AudioContext } from "./AudioContext";
import { useContext } from "react";

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

//ENCABEZADO
type PropsEnc = {
  img: string;
  texto1: string;
  texto2: string;
};
export function Encabezado({ img, texto1, texto2 }: PropsEnc) {
  return (
    <div className={style.encabezado}>
      <img className={style.img} src={img} alt="Img" />
      <div className={style.texto}>
        <p>{texto1}</p>
        <h2>{texto2}</h2>
      </div>
    </div>
  );
}

//TARJETA TYPE
type CardInfo = {
  id: number; // Asegúrate de incluir 'id' aquí
  audio: string;
  img: string;
  texto1: string;
  texto2?: string;
  songs?: string;
};

//SECCIONES TYPE
type SectionProp = {
  img: string;
  texto1: string;
  texto2: string;
  arrayCard: CardInfo[];
};

//TARJETA
export function Playlist({ playlist }: { playlist: CardInfo }) {
  const { setAudio, setIsPlaying } = useContext(AudioContext);

  function PlayAudio() {
    setIsPlaying(true);
    const audioInfo: AudioInfo = {
      id: playlist.id,
      urls: { high_mp3: playlist.audio },
      title: playlist.texto1,
      channel: {
        urls: {
          logo_image: { original: playlist.img },
        },
      },
    };
    setAudio(audioInfo);
  }

  return (
    <div className={style.playlist} onClick={PlayAudio}>
      <img className={style.portadaPL} src={playlist.img} alt="Playlist Foto" />
      <h3>{playlist.texto1}</h3>
      <p>{playlist.songs ? `Episodio: ${playlist.songs}` : null}</p>
    </div>
  );
}

export function PlaylistCircle({ playlist }: { playlist: CardInfo }) {
  const { setAudio, setIsPlaying } = useContext(AudioContext);

  function PlayAudio() {
    setIsPlaying(true);
    const audioInfo: AudioInfo = {
      id: playlist.id,
      urls: { high_mp3: playlist.audio },
      title: playlist.texto1,
      channel: {
        urls: {
          logo_image: { original: playlist.img },
        },
      },
    };
    setAudio(audioInfo);
  }

  return (
    <div className={style.playlist} onClick={PlayAudio}>
      <img
        className={style.portadaPLCircle}
        src={playlist.img}
        alt="Playlist Foto"
      />
      <h3>{playlist.texto1}</h3>
      <p>{playlist.songs ? `Episodio: ${playlist.songs}` : null}</p>
    </div>
  );
}

export function Cancion({ cancion }: { cancion: CardInfo }) {
  const { setAudio, setIsPlaying } = useContext(AudioContext);

  function PlayAudio() {
    setIsPlaying(true);
    const audioInfo: AudioInfo = {
      id: cancion.id, // Incluye el id
      urls: { high_mp3: cancion.audio },
      title: cancion.texto1,
      channel: {
        urls: {
          logo_image: { original: cancion.img },
        },
      },
    };
    setAudio(audioInfo);
  }

  return (
    <div className={style.cancion} onClick={PlayAudio}>
      <img className={style.portadaCA} src={cancion.img} alt="cancion Foto" />
      <div className="texto">
        <p>{cancion.texto1}</p>
      </div>
    </div>
  );
}

export function SeccionBox({ img, texto1, texto2, arrayCard }: SectionProp) {
  return (
    <div className={style.seccion}>
      <Encabezado img={img} texto1={texto1} texto2={texto2} />
      <div className={style.scrollable_container}>
        {arrayCard.map((playlist, index) => (
          <Playlist key={index} playlist={playlist} />
        ))}
      </div>
    </div>
  );
}

export function SeccionCircle({ img, texto1, texto2, arrayCard }: SectionProp) {
  return (
    <div className={style.seccion}>
      <Encabezado img={img} texto1={texto1} texto2={texto2} />
      <div className={style.scrollable_container}>
        {arrayCard.map((playlist, index) => (
          <PlaylistCircle key={index} playlist={playlist} />
        ))}
      </div>
    </div>
  );
}

export function SeccionSongs({ img, texto1, texto2, arrayCard }: SectionProp) {
  return (
    <div className={style.seccion}>
      <Encabezado img={img} texto1={texto1} texto2={texto2} />
      <div className={style.canciones_container}>
        {arrayCard.map((cancion, index) => (
          <Cancion key={index} cancion={cancion} />
        ))}
      </div>
    </div>
  );
}
