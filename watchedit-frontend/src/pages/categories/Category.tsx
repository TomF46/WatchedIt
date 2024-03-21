import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCategoryById } from '../../api/categoriesApi';
import LoadingMessage from '../../components/Loading/LoadingMessage';
import FilmGrid from '../../components/Films/FilmGrid';
import PaginationControls from '../../components/PaginationControls';
import { searchFilmsPaginated } from '../../api/filmsApi';
import TextInput from '../../components/Inputs/TextInput';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import ErrorMessage from '../../components/Error/ErrorMessage';
import FilmIcon from '../../components/Icons/FilmIcon';
import useIsAdmin from '../../hooks/useIsAdmin';

function Category() {
  const { id } = useParams();
  const isAdmin = useIsAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const filmsPerPage = 32;
  const queryKeyParams = useDebounce([searchTerm, id, page, filmsPerPage], 100);

  const { data: category, error: categoryLoadError } = useQuery({
    queryKey: ['category', id],
    queryFn: () => getCategoryById(Number(id)),
  });

  const { data: filmsPaginator } = useQuery({
    queryKey: ['category-films', ...queryKeyParams],
    queryFn: () =>
      searchFilmsPaginated(
        { searchTerm: searchTerm, category: Number(id) },
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

export default Category;
