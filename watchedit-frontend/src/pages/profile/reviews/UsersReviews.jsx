import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ReviewOverviewList from "../../../components/Films/Reviews/ReviewOverviewList";
import PaginationControls from "../../../components/PaginationControls";
import { getUserById, getUsersReviewsPaginated } from "../../../api/usersApi";
import LoadingMessage from "../../../components/Loading/LoadingMessage";

function UserReviews() {
    const { id } = useParams();
    const currentUserId = useSelector((state) => state.tokens ? state.tokens.id : null);
    const [user, setUser] = useState(null);
    const [reviewsPaginator, setReviewsPaginator] = useState(null);
    const [page, setPage] = useState(1);
    const reviewsPerPage = 12;
    const [lastPageLoaded, setLastPageLoaded] = useState(null);

    useEffect(() => {
        if (!user) {
            getUser();
            getReviews();
        }
    }, [id]);

    useEffect(() => {
        if (lastPageLoaded != null) getReviews();
    }, [page]);

    function getUser() {
        let userId = id ? id : currentUserId;
        getUserById(userId)
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
        let userId = id ? id : currentUserId;
        getUsersReviewsPaginated(userId, page, reviewsPerPage)
            .then((res) => {
                setReviewsPaginator(res);
                setLastPageLoaded(page);
            })
            .catch((err) => {
                toast.error(`Error getting users reviews ${err.data.Exception}`, {
                    autoClose: false,
                });
            });
    }

    return (
        <div className="users-reviews-page">
            {!user ? (
                <LoadingMessage message={"Loading user."} />
            ) : (
                <>
                    <div>
                        <h1 className="text-center text-primary text-4xl my-4 font-bold">{user.username} reviews</h1>
                        {reviewsPaginator ? (
                            <>
                                {reviewsPaginator.data.length > 0 ? (
                                    <>
                                        <ReviewOverviewList reviews={reviewsPaginator.data} showFilm/>
                                        <PaginationControls
                                            currentPage={page}
                                            onPageChange={setPage}
                                            of={reviewsPaginator.of}
                                            from={reviewsPaginator.from}
                                            to={reviewsPaginator.to}
                                            lastPage={reviewsPaginator.lastPage}
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

export default UserReviews;

