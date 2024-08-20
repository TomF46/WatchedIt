import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import LoadingMessage from '../../Loading/LoadingMessage';
import { useQuery } from '@tanstack/react-query';
import ReviewIcon from '../../Icons/ReviewIcon';
import { getReviews } from '../../../api/filmReviewApi';
import ReviewOverviewList from '../../Films/Reviews/ReviewOverviewList';

type Props = {
  title: string;
  subtitle?: string;
  sort: string;
};

function ReviewReel({ title, subtitle, sort }: Props) {
  const page = 1;
  const ReviewPerPage = 4;

  const { isLoading, data, error } = useQuery({
    queryKey: ['ReviewReel', sort, ReviewPerPage, page],
    queryFn: () =>
      getReviews(page, ReviewPerPage, sort).then((res) => res.data),
  });

  if (isLoading) return <LoadingMessage message={'Loading Review.'} />;

  if (error) {
    toast.error(`Error getting Review ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  if (data)
    return (
      <div className='Review-reel'>
        <div className='mt-4'>
          <h3 className='text-2xl font-semibold text-primary'>{title}</h3>
          {subtitle && <p>{subtitle}</p>}
          {data.length > 0 ? (
            <ReviewOverviewList reviews={data} showFilm={true} />
          ) : (
            <div className='my-16'>
              <div className='flex justify-center text-center'>
                <ReviewIcon
                  color='primary'
                  height={14}
                  width={14}
                  strokeWidth={1.5}
                />
              </div>
              <p className='text-center text-2xl'>No Reviews are available.</p>
            </div>
          )}
        </div>
      </div>
    );
}

export default ReviewReel;
