import { Dispatch, SetStateAction } from "react";
import "./SideBar.css";

type SideBarProps = {
  setView: Dispatch<SetStateAction<"home" | "playlist">>;
  list: Array<{ title: string; description: string; imageUrl?: string }>;
};

export default function SideBar({ setView, list }: SideBarProps) {
  return (
    <aside className="sidebar">
      <div className="home-button" onClick={() => setView("home")}>
        <img src="../assets/usuario.png" />
        <p>Home</p>
      </div>
      <hr />
      <input
        className="newplaylist"
        type="button"
        value="New Playlist"
        onClick={() => setView("playlist")}
      />
      <div>
        <ul>
          {list.map((item, index) => (
            <li key={index}>
              <img src={item.imageUrl} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
