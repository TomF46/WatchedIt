import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getFilmById } from "../../api/filmsApi";
import WatchedFilmControls from "../../components/Films/Watched/WatchedFilmControls";

function Film() {
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
                <WatchedFilmControls film={film} />
                </>
            )}
        </div>
    );
}

export default Film;
