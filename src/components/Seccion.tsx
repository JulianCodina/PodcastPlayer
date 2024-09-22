import { Dispatch } from "react";
import style from "./Seccion.module.css";

type PropsEnc = {
  img: string;
  texto1: string;
  texto2: string;
};
export function Encabezado({ img, texto1, texto2 }: PropsEnc) {
  return (
    <div className={style.encabezado}>
      <img className={style.avatar} src={img} alt="User Foto" />
      <div className={style.texto}>
        <p>{texto1}</p>
        <h2>{texto2}</h2>
      </div>
    </div>
  );
}

type AudioType = {
  urls: { high_mp3: string };
  title: string;
  channel: {
    urls: {
      logo_image: { original: string };
    };
  };
};

type CardInfo = {
  audio: string;
  img: string;
  texto1: string;
  texto2?: string;
  songs?: string;
};

type PropsPL = {
  playlist: CardInfo;
  setAudio: Dispatch<React.SetStateAction<AudioType | null>>;
  setIsPlaying: Dispatch<React.SetStateAction<boolean>>;
};

export function Playlist({ setAudio, setIsPlaying, playlist }: PropsPL) {
  function PlayAudio() {
    setIsPlaying(true);

    const AudioInfo: AudioType = {
      urls: { high_mp3: playlist.audio },
      title: playlist.texto1,
      channel: {
        urls: {
          logo_image: { original: playlist.img },
        },
      },
    };

    setAudio(AudioInfo);
  }

  return (
    <div className={style.playlist} onClick={PlayAudio}>
      <img className={style.portadaPL} src={playlist.img} alt="Playlist Foto" />
      <h3>{playlist.texto1}</h3>
      <p>{playlist.songs !== "null" ? `Episodio: ${playlist.songs}` : null}</p>
    </div>
  );
}

export function PlaylistCircle(props: PropsPL) {
  const { playlist } = props;
  const part2 = playlist.songs ? " - " + playlist.songs : "";
  return (
    <div className={style.playlist}>
      <a href="">
        <img
          className={style.portadaPLCircle}
          src={playlist.img}
          alt="Playlist Foto"
        />
      </a>
      <h3>{playlist.texto1}</h3>
      <p>
        {playlist.texto2} {part2}
      </p>
    </div>
  );
}

type PropsCA = {
  cancion: CardInfo;
};

export function Cancion({ cancion }: PropsCA) {
  return (
    <div className={style.cancion}>
      <a href="">
        <img className={style.portadaCA} src={cancion.img} alt="cancion Foto" />
      </a>
      <div className="texto">
        <h4>{cancion.texto1}</h4>
        <p>{cancion.texto2}</p>
      </div>
    </div>
  );
}

type User = {
  img: string;
  name: string;
};

type Props = {
  user: User;
  texto1: string;
  texto2: string;
  arrayCard: CardInfo[];
  setAudio: Dispatch<React.SetStateAction<AudioType | null>>;
  setIsPlaying: Dispatch<React.SetStateAction<boolean>>;
};

export function SeccionBox({
  user,
  texto1,
  texto2,
  arrayCard,
  setAudio,
  setIsPlaying,
}: Props) {
  return (
    <div className={style.seccion}>
      <Encabezado img={user.img} texto1={texto1} texto2={texto2} />
      <div className={style.scrollable_container}>
        {arrayCard.map((PL, index) => (
          <Playlist
            key={index}
            playlist={PL}
            setAudio={setAudio}
            setIsPlaying={setIsPlaying}
          />
        ))}
      </div>
    </div>
  );
}

export function SeccionCircle({
  user,
  texto1,
  texto2,
  arrayCard,
  setAudio,
  setIsPlaying,
}: Props) {
  return (
    <div className={style.seccion}>
      <Encabezado img={user.img} texto1={texto1} texto2={texto2} />
      <div className={style.scrollable_container}>
        {arrayCard.map((PL, index) => (
          <PlaylistCircle
            key={index}
            playlist={PL}
            setAudio={setAudio}
            setIsPlaying={setIsPlaying}
          />
        ))}
      </div>
    </div>
  );
}

export function SeccionSongs({ user, texto1, texto2, arrayCard }: Props) {
  return (
    <div className={style.seccion}>
      <Encabezado img={user.img} texto1={texto1} texto2={texto2} />
      <div className={style.canciones_container}>
        {arrayCard.map((PL, index) => (
          <Cancion key={index} cancion={PL} />
        ))}
      </div>
    </div>
  );
}
