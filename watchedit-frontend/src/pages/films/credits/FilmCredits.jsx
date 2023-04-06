import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getFilmById } from "../../../api/filmsApi";
import { getCreditsForFilmById, removeCredit } from "../../../api/creditsApi";
import FilmCreditsList from "../../../components/Films/Credits/FilmCreditsList";
import { confirmAlert } from "react-confirm-alert";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import FilmMiniDetail from "../../../components/Films/FilmMiniDetail";

function FilmCredits({userIsAuthenticated, isAdmin}) {
    const { id } = useParams();
    const [film, setFilm] = useState(null);
    const [credits, setCredits] = useState(null);

    useEffect(() => {
        if (!film) {
            getFilm();
            getCredits();
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

    function getCredits() {
        getCreditsForFilmById(id)
            .then((res) => {
                setCredits(res);
            })
            .catch((err) => {
                toast.error(`Error getting film credits ${err.data.Exception}`, {
                    autoClose: false,
                });
            });
    }

    function handleRemoveCredit(credit){
        confirmAlert({
            title : "Confirm removal",
            message: `Are you sure you want to remove this credit?`,
            buttons: [
                {
                  label: 'Yes',
                  onClick: () => deleteCredit(credit)
                },
                {
                  label: 'No',
                  onClick: () => {}
                }
            ]
        })
    }

    function deleteCredit(credit){
        removeCredit(credit.id).then(() => {
            toast.success("Credit removed");
            getCredits();
        }).catch((err) => {
            toast.error(`Error removing film credit ${err.data.Exception}`, {
                autoClose: false,
            });
        });
    }

    return (
        <div className="film-credits-page">
            {!film ? (
                <LoadingMessage message={"Loading film credits"} />
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
                                    to={`/films/${film.id}/credits/add`}
                                    className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block"
                                >
                                    Add credit
                                </Link>
                            </div>
                        </div>
                    )}
                    <div className="mt-4">
                        <h1 className="text-primary text-center text-2xl mb-4">{film.name} credits</h1>
                        <FilmMiniDetail film={film} />
                        {credits && (
                            <div className="grid grid-cols-12">
                                <div className="col-span-12">
                                    {credits.cast.length > 0 && (
                                        <>
                                            <h2 className="mt-4 text-primary text-xl ">Cast</h2>
                                            <FilmCreditsList credits={credits.cast} canEdit={isAdmin}  onRemove={handleRemoveCredit} />
                                        </>
                                    )}
                                </div>
                                <div className="col-span-12 mt-4">
                                    {credits.crew.length > 0 && (
                                        <>
                                            <h2 className="mt-4 text-primary text-xl ">Crew</h2>
                                            <FilmCreditsList credits={credits.crew} canEdit={isAdmin}  onRemove={handleRemoveCredit} />
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

FilmCredits.propTypes = {
    userIsAuthenticated: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        userIsAuthenticated: state.tokens != null,
        isAdmin: state.isAdmin
    };
};

export default connect(mapStateToProps)(FilmCredits);

