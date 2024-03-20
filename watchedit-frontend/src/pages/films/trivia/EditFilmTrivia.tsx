import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { newTrivia } from '../../../tools/obJectShapes';
import { useMutation, useQuery } from '@tanstack/react-query';
import LoadingMessage from '../../../components/Loading/LoadingMessage';
import { getFilmTriviaById, saveFilmTrivia } from '../../../api/filmTriviaApi';
import { getFilmById } from '../../../api/filmsApi';
import ManageTrivia from './ManageTrivia';
import ErrorMessage from '../../../components/Error/ErrorMessage';
import { EditableTrivia } from '../../../types/Trivia';
import useCurrentUserId from '../../../hooks/useCurrentUserId';

function EditTrivia() {
  const { id, triviaId } = useParams();
  const userId = useCurrentUserId();
  const navigate = useNavigate();
  const [trivia, setTrivia] = useState<EditableTrivia>({ ...newTrivia });
  const [saving, setSaving] = useState(false);

  const {
    isLoading: isLoadingFilm,
    data: film,
    error: filmLoadError,
  } = useQuery({
    queryKey: ['film', id],
    queryFn: () => getFilmById(Number(id)),
  });

  const { isLoading, error } = useQuery({
    queryKey: ['trivia-update', id, triviaId],
    queryFn: () =>
      getFilmTriviaById(Number(id), Number(triviaId)).then((res) => {
        if (res.user.id != userId) navigate(`/films/${res.film.id}/trivia`);
        setTrivia({
          id: res.id,
          text: res.text,
        });
        return res;
      }),
  });

  const editTrivia = useMutation({
    mutationFn: (updatedTrivia: EditableTrivia) => {
      setSaving(true);
      return saveFilmTrivia(Number(id), updatedTrivia);
    },
    onSuccess: () => {
      toast.success('Trivia saved');
      navigate(`/films/${id}/trivia`);
    },
    onError: (err) => {
      setSaving(false);
      toast.error(`Error saving trivia ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  function handleUpdate(updatedTrivia: EditableTrivia): void {
    setTrivia(updatedTrivia);
  }

  if (isLoadingFilm) return <LoadingMessage message={'Loading film.'} />;

  if (filmLoadError) {
    return (
      <ErrorMessage
        message={'Error loading film.'}
        error={filmLoadError.data.Exception}
      />
    );
  }

  if (isLoading) return <LoadingMessage message={'Loading trivia.'} />;

  if (error) {
    return (
      <ErrorMessage
        message={'Error loading trivia for editing.'}
        error={error.data.Exception}
      />
    );
  }

  return (
    <div className='Edit-trivia-page'>
      <ManageTrivia
        film={film!}
        trivia={trivia}
        updateTrivia={handleUpdate}
        triggerSave={() => {
          editTrivia.mutate(trivia);
        }}
        saving={saving}
      />
    </div>
  );
}

export default EditTrivia;
