import LoadingMessage from '../../../components/Loading/LoadingMessage';
import { useParams } from 'react-router-dom';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import ErrorMessage from '../../../components/Error/ErrorMessage';
import { toast } from 'react-toastify';
import { Image } from '../../../types/Images';
import {
  addPersonImage,
  getPersonImages,
  removePersonImage,
  uploadImage,
} from '../../../api/imageApi';
import { useState } from 'react';
import PaginationControls from '../../../components/PaginationControls';
import { confirmAlert } from 'react-confirm-alert';
import PhotographyIcon from '../../../components/Icons/PhotographyIcon';
import PersonMiniDetail from '../../../components/People/PersonMiniDetail';
import { getPersonById } from '../../../api/peopleApi';

function ManagePersonGallery() {
  const { id } = useParams();
  const [imageUploading, setImageUploading] = useState(false);
  const [page, setPage] = useState(1);
  const imagesPerPage = 24;

  const { data: person, error: personLoadError } = useQuery({
    queryKey: ['person', id],
    queryFn: () => getPersonById(Number(id)),
  });

  const { data: imagePaginator, refetch } = useQuery({
    queryKey: ['person-images', id, page, imagesPerPage],
    queryFn: () =>
      getPersonImages(Number(id), page, imagesPerPage).catch((error) => {
        toast.error(`Error getting person images ${error.data.Exception}`, {
          autoClose: false,
        });
        return error;
      }),
    placeholderData: keepPreviousData,
  });

  const uploadPersonImage = useMutation({
    mutationFn: (file: File) => {
      setImageUploading(true);
      return uploadImage(file, `people/${id}`);
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
      return addPersonImage(Number(id), image);
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
    uploadPersonImage.mutate(file);
  }

  const deleteImage = useMutation({
    mutationFn: (image: Image) =>
      removePersonImage(Number(id), Number(image.id)),
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

  function confirmRemove(image: Image) {
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

  if (personLoadError) {
    return (
      <ErrorMessage
        message={'Error loading person.'}
        error={personLoadError.data.Exception}
      />
    );
  }

  return (
    <div className='manage-gallery-page'>
      {person ? (
        <>
          <h1 className='mb-2 mt-4 text-center text-4xl font-semibold text-primary'>
            Manage {person.fullName} gallery
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
            <PersonMiniDetail person={person} />
            {imagePaginator ? (
              <>
                {imagePaginator.data.length > 0 ? (
                  <div className='mt-4'>
                    <div className='grid grid-cols-12'>
                      {imagePaginator.data.map((image: Image) => {
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
export default ManagePersonGallery;
