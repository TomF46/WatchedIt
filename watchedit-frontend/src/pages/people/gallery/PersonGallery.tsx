import LoadingMessage from '../../../components/Loading/LoadingMessage';
import { Link, useParams } from 'react-router-dom';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ErrorMessage from '../../../components/Error/ErrorMessage';
import { getPersonImages } from '../../../api/imageApi';
import { useState } from 'react';
import { toast } from 'react-toastify';
import PaginationControls from '../../../components/PaginationControls';
import Gallery from '../../../components/Gallery/Gallery';
import useIsAdmin from '../../../hooks/useIsAdmin';
import PhotographyIcon from '../../../components/Icons/PhotographyIcon';
import PersonMiniDetail from '../../../components/People/PersonMiniDetail';
import { getPersonById } from '../../../api/peopleApi';

function PersonGallery() {
  const { id } = useParams();
  const isAdmin = useIsAdmin();
  const [page, setPage] = useState(1);
  const imagesPerPage = 36;

  const { data: person, error: personLoadError } = useQuery({
    queryKey: ['person', id],
    queryFn: () => getPersonById(Number(id)),
  });

  const { data: imagePaginator } = useQuery({
    queryKey: ['person-images', id, page, imagesPerPage],
    queryFn: () =>
      getPersonImages(Number(id), page, imagesPerPage).catch((error) => {
        toast.error(`Error getting person gallery ${error.data.Exception}`, {
          autoClose: false,
        });
        return error;
      }),
    placeholderData: keepPreviousData,
  });

  if (personLoadError) {
    return (
      <ErrorMessage
        message={'Error loading person.'}
        error={personLoadError.data.Exception}
      />
    );
  }

  return (
    <div className='person-gallery-page'>
      {person ? (
        <>
          <h1 className='mb-2 mt-4 text-center text-4xl font-semibold text-primary'>
            {person.fullName} gallery
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
                  to={`/people/${id}/gallery/manage`}
                  className='inline-block rounded bg-backgroundOffset2 px-4 py-2 font-semibold text-primary hover:opacity-75'
                >
                  Manage Images
                </Link>
              </div>
            </div>
          )}
          <div className='mt-4'>
            <PersonMiniDetail person={person} />
            {imagePaginator ? (
              <>
                {imagePaginator.data.length > 0 ? (
                  <div className='mt-4'>
                    <p className='text-lg text-primary'>
                      Click image to enlarge.
                    </p>
                    <Gallery images={imagePaginator.data} />
                    <PaginationControls
                      currentPage={page}
                      onPageChange={setPage}
                      of={imagePaginator.of}
                      from={imagePaginator.from}
                      to={imagePaginator.to}
                      lastPage={imagePaginator.lastPage}
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
                      This person has no images
                    </p>
                  </div>
                )}
              </>
            ) : (
              <LoadingMessage message={'Loading person gallery'} />
            )}
          </div>
        </>
      ) : (
        <LoadingMessage message={'Loading person.'} />
      )}
    </div>
  );
}
export default PersonGallery;
