import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { getCurrentUserHasWatchedFilmById, setNotWatchedFilmById, setWatchedFilmById } from "../../../api/filmsApi";
import { toast } from "react-toastify";

const WatchedFilmControls = ({ film }) => {
    const navigate = useNavigate();
    const [hasWatched, setHasWatched] = useState(null);

    useEffect(() => {
        getIsFilmWatched();
    }, [film]);

    function getIsFilmWatched(){
        console.log("Call");
        getCurrentUserHasWatchedFilmById(film.id).then(res => {
            setHasWatched(res.watched);
            console.log(res.watched);
            console.log()
        }).catch(err => {
            toast.error(`Error getting film watched status ${err.message}`, {
                autoClose: false,
            });
        });
    }

    function setWatched(){
        setWatchedFilmById(film.id).then(res => {
            setHasWatched(res.watched);
        }).catch(err => {
            toast.error(`Error setting film watched${err.message}`, {
                autoClose: false,
            });
        });
    }

    function setNotWatched(){
        setNotWatchedFilmById(film.id).then(res => {
            setHasWatched(res.watched);
        }).catch(err => {
            toast.error(`Error setting film not watched${err.message}`, {
                autoClose: false,
            });
        });
    }

    return (
        <div>
            {hasWatched == null ? (
                <p>Loading ...</p>
            ) : (
                <>
                    <p>user has watched film: {hasWatched ? "True" : "False"}</p>
                    {hasWatched ? (
                        <button onClick={() => setNotWatched()} className="p-4 bg-primary">
                            Set not watched
                        </button>
                    ): (
                        <button onClick={() => setWatched()} className="p-4 bg-primary">
                            Set watched
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

WatchedFilmControls.propTypes = {
    film: PropTypes.object.isRequired,
};

export default WatchedFilmControls;
