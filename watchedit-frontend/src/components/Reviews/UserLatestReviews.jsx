import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import LoadingMessage from "../Loading/LoadingMessage";
import ReviewOverview from "./ReviewOverview";
import { getUsersReviewsPaginated } from "../../api/usersApi";

function UserLatestReviews({ user, totalReviews }) {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    getUsersReviewsPaginated(user.id, 1, totalReviews)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        toast.error(`Error getting film reviews ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }, [user, totalReviews]);

  return (
    <div className="user-latest-reviews">
      {!reviews ? (
        <LoadingMessage message={`Loading ${user.username} latest reviews`} />
      ) : (
        <div className="mt-4">
          <h2 className="text-primary text-xl ">
            {user.username} Latest reviews
          </h2>
          {reviews.length > 0 ? (
            <div className="grid grid-cols-12">
              {reviews.map((review) => {
                return (
                  <ReviewOverview
                    key={review.id}
                    review={review}
                    showFilm={true}
                  />
                );
              })}
            </div>
          ) : (
            <p className="text-lg">{user.username} currently has no reviews.</p>
          )}
        </div>
      )}
    </div>
  );
}

UserLatestReviews.propTypes = {
  user: PropTypes.object.isRequired,
  totalReviews: PropTypes.number.isRequired,
};

export default UserLatestReviews;
