import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingMessage from "../Loading/LoadingMessage";
import { getReviewsByFilmId } from "../../api/filmReviewApi";
import ReviewOverview from "./ReviewOverview";

function LatestReviews({ film, totalReviews }) {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    getReviewsByFilmId(film.id, 1, totalReviews)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        toast.error(`Error getting film reviews ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }, [film, totalReviews]);

  return (
    <div className="film-latest-reviews">
      {!reviews ? (
        <LoadingMessage message={"Loading latest reviews"} />
      ) : (
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
              <Link
                to={`/films/${film.id}/reviews/add`}
                className="text-primary"
              >
                Add one now.
              </Link>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

LatestReviews.propTypes = {
  film: PropTypes.object.isRequired,
  totalReviews: PropTypes.number.isRequired,
};

export default LatestReviews;
