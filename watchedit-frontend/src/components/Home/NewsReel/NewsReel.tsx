import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import LoadingMessage from '../../Loading/LoadingMessage';
import { useQuery } from '@tanstack/react-query';
import { NewsArticle } from '../../../types/News';
import { getNewsPaginated } from '../../../api/newsApi';
import NewsArticlePreview from '../../News/NewsArticlePreview';
import NewsIcon from '../../Icons/NewsIcon';

type Props = {
  title: string;
  subtitle?: string;
  sort: string;
};

function NewsReel({ title, subtitle, sort }: Props) {
  const page = 1;
  const NewsPerPage = 8;

  const { isLoading, data, error } = useQuery({
    queryKey: ['NewsReel', sort, NewsPerPage, page],
    queryFn: () =>
      getNewsPaginated(page, NewsPerPage, sort).then((res) => res.data),
  });

  if (isLoading) return <LoadingMessage message={'Loading News.'} />;

  if (error) {
    toast.error(`Error getting News ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  if (data)
    return (
      <div className='News-reel'>
        <div className='mt-4'>
          <Link
            to={'/News'}
            className='text-2xl font-semibold text-primary hover:opacity-75'
          >
            {title}
          </Link>
          {subtitle && <p>{subtitle}</p>}
          {data.length > 0 ? (
            <div className='grid grid-cols-20'>
              {data.map((news: NewsArticle) => {
                return <NewsArticlePreview key={news.id} article={news} />;
              })}
            </div>
          ) : (
            <div className='my-16'>
              <div className='flex justify-center text-center'>
                <NewsIcon
                  color='primary'
                  height={14}
                  width={14}
                  strokeWidth={1.5}
                />
              </div>
              <p className='text-center text-2xl'>No News is available.</p>
            </div>
          )}
        </div>
      </div>
    );
}

export default NewsReel;
