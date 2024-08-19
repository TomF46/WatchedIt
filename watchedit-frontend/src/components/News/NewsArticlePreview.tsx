import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { EditableNewsArticle, NewsArticle } from '../../types/News';
import CalendarIcon from '../Icons/CalendarIcon';
import EyeIcon from '../Icons/EyeIcon';

const NewsArticlePreview = ({
  article,
}: {
  article: NewsArticle | EditableNewsArticle;
}) => {
  const navigate = useNavigate();
  return (
    <div className='col-span-10 my-2 md:col-span-5 lg:col-span-4'>
      <div className='mx-2 h-full cursor-pointer rounded bg-backgroundOffset shadow'>
        <div
          onClick={() => {
            navigate(`/news/${article.id}`);
          }}
          className='relative hover:opacity-75'
        >
          <img
            src={article.thumbnailUrl}
            className={`thumbnail w-full rounded-t`}
            alt={`${article.title} thumbnail.`}
          />
          <div className='p-2'>
            <div className='grid grid-cols-12'>
              <div className='relative col-span-12 lg:col-span-8'>
                {article.createdDate && (
                  <div className='inline-flex items-center text-center'>
                    <CalendarIcon color='primary' height={5} width={5} />
                    <p className='ml-1 text-sm'>
                      {article.createdDate &&
                        format(
                          parseISO(article.createdDate.toString()),
                          'dd/MM/yyyy HH:mm',
                        )}
                    </p>
                  </div>
                )}
              </div>
              <div className='relative col-span-12 lg:col-span-4'>
                {article.readCount && (
                  <div className='right-0 top-0 block inline-flex items-center text-center lg:absolute'>
                    <EyeIcon color='success' height={5} width={5} />
                    <p className='ml-1'>{article.readCount}</p>
                  </div>
                )}
              </div>
              {!article.published && (
                <div className='col-span-12'>
                  <span className='text-primary'> &#40;Unpublished&#41;</span>
                </div>
              )}
              <div className='col-span-12'>
                <h3 className='text-lg text-primary'>{article.title}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsArticlePreview;
