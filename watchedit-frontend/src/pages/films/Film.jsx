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
import SimilarFilmsReel from "../../components/Films/SimilarFilmsReel";
import TriviaOverview from "../../components/Films/Trivia/TriviaOverview";

function Film({userIsAuthenticated, isAdmin}) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [film, setFilm] = useState(null);

    useEffect(() => {
        if (!film || film.id != id) {
            getFilm();
            window.scrollTo(0, 0)
        }
    }, [id, film]);

    function getFilm() {
        getFilmById(id)
            .then((res) => {
                setFilm(res);
            })
            .catch((err) => {
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

    function handleWatchedCountChange(){
        getFilm();
    }

    return (
        <div className="film-page">
            {!film ? (
                <LoadingMessage message={"Loading film."} />
            ) : (
                <>
                    <h1 className="my-4 text-center text-primary text-4xl font-bold">{film.name}</h1>
                    {isAdmin && (
                        <div className="admin-controls bg-backgroundOffset mt-4 rounded-md shadow rounded">
                            <div className="bg-backgroundOffset2 rounded-t-md">
                                <p className="text-primary font-bold text-lg px-2 py-1">
                                    Admin controls
                                </p>
                            </div>
                            <div className="px-2 py-2">
                                <Link
                                    to={`/films/${id}/edit`}
                                    className="bg-backgroundOffset2 text-primary font-bold rounded py-2 px-4 hover:opacity-75 inline-block"
                                >
                                    Edit film
                                </Link>
                                <button onClick={() => {confirmDeleteFilm()}} className="bg-backgroundOffset2 text-red-400 font-bold rounded py-2 px-4 hover:opacity-75 inline-block ml-2">
                                    Remove
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="grid grid-cols-12 mt-4">
                        <div className="col-span-12 md:col-span-2">
                            <img src={film.posterUrl} className="poster shadow rounded" alt={`${film.name} poster.`}/>
                            <div className="flex flex-col">
                                {userIsAuthenticated && (<WatchedFilmControls film={film} onChange={handleWatchedCountChange} />)}
                                <Link to={`/films/${id}/credits`}
                                className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block mt-4 text-center">
                                    Cast / Crew
                                </Link>
                                <Link to={`/films/${id}/reviews`}
                                className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block mt-4 text-center">
                                    Reviews
                                </Link>
                                <Link to={`/films/${id}/trivia`}
                                className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block mt-4 text-center">
                                    Trivia
                                </Link>
                            </div>
                        </div>
                        <div className="col-span-12 mt-4 md:col-span-10 md:pl-4 md:mt-0">
                            <div className="grid grid-cols-12">
                                <div className="col-span-12 md:col-span-8 bg-backgroundOffset p-4 shadow rounded">
                                    <h3 className="text-primary text-lg">Details</h3>
                                    <p>Name: {film.name}</p>
                                    <p>Release date: {format(parseISO(film.releaseDate), "dd/MM/yyyy")}</p>
                                    <p>tagline: {film.shortDescription}</p>
                                    <p>Runtime: {film.runtime} minutes</p>
                                    <p>Categories:</p>
                                    {film.categories.length > 0 ? (
                                        <ul>
                                            {film.categories.map((category) => {
                                                return (
                                                    <li key={category.id}><Link to={`/categories/${category.id}`} className="text-primary hover:opacity-75">{category.name}</Link></li>
                                                )
                                            })}
                                        </ul>
                                    ) : (
                                        <p>No categories added</p>
                                    )}
                                </div>
                                <div className="col-span-12 md:col-span-2 text-center bg-success md:ml-4 mt-4 md:mt-0 p-4 shadow rounded">
                                    <h3 className="text-xl text-black font-bold mb-4">Watched by</h3>
                                    <p className="text-2xl text-black font-bold">{film.watchedByCount} user{film.watchedByCount == 1 ? "" : "s"}</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-black inline-flex items-center mt-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div className="col-span-12 md:col-span-2 text-center bg-rating md:ml-4 mt-4 md:mt-0 p-4 shadow rounded">
                                    <h3 className="text-black font-bold text-xl mb-4">Rating</h3>
                                    {film.averageRating ? (
                                        <div>
                                            <p className="text-2xl text-black font-bold">{film.averageRating} / 10</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 inline-flex text-black items-center mt-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                            </svg>
                                        </div>
                                    ) : (
                                        <>
                                            <p className="text-black">This film has not yet been rated.</p>
                                            <Link
                                                to={`/films/${id}/reviews/add`}
                                                className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block mt-2"
                                            >
                                                Add rating
                                            </Link>
                                        </>
                                    )}
                                </div>
                                <div className="col-span-12 md:col-span-8 bg-backgroundOffset p-4 mt-4 shadow rounded">
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
                                <div className="col-span-12">
                                    <TriviaOverview film={film} totalItems={4} />
                                </div>
                                {film.trailerUrl && (
                                    <div className="col-span-12">
                                        <h2 className="mt-4 text-primary text-xl ">Trailer</h2>
                                        <div className="video-container grid grid-cols-12 justify-center">
                                            <iframe className="video col-span-12" src={film.trailerUrl} frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                        </div>
                                    </div>
                                )}
                                <div className="col-span-12">
                                    <SimilarFilmsReel filmId={film.id} />
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

