import { toast } from "react-toastify";
import { searchUsersReviewsPaginated } from "../../api/usersApi";
import SimpleReviewPreview from "./SimpleReviewPreview";
import { useQuery } from "@tanstack/react-query";
import { Review } from "../../types/Reviews";
import { User } from "../../types/AuthDefinitions";

type Props = {
  user: User;
  title: string;
  sort: string;
};

function UserReviewsReel({ user, title, sort }: Props) {
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
              {reviewsPaginator.data.map((review: Review) => {
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

export default UserReviewsReel;
