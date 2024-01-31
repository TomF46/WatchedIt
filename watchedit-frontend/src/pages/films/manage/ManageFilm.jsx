import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";
import { getCategories } from "../../../api/categoriesApi";
import { uploadImage } from "../../../api/imageApi";
import ManageFilmForm from "../../../components/Films/Manage/ManageFilmForm";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import { useMutation, useQuery } from "@tanstack/react-query";

function ManageFilm({ film, updateFilm, triggerSave, saving }) {
  const [errors, setErrors] = useState({});
  const [imageUploading, setImageUploading] = useState(false);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      getCategories().catch((error) => {
        toast.error(`Error getting categories ${error.data.Exception}`, {
          autoClose: false,
        });
        return error;
      }),
  });

  const uploadPoster = useMutation({
    mutationFn: (file) => {
      setImageUploading(true);
      return uploadImage(file, "films");
    },
    onSuccess: (res) => {
      film.posterUrl = res.url;
      updateFilm({ ...film });
      setImageUploading(false);
    },
    onError: (err) => {
      setImageUploading(false);
      toast.error(`Error uploading image ${err.message}`, {
        autoClose: false,
      });
    },
  });

  function handleChange(event) {
    const { name, value } = event.target;
    updateFilm((prevFilm) => ({
      ...prevFilm,
      [name]: value,
    }));
  }

  function handleDateChange(date) {
    film.releaseDate = date;
    updateFilm({ ...film });
  }

  function handleCategoryChange(selected) {
    updateFilm((prevFilm) => ({
      ...prevFilm,
      categories: selected,
    }));
  }

  function handleImageChange(event) {
    if (event == null) {
      film.posterUrl = null;
      updateFilm({ ...film });
      return;
    }

    let file = event.target.files[0];
    uploadPoster.mutate(file);
  }

  function handleTrailerChange(url) {
    film.trailerUrl = url;
    updateFilm({ ...film });
  }

  function formIsValid() {
    const {
      name,
      shortDescription,
      fullDescription,
      runtime,
      posterUrl,
      releaseDate,
    } = film;
    const errors = {};
    if (!name) errors.name = "Name is required";
    if (name.length > 60)
      errors.name = "Name cant be longer then 60 characters";
    if (!shortDescription)
      errors.shortDescription = "Short description is required";
    if (shortDescription.length > 200)
      errors.shortDescription =
        "Short description cant be longer than 200 characters";
    if (!fullDescription)
      errors.fullDescription = "Full description is required";
    if (fullDescription.length > 800)
      errors.fullDescription =
        "Full description cant be longer than 800 characters";
    if (!runtime) errors.runtime = "Runtime is required";
    if (!posterUrl) errors.posterUrl = "Poster Url is required";
    if (!releaseDate) errors.releaseDate = "Release date is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    triggerSave();
  }

  return (
    <div className="manage-film-page">
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
        <LoadingMessage message={"Loading form."} />
      )}
    </div>
  );
}
ManageFilm.propTypes = {
  film: PropTypes.object.isRequired,
  updateFilm: PropTypes.func.isRequired,
  triggerSave: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};
export default ManageFilm;
