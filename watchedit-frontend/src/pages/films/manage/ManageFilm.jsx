import { parseISO } from "date-fns/esm";
import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getFilmById, saveFilm } from "../../../api/filmsApi";
import FilmManageForm from "../../../components/Films/Manage/FilmManageForm";
import { newFilm } from "../../../tools/obJectShapes";

function ManageFilm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [film, setFilm] = useState({ ...newFilm });
    const [errors, setErrors] = useState({ questions: [] });
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState(false);


    useEffect(() => {
        if (id) {
            getFilmById(id)
                .then(data => {
                    mapForEditing(data);
                    setEditing(true);
                })
                .catch(error => {
                    console.log(error);
                    toast.error(`Error fetching film ${error.message}`, {
                        autoClose: false
                    }
                    );
                });
        } else {
            setFilm({ ...newFilm});
            console.log(film);
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
        console.log(date);
        film.releaseDate = date;
        setFilm({ ...film});
    }

    function formIsValid(){
        const { name, shortDescription, fullDescription, runtime, posterUrl } = film;
        const errors = {};
        if(!name) errors.name = "Name is required";
        if(!shortDescription) errors.shortDescription = "Short description is required";
        if(!fullDescription) errors.fullDescription = "Full description is required";
        if(!runtime) errors.runtime = "Runtime is required";
        if(!posterUrl) errors.posterUrl = "Poster Url is required";
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
                <FilmManageForm film={film} onChange={handleChange} onDateChange={handleDateChange} onSave={handleSave} errors={errors} saving={saving} />
            ) : (
                <p>Loading form</p>
            )}
        </div>
    );
}

export default ManageFilm;
