import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { getUserById, getLikedPeopleByUserId} from "../../api/usersApi";
import PaginationControls from "../../components/PaginationControls";
import { useParams } from "react-router-dom";
import LoadingMessage from "../../components/Loading/LoadingMessage";
import PersonGrid from "../../components/People/PersonGrid";

function UserLikes({ id }) {
    const [user, setUser] = useState(null);
    const [peoplePaginator, setPeoplePaginator] = useState(null);
    const [page, setPage] = useState(1);
    const peoplePerPage = 20;
    const [lastPageLoaded, setLastPageLoaded] = useState(null);

    useEffect(() => {
        if (!user) {
            getUser();
            getPeople();
        }
    }, [id, user]);

    useEffect(() => {
        if (lastPageLoaded != null) getPeople();
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

    function getPeople() {
        getLikedPeopleByUserId(id, page, peoplePerPage)
            .then((res) => {
                setPeoplePaginator(res);
                setLastPageLoaded(page);
            })
            .catch((err) => {
                toast.error(`Error getting people ${err.data.Exception}`, {
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
        <div className="watched-people-page">
            {!user ? (
                <LoadingMessage message={"Loading user"} />
            ) : (
                <>
                    <div>
                        <h1 className="text-center text-primary text-4xl my-4 font-bold">{user.username} liked people</h1>
                        {peoplePaginator ? (
                            <>
                            {peoplePaginator.data.length > 0 ? (
                                <>
                                    <PersonGrid people={peoplePaginator.data} />
                                    <PaginationControls
                                        currentPage={page}
                                        onNext={handleNextPage}
                                        onPrevious={handlePreviousPage}
                                        of={peoplePaginator.of}
                                        from={peoplePaginator.from}
                                        to={peoplePaginator.to}
                                        lastPage={peoplePaginator.lastPage}
                                    />
                                </>
                            ) : (
                                <p className="text-center text-primary text-2xl">{user.username} has not liked any people.</p>
                            )}
                            </>
                        ):(
                            <LoadingMessage message={"Loading liked people"} />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

UserLikes.propTypes = {
    id: PropTypes.any.isRequired,
};

const mapStateToProps = (state) => {
    const { id } = useParams();
    return {
        id: id ? id : state.tokens.id,
    };
};

export default connect(mapStateToProps)(UserLikes);
