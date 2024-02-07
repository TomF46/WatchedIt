import PropTypes from "prop-types";
import { toast } from "react-toastify";
import LoadingMessage from "../Loading/LoadingMessage";
import ReviewOverview from "./ReviewOverview";
import { getUsersReviewsPaginated } from "../../api/usersApi";
import { useQuery } from "@tanstack/react-query";

function UserLatestReviews({ user, totalReviews }) {
  const {
    isLoading,
    data: reviews,
    error,
  } = useQuery({
    queryKey: ["user-latest-reviews", user.id, totalReviews],
    queryFn: () =>
      getUsersReviewsPaginated(user.id, 1, totalReviews).then(
        (res) => res.data,
      ),
  });

  if (isLoading)
    return (
      <LoadingMessage message={`Loading ${user.username} latest reviews`} />
    );

  if (error) {
    toast.error(`Error getting users latest reviews ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  return (
    <div className="user-latest-reviews">
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
    </div>
  );
}

UserLatestReviews.propTypes = {
  user: PropTypes.object.isRequired,
  totalReviews: PropTypes.number.isRequired,
};

export default UserLatestReviews;
