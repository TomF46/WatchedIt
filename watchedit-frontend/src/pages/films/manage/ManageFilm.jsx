import { parseISO } from "date-fns/esm";
import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getFilmById, saveFilm } from "../../../api/filmsApi";
import { uploadImage } from "../../../api/imageApi";
import FilmManageForm from "../../../components/Films/Manage/FilmManageForm";
import { newFilm } from "../../../tools/obJectShapes";

function ManageFilm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [film, setFilm] = useState({ ...newFilm });
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

    function mapForEditing(data){

        setFilm({
            id: data.id,
            name: data.name,
            shortDescription: data.shortDescription,
            fullDescription: data.fullDescription,
            runtime: data.runtime,
            releaseDate: parseISO(data.releaseDate),
            posterUrl: data.posterUrl
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

    function formIsValid(){
        const { name, shortDescription, fullDescription, runtime, posterUrl, releaseDate } = film;
        const errors = {};
        if(!name) errors.name = "Name is required";
        if(name.length > 60) errors.name = "Name cant be longer then 60 characters";
        if(!shortDescription) errors.shortDescription = "Short description is required";
        if(shortDescription.length > 200) errors.shortDescription = "Short description cant be longer than 200 characters";
        if(!fullDescription) errors.fullDescription = "Full description is required";
        if(fullDescription.length > 200) errors.fullDescription = "Full description cant be longer than 200 characters";
        if(!runtime) errors.runtime = "Runtime is required";
        if(!posterUrl) errors.posterUrl = "Poster Url is required";
        if(!releaseDate) errors.releaseDate = "Release date is required";
        console.log(errors);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        saveFilm(film).then(res => {
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
            <p>{editing ? `Editing ${id}` : "Adding"} film page</p>
            {film ? (
                <FilmManageForm film={film} onChange={handleChange} onDateChange={handleDateChange} onImageChange={handleImageChange} onSave={handleSave} errors={errors} saving={saving}  uploadingImage={imageUploading}/>
            ) : (
                <p>Loading form</p>
            )}
        </div>
    );
}

export default ManageFilm;
