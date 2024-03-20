import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { EditableNewsArticle, NewsArticle } from '../../types/News';

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
              <div className='col-span-12'>
                <h3 className='text-sm text-gray-400'>
                  {article.createdDate &&
                    format(
                      parseISO(article.createdDate.toString()),
                      'dd/MM/yyyy HH:mm',
                    )}
                  {!article.published && (
                    <span className='text-primary'> &#40;Unpublished&#41;</span>
                  )}
                </h3>
              </div>
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
