import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getFilmById } from "../../../api/filmsApi";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import { newTrivia } from "../../../tools/obJectShapes";
import ManageTriviaForm from "../../../components/Films/Trivia/ManageTriviaForm";
import { getFilmTriviaById, saveFilmTrivia } from "../../../api/filmTriviaApi";

function ManageFilmTrivia() {
    const { id, triviaId } = useParams();
    const userId = useSelector((state) => state.tokens ? state.tokens.id : null);
    const navigate = useNavigate();
    const [film, setFilm] = useState(null);
    const [filmTrivia, setFilmTrivia] = useState({ ...newTrivia});
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (!film) {
            getFilm();
        }
    }, [id, film]);

    useEffect(() => {
        if(triviaId){
            getFilmTriviaById(id, triviaId).then(data => {
                mapForEditing(data);
                if(data.user.id != userId) navigate(`/films/${data.film.id}/trivia`);
                setEditing(true);
            }).catch(error => {
                toast.error(`Error fetching film trivia ${error.message}`, {
                    autoClose: false
                }
                );
            });
        } else {
            setFilmTrivia({ ...newTrivia});
        }
    }, [triviaId])

    function getFilm() {
        getFilmById(id)
            .then((res) => {
                setFilm(res);
            })
            .catch((err) => {
                toast.error(`Error getting film ${err.data.Exception}`, {
                    autoClose: false,
                });
            });
    }

    function mapForEditing(data){
        setFilmTrivia({
            id: data.id,
            text: data.text
        });
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setFilmTrivia(prevFilmTrivia => ({
            ...prevFilmTrivia,
            [name]: value
        }));
    }

    function formIsValid(){
        const { text } = filmTrivia;
        const errors = {};
        if(!text) errors.text = "Trivia text is required";
        if(text.length > 1000) errors.text = "Trivia text cant be longer than 1000 characters";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSave(event){
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        saveFilmTrivia(id, filmTrivia).then(() => {
            toast.success("Trivia saved");
            navigate(`/films/${id}/trivia`);
        }).catch(err => {
            setSaving(false);
            toast.error(`Error saving trivia ${err.data.Exception}`, {
                autoClose: false,
            });
        });
    }

    return (
        <div className="manage-film-trivia-page">
            {film && filmTrivia ? (
                <>
                    <ManageTriviaForm trivia={filmTrivia} film={film} onChange={handleChange} onSave={handleSave} errors={errors} saving={saving} editing={editing}/>
                </>
            ) : (
                <LoadingMessage message={"Loading form."} />
            )}
        </div>
    );
}

export default ManageFilmTrivia;

