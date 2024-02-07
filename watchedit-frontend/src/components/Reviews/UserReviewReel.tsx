import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { searchUsersReviewsPaginated } from "../../api/usersApi";
import SimpleReviewPreview from "./SimpleReviewPreview";
import { useQuery } from "@tanstack/react-query";

function UserReviewsReel({ user, title, sort }) {
  const page = 1;
  const reviewsPerPage = 8;

  const {
    isLoading,
    data: reviewsPaginator,
    error,
  } = useQuery({
    queryKey: ["user-reviews", user.id, page, reviewsPerPage, sort],
    queryFn: () =>
      searchUsersReviewsPaginated(user.id, page, reviewsPerPage, sort),
  });

  if (error) {
    toast.error(`Error getting ${title} ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  if (!isLoading)
    return (
      <div className="reviews-reel">
        {reviewsPaginator && reviewsPaginator.data.length > 0 && (
          <div className="mt-4">
            <p className="text-primary text-2xl font-semibold">{title}</p>
            <div className="grid grid-cols-16">
              {reviewsPaginator.data.map((review) => {
                return (
                  <SimpleReviewPreview
                    key={review.id}
                    review={review}
                    isLink={true}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
}

UserReviewsReel.propTypes = {
  user: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  sort: PropTypes.string.isRequired,
};

export default UserReviewsReel;
