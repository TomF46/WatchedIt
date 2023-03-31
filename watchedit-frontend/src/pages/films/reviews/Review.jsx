import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getFilmById } from "../../../api/filmsApi";
import { deleteReview, getReviewById } from "../../../api/filmReviewApi";
import { confirmAlert } from "react-confirm-alert";

function Review({userIsAuthenticated, isAdmin}) {
    const { id, reviewId } = useParams();
    const navigate = useNavigate();
    const [review, setReview] = useState(null);

    useEffect(() => {
        if (!review) {
            getReview();
        }
    }, [reviewId, review]);

    function getReview() {
        getReviewById(id, reviewId)
            .then((res) => {
                setReview(res);
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
                <p>Loading...</p>
            ) : (
                <>
                    {review.userCanEdit && (
                        <div className="owner-controls bg-backgroundOffset mt-4 rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">
                                    List owner controls
                                </p>
                            </div>
                            <div className="px-2 py-2">
                                <Link
                                    to={`/films/${review.film.id}/reviews/${reviewId}/edit`}
                                    className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block"
                                >
                                    Edit review
                                </Link>
                                <button onClick={() => {confirmDelete()}} className="bg-red-400 text-white rounded py-2 px-4 hover:opacity-75 inline-block ml-2">
                                    Remove
                                </button>
                            </div>
                        </div>
                    )}
                    <p>Showing {review.film.name} review</p>
                    <p>{review.rating}</p>
                    <p>{review.text}</p>
                </>
            )}
        </div>
    );
}

Review.propTypes = {
    isAdmin: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        isAdmin: state.isAdmin
    };
};

export default connect(mapStateToProps)(Review);

