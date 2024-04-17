import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getFilmById } from '../../../api/filmsApi';
import { getReviewsByFilmId } from '../../../api/filmReviewApi';
import ReviewOverviewList from '../../../components/Films/Reviews/ReviewOverviewList';
import PaginationControls from '../../../components/PaginationControls';
import LoadingMessage from '../../../components/Loading/LoadingMessage';
import FilmMiniDetail from '../../../components/Films/FilmMiniDetail';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ErrorMessage from '../../../components/Error/ErrorMessage';
import StarIcon from '../../../components/Icons/StarIcon';
import SelectInput from '../../../components/Inputs/SelectInput';

function Reviews() {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const reviewsPerPage = 20;
  const [sort, setSort] = useState('created_desc');

  const sortOptions = [
    { id: 'created_desc', name: 'Newest' },
    { id: 'created_asc', name: 'Oldest' },
    { id: 'score_desc', name: 'Highest rating' },
    { id: 'score_asc', name: 'Lowest rating' },
  ];

  const { data: film, error: filmLoadError } = useQuery({
    queryKey: ['film', id],
    queryFn: () => getFilmById(Number(id)),
  });

  const { data: reviewsPaginator } = useQuery({
    queryKey: ['film-reviews', id, page, reviewsPerPage, sort],
    queryFn: () =>
      getReviewsByFilmId(Number(id), page, reviewsPerPage, sort).catch(
        (error) => {
          toast.error(`Error getting film reviews ${error.data.Exception}`, {
            autoClose: false,
          });
          return error;
        },
      ),
    placeholderData: keepPreviousData,
  });

  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    const { value } = event.target;
    setSort(value);
    if (page != 1) setPage(1);
  }

  if (filmLoadError) {
    return (
      <ErrorMessage
        message={'Error loading film.'}
        error={filmLoadError.data.Exception}
      />
    );
  }

  return (
    <div className='film-reviews-page'>
      {!film ? (
        <LoadingMessage message={'Loading film'} />
      ) : (
        <>
          <h1 className='mb-2 mt-4 text-center text-4xl font-semibold text-primary'>
            {film.name} reviews
          </h1>
          {film.averageRating && (
            <p className='mb-4 text-center text-xl text-primary'>
              Average rating: {film.averageRating}
            </p>
          )}
          <div className='review-controls mt-4 rounded-md bg-backgroundOffset'>
            <div className='rounded-t-md bg-backgroundOffset2'>
              <p className='px-2 py-1 text-lg font-semibold text-primary'>
                Review controls
              </p>
            </div>
            <div className='px-2 py-2'>
              <Link
                to={`/films/${film.id}/reviews/add`}
                className='inline-block rounded bg-backgroundOffset2 px-4 py-2 font-semibold text-primary hover:opacity-75'
              >
                Add review
              </Link>
            </div>
          </div>
          <div className='mt-4'>
            <FilmMiniDetail film={film} />
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
              {reviewsPaginator ? (
                <>
                  {reviewsPaginator.data.length > 0 ? (
                    <div className='mt-4'>
                      <ReviewOverviewList
                        reviews={reviewsPaginator.data}
                        showFilm={false}
                      />
                      <PaginationControls
                        currentPage={page}
                        onPageChange={setPage}
                        of={reviewsPaginator.of}
                        from={reviewsPaginator.from}
                        to={reviewsPaginator.to}
                        lastPage={reviewsPaginator.lastPage}
                      />
                    </div>
                  ) : (
                    <div className='my-16'>
                      <div className='flex justify-center text-center'>
                        <StarIcon
                          color='primary'
                          height={14}
                          width={14}
                          strokeWidth={1.5}
                        />
                      </div>
                      <p className='text-center text-xl'>
                        This film currently has no reviews.{' '}
                        <Link
                          to={`/films/${film.id}/reviews/add`}
                          className='text-primary hover:opacity-75'
                        >
                          Add one now.
                        </Link>
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <LoadingMessage message={'Loading reviews'} />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Reviews;
