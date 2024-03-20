import { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  deleteFilmList,
  getFilmListById,
  removeFilmFromFilmList,
} from '../../api/filmListsApi';
import FilmGrid from '../../components/Films/FilmGrid';
import LoadingMessage from '../../components/Loading/LoadingMessage';
import UserMiniDetail from '../../components/User/UserMiniDetail';
import { useQuery } from '@tanstack/react-query';
import ErrorMessage from '../../components/Error/ErrorMessage';
import { Film } from '../../types/Films';
import FilmIcon from '../../components/Icons/FilmIcon';
import useCurrentUserId from '../../hooks/useCurrentUserId';

function List() {
  const { id } = useParams();
  const userId = useCurrentUserId();
  const navigate = useNavigate();
  const [userCanEdit, setUserCanEdit] = useState(false);

  const {
    isLoading,
    data: list,
    error,
    refetch,
  } = useQuery({
    queryKey: ['list', id],
    queryFn: () =>
      getFilmListById(Number(id)).then((res) => {
        setUserCanEdit(res.createdBy.id == userId);
        return res;
      }),
  });

  function confirmDelete() {
    if (!userCanEdit) return;
    confirmAlert({
      title: 'Confirm deletion',
      message: `Are you sure you want to remove ${list!.name}?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteList(),
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  }

  function deleteList() {
    deleteFilmList(Number(list!.id))
      .then(() => {
        toast.success('List removed');
        navigate('/lists');
      })
      .catch((err) => {
        toast.error(`Error removing list ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }

  function handleRemove(film: Film) {
    confirmAlert({
      title: 'Confirm removal',
      message: `Are you sure you want to remove ${film.name} from your list?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => removeFilm(film),
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  }

  function removeFilm(film: Film) {
    removeFilmFromFilmList(Number(list!.id), film)
      .then(() => {
        toast.success('Film removed from list');
        refetch();
      })
      .catch((err) => {
        toast.error(`Error removing film from list ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }

  if (isLoading) return <LoadingMessage message={'Loading list.'} />;

  if (error) {
    return (
      <ErrorMessage
        message={'Error loading list.'}
        error={error.data.Exception}
      />
    );
  }

  if (list)
    return (
      <div className='list-page'>
        <h1 className='my-4 text-center text-4xl font-semibold text-primary'>
          {list.name}
        </h1>
        {userCanEdit && (
          <div className='owner-controls mt-4 rounded bg-backgroundOffset shadow'>
            <div className='rounded-t-md bg-backgroundOffset2'>
              <p className='px-2 py-1 text-lg font-semibold text-primary'>
                List owner controls
              </p>
            </div>
            <div className='px-2 py-2'>
              <Link
                to={`/lists/${id}/add`}
                className='inline-block rounded bg-backgroundOffset2 px-4 py-2 font-semibold text-primary hover:opacity-75'
              >
                Add films
              </Link>
              <Link
                to={`/lists/${id}/edit`}
                className='ml-2 inline-block rounded bg-backgroundOffset2 px-4 py-2 font-semibold text-primary hover:opacity-75'
              >
                Edit list
              </Link>
              <button
                onClick={() => {
                  confirmDelete();
                }}
                className='ml-2 inline-block rounded bg-backgroundOffset2 px-4 py-2 font-semibold text-red-400 hover:opacity-75'
              >
                Remove
              </button>
            </div>
          </div>
        )}
        <div className='mt-4'>
          <div className='my-4 grid grid-cols-12'>
            <div className='col-span-8'>
              <div className='h-full rounded bg-backgroundOffset p-2 shadow'>
                <h2 className='text-lg text-primary'>Description:</h2>
                <p>{list.description}</p>
              </div>
            </div>
            <div className='col-span-4 ml-2'>
              <UserMiniDetail user={list.createdBy} />
            </div>
          </div>
          {list.films.length > 0 ? (
            <FilmGrid
              films={list.films}
              editable={userCanEdit}
              onRemove={handleRemove}
            />
          ) : (
            <div className='my-16'>
              <div className='flex justify-center text-center'>
                <FilmIcon color='primary' height={14} width={14} />
              </div>
              <p className='text-center text-2xl'>
                {userCanEdit
                  ? 'You have not yet added a film to this list.'
                  : 'The list owner has not added a film to this list.'}
              </p>
            </div>
          )}
        </div>
      </div>
    );
}

export default List;
