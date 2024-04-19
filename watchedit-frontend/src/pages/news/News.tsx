import { useCallback, useState } from 'react';
import { searchNewsPaginated } from '../../api/newsApi';
import { toast } from 'react-toastify';
import LoadingMessage from '../../components/Loading/LoadingMessage';
import PaginationControls from '../../components/PaginationControls';
import { Link } from 'react-router-dom';
import NewsList from '../../components/News/NewsList';
import { getCurrentUserIsPublisher } from '../../api/usersApi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import { NewsArticleSearchParameters } from '../../types/News';
import NewsArticleSearch from '../../components/News/NewsArticleSearch';

function News() {
  const userIsAuthenticated = useIsAuthenticated();
  const [query, setQuery] = useState<NewsArticleSearchParameters>({
    title: '',
    publisher: '',
    sort: 'created_desc',
  });
  const [page, setPage] = useState(1);
  const articlesPerPage = 32;

  const queryKeyParams = useDebounce([query, page, articlesPerPage], 100);

  const { isLoading, data: articlesPaginator } = useQuery({
    queryKey: ['people', ...queryKeyParams],
    queryFn: () =>
      searchNewsPaginated(query, page, articlesPerPage).catch((error) => {
        toast.error(`Error getting articles ${error.data.Exception}`, {
          autoClose: false,
        });
        return error;
      }),
    placeholderData: keepPreviousData,
    staleTime: 100,
  });

  const { data: userIsPublisher } = useQuery({
    queryKey: ['user-is-publisher', userIsAuthenticated],
    queryFn: () =>
      getCurrentUserIsPublisher().then((res) => {
        return res.canPublish;
      }),
  });

  const updateQuery = useCallback((params: NewsArticleSearchParameters) => {
    setQuery(params);
  }, []);

  return (
    <div className='news-page'>
      <h1 className='my-4 text-center text-4xl font-semibold text-primary'>
        News
      </h1>
      {userIsPublisher && (
        <div className='admin-controls mt-4 rounded bg-backgroundOffset shadow'>
          <div className='rounded-t-md bg-backgroundOffset2'>
            <p className='px-2 py-1 text-lg font-semibold text-primary'>
              Publisher controls
            </p>
          </div>
          <div className='px-2 py-2'>
            <Link
              to={'/news/add'}
              className='inline-block rounded bg-backgroundOffset2 px-4 py-2 font-semibold text-primary hover:opacity-75'
            >
              Add article
            </Link>
            <Link
              to={'/profile/news'}
              className='ml-2 inline-block rounded bg-backgroundOffset2 px-4 py-2 font-semibold text-primary hover:opacity-75'
            >
              View my articles
            </Link>
          </div>
        </div>
      )}
      <div className='mt-4'>
        <NewsArticleSearch
          onQueryChange={updateQuery}
          page={page}
          onPageChange={setPage}
          showSearchByPublisher
        />
        {isLoading ? (
          <LoadingMessage message={'Loading people.'} />
        ) : (
          <>
            {articlesPaginator.data.length > 0 ? (
              <>
                <NewsList articles={articlesPaginator.data} gridMode={true} />
                <PaginationControls
                  currentPage={page}
                  onPageChange={setPage}
                  of={articlesPaginator.of}
                  from={articlesPaginator.from}
                  to={articlesPaginator.to}
                  lastPage={articlesPaginator.lastPage}
                />
              </>
            ) : (
              <div className='my-16'>
                <p className='text-center text-2xl'>
                  No articles match search.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default News;
