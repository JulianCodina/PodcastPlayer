import { Dispatch, SetStateAction } from "react";
import "./SideBar.css";

type SideBarProps = {
  setView: Dispatch<SetStateAction<"home" | "playlist">>;
  list: Array<{ title: string; description: string; imageUrl?: string }>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setBusqueda: Dispatch<SetStateAction<string>>;
  isLogged: boolean;
  setIsOpenLogin: Dispatch<SetStateAction<boolean>>;
};

export default function SideBar({
  setView,
  list,
  isOpen,
  setIsOpen,
  setBusqueda,
  isLogged,
  setIsOpenLogin,
}: SideBarProps) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : "close"}`}>
      <div
        className="home-button"
        onClick={() => {
          setView("home");
          setBusqueda("");
        }}
      >
        <img src="/assets/home.png" />
        <p className="home-text">Home</p>
      </div>
      <div className="phoneView">
        <p>My Playlists</p>
        <img src="assets/x.png" alt="X" onClick={() => setIsOpen(false)} />
      </div>
      <hr />
      <input
        className="newplaylist"
        type="button"
        value="New Playlist"
        onClick={() => {
          if (isLogged) {
            setView("playlist");
            setIsOpen(false);
          } else {
            setIsOpenLogin(true);
          }
        }}
      />
      <div>
        <ul>
          {isLogged
            ? list.map((item, index) => (
                <li key={index}>
                  <img
                    src={item.imageUrl ? item.imageUrl : "assets/nopic.png"}
                  />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </li>
              ))
            : null}
        </ul>
      </div>
    </aside>
  );
}
