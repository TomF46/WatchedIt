import LoadingMessage from '../../Loading/LoadingMessage';
import { useParams } from 'react-router-dom';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getPersonImages } from '../../../api/imageApi';
import { useState } from 'react';
import { toast } from 'react-toastify';
import PaginationControls from '../../PaginationControls';
import Gallery from '../../Gallery/Gallery';

function PersonGalleryOverview({ personId }: { personId: number }) {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const imagesPerPage = 6;

  const {
    data: imagePaginator,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['person-images', id, page, imagesPerPage],
    queryFn: () => getPersonImages(Number(personId), page, imagesPerPage),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <LoadingMessage message={'Loading gallery.'} />;

  if (error) {
    toast.error(`Error getting person gallery ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  if (imagePaginator && imagePaginator.data.length > 0) {
    return (
      <div className='person-galler-overview'>
        <div className='mt-4'>
          <h2 className='text-xl text-primary '>Gallery</h2>
          <div className='rounded bg-backgroundOffset p-2 shadow'>
            <Gallery images={imagePaginator.data} />
          </div>
          <PaginationControls
            currentPage={page}
            onPageChange={setPage}
            of={imagePaginator.of}
            from={imagePaginator.from}
            to={imagePaginator.to}
            lastPage={imagePaginator.lastPage}
          />
        </div>
      </div>
    );
  }
}

export default PersonGalleryOverview;
