import { parseISO } from "date-fns/esm";
import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCategories } from "../../../api/categoriesApi";
import { getFilmById, saveFilm } from "../../../api/filmsApi";
import { uploadImage } from "../../../api/imageApi";
import ManageFilmForm from "../../../components/Films/Manage/ManageFilmForm";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import { newFilm } from "../../../tools/obJectShapes";

function ManageFilm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [film, setFilm] = useState({ ...newFilm });
    const [categories, setCategories] = useState(null);
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);


    useEffect(() => {
        if (id) {
            getFilmById(id)
                .then(data => {
                    mapForEditing(data);
                    setEditing(true);
                })
                .catch(error => {
                    toast.error(`Error fetching film ${error.message}`, {
                        autoClose: false
                    }
                    );
                });
        } else {
            setFilm({ ...newFilm});
        }
    }, [id]);

    useEffect(() => {
        if (!categories) {
            getCategories().then(res => {
                setCategories(res);
            }).catch(error => {
                toast.error(`Error fetching categories ${error.message}`, {
                    autoClose: false
                }
                );
            });
        }
    }, [categories]);

    function mapForEditing(data){

        setFilm({
            id: data.id,
            name: data.name,
            shortDescription: data.shortDescription,
            fullDescription: data.fullDescription,
            runtime: data.runtime,
            releaseDate: parseISO(data.releaseDate),
            posterUrl: data.posterUrl,
            categories: data.categories
        });
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setFilm(prevFilm => ({
            ...prevFilm,
            [name]: value
        }));
    }

    function handleDateChange(date){
        film.releaseDate = date;
        setFilm({ ...film});
    }

    function handleCategoryChange(selected) {
        setFilm(prevFilm => ({
            ...prevFilm,
            categories: selected
        }));
    }

    function handleImageChange(event){
        if(event == null){
            film.posterUrl = null;
            setFilm({ ...film});
            return;
        }

        let file = event.target.files[0];
        setImageUploading(true);
        uploadImage(file, "films").then(res => {
            film.posterUrl = res.url;
            setFilm({ ...film});
            setImageUploading(false);
        }).catch(error => {
            setImageUploading(false);
            toast.error(`Error uploading image ${error.message}`, {
                autoClose: false
            }
            );
        });
    }

    function handleTrailerChange(url){
        film.trailerUrl = url;
        setFilm({ ...film});
    }

    function formIsValid(){
        const { name, shortDescription, fullDescription, runtime, posterUrl, releaseDate } = film;
        const errors = {};
        if(!name) errors.name = "Name is required";
        if(name.length > 60) errors.name = "Name cant be longer then 60 characters";
        if(!shortDescription) errors.shortDescription = "Short description is required";
        if(shortDescription.length > 200) errors.shortDescription = "Short description cant be longer than 200 characters";
        if(!fullDescription) errors.fullDescription = "Full description is required";
        if(fullDescription.length > 800) errors.fullDescription = "Full description cant be longer than 800 characters";
        if(!runtime) errors.runtime = "Runtime is required";
        if(!posterUrl) errors.posterUrl = "Poster Url is required";
        if(!releaseDate) errors.releaseDate = "Release date is required";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        let filmToPost = { ...film};
        filmToPost.categories = film.categories.map(category => category.id);
        setSaving(true);
        saveFilm(filmToPost).then(res => {
            toast.success("Film saved");
            navigate(`/films/${res.id}`);
        }).catch(err => {
            setSaving(false);
            toast.error(`Error saving ${err.data.Exception}`, {
                autoClose: false,
            });
        });
    }

    return (
        <div className="manage-film-page">
            {film ? (
                <ManageFilmForm film={film} categories={categories} onChange={handleChange} onDateChange={handleDateChange} onImageChange={handleImageChange} onCategoryChange={handleCategoryChange} onTrailerChange={handleTrailerChange} onSave={handleSave} errors={errors} saving={saving} editing={editing} uploadingImage={imageUploading}/>
            ) : (
                <LoadingMessage message={"Loading form."} />
            )}
        </div>
    );
}

export default ManageFilm;
