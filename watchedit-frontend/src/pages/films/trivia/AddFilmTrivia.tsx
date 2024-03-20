import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { newTrivia } from '../../../tools/obJectShapes';
import ManageTrivia from './ManageTrivia';
import LoadingMessage from '../../../components/Loading/LoadingMessage';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getFilmById } from '../../../api/filmsApi';
import { saveFilmTrivia } from '../../../api/filmTriviaApi';
import ErrorMessage from '../../../components/Error/ErrorMessage';
import { EditableTrivia } from '../../../types/Trivia';

function AddTrivia() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trivia, setTrivia] = useState<EditableTrivia>({ ...newTrivia });
  const [saving, setSaving] = useState(false);

  const {
    isLoading,
    data: film,
    error,
  } = useQuery({
    queryKey: ['film', id],
    queryFn: () => getFilmById(Number(id)),
  });

  const addTrivia = useMutation({
    mutationFn: (newTrivia: EditableTrivia) => {
      setSaving(true);
      return saveFilmTrivia(Number(id), newTrivia);
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

  if (isLoading) return <LoadingMessage message={'Loading film.'} />;

  if (error) {
    return (
      <ErrorMessage
        message={'Error loading film.'}
        error={error.data.Exception}
      />
    );
  }

  return (
    <div className='Add-trivia-page'>
      <ManageTrivia
        film={film!}
        trivia={trivia}
        updateTrivia={handleUpdate}
        triggerSave={() => addTrivia.mutate(trivia)}
        saving={saving}
      ></ManageTrivia>
    </div>
  );
}

export default AddTrivia;
