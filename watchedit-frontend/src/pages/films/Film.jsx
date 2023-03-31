import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert';
import { getFilmById, removeFilm } from "../../api/filmsApi";
import WatchedFilmControls from "../../components/Films/Watched/WatchedFilmControls";

function Film({userIsAuthenticated, isAdmin}) {
    const { id } = useParams();
    const navigate = useNavigate();
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
                console.log(err);
                toast.error(`Error getting film ${err.data.Exception}`, {
                    autoClose: false,
                });
            });
    }

    function confirmDeleteFilm(){
        confirmAlert({
            title : "Confirm deletion",
            message: `Are you sure you want to remove ${film.name}?`,
            buttons: [
                {
                  label: 'Yes',
                  onClick: () => deleteFilm()
                },
                {
                  label: 'No',
                  onClick: () => {}
                }
            ]
        })
    }

    function deleteFilm(){
        removeFilm(film).then(res => {
            toast.success("Film removed");
            navigate("/films");
        }).catch((err) => {
            toast.error(`Error removing film ${err.data.Exception}`, {
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
                    {isAdmin && (
                        <div className="admin-controls bg-backgroundOffset mt-4 rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">
                                    Admin controls
                                </p>
                            </div>
                            <div className="px-2 py-2">
                                <Link
                                    to={`/films/${id}/edit`}
                                    className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block"
                                >
                                    Edit film
                                </Link>
                                <button onClick={() => {confirmDeleteFilm()}} className="bg-red-400 text-white rounded py-2 px-4 hover:opacity-75 inline-block ml-2">
                                    Remove
                                </button>
                            </div>
                        </div>
                    )}
                    <p className="text-primary text-xl">{film.name}</p>
                    {userIsAuthenticated && (<WatchedFilmControls film={film} />)}
                    <Link to={`/films/${id}/credits`}
                    className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block mt-4">
                        Cast / Crew
                    </Link>
                </>
            )}
        </div>
    );
}

Film.propTypes = {
    userIsAuthenticated: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        userIsAuthenticated: state.tokens != null,
        isAdmin: state.isAdmin
    };
};

export default connect(mapStateToProps)(Film);

