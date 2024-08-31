import { ChangeEvent, FormEvent } from "react";
import "./PlaylistForm.css";

type PlaylistFormProps = {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function PlaylistForm({
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
          <p>Descripcion</p>
          <input type="text" name="description" onChange={handleChange} />
        </label>
        <label>
          <p>URL de Imagen</p>
          <input type="text" name="imageUrl" onChange={handleChange} />
        </label>
        <button type="submit">Agregar Playlist</button>
      </form>
    </div>
  );
}
