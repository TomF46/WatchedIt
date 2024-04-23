import LoadingMessage from '../../../components/Loading/LoadingMessage';
import { useParams } from 'react-router-dom';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getFilmImages } from '../../../api/imageApi';
import { useState } from 'react';
import { toast } from 'react-toastify';
import PaginationControls from '../../../components/PaginationControls';
import Gallery from '../../../components/Films/Gallery/Gallery';

function GalleryOverview({ filmId }: { filmId: number }) {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const imagesPerPage = 6;

  const {
    data: filmImagePaginator,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['film-images', id, page, imagesPerPage],
    queryFn: () => getFilmImages(Number(filmId), page, imagesPerPage),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <LoadingMessage message={'Loading gallery.'} />;

  if (error) {
    toast.error(`Error getting film gallery ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  if (filmImagePaginator && filmImagePaginator.data.length > 0) {
    return (
      <div className='film-galler-overview'>
        <div className='mt-4'>
          <h2 className='text-xl text-primary '>Gallery</h2>
          <div className='rounded bg-backgroundOffset p-2 shadow'>
            <Gallery images={filmImagePaginator.data} />
          </div>
          <PaginationControls
            currentPage={page}
            onPageChange={setPage}
            of={filmImagePaginator.of}
            from={filmImagePaginator.from}
            to={filmImagePaginator.to}
            lastPage={filmImagePaginator.lastPage}
          />
        </div>
      </div>
    );
  }
}

export default GalleryOverview;
