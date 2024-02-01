import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { newReview } from "../../../tools/obJectShapes";
import ManageReview from "./ManageReview";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import { getReviewById, saveReview } from "../../../api/filmReviewApi";
import { getFilmById } from "../../../api/filmsApi";
import { useSelector } from "react-redux";
import ErrorMessage from "../../../components/Error/ErrorMessage";

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

  const editReview = useMutation({
    mutationFn: (updatedReview) => {
      setSaving(true);
      return saveReview(id, updatedReview);
    },
    onSuccess: (res) => {
      toast.success("Review saved");
      navigate(`/films/${id}/reviews/${res.id}`);
    },
    onError: (err) => {
      setSaving(false);
      toast.error(`Error saving review ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  function handleUpdate(updatedReview) {
    setReview(updatedReview);
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
    return (
      <ErrorMessage
        message={"Error loading review for editing."}
        error={error}
      />
    );
  }

  return (
    <div className="Edit-review-page">
      <ManageReview
        film={film}
        review={review}
        updateReview={handleUpdate}
        triggerSave={() => {
          editReview.mutate(review);
        }}
        saving={saving}
      ></ManageReview>
    </div>
  );
}

export default EditReview;
