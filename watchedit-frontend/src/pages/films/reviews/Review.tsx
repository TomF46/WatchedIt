import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { removeReview, getReviewById } from '../../../api/filmReviewApi';
import { confirmAlert } from 'react-confirm-alert';
import LoadingMessage from '../../../components/Loading/LoadingMessage';
import ReviewCommentsSection from '../../../components/Reviews/ReviewCommentsSection';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Review as ReviewType } from '../../../types/Reviews';
import ErrorMessage from '../../../components/Error/ErrorMessage';
import useCurrentUserId from '../../../hooks/useCurrentUserId';
import { format, parseISO } from 'date-fns/esm';

function Review() {
  const { id, reviewId } = useParams();
  const userId = useCurrentUserId();
  const navigate = useNavigate();
  const [userCanEdit, setUserCanEdit] = useState(false);

  const {
    isLoading,
    data: review,
    error,
  } = useQuery({
    queryKey: ['review', id, reviewId],
    queryFn: () =>
      getReviewById(Number(id), Number(reviewId)).then((res) => {
        setUserCanEdit(res.user.id == userId);
        return res;
      }),
  });

  const deleteReview = useMutation({
    mutationFn: (reviewToRemove: ReviewType) =>
      removeReview(Number(id), reviewToRemove),
    onSuccess: () => {
      toast.success('Review removed');
      navigate(`/films/${id}/reviews`);
    },
    onError: (err) => {
      toast.error(`Error removing review ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  function confirmDelete(): void {
    confirmAlert({
      title: 'Confirm removal',
      message: `Are you sure you want to remove this review?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteReview.mutate(review!),
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  }

  if (isLoading) return <LoadingMessage message={'Loading review.'} />;

  if (error) {
    return (
      <ErrorMessage
        message={'Error loading review.'}
        error={error.data.Exception}
      />
    );
  }

  if (review)
    return (
      <div className='film-reviews-page'>
        <h1 className='my-4 text-center text-4xl font-semibold text-primary'>
          {review.film.name} review
        </h1>
        {userCanEdit && (
          <div className='owner-controls mt-4 rounded bg-backgroundOffset shadow'>
            <div className='rounded-t-md bg-backgroundOffset2'>
              <p className='px-2 py-1 text-lg font-semibold text-primary'>
                Review owner controls
              </p>
            </div>
            <div className='px-2 py-2'>
              <Link
                to={`/films/${review.film.id}/reviews/${reviewId}/edit`}
                className='inline-block rounded bg-backgroundOffset2 px-4 py-2 font-semibold text-primary hover:opacity-75'
              >
                Edit review
              </Link>
              <button
                onClick={() => {
                  confirmDelete();
                }}
                className='ml-2 inline-block rounded bg-backgroundOffset2 px-4 py-2 font-semibold text-red-400 hover:opacity-75'
              >
                Remove
              </button>
            </div>
          </div>
        )}
        <div className='mt-4 grid grid-cols-12'>
          <div className='col-span-12 md:col-span-2'>
            <p className='text-center text-2xl text-primary'>
              {review.film.name}
            </p>
            <img
              src={review.film.posterUrl}
              className='poster mt-2 rounded'
              alt={`${review.film.name} poster.`}
            />
          </div>
          <div className='col-span-12 pl-4 md:col-span-10'>
            <p className='my-4 text-center text-2xl text-rating md:my-0 md:text-left'>
              Rating {review.rating}/10
            </p>
            <p className='text-slate-400'>
              {format(parseISO(review.createdDate.toString()), 'dd/MM/yyyy')}
            </p>
            <div className='mt-2 rounded bg-backgroundOffset p-4 shadow'>
              <p>{review.text}</p>
            </div>
            <ReviewCommentsSection review={review} />
          </div>
        </div>
      </div>
    );
}

export default Review;
