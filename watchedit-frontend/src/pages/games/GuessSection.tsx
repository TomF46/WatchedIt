import { useState } from 'react';
import { searchFilmsPaginated } from '../../api/filmsApi';
import { toast } from 'react-toastify';
import LoadingMessage from '../../components/Loading/LoadingMessage';
import SelectFilmWSearch from '../../components/Films/Credits/SelectFilmWSearch';
import PaginationControls from '../../components/PaginationControls';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { Film } from '../../types/Films';

const GuessSection = ({ guess }: { guess: (film: Film) => void }) => {
  const [page, setPage] = useState(1);
  const filmsPerPage = 16;
  const [searchTerm, setSearchTerm] = useState('');
  const queryKeyParams = useDebounce([searchTerm, page, filmsPerPage], 100);

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

  function handleFilmSelected(film: Film): void {
    guess(film);
  }

  return (
    <div>
      <h3 className='mb-2 text-center text-4xl text-primary'>Guess</h3>
      <div>
        {!filmsPaginator ? (
          <LoadingMessage message={'Loading films.'} />
        ) : (
          <>
            <SelectFilmWSearch
              films={filmsPaginator.data}
              searchTerm={searchTerm}
              onSearchTermChange={handleSearchTermChange}
              onFilmSelected={handleFilmSelected}
              cardMode={true}
            />
            <PaginationControls
              currentPage={page}
              onPageChange={setPage}
              of={filmsPaginator.of}
              from={filmsPaginator.from}
              to={filmsPaginator.to}
              lastPage={filmsPaginator.lastPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default GuessSection;
