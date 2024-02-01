import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ReviewOverviewList from "../../../components/Films/Reviews/ReviewOverviewList";
import PaginationControls from "../../../components/PaginationControls";
import { getUserById, getUsersReviewsPaginated } from "../../../api/usersApi";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ErrorMessage from "../../../components/Error/ErrorMessage";

function UsersReviews() {
  const { id } = useParams();
  const currentUserId = useSelector((state) =>
    state.tokens ? state.tokens.id : null,
  );
  const userId = id ? id : currentUserId;
  const [page, setPage] = useState(1);
  const reviewsPerPage = 12;

  const { data: user, error: userLoadError } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
  });

  const { data: reviewsPaginator } = useQuery({
    queryKey: ["user-reviews", userId, page, reviewsPerPage],
    queryFn: () =>
      getUsersReviewsPaginated(userId, page, reviewsPerPage).catch((error) => {
        toast.error(`Error getting reviews ${error.data.Exception}`, {
          autoClose: false,
        });
        return error;
      }),
    placeholderData: keepPreviousData,
  });

  if (userLoadError) {
    return (
      <ErrorMessage message={"Error loading user."} error={userLoadError} />
    );
  }

  return (
    <div className="users-reviews-page">
      {!user ? (
        <LoadingMessage message={"Loading user."} />
      ) : (
        <>
          <div>
            <h1 className="text-center text-primary text-4xl my-4 font-semibold">
              {user.username} reviews
            </h1>
            {reviewsPaginator ? (
              <>
                {reviewsPaginator.data.length > 0 ? (
                  <>
                    <ReviewOverviewList
                      reviews={reviewsPaginator.data}
                      showFilm
                    />
                    <PaginationControls
                      currentPage={page}
                      onPageChange={setPage}
                      of={reviewsPaginator.of}
                      from={reviewsPaginator.from}
                      to={reviewsPaginator.to}
                      lastPage={reviewsPaginator.lastPage}
                    />
                  </>
                ) : (
                  <p className="text-center text-primary text-2xl">
                    User has not added any reviews
                  </p>
                )}
              </>
            ) : (
              <LoadingMessage message={"Loading reviews."} />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default UsersReviews;
