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
import SelectInput from '../../../components/Inputs/SelectInput';

function UsersReviews() {
  const { id } = useParams();
  const userId = usePageTargetUserId(Number(id));
  const [page, setPage] = useState(1);
  const reviewsPerPage = 12;

  const [sort, setSort] = useState('created_desc');

  const sortOptions = [
    { id: 'created_desc', name: 'Newest' },
    { id: 'created_asc', name: 'Oldest' },
    { id: 'score_desc', name: 'Highest rating' },
    { id: 'score_asc', name: 'Lowest rating' },
  ];

  const { data: user, error: userLoadError } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById(Number(userId)),
  });

  const { data: reviewsPaginator } = useQuery({
    queryKey: ['user-reviews', userId, page, reviewsPerPage, sort],
    queryFn: () =>
      getUsersReviewsPaginated(
        Number(userId!),
        page,
        reviewsPerPage,
        sort,
      ).catch((error) => {
        toast.error(`Error getting reviews ${error.data.Exception}`, {
          autoClose: false,
        });
        return error;
      }),
    placeholderData: keepPreviousData,
  });

  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    const { value } = event.target;
    setSort(value);
    if (page != 1) setPage(1);
  }

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
            <div className='mt-4'>
              <div className='search-controls mb-4 mt-4 rounded bg-backgroundOffset shadow'>
                <div className='rounded-t-md bg-backgroundOffset2'>
                  <p className='px-2 py-1 text-lg font-semibold text-primary'>
                    Search
                  </p>
                </div>
                <div className='px-2 py-2'>
                  <div className='search-box flex'>
                    <div>
                      <SelectInput
                        name='sort'
                        label='Sort'
                        value={sort}
                        options={sortOptions}
                        onChange={handleSortChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
