import { useState } from 'react';
import { toast } from 'react-toastify';
import { getCategories } from '../../../api/categoriesApi';
import { uploadImage } from '../../../api/imageApi';
import ManageFilmForm from '../../../components/Films/Manage/ManageFilmForm';
import LoadingMessage from '../../../components/Loading/LoadingMessage';
import { useMutation, useQuery } from '@tanstack/react-query';
import { EditableFilm, FilmFormErrors } from '../../../types/Films';
import { SelectOption } from '../../../components/Inputs/InputTypes';

type Props = {
  film: EditableFilm;
  updateFilm: (film: EditableFilm) => void;
  triggerSave: () => void;
  saving: boolean;
};

function ManageFilm({ film, updateFilm, triggerSave, saving }: Props) {
  const [errors, setErrors] = useState({} as FilmFormErrors);
  const [imageUploading, setImageUploading] = useState(false);

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      getCategories().catch((error) => {
        toast.error(`Error getting categories ${error.data.Exception}`, {
          autoClose: false,
        });
        return error;
      }),
  });

  const uploadPoster = useMutation({
    mutationFn: (file: File) => {
      setImageUploading(true);
      return uploadImage(file, 'films/posters');
    },
    onSuccess: (res) => {
      film.posterUrl = res.url;
      updateFilm({ ...film });
      setImageUploading(false);
    },
    onError: (err) => {
      setImageUploading(false);
      toast.error(`Error uploading image ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  function handleChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ): void {
    const { name, value } = event.target;
    updateFilm({
      ...film,
      [name]: value,
    });
  }

  function handleDateChange(date: Date | null): void {
    if (!date) return;
    film.releaseDate = date;
    updateFilm({ ...film });
  }

  function handleCategoryChange(selected: SelectOption[]) {
    updateFilm({
      ...film,
      categories: selected,
    });
  }

  function handleImageChange(file: File | null): void {
    if (file == null) {
      film.posterUrl = undefined;
      updateFilm({ ...film });
      return;
    }

    uploadPoster.mutate(file);
  }

  function handleTrailerChange(url: string | null) {
    if (!url) return;
    film.trailerUrl = url;
    updateFilm({ ...film });
  }

  function formIsValid(): boolean {
    const {
      name,
      shortDescription,
      fullDescription,
      runtime,
      posterUrl,
      releaseDate,
    } = film;
    const errors = {} as FilmFormErrors;
    if (!name) errors.name = 'Name is required';
    if (name.length > 60)
      errors.name = 'Name cant be longer then 60 characters';
    if (!shortDescription)
      errors.shortDescription = 'Short description is required';
    if (shortDescription.length > 200)
      errors.shortDescription =
        'Short description cant be longer than 200 characters';
    if (!fullDescription)
      errors.fullDescription = 'Full description is required';
    if (fullDescription.length > 800)
      errors.fullDescription =
        'Full description cant be longer than 800 characters';
    if (!runtime) errors.runtime = 'Runtime is required';
    if (!posterUrl) errors.posterUrl = 'Poster Url is required';
    if (!releaseDate) errors.releaseDate = 'Release date is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event: React.SyntheticEvent): void {
    event.preventDefault();
    if (!formIsValid()) return;
    triggerSave();
  }

  return (
    <div className='manage-film-page'>
      {film ? (
        <ManageFilmForm
          film={film}
          categories={categories}
          onChange={handleChange}
          onDateChange={handleDateChange}
          onImageChange={handleImageChange}
          onCategoryChange={handleCategoryChange}
          onTrailerChange={handleTrailerChange}
          onSave={handleSave}
          errors={errors}
          saving={saving}
          uploadingImage={imageUploading}
        />
      ) : (
        <LoadingMessage message={'Loading form.'} />
      )}
    </div>
  );
}

export default ManageFilm;
