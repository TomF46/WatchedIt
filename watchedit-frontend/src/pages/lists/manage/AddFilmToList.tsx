import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import PaginationControls from '../../../components/PaginationControls';
import { addFilmToFilmList, getFilmListById } from '../../../api/filmListsApi';
import SelectFilmListWSearch from '../../../components/Films/SelectFilmListWSearch';
import { searchFilmsPaginated } from '../../../api/filmsApi';
import LoadingMessage from '../../../components/Loading/LoadingMessage';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import ErrorMessage from '../../../components/Error/ErrorMessage';
import { Film } from '../../../types/Films';
import useCurrentUserId from '../../../hooks/useCurrentUserId';

function AddFilmToList() {
  const userId = useCurrentUserId();
  const navigate = useNavigate();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const filmsPerPage = 20;
  const [searchTerm, setSearchTerm] = useState('');
  const queryKeyParams = useDebounce([searchTerm, page, filmsPerPage], 100);

  const {
    data: list,
    error: listLoadError,
    refetch: refetchList,
  } = useQuery({
    queryKey: ['list', id],
    queryFn: () =>
      getFilmListById(Number(id)).then((res) => {
        if (res.createdBy.id != userId) navigate(`/lists/${res.id}`);
        return res;
      }),
  });

  const { data: filmsPaginator } = useQuery({
    queryKey: ['films', ...queryKeyParams],
    queryFn: () =>
      searchFilmsPaginated(
        { searchTerm: searchTerm },
        page,
        filmsPerPage,
      ).catch((error) => {
        toast.error(`Error getting films ${error.data.Exception}`, {
          autoClose: false,
        });
        return error;
      }),
    placeholderData: keepPreviousData,
    staleTime: 100,
  });

  function handleSearchTermChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    const { value } = event.target;
    setSearchTerm(value);
    if (page != 1) setPage(1);
  }

  function handleFilmSelected(film: Film) {
    addFilmToFilmList(Number(list!.id), film)
      .then(() => {
        refetchList();
      })
      .catch((err) => {
        toast.error(`Error adding film to list ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }

  if (listLoadError) {
    return (
      <ErrorMessage
        message={'Error loading list to add films to.'}
        error={listLoadError.data.Exception}
      />
    );
  }

  return (
    <div className='add-film-to-list-page'>
      {!list ? (
        <LoadingMessage message={'Loading list.'} />
      ) : (
        <div>
          <h1 className='my-4 text-center text-4xl font-semibold text-primary'>
            Add films to {list.name}
          </h1>
          {!filmsPaginator ? (
            <LoadingMessage message={'Loading films.'} />
          ) : (
            <>
              <Link
                to={`/lists/${list.id}`}
                className='mt-4 inline-block rounded bg-primary px-4 py-2 text-center text-white hover:opacity-75'
              >
                Back to list
              </Link>
              <div className='mt-4'>
                <SelectFilmListWSearch
                  films={filmsPaginator.data}
                  currentFilms={list.films}
                  searchTerm={searchTerm}
                  onSearchTermChange={handleSearchTermChange}
                  onFilmSelected={handleFilmSelected}
                />
                <PaginationControls
                  currentPage={page}
                  onPageChange={setPage}
                  of={filmsPaginator.of}
                  from={filmsPaginator.from}
                  to={filmsPaginator.to}
                  lastPage={filmsPaginator.lastPage}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default AddFilmToList;
