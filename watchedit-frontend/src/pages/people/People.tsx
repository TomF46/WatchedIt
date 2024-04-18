import { useCallback, useState } from 'react';
import { searchPeoplePaginated } from '../../api/peopleApi';
import PersonGrid from '../../components/People/PersonGrid';
import PaginationControls from '../../components/PaginationControls';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import LoadingMessage from '../../components/Loading/LoadingMessage';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { PersonSearchParameters } from '../../types/People';
import useIsAdmin from '../../hooks/useIsAdmin';
import PersonSearch from '../../components/People/PersonSearch';

function People() {
  const isAdmin = useIsAdmin();
  const [query, setQuery] = useState<PersonSearchParameters>({
    firstName: '',
    lastName: '',
    stageName: '',
    sort: 'likes_desc',
  });
  const [page, setPage] = useState(1);
  const peoplePerPage = 32;

  const queryKeyParams = useDebounce([query, page, peoplePerPage], 100);

  const { isLoading, data: peoplePaginator } = useQuery({
    queryKey: ['people', ...queryKeyParams],
    queryFn: () =>
      searchPeoplePaginated(query, page, peoplePerPage).catch((error) => {
        toast.error(`Error getting people ${error.data.Exception}`, {
          autoClose: false,
        });
        return error;
      }),
    placeholderData: keepPreviousData,
    staleTime: 100,
  });

  const updateQuery = useCallback((params: PersonSearchParameters) => {
    setQuery(params);
  }, []);

  return (
    <div className='people-page'>
      <h1 className='my-4 text-center text-4xl font-semibold text-primary'>
        People
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
              to={'/people/add'}
              className='inline-block rounded bg-backgroundOffset2 px-4 py-2 font-semibold text-primary hover:opacity-75'
            >
              Add person
            </Link>
          </div>
        </div>
      )}
      <div className='mt-4'>
        <PersonSearch
          onQueryChange={updateQuery}
          page={page}
          onPageChange={setPage}
        />
        {isLoading ? (
          <LoadingMessage message={'Loading people.'} />
        ) : (
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
                No people match your search
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default People;
