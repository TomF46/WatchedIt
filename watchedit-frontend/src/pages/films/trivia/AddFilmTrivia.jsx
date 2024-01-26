import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { newTrivia } from "../../../tools/obJectShapes";
import ManageTrivia from "./ManageTrivia";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import { useQuery } from "@tanstack/react-query";
import { getFilmById } from "../../../api/filmsApi";
import { saveFilmTrivia } from "../../../api/filmTriviaApi";

function AddTrivia() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trivia, setTrivia] = useState({ ...newTrivia });
  const [saving, setSaving] = useState(false);

  const {
    isLoading,
    data: film,
    error,
  } = useQuery({
    queryKey: ["film", id],
    queryFn: () => getFilmById(id),
  });

  function handleUpdate(updatedTrivia) {
    setTrivia(updatedTrivia);
  }

  function handleSave() {
    setSaving(true);
    saveFilmTrivia(id, trivia)
      .then(() => {
        toast.success("Trivia saved");
        navigate(`/films/${id}/trivia`);
      })
      .catch((err) => {
        setSaving(false);
        toast.error(`Error saving trivia ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }

  if (isLoading) return <LoadingMessage message={"Loading film."} />;

  if (error) {
    toast.error(`Error getting film ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  return (
    <div className="Add-trivia-page">
      <ManageTrivia
        film={film}
        trivia={trivia}
        updateTrivia={handleUpdate}
        triggerSave={handleSave}
        saving={saving}
      ></ManageTrivia>
    </div>
  );
}

export default AddTrivia;
