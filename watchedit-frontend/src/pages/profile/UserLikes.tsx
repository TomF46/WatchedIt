import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { getUserById, getLikedPeopleByUserId } from '../../api/usersApi';
import PaginationControls from '../../components/PaginationControls';
import { useParams } from 'react-router-dom';
import LoadingMessage from '../../components/Loading/LoadingMessage';
import PersonGrid from '../../components/People/PersonGrid';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ErrorMessage from '../../components/Error/ErrorMessage';
import usePageTargetUserId from '../../hooks/usePageTargetUserId';
import { useDebounce } from '@uidotdev/usehooks';
import { PersonSearchParameters } from '../../types/People';
import PersonSearch from '../../components/People/PersonSearch';

function UserLikes() {
  const { id } = useParams();
  const userId = usePageTargetUserId(Number(id));
  const [page, setPage] = useState(1);
  const peoplePerPage = 32;
  const [query, setQuery] = useState<PersonSearchParameters>({
    firstName: '',
    lastName: '',
    stageName: '',
    sort: 'likes_desc',
  });

  const queryKeyParams = useDebounce([query, userId, peoplePerPage, page], 100);

  const { data: user, error: userLoadError } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById(Number(userId)),
  });

  const { data: peoplePaginator } = useQuery({
    queryKey: ['user-watchedlist', ...queryKeyParams],
    queryFn: () =>
      getLikedPeopleByUserId(Number(userId!), query, page, peoplePerPage).catch(
        (error) => {
          toast.error(`Error getting users likes ${error.data.Exception}`, {
            autoClose: false,
          });
          return error;
        },
      ),
    placeholderData: keepPreviousData,
  });

  const updateQuery = useCallback((params: PersonSearchParameters) => {
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
    <div className='user-likes-page'>
      {!user ? (
        <LoadingMessage message={'Loading user'} />
      ) : (
        <>
          <div>
            <h1 className='my-4 text-center text-4xl font-semibold text-primary'>
              {user.username} liked people
            </h1>
            <PersonSearch
              onQueryChange={updateQuery}
              page={page}
              onPageChange={setPage}
            />
            {peoplePaginator ? (
              <>
                {peoplePaginator.data.length > 0 ? (
                  <>
                    <PersonGrid people={peoplePaginator.data} />
                    <PaginationControls
                      currentPage={page}
                      onPageChange={setPage}
                      of={peoplePaginator.of}
                      from={peoplePaginator.from}
                      to={peoplePaginator.to}
                      lastPage={peoplePaginator.lastPage}
                    />
                  </>
                ) : (
                  <p className='text-center text-2xl text-primary'>
                    {user.username} has not liked any people.
                  </p>
                )}
              </>
            ) : (
              <LoadingMessage message={'Loading liked people'} />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default UserLikes;
