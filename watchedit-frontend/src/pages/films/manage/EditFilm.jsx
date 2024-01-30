import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getFilmById, saveFilm } from "../../../api/filmsApi";
import { newFilm } from "../../../tools/obJectShapes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { parseISO } from "date-fns";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import ManageFilm from "./ManageFilm";

function EditFilm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [film, setFilm] = useState({ ...newFilm });
  const [saving, setSaving] = useState(false);

  const { isLoading, error } = useQuery({
    queryKey: ["film-update", id],
    queryFn: () =>
      getFilmById(id).then((res) => {
        setFilm({
          id: res.id,
          name: res.name,
          shortDescription: res.shortDescription,
          fullDescription: res.fullDescription,
          runtime: res.runtime,
          releaseDate: parseISO(res.releaseDate),
          posterUrl: res.posterUrl,
          categories: res.categories,
        });
        return res;
      }),
  });

  const updateFilm = useMutation({
    mutationFn: (updatedFilm) => {
      setSaving(true);
      return saveFilm(updatedFilm);
    },
    onSuccess: (res) => {
      toast.success("Film saved");
      navigate(`/films/${res.id}`);
    },
    onError: (err) => {
      setSaving(false);
      toast.error(`Error saving ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  function handleUpdate(updatedFilm) {
    setFilm(updatedFilm);
  }

  function handleSave() {
    let filmToPost = { ...film };
    filmToPost.categories = film.categories.map((category) => category.id);
    updateFilm.mutate(filmToPost);
  }

  if (isLoading) return <LoadingMessage message={"Loading film."} />;

  if (error) {
    toast.error(`Error getting film ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  return (
    <div className="edit-film-page">
      <ManageFilm
        film={film}
        updateFilm={handleUpdate}
        triggerSave={handleSave}
        saving={saving}
      />
    </div>
  );
}

export default EditFilm;
