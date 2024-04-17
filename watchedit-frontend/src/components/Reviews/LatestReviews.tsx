import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingMessage from '../Loading/LoadingMessage';
import { getReviewsByFilmId } from '../../api/filmReviewApi';
import ReviewOverview from './ReviewOverview';
import { useQuery } from '@tanstack/react-query';
import { Film } from '../../types/Films';

type Props = {
  film: Film;
  totalReviews: number;
};

function LatestReviews({ film, totalReviews }: Props) {
  const sort = 'created_desc';
  const {
    isLoading,
    data: reviews,
    error,
  } = useQuery({
    queryKey: ['film-latest-reviews', film.id, totalReviews],
    queryFn: () =>
      getReviewsByFilmId(Number(film.id), 1, totalReviews, sort).then(
        (res) => res.data,
      ),
  });

  if (isLoading) return <LoadingMessage message={'Loading latest reviews.'} />;

  if (error) {
    toast.error(`Error getting latest reviews ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  if (reviews)
    return (
      <div className='film-latest-reviews'>
        <div className='mt-4'>
          <h2 className='text-xl text-primary '>Latest reviews</h2>
          {reviews.length > 0 ? (
            <div className='grid grid-cols-12'>
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
            <p className='text-lg'>
              This film currently has no reviews.{' '}
              <Link
                to={`/films/${film.id}/reviews/add`}
                className='text-primary'
              >
                Add one now.
              </Link>
            </p>
          )}
        </div>
      </div>
    );
}
export default LatestReviews;
