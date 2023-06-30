import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getFilmById } from "../../../api/filmsApi";
import { getReviewById, saveReview } from "../../../api/filmReviewApi";
import { newReview } from "../../../tools/obJectShapes";
import ManageReviewForm from "../../../components/Films/Reviews/ManageReviewForm";
import LoadingMessage from "../../../components/Loading/LoadingMessage";

function ManageReview({userId}) {
    const { id, reviewId } = useParams();
    const navigate = useNavigate();
    const [film, setFilm] = useState(null);
    const [review, setReview] = useState({ ...newReview});
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (!film) {
            getFilm();
        }
    }, [id, film]);

    useEffect(() => {
        if(reviewId){
            getReviewById(id, reviewId).then(data => {
                mapForEditing(data);
                if(data.user.id != userId) navigate(`/films/${data.film.id}/reviews/${data.id}`);
                setEditing(true);
            }).catch(error => {
                toast.error(`Error fetching review ${error.message}`, {
                    autoClose: false
                }
                );
            });
        } else {
            setReview({ ...newReview});
        }
    }, [reviewId])

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
        setReview({
            id: data.id,
            rating: data.rating,
            text: data.text
        });
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setReview(prevReview => ({
            ...prevReview,
            [name]: value
        }));
    }

    function formIsValid(){
        const { rating, text } = review;
        const errors = {};
        if(!rating) errors.rating = "Rating is required";
        if(rating < 0 || rating > 10) errors.rating = "Rating must be between 0 and 10";
        if(!text) errors.text = "Review text is required";
        if(text.length > 8000) errors.text = "Review text cant be longer than 8000 characters";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSave(event){
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
    saveReview(id, review).then(res => {
            toast.success("Review saved");
            navigate(`/films/${id}/reviews/${res.id}`);
        }).catch(err => {
            setSaving(false);
            toast.error(`Error saving review ${err.data.Exception}`, {
                autoClose: false,
            });
        });
    }

    return (
        <div className="manage-film-review-page">
            {film && review ? (
                <>
                    <ManageReviewForm review={review} film={film} onChange={handleChange} onSave={handleSave} errors={errors} saving={saving} editing={editing}/>
                </>
            ) : (
                <LoadingMessage message={"Loading form."} />
            )}
        </div>
    );
}

ManageReview.propTypes = {
    userId: PropTypes.number
};

const mapStateToProps = (state) => {
    return {
        userId: state.tokens ? state.tokens.id : null
    };
};

export default connect(mapStateToProps)(ManageReview);

