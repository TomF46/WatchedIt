import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { newReview } from "../../../tools/obJectShapes";
import ManageReview from "./ManageReview";
import { useQuery } from "@tanstack/react-query";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import { getReviewById, saveReview } from "../../../api/filmReviewApi";
import { getFilmById } from "../../../api/filmsApi";
import { useSelector } from "react-redux";

function EditReview() {
  const { id, reviewId } = useParams();
  const userId = useSelector((state) =>
    state.tokens ? state.tokens.id : null,
  );
  const navigate = useNavigate();
  const [review, setReview] = useState({ ...newReview });
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
    queryKey: ["review-update", id, reviewId],
    queryFn: () =>
      getReviewById(id, reviewId).then((res) => {
        if (res.user.id != userId)
          navigate(`/films/${res.film.id}/reviews/${res.id}`);
        setReview({
          id: res.id,
          rating: res.rating,
          text: res.text,
        });
        return res;
      }),
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

  if (isLoadingFilm) return <LoadingMessage message={"Loading film."} />;

  if (filmLoadError) {
    toast.error(`Error getting film ${filmLoadError.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  if (isLoading) return <LoadingMessage message={"Loading review."} />;

  if (error) {
    toast.error(`Error getting review ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  return (
    <div className="Edit-review-page">
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

export default EditReview;
