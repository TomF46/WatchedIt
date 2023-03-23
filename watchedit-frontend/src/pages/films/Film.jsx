import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getFilmById } from "../../api/filmsApi";
import WatchedFilmControls from "../../components/Films/Watched/WatchedFilmControls";

function Film({userIsAuthenticated}) {
    const { id } = useParams();
    const [film, setFilm] = useState(null);

    useEffect(() => {
        if (!film) {
            getFilm();
        }
    }, [id, film]);

    function getFilm() {
        getFilmById(id)
            .then((res) => {
                setFilm(res);
            })
            .catch((err) => {
                toast.error(`Error getting film ${err.message}`, {
                    autoClose: false,
                });
            });
    }

    return (
        <div className="film-page">
            {!film ? (
                <p>Loading...</p>
            ) : (
                <>
                <p className="text-primary text-xl">{film.name}</p>
                    {userIsAuthenticated && (<WatchedFilmControls film={film} />)}
                </>
            )}
        </div>
    );
}

Film.propTypes = {
    userIsAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        userIsAuthenticated: state.tokens != null
    };
};

export default connect(mapStateToProps)(Film);

