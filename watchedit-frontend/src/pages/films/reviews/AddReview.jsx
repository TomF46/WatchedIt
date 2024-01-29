import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { newReview } from "../../../tools/obJectShapes";
import ManageReview from "./ManageReview";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import { useQuery } from "@tanstack/react-query";
import { getFilmById } from "../../../api/filmsApi";
import { saveReview } from "../../../api/filmReviewApi";

function AddReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState({ ...newReview });
  const [saving, setSaving] = useState(false);

  const {
    isLoading,
    data: film,
    error,
  } = useQuery({
    queryKey: ["film", id],
    queryFn: () => getFilmById(id),
  });

  function handleUpdate(updatedReview) {
    setReview(updatedReview);
  }

  function handleSave() {
    setSaving(true);
    saveReview(id, review)
      .then((res) => {
        toast.success("Review saved");
        navigate(`/films/${id}/reviews/${res.id}`);
      })
      .catch((err) => {
        setSaving(false);
        toast.error(`Error saving review ${err.data.Exception}`, {
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
    <div className="Add-review-page">
      <ManageReview
        film={film}
        review={review}
        updateReview={handleUpdate}
        triggerSave={handleSave}
        saving={saving}
      ></ManageReview>
    </div>
  );
}

export default AddReview;