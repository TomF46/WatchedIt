import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import LoadingMessage from "../Loading/LoadingMessage";
import { searchUsersReviewsPaginated } from "../../api/usersApi";
import SimpleReviewPreview from "./SimpleReviewPreview";

function UserReviewsReel({ user, title, sort }) {
  const [reviewsPaginator, setReviewsPaginator] = useState(null);
  const page = 1;
  const reviewsPerPage = 8;

  useEffect(() => {
    searchUsersReviewsPaginated(user.id, page, reviewsPerPage, sort)
      .then((res) => {
        setReviewsPaginator(res);
      })
      .catch((err) => {
        toast.error(`Error getting reviews ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }, [page, reviewsPerPage, sort]);

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
