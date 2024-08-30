import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingMessage from '../../../components/Loading/LoadingMessage';
import PaginationControls from '../../../components/PaginationControls';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import ErrorMessage from '../../../components/Error/ErrorMessage';
import useIsAdmin from '../../../hooks/useIsAdmin';
import { getNewsCategoryById } from '../../../api/newsCategoriesApi';
import { searchNewsPaginated } from '../../../api/newsApi';
import { NewsArticleSearchParameters } from '../../../types/News';
import NewsList from '../../../components/News/NewsList';

function NewsCategory() {
  const { id } = useParams();
  const isAdmin = useIsAdmin();
  const [query, setQuery] = useState<NewsArticleSearchParameters>({
    title: '',
    publisher: '',
    sort: 'created_desc',
    category: Number(id),
  });
  const [page, setPage] = useState(1);
  const filmsPerPage = 32;
  const queryKeyParams = useDebounce([query, id, page, filmsPerPage], 100);

  const { data: category, error: categoryLoadError } = useQuery({
    queryKey: ['category', id],
    queryFn: () => getNewsCategoryById(Number(id)),
  });

  const { isLoading, data: articlesPaginator } = useQuery({
    queryKey: ['category-articles', ...queryKeyParams],
    queryFn: () =>
      searchNewsPaginated(query, page, filmsPerPage).catch((error) => {
        toast.error(`Error getting articles ${error.data.Exception}`, {
          autoClose: false,
        });
        return error;
      }),
    placeholderData: keepPreviousData,
    staleTime: 100,
  });

  if (categoryLoadError) {
    return (
      <ErrorMessage
        message={'Error loading category'}
        error={categoryLoadError.data.Exception}
      />
    );
  }

  return (
    <div className='categories-page'>
      {!category ? (
        <LoadingMessage message={'Loading category'} />
      ) : (
        <div>
          <h1 className='my-4 text-center text-4xl font-semibold text-primary'>
            {category.name}
          </h1>
          {isAdmin && (
            <div className='admin-controls mt-4 rounded bg-backgroundOffset shadow'>
              <div className='rounded-t-md bg-backgroundOffset2'>
                <p className='px-2 py-1 text-lg font-semibold text-primary'>
                  Admin controls
                </p>
              </div>
              <div className='px-2 py-2'>
                <Link
                  to={`/categories/${id}/edit`}
                  className='inline-block rounded bg-backgroundOffset2 px-4 py-2 font-semibold text-primary hover:opacity-75'
                >
                  Edit category
                </Link>
              </div>
            </div>
          )}
          {isLoading ? (
            <LoadingMessage message={'Loading news.'} />
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
      )}
    </div>
  );
}

export default NewsCategory;
