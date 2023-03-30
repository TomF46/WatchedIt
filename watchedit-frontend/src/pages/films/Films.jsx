import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { getFilmsPaginated } from "../../api/filmsApi";
import FilmGrid from "../../components/Films/FilmGrid";
import PaginationControls from "../../components/PaginationControls";
import { Link } from "react-router-dom";

function Films({ isAdmin }) {
    const [films, setFilms] = useState(null);
    const [page, setPage] = useState(1);
    const [filmsPerPage, setFilmsPerPage] = useState(20);
    const [isLastPage, setIsLastPage] = useState(false);
    const [lastPageLoaded, setLastPageLoaded] = useState(null);

    useEffect(() => {
        if (!films) {
            getFilms();
        }
    }, [films]);

    useEffect(() => {
        if (lastPageLoaded != null) getFilms();
    }, [page]);

    function getFilms() {
        getFilmsPaginated(page, filmsPerPage)
            .then((res) => {
                setFilms(res);
                let lastPage = res.length != filmsPerPage;
                setIsLastPage(lastPage);
                setLastPageLoaded(page);
            })
            .catch((err) => {
                console.log(err);
                toast.error(`Error getting films ${err.message}`, {
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
        <div className="films-page">
            {isAdmin && (
                <div className="admin-controls bg-backgroundOffset mt-4 rounded-md">
                    <div className="bg-primary rounded-t-md">
                        <p className="text-white font-bold text-lg px-2 py-1">
                            Admin controls
                        </p>
                    </div>
                    <div className="px-2 py-2">
                        <Link
                            to={"/films/add"}
                            className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block"
                        >
                            Add film
                        </Link>
                    </div>
                </div>
            )}
            {!films ? (
                <p>Loading films....</p>
            ) : (
                <div className="mt-4">
                    <FilmGrid films={films} editable={false} />
                    <PaginationControls
                        currentPage={page}
                        onNext={handleNextPage}
                        onPrevious={handlePreviousPage}
                        isLastPage={isLastPage}
                    />
                </div>
            )}
        </div>
    );
}

Films.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        isAdmin: state.isAdmin,
    };
};

export default connect(mapStateToProps)(Films);
