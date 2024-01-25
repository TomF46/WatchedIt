import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingMessage from "../Loading/LoadingMessage";
import { getReviewsByFilmId } from "../../api/filmReviewApi";
import ReviewOverview from "./ReviewOverview";
import { useQuery } from "@tanstack/react-query";

function LatestReviews({ film, totalReviews }) {
  const {
    isLoading,
    data: reviews,
    error,
  } = useQuery({
    queryKey: ["film-latest-reviews", film.id, totalReviews],
    queryFn: () =>
      getReviewsByFilmId(film.id, 1, totalReviews).then((res) => res.data),
  });

  if (isLoading) return <LoadingMessage message={"Loading latest reviews."} />;

  if (error) {
    toast.error(`Error getting latest reviews ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  return (
    <div className="film-latest-reviews">
      <div className="mt-4">
        <h2 className="text-primary text-xl ">Latest reviews</h2>
        {reviews.length > 0 ? (
          <div className="grid grid-cols-12">
            {reviews.map((review) => {
              return (
                <ReviewOverview
                  key={review.id}
                  review={review}
                  showFilm={false}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-lg">
            This film currently has no reviews.{" "}
            <Link to={`/films/${film.id}/reviews/add`} className="text-primary">
              Add one now.
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

LatestReviews.propTypes = {
  film: PropTypes.object.isRequired,
  totalReviews: PropTypes.number.isRequired,
};

export default LatestReviews;
