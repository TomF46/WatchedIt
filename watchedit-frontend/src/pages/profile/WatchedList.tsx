import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { getUserById, getWatchedListByUserId } from '../../api/usersApi';
import FilmGrid from '../../components/Films/FilmGrid';
import PaginationControls from '../../components/PaginationControls';
import { useParams } from 'react-router-dom';
import LoadingMessage from '../../components/Loading/LoadingMessage';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ErrorMessage from '../../components/Error/ErrorMessage';
import usePageTargetUserId from '../../hooks/usePageTargetUserId';
import { FilmSearchParameters } from '../../types/Films';
import { useDebounce } from '@uidotdev/usehooks';
import FilmSearch from '../../components/Films/FilmSearch';

function WatchedList() {
  const { id } = useParams();
  const userId = usePageTargetUserId(Number(id));
  const [page, setPage] = useState(1);
  const filmsPerPage = 32;
  const [query, setQuery] = useState({
    searchTerm: '',
    category: undefined,
    sort: 'rating_desc',
    maxRating: undefined,
    minRating: undefined,
  } as FilmSearchParameters);

  const queryKeyParams = useDebounce([query, userId, filmsPerPage, page], 100);

  const { data: user, error: userLoadError } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById(Number(userId)),
  });

  const { data: filmsPaginator } = useQuery({
    queryKey: ['user-watchedlist', ...queryKeyParams],
    queryFn: () =>
      getWatchedListByUserId(Number(userId!), query, page, filmsPerPage).catch(
        (error) => {
          toast.error(`Error getting films ${error.data.Exception}`, {
            autoClose: false,
          });
          return error;
        },
      ),
    placeholderData: keepPreviousData,
  });

  const updateQuery = useCallback((params: FilmSearchParameters) => {
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
    <div className='watched-films-page'>
      {!user ? (
        <LoadingMessage message={'Loading user'} />
      ) : (
        <>
          <div>
            <h1 className='my-4 text-center text-4xl font-semibold text-primary'>
              {user.username} watched films
            </h1>
            <FilmSearch
              onQueryChange={updateQuery}
              page={page}
              onPageChange={setPage}
            />
            {filmsPaginator ? (
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
                  <p className='text-center text-2xl text-primary'>
                    {user.username} has not watched any films matching your
                    search.
                  </p>
                )}
              </>
            ) : (
              <LoadingMessage message={'Loading watched films'} />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default WatchedList;
