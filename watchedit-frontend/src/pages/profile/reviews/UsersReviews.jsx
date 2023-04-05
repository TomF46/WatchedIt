import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ReviewOverviewList from "../../../components/Films/Reviews/ReviewOverviewList";
import PaginationControls from "../../../components/PaginationControls";
import { getUserById, getUsersReviewsPaginated } from "../../../api/usersApi";
import LoadingMessage from "../../../components/Loading/LoadingMessage";

function UserReviews({id}) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [page, setPage] = useState(1);
    const [reviewsPerPage, setReviewsPerPage] = useState(20);
    const [isLastPage, setIsLastPage] = useState(false);
    const [lastPageLoaded, setLastPageLoaded] = useState(null);

    useEffect(() => {
        if (!user) {
            getUser();
            getReviews();
        }
    }, [id, user]);

    useEffect(() => {
        if (lastPageLoaded != null) getReviews();
    }, [page]);

    function getUser() {
        getUserById(id)
            .then((res) => {
                setUser(res);
            })
            .catch((err) => {
                toast.error(`Error getting user ${err.data.Exception}`, {
                    autoClose: false,
                });
            });
    }

    function getReviews() {
        getUsersReviewsPaginated(id, page, reviewsPerPage)
            .then((res) => {
                setReviews(res);
                let lastPage = res.length != reviewsPerPage;
                setIsLastPage(lastPage);
                setLastPageLoaded(page);
            })
            .catch((err) => {
                toast.error(`Error getting users reviews ${err.data.Exception}`, {
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
    }

    return (
        <div className="users-reviews-page">
            {!user ? (
                <LoadingMessage message={"Loading user."} />
            ) : (
                <>
                    <div className="mt-4">
                        <h1 className="text-center text-primary text-2xl mb-4">{user.username} reviews</h1>
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
                                    <p className="text-center text-primary text-2xl">User has not added any reviews</p>
                                )}
                            </>
                        ):(
                            <LoadingMessage message={"Loading reviews."} />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

UserReviews.propTypes = {
    id: PropTypes.any.isRequired
};

const mapStateToProps = (state) => {
    const { id } = useParams();
    return {
        id:  id ? id : state.tokens.id,
    };
};

export default connect(mapStateToProps)(UserReviews);
