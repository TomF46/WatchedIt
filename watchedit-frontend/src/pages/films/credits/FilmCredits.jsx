import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getFilmById } from "../../../api/filmsApi";
import { getCreditsForFilmById, removeCredit } from "../../../api/creditsApi";
import FilmCreditsList from "../../../components/Films/Credits/FilmCreditsList";
import { confirmAlert } from "react-confirm-alert";

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
                toast.error(`Error getting film ${err.message}`, {
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
                toast.error(`Error getting film credits ${err.message}`, {
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
            toast.error(`Error removing film credit ${err.message}`, {
                autoClose: false,
            });
        });
    }

    return (
        <div className="film-credits-page">
            {!film ? (
                <p>Loading...</p>
            ) : (
                <>
                    <p className="text-primary text-xl">{film.name} credits</p>
                    {credits && (<FilmCreditsList credits={credits} canEdit={isAdmin}  onRemove={handleRemoveCredit} />)}
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

