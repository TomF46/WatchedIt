import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { getUserById, getWatchedListByUserId } from "../../api/usersApi";
import FilmGrid from "../../components/Films/FilmGrid";
import PaginationControls from "../../components/PaginationControls";
import { useParams } from "react-router-dom";
import LoadingMessage from "../../components/Loading/LoadingMessage";

function WatchedList({currentUserId}) {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [filmsPaginator, setFilmsPaginator] = useState(null);
    const [page, setPage] = useState(1);
    const filmsPerPage = 20;
    const [lastPageLoaded, setLastPageLoaded] = useState(null);

    useEffect(() => {
        let targetId = id ? id : currentUserId;
        if (!user) {
            getUser(targetId);
            getFilms(targetId);
        }
    }, [id, user]);

    useEffect(() => {
        if (lastPageLoaded != null) getFilms();
    }, [page]);

    function getUser(userId) {
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

    function getFilms(userId) {
        getWatchedListByUserId(userId, page, filmsPerPage)
            .then((res) => {
                setFilmsPaginator(res);
                setLastPageLoaded(page);
            })
            .catch((err) => {
                toast.error(`Error getting films ${err.data.Exception}`, {
                    autoClose: false,
                });
            });
    }

    return (
        <div className="watched-films-page">
            {!user ? (
                <LoadingMessage message={"Loading user"} />
            ) : (
                <>
                    <div>
                        <h1 className="text-center text-primary text-4xl my-4 font-bold">{user.username} watched films</h1>
                        {filmsPaginator ? (
                            <>
                            {filmsPaginator.data.length > 0 ? (
                                <>
                                    <FilmGrid films={filmsPaginator.data} editable={false} />
                                    <PaginationControls
                                        currentPage={page}
                                        onPageChange={setPage}
                                        of={filmsPaginator.of}
                                        from={filmsPaginator.from}
                                        to={filmsPaginator.to}
                                        lastPage={filmsPaginator.lastPage}
                                    />
                                </>
                            ) : (
                                <p className="text-center text-primary text-2xl">{user.username} has not watched any films.</p>
                            )}
                            </>
                        ):(
                            <LoadingMessage message={"Loading watched films"} />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

WatchedList.propTypes = {
    currentUserId: PropTypes.any.isRequired

};

const mapStateToProps = (state) => {
    return {
        currentUserId: state.tokens ? state.tokens.id : null
    };
};

export default connect(mapStateToProps)(WatchedList);
