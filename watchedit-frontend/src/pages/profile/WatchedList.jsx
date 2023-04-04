import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { getUserById, getWatchedListByUserId } from "../../api/usersApi";
import FilmGrid from "../../components/Films/FilmGrid";
import PaginationControls from "../../components/PaginationControls";
import { useParams } from "react-router-dom";

function WatchedList({ id }) {
    const [user, setUser] = useState(null);
    const [films, setFilms] = useState(null);
    const [page, setPage] = useState(1);
    const filmsPerPage = 20;
    const [isLastPage, setIsLastPage] = useState(false);
    const [lastPageLoaded, setLastPageLoaded] = useState(null);

    useEffect(() => {
        if (!films) {
            getUser();
            getFilms();
        }
    }, [id, user]);

    useEffect(() => {
        if (lastPageLoaded != null) getFilms();
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

    function getFilms() {
        getWatchedListByUserId(id, page, filmsPerPage)
            .then((res) => {
                setFilms(res);
                let lastPage = res.length != filmsPerPage;
                setIsLastPage(lastPage);
                setLastPageLoaded(page);
            })
            .catch((err) => {
                console.log(err);
                toast.error(`Error getting films ${err.data.Exception}`, {
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
        <div className="watched-films-page">
            {!user ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="mt-4">
                        <h1 className="text-center text-primary text-2xl mb-4">{user.username} watched films</h1>
                        {films ? (
                            <>
                                <FilmGrid films={films} editable={false} />
                                    <PaginationControls
                                        currentPage={page}
                                        onNext={handleNextPage}
                                        onPrevious={handlePreviousPage}
                                        isLastPage={isLastPage}
                                    />
                            </>
                        ):(
                            <p>Loading watched films...</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

WatchedList.propTypes = {
    id: PropTypes.any.isRequired,
};

const mapStateToProps = (state) => {
    const { id } = useParams();
    return {
        id: id ? id : state.tokens.id,
    };
};

export default connect(mapStateToProps)(WatchedList);
