import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { setFilmNotWatchedById, setFilmWatchedById } from "../../../api/watchedFilmsApi";
import { toast } from "react-toastify";
import LoadingMessage from "../../Loading/LoadingMessage";

const WatchedFilmControls = ({ film, count, onCountChange }) => {
    const navigate = useNavigate();
    const [hasWatched, setHasWatched] = useState(null);

    useEffect(() => {
        setHasWatched(film.isWatchedByUser);
    }, [film]);

    function setWatched(){
        setFilmWatchedById(film.id).then(res => {
            setHasWatched(res.watched);
            onCountChange();
        }).catch(err => {
            toast.error(`Error setting film watched${err.data.Exception}`, {
                autoClose: false,
            });
        });
    }

    function setNotWatched(){
        setFilmNotWatchedById(film.id).then(res => {
            setHasWatched(res.watched);
            onCountChange();
        }).catch(err => {
            toast.error(`Error setting film not watched${err.data.Exception}`, {
                autoClose: false,
            });
        });
    }

    return (
        <div>
            {hasWatched == null ? (
                <LoadingMessage message={"Loading."} />
            ) : (
                <div className="mt-4">
                    {hasWatched ? (
                        <button onClick={() => setNotWatched()} className="py-2 px-4 rounded bg-success w-full">
                            Watched
                        </button>
                    ): (
                        <button onClick={() => setWatched()} className="py-2 px-4 rounded bg-primary w-full">
                            Watch
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

WatchedFilmControls.propTypes = {
    film: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    onCountChange: PropTypes.func.isRequired
};

export default WatchedFilmControls;
