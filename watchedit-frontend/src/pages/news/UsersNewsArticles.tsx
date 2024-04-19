import { useCallback, useState } from 'react';
import { getNewsByUserPaginated } from '../../api/newsApi';
import { toast } from 'react-toastify';
import LoadingMessage from '../../components/Loading/LoadingMessage';
import PaginationControls from '../../components/PaginationControls';
import { useParams } from 'react-router-dom';
import NewsList from '../../components/News/NewsList';
import { getUserById } from '../../api/usersApi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ErrorMessage from '../../components/Error/ErrorMessage';
import usePageTargetUserId from '../../hooks/usePageTargetUserId';
import { useDebounce } from '@uidotdev/usehooks';
import { NewsArticleSearchParameters } from '../../types/News';
import NewsArticleSearch from '../../components/News/NewsArticleSearch';

function UsersNewsArticles() {
  const { id } = useParams();
  const userId = usePageTargetUserId(Number(id));
  const [query, setQuery] = useState<NewsArticleSearchParameters>({
    title: '',
    publisher: '',
    sort: 'created_desc',
  });
  const [page, setPage] = useState(1);
  const articlesPerPage = 32;

  const queryKeyParams = useDebounce(
    [query, userId, page, articlesPerPage],
    100,
  );

  const { data: user, error: userLoadError } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById(Number(userId)),
  });

  const { data: articlesPaginator } = useQuery({
    queryKey: ['person-credits', ...queryKeyParams],
    queryFn: () =>
      getNewsByUserPaginated(
        Number(userId!),
        query,
        page,
        articlesPerPage,
      ).catch((error) => {
        toast.error(`Error getting users articles ${error.data.Exception}`, {
          autoClose: false,
        });
        return error;
      }),
    placeholderData: keepPreviousData,
  });

  const updateQuery = useCallback((params: NewsArticleSearchParameters) => {
    setQuery(params);
  }, []);

  if (userLoadError) {
    return (
      <ErrorMessage
        message={'Error loading user.'}
        error={userLoadError.data.Exception}
      />
    );
  }

  return (
    <div className='user-news-page'>
      {!user ? (
        <LoadingMessage message={'Loading user.'} />
      ) : (
        <>
          <h1 className='my-4 text-center text-4xl font-semibold text-primary'>
            News by {user.username}
          </h1>
          <NewsArticleSearch
            onQueryChange={updateQuery}
            page={page}
            onPageChange={setPage}
            showSearchByPublisher={false}
          />
          {!articlesPaginator ? (
            <LoadingMessage message={'Loading articles.'} />
          ) : (
            <div className='mt-4'>
              {articlesPaginator.data.length > 0 ? (
                <>
                  <NewsList articles={articlesPaginator.data} gridMode />
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
                    No articles have been published.
                  </p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default UsersNewsArticles;
