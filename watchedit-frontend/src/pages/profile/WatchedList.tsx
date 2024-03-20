import { useState } from 'react';
import { toast } from 'react-toastify';
import { getUserById, getWatchedListByUserId } from '../../api/usersApi';
import FilmGrid from '../../components/Films/FilmGrid';
import PaginationControls from '../../components/PaginationControls';
import { useParams } from 'react-router-dom';
import LoadingMessage from '../../components/Loading/LoadingMessage';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ErrorMessage from '../../components/Error/ErrorMessage';
import usePageTargetUserId from '../../hooks/usePageTargetUserId';

function WatchedList() {
  const { id } = useParams();
  const userId = usePageTargetUserId(Number(id));
  const [page, setPage] = useState(1);
  const filmsPerPage = 32;

  const { data: user, error: userLoadError } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById(Number(userId)),
  });

  const { data: filmsPaginator } = useQuery({
    queryKey: ['user-watchedlist', userId, page, filmsPerPage],
    queryFn: () =>
      getWatchedListByUserId(Number(userId!), page, filmsPerPage).catch(
        (error) => {
          toast.error(`Error getting films ${error.data.Exception}`, {
            autoClose: false,
          });
          return error;
        },
      ),
    placeholderData: keepPreviousData,
  });

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
                    {user.username} has not watched any films.
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
