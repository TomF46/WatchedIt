import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { saveFilm } from '../../../api/filmsApi';
import { newFilm } from '../../../tools/obJectShapes';
import ManageFilm from './ManageFilm';
import { useMutation } from '@tanstack/react-query';
import { EditableFilm, FilmForRequest } from '../../../types/Films';
import { SelectOption } from '../../../components/Inputs/InputTypes';

function AddFilm() {
  const navigate = useNavigate();
  const [film, setFilm] = useState<EditableFilm>({ ...newFilm });
  const [saving, setSaving] = useState(false);

  const addFilm = useMutation({
    mutationFn: (newFilm: FilmForRequest) => {
      setSaving(true);
      return saveFilm(newFilm);
    },
    onSuccess: (res) => {
      toast.success('Film saved');
      navigate(`/films/${res.id}`);
    },
    onError: (err) => {
      setSaving(false);
      toast.error(`Error saving ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  function handleUpdate(updatedFilm: EditableFilm): void {
    setFilm(updatedFilm);
  }

  function handleSave(): void {
    const filmToPost = { ...film } as FilmForRequest;
    filmToPost.categories = film.categories.map(
      (category: SelectOption) => category.id,
    );
    filmToPost.tags = film.tags.map((tag: SelectOption) => tag.id);
    addFilm.mutate(filmToPost);
  }

  return (
    <div className='add-film-page'>
      <ManageFilm
        film={film}
        updateFilm={handleUpdate}
        triggerSave={handleSave}
        saving={saving}
      />
    </div>
  );
}

export default AddFilm;
