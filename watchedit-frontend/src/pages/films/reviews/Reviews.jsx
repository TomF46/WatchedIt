import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getFilmById } from "../../../api/filmsApi";
import { getReviewsByFilmId } from "../../../api/filmReviewApi";
import ReviewOverviewList from "../../../components/Films/Reviews/ReviewOverviewList";

function Reviews({userIsAuthenticated, isAdmin}) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [film, setFilm] = useState(null);
    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        if (!film) {
            getFilm();
            getReviews();
        }
    }, [id, film]);

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

    function getReviews() {
        getReviewsByFilmId(id)
            .then((res) => {
                setReviews(res);
                console.log(res);
            })
            .catch((err) => {
                toast.error(`Error getting film reviews ${err.data.Exception}`, {
                    autoClose: false,
                });
            });
    }

    return (
        <div className="film-reviews-page">
            {!film ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="review-controls bg-backgroundOffset mt-4 rounded-md">
                        <div className="bg-primary rounded-t-md">
                            <p className="text-white font-bold text-lg px-2 py-1">
                                Review controls
                            </p>
                        </div>
                        <div className="px-2 py-2">
                            <Link
                                to={`/films/${film.id}/reviews/add`}
                                className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block"
                            >
                                Add review
                            </Link>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p>Show {film.name} reviews...</p>
                        <p>Average rating: {film.averageRating}</p>
                        {reviews ? (
                            <ReviewOverviewList reviews={reviews} />
                        ):(
                            <p>Loading reviews...</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

Reviews.propTypes = {
    isAdmin: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        isAdmin: state.isAdmin
    };
};

export default connect(mapStateToProps)(Reviews);

