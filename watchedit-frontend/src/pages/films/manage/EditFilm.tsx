import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getFilmById, saveFilm } from '../../../api/filmsApi';
import { newFilm } from '../../../tools/obJectShapes';
import { useMutation, useQuery } from '@tanstack/react-query';
import { parseISO } from 'date-fns';
import LoadingMessage from '../../../components/Loading/LoadingMessage';
import ManageFilm from './ManageFilm';
import ErrorMessage from '../../../components/Error/ErrorMessage';
import { EditableFilm, FilmForRequest } from '../../../types/Films';
import { SelectOption } from '../../../components/Inputs/InputTypes';
import { Category } from '../../../types/Categories';
import { Tag } from '../../../types/Tags';
import { mapSelectsForRequest } from '../../../tools/manageFilmHelper';

function EditFilm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [film, setFilm] = useState<EditableFilm>({ ...newFilm });
  const [saving, setSaving] = useState(false);

  const { isLoading, error } = useQuery({
    queryKey: ['film-update', id],
    queryFn: () =>
      getFilmById(Number(id)).then((res) => {
        setFilm({
          id: res.id,
          name: res.name,
          shortDescription: res.shortDescription,
          fullDescription: res.fullDescription,
          runtime: res.runtime,
          releaseDate: parseISO(res.releaseDate.toString()),
          posterUrl: res.posterUrl,
          trailerUrl: res.trailerUrl,
          categories: convertCategoriesToSelectOption(res.categories),
          languages: convertTagsToSelectOption(res.languages),
          ageRatings: convertTagsToSelectOption(res.ageRatings),
          otherTags: convertTagsToSelectOption(res.otherTags),
        });
        return res;
      }),
  });

  function convertCategoriesToSelectOption(
    categories: Category[],
  ): SelectOption[] {
    return categories.map((c) => c as SelectOption);
  }
  function convertTagsToSelectOption(tags: Tag[]): SelectOption[] {
    return tags.map((t) => t as SelectOption);
  }

  const updateFilm = useMutation({
    mutationFn: (updatedFilm: FilmForRequest) => {
      setSaving(true);
      return saveFilm(updatedFilm);
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

  function handleSave() {
    let filmForRequest = { ...film } as FilmForRequest;
    filmForRequest = mapSelectsForRequest(filmForRequest, film);
    updateFilm.mutate(filmForRequest);
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
    <div className='edit-film-page'>
      <ManageFilm
        film={film}
        updateFilm={handleUpdate}
        triggerSave={handleSave}
        saving={saving}
      />
    </div>
  );
}

export default EditFilm;
