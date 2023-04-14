import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteReview, getReviewById } from "../../../api/filmReviewApi";
import { confirmAlert } from "react-confirm-alert";
import LoadingMessage from "../../../components/Loading/LoadingMessage";

function Review({userId, isAdmin}) {
    const { id, reviewId } = useParams();
    const navigate = useNavigate();
    const [review, setReview] = useState(null);
    const [userCanEdit, setUserCanEdit] = useState(false);

    useEffect(() => {
        if (!review) {
            getReview();
        }
    }, [reviewId, review]);

    function getReview() {
        getReviewById(id, reviewId)
            .then((res) => {
                setReview(res);
                setUserCanEdit(res.user.id == userId);
            })
            .catch((err) => {
                toast.error(`Error getting review ${err.data.Exception}`, {
                    autoClose: false,
                });
            });
    }

    function confirmDelete(){
        confirmAlert({
            title : "Confirm removal",
            message: `Are you sure you want to remove this review?`,
            buttons: [
                {
                  label: 'Yes',
                  onClick: () => removeReview()
                },
                {
                  label: 'No',
                  onClick: () => {}
                }
            ]
        })
    }

    function removeReview(){
        deleteReview(id, review).then(() => {
            toast.success("Review removed");
            navigate(`/films/${id}/reviews`);
        }).catch((err) => {
            toast.error(`Error removing review ${err.data.Exception}`, {
                autoClose: false,
            });
        });
    }

    return (
        <div className="film-reviews-page">
            {!review ? (
                <LoadingMessage message={"Loading review."} />
            ) : (
                <>
                    <h1 className="text-center text-primary text-4xl my-4">{review.film.name} review</h1>
                    {userCanEdit && (
                        <div className="owner-controls bg-backgroundOffset mt-4 rounded-md">
                            <div className="bg-backgroundOffset2 rounded-t-md">
                                <p className="text-primary font-bold text-lg px-2 py-1">
                                    Review owner controls
                                </p>
                            </div>
                            <div className="px-2 py-2">
                                <Link
                                    to={`/films/${review.film.id}/reviews/${reviewId}/edit`}
                                    className="bg-backgroundOffset2 text-primary rounded py-2 px-4 hover:opacity-75 inline-block"
                                >
                                    Edit review
                                </Link>
                                <button onClick={() => {confirmDelete()}} className="bg-backgroundOffset2 text-red-400 rounded py-2 px-4 hover:opacity-75 inline-block ml-2">
                                    Remove
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="mt-4 grid grid-cols-12">
                        <div className="col-span-12 md:col-span-2">
                            <p className="text-center text-primary text-xl">{review.film.name}</p>
                            <img src={review.film.posterUrl} className="poster mt-2"/>
                        </div>
                        <div className="col-span-12 md:col-span-10 pl-4">
                            <p className="text-primary text-lg">Rating {review.rating}/10</p>
                            <div className="bg-backgroundOffset p-4 mt-2">
                                <p>{review.text}</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

Review.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    userId: PropTypes.number,
};

const mapStateToProps = (state) => {
    return {
        isAdmin: state.isAdmin,
        userId: state.tokens ? state.tokens.id : null
    };
};

export default connect(mapStateToProps)(Review);

