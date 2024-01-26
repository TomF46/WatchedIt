import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { saveFilm } from "../../../api/filmsApi";
import { newFilm } from "../../../tools/obJectShapes";
import ManageFilm from "./ManageFilm";

function AddFilm() {
  const navigate = useNavigate();
  const [film, setFilm] = useState({ ...newFilm });
  const [saving, setSaving] = useState(false);

  function handleUpdate(updatedFilm) {
    setFilm(updatedFilm);
  }

  function handleSave() {
    let filmToPost = { ...film };
    filmToPost.categories = film.categories.map((category) => category.id);
    setSaving(true);
    saveFilm(filmToPost)
      .then((res) => {
        toast.success("Film saved");
        navigate(`/films/${res.id}`);
      })
      .catch((err) => {
        setSaving(false);
        toast.error(`Error saving ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }

  return (
    <div className="add-film-page">
      <ManageFilm
        film={film}
        updateFilm={handleUpdate}
        triggerSave={handleSave}
        saving={saving}
      />
    </div>
  );
}

export default AddFilm;
