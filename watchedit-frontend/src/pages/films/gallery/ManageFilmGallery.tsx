import LoadingMessage from '../../../components/Loading/LoadingMessage';
import { useParams } from 'react-router-dom';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { getFilmById } from '../../../api/filmsApi';
import ErrorMessage from '../../../components/Error/ErrorMessage';
import { toast } from 'react-toastify';
import { FilmImage, Image } from '../../../types/Images';
import {
  addFilmImage,
  getFilmImages,
  removeFilmImage,
  uploadImage,
} from '../../../api/imageApi';
import { useState } from 'react';
import FilmMiniDetail from '../../../components/Films/FilmMiniDetail';
import PaginationControls from '../../../components/PaginationControls';
import { confirmAlert } from 'react-confirm-alert';
import PhotographyIcon from '../../../components/Icons/PhotographyIcon';

function ManageFilmGallery() {
  const { id } = useParams();
  const [imageUploading, setImageUploading] = useState(false);
  const [page, setPage] = useState(1);
  const imagesPerPage = 24;

  const { data: film, error: filmLoadError } = useQuery({
    queryKey: ['film', id],
    queryFn: () => getFilmById(Number(id)),
  });

  const { data: filmImagePaginator, refetch } = useQuery({
    queryKey: ['film-images', id, page, imagesPerPage],
    queryFn: () =>
      getFilmImages(Number(id), page, imagesPerPage).catch((error) => {
        toast.error(`Error getting film images ${error.data.Exception}`, {
          autoClose: false,
        });
        return error;
      }),
    placeholderData: keepPreviousData,
  });

  const uploadFilmImage = useMutation({
    mutationFn: (file: File) => {
      setImageUploading(true);
      return uploadImage(file, `films/${id}`);
    },
    onSuccess: (res: Image) => {
      addImageToGallery.mutate(res);
    },
    onError: (err) => {
      setImageUploading(false);
      toast.error(`Error uploading image ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  const addImageToGallery = useMutation({
    mutationFn: (image: Image) => {
      return addFilmImage(Number(id), image);
    },
    onSuccess: () => {
      setImageUploading(false);
      refetch();
    },
    onError: (err) => {
      setImageUploading(false);
      toast.error(`Error adding image to gallery ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>): void {
    if (!event.target.files) return;
    const file = event.target.files[0];
    uploadFilmImage.mutate(file);
  }

  const deleteImage = useMutation({
    mutationFn: (image: FilmImage) =>
      removeFilmImage(Number(id), Number(image.id)),
    onSuccess: () => {
      toast.success('Image removed');
      refetch();
    },
    onError: (err) => {
      toast.error(`Error removing image ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  function confirmRemove(image: FilmImage) {
    confirmAlert({
      title: 'Confirm removal',
      message: `Are you sure you want to remove this image?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteImage.mutate(image),
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  }

  if (filmLoadError) {
    return (
      <ErrorMessage
        message={'Error loading film.'}
        error={filmLoadError.data.Exception}
      />
    );
  }

  return (
    <div className='manage-gallery-page'>
      {film ? (
        <>
          <h1 className='mb-2 mt-4 text-center text-4xl font-semibold text-primary'>
            Manage {film.name} gallery
          </h1>
          <div className='manage-gallery-controls mt-4 rounded-md bg-backgroundOffset'>
            <div className='rounded-t-md bg-backgroundOffset2'>
              <p className='px-2 py-1 text-lg font-semibold text-primary'>
                Upload
              </p>
            </div>
            <div className='px-2 py-2'>
              <button
                type='button'
                className='pointer inline-flex items-center rounded bg-primary px-4 py-2 text-white shadow hover:opacity-75'
              >
                <label className='pointer ml-1'>
                  Upload image
                  <input
                    type='file'
                    name={`imageUrl`}
                    className=' hidden w-full border-gray-400 p-2'
                    onChange={(e) => handleImageUpload(e)}
                  />
                </label>
              </button>
              {!!imageUploading && <p className='ml-4'>Uploading...</p>}
            </div>
          </div>
          <div className='mt-4'>
            <FilmMiniDetail film={film} />
            {filmImagePaginator ? (
              <>
                {filmImagePaginator.data.length > 0 ? (
                  <div className='mt-4'>
                    <div className='grid grid-cols-12'>
                      {filmImagePaginator.data.map((image: FilmImage) => {
                        return (
                          <div
                            key={image.id}
                            className='col-span-12 m-2 md:col-span-4 lg:col-span-2'
                          >
                            <img
                              src={image.url}
                              className='image-preview mx-auto'
                            />
                            <button
                              onClick={() => {
                                confirmRemove(image);
                              }}
                              className='mt-2 w-full rounded bg-red-400 p-2 text-center hover:opacity-75'
                            >
                              Remove
                            </button>
                          </div>
                        );
                      })}
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
export default ManageFilmGallery;
