import LoadingMessage from '../../../components/Loading/LoadingMessage';
import { Link, useParams } from 'react-router-dom';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getFilmById } from '../../../api/filmsApi';
import ErrorMessage from '../../../components/Error/ErrorMessage';
import { getFilmImages } from '../../../api/imageApi';
import { useState } from 'react';
import { toast } from 'react-toastify';
import PaginationControls from '../../../components/PaginationControls';
import FilmMiniDetail from '../../../components/Films/FilmMiniDetail';
import Gallery from '../../../components/Films/Gallery/Gallery';
import useIsAdmin from '../../../hooks/useIsAdmin';
import PhotographyIcon from '../../../components/Icons/PhotographyIcon';

function FilmGallery() {
  const { id } = useParams();
  const isAdmin = useIsAdmin();
  const [page, setPage] = useState(1);
  const imagesPerPage = 36;

  const { data: film, error: filmLoadError } = useQuery({
    queryKey: ['film', id],
    queryFn: () => getFilmById(Number(id)),
  });

  const { data: filmImagePaginator } = useQuery({
    queryKey: ['film-images', id, page, imagesPerPage],
    queryFn: () =>
      getFilmImages(Number(id), page, imagesPerPage).catch((error) => {
        toast.error(`Error getting film gallery ${error.data.Exception}`, {
          autoClose: false,
        });
        return error;
      }),
    placeholderData: keepPreviousData,
  });

  if (filmLoadError) {
    return (
      <ErrorMessage
        message={'Error loading film.'}
        error={filmLoadError.data.Exception}
      />
    );
  }

  return (
    <div className='film-gallery-page'>
      {film ? (
        <>
          <h1 className='mb-2 mt-4 text-center text-4xl font-semibold text-primary'>
            {film.name} gallery
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
                  to={`/films/${id}/gallery/manage`}
                  className='inline-block rounded bg-backgroundOffset2 px-4 py-2 font-semibold text-primary hover:opacity-75'
                >
                  Manage Images
                </Link>
              </div>
            </div>
          )}
          <div className='mt-4'>
            <FilmMiniDetail film={film} />
            {filmImagePaginator ? (
              <>
                {filmImagePaginator.data.length > 0 ? (
                  <div className='mt-4'>
                    <p className='text-lg text-primary'>
                      Click image to enlarge.
                    </p>
                    <Gallery images={filmImagePaginator.data} />
                    <PaginationControls
                      currentPage={page}
                      onPageChange={setPage}
                      of={filmImagePaginator.of}
                      from={filmImagePaginator.from}
                      to={filmImagePaginator.to}
                      lastPage={filmImagePaginator.lastPage}
                    />
                  </div>
                ) : (
                  <div className='my-16'>
                    <div className='flex justify-center text-center'>
                      <PhotographyIcon
                        color='primary'
                        height={14}
                        width={14}
                        strokeWidth={1.5}
                      />
                    </div>
                    <p className='text-center text-xl'>
                      This film has no images
                    </p>
                  </div>
                )}
              </>
            ) : (
              <LoadingMessage message={'Loading film gallery'} />
            )}
          </div>
        </>
      ) : (
        <LoadingMessage message={'Loading film.'} />
      )}
    </div>
  );
}
export default FilmGallery;
