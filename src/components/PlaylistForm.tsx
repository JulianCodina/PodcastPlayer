import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import "./PlaylistForm.css";

type PlaylistFormProps = {
  setView: Dispatch<SetStateAction<"home" | "playlist">>;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function PlaylistForm({
  setView,
  handleChange,
  handleSubmit,
}: PlaylistFormProps) {
  return (
    <div className="containerForm">
      <h1>Crea tu playlist</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Titulo</p>
          <input type="text" name="title" onChange={handleChange} required />
        </label>
        <label>
          <p>Descripción</p>
          <input type="text" name="description" onChange={handleChange} />
        </label>
        <label>
          <p>URL de Imagen</p>
          <input type="text" name="imageUrl" onChange={handleChange} />
        </label>
        <button type="submit" className="accept">Agregar Playlist</button>
      </form>
      <button className="cancel" onClick={() => setView("home")}>Volver atrás</button>
    </div>
  );
}
