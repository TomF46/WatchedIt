import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getFilmById } from "../../../api/filmsApi";
import { getReviewsByFilmId } from "../../../api/filmReviewApi";
import ReviewOverviewList from "../../../components/Films/Reviews/ReviewOverviewList";
import PaginationControls from "../../../components/PaginationControls";
import LoadingMessage from "../../../components/Loading/LoadingMessage";

function Reviews({userIsAuthenticated, isAdmin}) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [film, setFilm] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [page, setPage] = useState(1);
    const [reviewsPerPage, setReviewsPerPage] = useState(20);
    const [isLastPage, setIsLastPage] = useState(false);
    const [lastPageLoaded, setLastPageLoaded] = useState(null);

    useEffect(() => {
        if (!film) {
            getFilm();
            getReviews();
        }
    }, [id, film]);

    useEffect(() => {
        if (lastPageLoaded != null) getReviews();
    }, [page]);

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
        getReviewsByFilmId(id, page, reviewsPerPage)
            .then((res) => {
                setReviews(res);
                let lastPage = res.length != reviewsPerPage;
                setIsLastPage(lastPage);
                setLastPageLoaded(page);
            })
            .catch((err) => {
                toast.error(`Error getting film reviews ${err.data.Exception}`, {
                    autoClose: false,
                });
            });
    }

    function handleNextPage() {
        var newPage = page + 1;
        setPage(newPage);
    }

    function handlePreviousPage() {
        var newPage = page - 1;
        setPage(newPage);
        console.log(page);
    }

    return (
        <div className="film-reviews-page">
            {!film ? (
                <LoadingMessage message={"Loading film"} />
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
                        <h1 className="text-center text-primary text-2xl mb-2">{film.name} reviews</h1>
                        {film.averageRating && (<p className="text-center text-primary text-xl mb-4">Average rating: {film.averageRating}</p>)}
                        {reviews ? (
                            <>
                                {reviews.length > 0 ? (
                                    <>
                                        <ReviewOverviewList reviews={reviews} />
                                        <PaginationControls
                                            currentPage={page}
                                            onNext={handleNextPage}
                                            onPrevious={handlePreviousPage}
                                            isLastPage={isLastPage}
                                        />
                                    </>
                                ) : (
                                    <p className="text-center text-primary text-2xl">This film currently has no reviews</p>
                                )}
                            </>
                        ):(
                            <LoadingMessage message={"Loading reviews"} />
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

