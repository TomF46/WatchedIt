import { useNavigate } from 'react-router-dom';
import { Review } from '../../types/Reviews';
import StarIcon from '../Icons/StarIcon';

type Props = {
  review: Review;
  isLink: boolean;
};

const SimpleReviewPreview = ({ review, isLink }: Props) => {
  const navigate = useNavigate();
  return (
    <div className='col-span-8 mt-2 md:col-span-4 lg:col-span-2'>
      <div
        onClick={() => {
          if (isLink) navigate(`/films/${review.film.id}/reviews/${review.id}`);
        }}
        className='mx-2 h-full cursor-pointer rounded bg-backgroundOffset shadow hover:opacity-75'
      >
        <img
          src={review.film.posterUrl}
          className='poster w-full rounded-t'
          alt={`${review.film.posterUrl} poster.`}
        />
        <div className='p-2'>
          <div className='grid grid-cols-12'>
            <div className='relative col-span-12 text-center'>
              <div className='inline-flex items-center text-center'>
                <StarIcon
                  color='rating'
                  height={5}
                  width={5}
                  strokeWidth={1.5}
                />
                <p className='ml-1'>{review.rating}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleReviewPreview;
