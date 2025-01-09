import style from "./Seccion.module.css";

type PropsEnc = {
  img: string;
  texto1: string;
  texto2: string;
};

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

type CardInfo = {
  id: number; // Asegúrate de incluir 'id' aquí
  audio: string;
  img: string;
  texto1: string;
  texto2?: string;
  songs?: string;
};

type SetAudioFunction = (audioInfo: AudioInfo) => void;

type SetIsPlayingFunction = (isPlaying: boolean) => void;

type Props = {
  user: { img: string; name: string };
  texto1: string;
  texto2: string;
  arrayCard: CardInfo[];
  setAudio: SetAudioFunction;
  setIsPlaying: SetIsPlayingFunction;
};

export function Playlist({
  playlist,
  setAudio,
  setIsPlaying,
}: {
  playlist: CardInfo;
  setAudio: SetAudioFunction;
  setIsPlaying: SetIsPlayingFunction;
}) {
  function PlayAudio() {
    setIsPlaying(true);
    const audioInfo: AudioInfo = {
      id: playlist.id, // Incluye el id
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

export function PlaylistCircle({
  playlist,
  setAudio,
  setIsPlaying,
}: {
  playlist: CardInfo;
  setAudio: SetAudioFunction;
  setIsPlaying: SetIsPlayingFunction;
}) {
  function PlayAudio() {
    setIsPlaying(true);
    const audioInfo: AudioInfo = {
      id: playlist.id, // Incluye el id
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

export function Cancion({
  cancion,
  setAudio,
  setIsPlaying,
}: {
  cancion: CardInfo;
  setAudio: SetAudioFunction;
  setIsPlaying: SetIsPlayingFunction;
}) {
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
        {arrayCard.map((playlist, index) => (
          <Playlist
            key={index}
            playlist={playlist}
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
        {arrayCard.map((playlist, index) => (
          <PlaylistCircle
            key={index}
            playlist={playlist}
            setAudio={setAudio}
            setIsPlaying={setIsPlaying}
          />
        ))}
      </div>
    </div>
  );
}

export function SeccionSongs({
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
      <div className={style.canciones_container}>
        {arrayCard.map((cancion, index) => (
          <Cancion
            key={index}
            cancion={cancion}
            setAudio={setAudio}
            setIsPlaying={setIsPlaying}
          />
        ))}
      </div>
    </div>
  );
}
