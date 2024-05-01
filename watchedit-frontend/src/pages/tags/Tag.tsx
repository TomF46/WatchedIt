import { Link, useParams } from 'react-router-dom';
import { getTagById } from '../../api/tagsApi';
import LoadingMessage from '../../components/Loading/LoadingMessage';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ErrorMessage from '../../components/Error/ErrorMessage';
import useIsAdmin from '../../hooks/useIsAdmin';
import { useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { toast } from 'react-toastify';
import { searchFilmsPaginated } from '../../api/filmsApi';
import FilmGrid from '../../components/Films/FilmGrid';
import PaginationControls from '../../components/PaginationControls';
import TextInput from '../../components/Inputs/TextInput';
import FilmIcon from '../../components/Icons/FilmIcon';

function Tag() {
  const { id } = useParams();
  const isAdmin = useIsAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const filmsPerPage = 32;
  const queryKeyParams = useDebounce([searchTerm, id, page, filmsPerPage], 100);

  const { data: tag, error: tagLoadError } = useQuery({
    queryKey: ['tag', id],
    queryFn: () => getTagById(Number(id)),
  });

  const { data: filmsPaginator } = useQuery({
    queryKey: ['category-films', ...queryKeyParams],
    queryFn: () =>
      searchFilmsPaginated(
        { searchTerm: searchTerm, tag: Number(id) },
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

  if (tagLoadError) {
    return (
      <ErrorMessage
        message={'Error loading tag'}
        error={tagLoadError.data.Exception}
      />
    );
  }

  return (
    <div className='tag-page'>
      {!tag ? (
        <LoadingMessage message={'Loading tag'} />
      ) : (
        <div>
          <h1 className='mt-4 text-center text-4xl font-semibold text-primary'>
            {tag.name}
          </h1>
          <p className='mb-4 text-center text-xl'>&#40;{tag.typeText}&#41;</p>
          {isAdmin && (
            <div className='admin-controls mt-4 rounded bg-backgroundOffset shadow'>
              <div className='rounded-t-md bg-backgroundOffset2'>
                <p className='px-2 py-1 text-lg font-semibold text-primary'>
                  Admin controls
                </p>
              </div>
              <div className='px-2 py-2'>
                <Link
                  to={`/tags/${id}/edit`}
                  className='inline-block rounded bg-backgroundOffset2 px-4 py-2 font-semibold text-primary hover:opacity-75'
                >
                  Edit tag
                </Link>
              </div>
            </div>
          )}
          {!filmsPaginator ? (
            <LoadingMessage message={'Loading films.'} />
          ) : (
            <div className='mt-4'>
              <div className='controls mb-4 mt-4 rounded-md bg-backgroundOffset shadow'>
                <div className='rounded-t-md bg-backgroundOffset2'>
                  <p className='px-2 py-1 text-lg font-semibold text-primary'>
                    Search
                  </p>
                </div>
                <div className='px-2 py-2'>
                  <div className='search-box flex'>
                    <div>
                      <TextInput
                        name='searchTerm'
                        label='Search'
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                        required={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
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
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Tag;
