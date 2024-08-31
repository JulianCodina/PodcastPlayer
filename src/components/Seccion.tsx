import style from "./Seccion.module.css";

type PropsEnc = {
  img: string;
  texto1: string;
  texto2: string;
};
export function Encabezado(props: PropsEnc) {
  const { img, texto1, texto2 } = props;
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
  img: string;
  texto1: string;
  texto2: string;
  songs?: string;
};
type PropsPL = {
  playlist: CardInfo;
};

export function Playlist(props: PropsPL) {
  const { playlist } = props;
  const part2 = playlist.songs ? " - " + playlist.songs : "";
  return (
    <div className={style.playlist}>
      <a href="">
        <img
          className={style.portadaPL}
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
export function Cancion(props: PropsCA) {
  const { cancion } = props;
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
};

export function SeccionBox(props: Props) {
  const { user, texto1, texto2, arrayCard } = props;
  return (
    <div className={style.seccion}>
      <Encabezado img={user.img} texto1={texto1} texto2={texto2} />
      <div className={style.scrollable_container}>
        {arrayCard.map((PL, index) => (
          <Playlist key={index} playlist={PL} />
        ))}
      </div>
    </div>
  );
}

export function SeccionCircle(props: Props) {
  const { user, texto1, texto2, arrayCard } = props;
  return (
    <div className={style.seccion}>
      <Encabezado img={user.img} texto1={texto1} texto2={texto2} />
      <div className={style.scrollable_container}>
        {arrayCard.map((PL, index) => (
          <PlaylistCircle key={index} playlist={PL} />
        ))}
      </div>
    </div>
  );
}

export function SeccionSongs(props: Props) {
  const { user, texto1, texto2, arrayCard } = props;
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
