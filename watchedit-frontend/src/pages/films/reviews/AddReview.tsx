import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { newReview } from "../../../tools/obJectShapes";
import ManageReview from "./ManageReview";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getFilmById } from "../../../api/filmsApi";
import { saveReview } from "../../../api/filmReviewApi";
import ErrorMessage from "../../../components/Error/ErrorMessage";

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

  const addReview = useMutation({
    mutationFn: (newReview) => {
      setSaving(true);
      return saveReview(id, newReview);
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

  if (isLoading) return <LoadingMessage message={"Loading film."} />;

  if (error) {
    return (
      <ErrorMessage
        message={"Error loading film."}
        error={error.data.Exception}
      />
    );
  }

  return (
    <div className="Add-review-page">
      <ManageReview
        film={film}
        review={review}
        updateReview={handleUpdate}
        triggerSave={() => {
          addReview.mutate(review);
        }}
        saving={saving}
      ></ManageReview>
    </div>
  );
}

export default AddReview;
