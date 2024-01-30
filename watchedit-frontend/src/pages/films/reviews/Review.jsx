import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { removeReview, getReviewById } from "../../../api/filmReviewApi";
import { confirmAlert } from "react-confirm-alert";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import ReviewCommentsSection from "../../../components/Reviews/ReviewCommentsSection";
import { useMutation, useQuery } from "@tanstack/react-query";

function Review() {
  const { id, reviewId } = useParams();
  const userId = useSelector((state) =>
    state.tokens ? state.tokens.id : null,
  );
  const navigate = useNavigate();
  const [userCanEdit, setUserCanEdit] = useState(false);

  const {
    isLoading,
    data: review,
    error,
  } = useQuery({
    queryKey: ["review", id, reviewId],
    queryFn: () =>
      getReviewById(id, reviewId).then((res) => {
        setUserCanEdit(res.user.id == userId);
        return res;
      }),
  });

  const deleteReview = useMutation({
    mutationFn: (reviewToRemove) => removeReview(id, reviewToRemove),
    onSuccess: () => {
      toast.success("Review removed");
      navigate(`/films/${id}/reviews`);
    },
    onError: (err) => {
      toast.error(`Error removing review ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  function confirmDelete() {
    confirmAlert({
      title: "Confirm removal",
      message: `Are you sure you want to remove this review?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteReview.mutate(review),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  }

  if (isLoading) return <LoadingMessage message={"Loading review."} />;

  if (error) {
    toast.error(`Error getting review ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  return (
    <div className="film-reviews-page">
      <h1 className="text-center text-primary text-4xl my-4 font-semibold">
        {review.film.name} review
      </h1>
      {userCanEdit && (
        <div className="owner-controls bg-backgroundOffset mt-4 shadow rounded">
          <div className="bg-backgroundOffset2 rounded-t-md">
            <p className="text-primary font-semibold text-lg px-2 py-1">
              Review owner controls
            </p>
          </div>
          <div className="px-2 py-2">
            <Link
              to={`/films/${review.film.id}/reviews/${reviewId}/edit`}
              className="bg-backgroundOffset2 text-primary font-semibold rounded py-2 px-4 hover:opacity-75 inline-block"
            >
              Edit review
            </Link>
            <button
              onClick={() => {
                confirmDelete();
              }}
              className="bg-backgroundOffset2 text-red-400 font-semibold rounded py-2 px-4 hover:opacity-75 inline-block ml-2"
            >
              Remove
            </button>
          </div>
        </div>
      )}
      <div className="mt-4 grid grid-cols-12">
        <div className="col-span-12 md:col-span-2">
          <p className="text-center text-primary text-2xl">
            {review.film.name}
          </p>
          <img
            src={review.film.posterUrl}
            className="poster mt-2 rounded"
            alt={`${review.film.name} poster.`}
          />
        </div>
        <div className="col-span-12 md:col-span-10 pl-4">
          <p className="text-rating text-2xl text-center md:text-left my-4 md:my-0">
            Rating {review.rating}/10
          </p>
          <div className="bg-backgroundOffset p-4 mt-2 shadow rounded">
            <p>{review.text}</p>
          </div>
          <ReviewCommentsSection review={review} />
        </div>
      </div>
    </div>
  );
}

export default Review;
