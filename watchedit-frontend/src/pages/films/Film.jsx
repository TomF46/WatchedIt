import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert';
import { getFilmById, removeFilm } from "../../api/filmsApi";
import WatchedFilmControls from "../../components/Films/Watched/WatchedFilmControls";
import FilmCreditsOverviewList from "../../components/Films/Credits/FilmCreditsOverviewList";

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
                    <div className="grid grid-cols-12 mt-4">
                        <div className="col-span-12">
                            <h1 className="my-4 text-center text-primary text-2xl">{film.name}</h1>
                        </div>
                        <div className="col-span-12 md:col-span-2">
                            <img src={film.posterUrl} className="poster"/>
                            <div className="flex flex-col">
                                {userIsAuthenticated && (<WatchedFilmControls film={film} />)}
                                <Link to={`/films/${id}/credits`}
                                className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block mt-4 text-center">
                                    Cast / Crew
                                </Link>
                                <Link to={`/films/${id}/reviews`}
                                className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block mt-4 text-center">
                                    Reviews
                                </Link>
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-10 pl-4">
                            <div className="grid grid-cols-12">
                                <div className="col-span-12 md:col-span-8 bg-backgroundOffset p-4">
                                    <p>Name: {film.name}</p>
                                    <p>Release date: {film.releaseDate}</p>
                                    <p>tagline: {film.shortDescription}</p>
                                    <p>Runtime: {film.runtime} minutes</p>
                                    <p>Categories:</p>
                                    <ul>
                                        {film.categories.map((category) => {
                                            return (
                                                <li key={category.id}>{category.name}</li>
                                            )
                                        })}
                                    </ul>
                                    <p className="mt-4">Description: {film.fullDescription}</p>
                                </div>
                                <div className="col-span-12 md:col-span-4 text-center bg-backgroundOffset ml-2 p-4">
                                    <h3>Rating</h3>
                                    <p>{film.averageRating} / 10</p>
                                </div>
                                <div className="col-span-12">
                                    <div className="grid grid-cols-12">
                                        <div className="col-span-12">
                                            {film.credits.cast.length > 0 && (
                                                <>
                                                    <h2 className="mt-4 text-primary text-xl ">Cast</h2>
                                                    <FilmCreditsOverviewList credits={film.credits.cast} />
                                                </>
                                            )}
                                        </div>
                                        <div className="col-span-12 mt-4">
                                            {film.credits.crew.length > 0 && (
                                                <>
                                                    <h2 className="mt-4 text-primary text-xl ">Crew</h2>
                                                    <FilmCreditsOverviewList credits={film.credits.crew} />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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

