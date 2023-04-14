import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert';
import { format, parseISO } from 'date-fns'
import { getFilmById, removeFilm } from "../../api/filmsApi";
import WatchedFilmControls from "../../components/Films/Watched/WatchedFilmControls";
import FilmCreditsOverviewList from "../../components/Films/Credits/FilmCreditsOverviewList";
import LoadingMessage from "../../components/Loading/LoadingMessage";
import LatestReviews from "../../components/Reviews/LatestReviews";

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
                <LoadingMessage message={"Loading film."} />
            ) : (
                <>
                    {isAdmin && (
                        <div className="admin-controls bg-backgroundOffset mt-4 rounded-md">
                            <div className="bg-backgroundOffset2 rounded-t-md">
                                <p className="text-primary font-bold text-lg px-2 py-1">
                                    Admin controls
                                </p>
                            </div>
                            <div className="px-2 py-2">
                                <Link
                                    to={`/films/${id}/edit`}
                                    className="bg-backgroundOffset2 text-primary rounded py-2 px-4 hover:opacity-75 inline-block"
                                >
                                    Edit film
                                </Link>
                                <button onClick={() => {confirmDeleteFilm()}} className="bg-backgroundOffset2 text-red-400 rounded py-2 px-4 hover:opacity-75 inline-block ml-2">
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
                                    <p>Release date: {format(parseISO(film.releaseDate), "dd/MM/yyyy")}</p>
                                    <p>tagline: {film.shortDescription}</p>
                                    <p>Runtime: {film.runtime} minutes</p>
                                    <p>Categories:</p>
                                    <ul>
                                        {film.categories.map((category) => {
                                            return (
                                                <li key={category.id}><Link to={`/categories/${category.id}`} className="text-primary hover:opacity-75">{category.name}</Link></li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                <div className="col-span-12 md:col-span-4 text-center bg-backgroundOffset md:ml-2 p-4">
                                    <h3 className="text-primary text-xl mb-4">Rating</h3>
                                    {film.averageRating ? (
                                        <div>
                                            <p className="text-primary text-2xl">{film.averageRating} / 10</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-primary inline-flex items-center">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                            </svg>
                                        </div>
                                    ) : (
                                        <>
                                            <p>This film has not yet been rated.</p>
                                            <Link
                                                to={`/films/${id}/reviews/add`}
                                                className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block mt-2"
                                            >
                                                Add rating
                                            </Link>
                                        </>
                                    )}
                                </div>
                                <div className="col-span-12 md:col-span-8 bg-backgroundOffset p-4 mt-4">
                                    <h3 className="text-primary text-lg">Description</h3>
                                    <p>{film.fullDescription}</p>
                                </div>
                                <div className="col-span-12">
                                    <LatestReviews film={film} totalReviews={3} />
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
                                {film.trailerUrl && (
                                    <div className="col-span-12">
                                        <h2 className="mt-4 text-primary text-xl ">Trailer</h2>
                                        <div className="video-container grid grid-cols-12 justify-center">
                                            <iframe className="video col-span-12" src={film.trailerUrl} frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                        </div>
                                    </div>
                                )}
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

