import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import NewsArticleGrid from './NewsArticleGrid';
import { NewsArticle } from '../../types/News';

type Props = {
  articles: NewsArticle[];
  gridMode: boolean;
};

const NewsList = ({ articles, gridMode }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      {gridMode ? (
        <NewsArticleGrid articles={articles} />
      ) : (
        <div className='grid grid-cols-12'>
          {articles.map((article) => {
            return (
              <div
                onClick={() => {
                  navigate(`/news/${article.id}`);
                }}
                className='col-span-12 my-1 cursor-pointer rounded bg-backgroundOffset p-4 shadow'
                key={article.id}
              >
                <div className='grid grid-cols-12'>
                  <div className='col-span-12 md:col-span-8'>
                    {article.title} by{' '}
                    <span className='text-primary'>{article.authorName}</span>
                    {!article.published && (
                      <span className='text-primary'>
                        {' '}
                        &#40;Unpublished&#41;
                      </span>
                    )}
                  </div>
                  <div className='col-span-12 text-right md:col-span-4'>
                    {format(
                      parseISO(article.createdDate.toString()),
                      'dd/MM/yyyy HH:mm',
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default NewsList;
