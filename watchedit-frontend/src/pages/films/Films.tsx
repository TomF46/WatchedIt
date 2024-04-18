import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import FilmGrid from '../../components/Films/FilmGrid';
import PaginationControls from '../../components/PaginationControls';
import { Link } from 'react-router-dom';
import { searchFilmsPaginated } from '../../api/filmsApi';
import LoadingMessage from '../../components/Loading/LoadingMessage';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import FilmIcon from '../../components/Icons/FilmIcon';
import useIsAdmin from '../../hooks/useIsAdmin';
import FilmSearch from '../../components/Films/FilmSearch';
import { FilmSearchParameters } from '../../types/Films';

function Films() {
  const isAdmin = useIsAdmin();
  const filmsPerPage = 32;
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState({
    searchTerm: '',
    category: undefined,
    sort: 'rating_desc',
    maxRating: undefined,
    minRating: undefined,
  } as FilmSearchParameters);

  const queryKeyParams = useDebounce([query, filmsPerPage, page], 100);

  const { isLoading, data: filmsPaginator } = useQuery({
    queryKey: ['films', ...queryKeyParams],
    queryFn: () =>
      searchFilmsPaginated(query, page, filmsPerPage).catch((error) => {
        toast.error(`Error getting films ${error.data.Exception}`, {
          autoClose: false,
        });
        return error;
      }),
    placeholderData: keepPreviousData,
    staleTime: 100,
  });

  const updateQuery = useCallback((params: FilmSearchParameters) => {
    setQuery(params);
  }, []);

  return (
    <div className='films-page'>
      <h1 className='my-4 text-center text-4xl font-semibold text-primary'>
        Films
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
              to={'/films/add'}
              className='inline-block rounded bg-backgroundOffset2 px-4 py-2 font-semibold text-primary hover:opacity-75'
            >
              Add film
            </Link>
          </div>
        </div>
      )}
      <div className='mt-4'>
        <FilmSearch
          onQueryChange={updateQuery}
          page={page}
          onPageChange={setPage}
        />
        {isLoading ? (
          <LoadingMessage message={'Loading films.'} />
        ) : (
          <>
            {filmsPaginator.data.length > 0 ? (
              <>
                <FilmGrid films={filmsPaginator.data} editable={false} />
                <PaginationControls
                  currentPage={page}
                  onPageChange={setPage}
                  of={filmsPaginator.of}
                  from={filmsPaginator.from}
                  to={filmsPaginator.to}
                  lastPage={filmsPaginator.lastPage}
                />
              </>
            ) : (
              <div className='my-16'>
                <div className='flex justify-center text-center'>
                  <FilmIcon color='primary' height={14} width={14} />
                </div>
                <p className='text-center text-2xl'>
                  No films match your search
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Films;
