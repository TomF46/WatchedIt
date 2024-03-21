import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReviewOverviewList from '../../../components/Films/Reviews/ReviewOverviewList';
import PaginationControls from '../../../components/PaginationControls';
import { getUserById, getUsersReviewsPaginated } from '../../../api/usersApi';
import LoadingMessage from '../../../components/Loading/LoadingMessage';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ErrorMessage from '../../../components/Error/ErrorMessage';
import usePageTargetUserId from '../../../hooks/usePageTargetUserId';

function UsersReviews() {
  const { id } = useParams();
  const userId = usePageTargetUserId(Number(id));
  const [page, setPage] = useState(1);
  const reviewsPerPage = 12;

  const { data: user, error: userLoadError } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById(Number(userId)),
  });

  const { data: reviewsPaginator } = useQuery({
    queryKey: ['user-reviews', userId, page, reviewsPerPage],
    queryFn: () =>
      getUsersReviewsPaginated(Number(userId!), page, reviewsPerPage).catch(
        (error) => {
          toast.error(`Error getting reviews ${error.data.Exception}`, {
            autoClose: false,
          });
          return error;
        },
      ),
    placeholderData: keepPreviousData,
  });

  if (userLoadError) {
    return (
      <ErrorMessage
        message={'Error loading user.'}
        error={userLoadError.data.Exception}
      />
    );
  }

  return (
    <div className='users-reviews-page'>
      {!user ? (
        <LoadingMessage message={'Loading user.'} />
      ) : (
        <>
          <div>
            <h1 className='my-4 text-center text-4xl font-semibold text-primary'>
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
                  <p className='text-center text-2xl text-primary'>
                    User has not added any reviews
                  </p>
                )}
              </>
            ) : (
              <LoadingMessage message={'Loading reviews.'} />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default UsersReviews;
