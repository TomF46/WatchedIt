import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { newTrivia } from "../../../tools/obJectShapes";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import { getFilmTriviaById, saveFilmTrivia } from "../../../api/filmTriviaApi";
import { getFilmById } from "../../../api/filmsApi";
import { useSelector } from "react-redux";
import ManageTrivia from "./ManageTrivia";

function EditTrivia() {
  const { id, triviaId } = useParams();
  const userId = useSelector((state) =>
    state.tokens ? state.tokens.id : null,
  );
  const navigate = useNavigate();
  const [trivia, setTrivia] = useState({ ...newTrivia });
  const [saving, setSaving] = useState(false);

  const {
    isLoading: isLoadingFilm,
    data: film,
    error: filmLoadError,
  } = useQuery({
    queryKey: ["film", id],
    queryFn: () => getFilmById(id),
  });

  const { isLoading, error } = useQuery({
    queryKey: ["trivia-update", id, triviaId],
    queryFn: () =>
      getFilmTriviaById(id, triviaId).then((res) => {
        if (res.user.id != userId) navigate(`/films/${res.film.id}/trivia`);
        setTrivia({
          id: res.id,
          text: res.text,
        });
        return res;
      }),
  });

  const editTrivia = useMutation({
    mutationFn: (updatedTrivia) => {
      setSaving(true);
      return saveFilmTrivia(id, updatedTrivia);
    },
    onSuccess: () => {
      toast.success("Trivia saved");
      navigate(`/films/${id}/trivia`);
    },
    onError: (err) => {
      setSaving(false);
      toast.error(`Error saving trivia ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  function handleUpdate(updatedTrivia) {
    setTrivia(updatedTrivia);
  }

  if (isLoadingFilm) return <LoadingMessage message={"Loading film."} />;

  if (filmLoadError) {
    toast.error(`Error getting film ${filmLoadError.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  if (isLoading) return <LoadingMessage message={"Loading trivia."} />;

  if (error) {
    toast.error(`Error getting trivia ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  return (
    <div className="Edit-trivia-page">
      <ManageTrivia
        film={film}
        trivia={trivia}
        updateTrivia={handleUpdate}
        triggerSave={() => {
          editTrivia.mutate(trivia);
        }}
        saving={saving}
      />
    </div>
  );
}

export default EditTrivia;
