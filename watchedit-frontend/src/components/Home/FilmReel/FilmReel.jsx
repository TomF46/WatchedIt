import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import FilmReelItem from "./FilmReelItem";
import LoadingMessage from "../../Loading/LoadingMessage";
import { getFilmsPaginated } from "../../../api/filmsApi";


function FilmReel({ title, sort }) {
    const [filmsPaginator, setFilmsPaginator] = useState(null);
    const [page, setPage] = useState(1);
    const filmsPerPage = 8;

    useEffect(() => {
        if (!filmsPaginator) {
            getFilms();
        }
    }, [filmsPaginator]);

    function getFilms() {
        getFilmsPaginated(page, filmsPerPage, sort)
            .then((res) => {
                setFilmsPaginator(res);
            })
            .catch((err) => {
                toast.error(`Error getting films ${err.data.Exception}`, {
                    autoClose: false,
                });
            });
    }

    return (
        <div className="films-reel">
            {!filmsPaginator ? (
                <LoadingMessage message={"Loading films."} />
            ) : (
                <div className="mt-4">
                    <Link to={"/films"} className="text-primary text-2xl hover:opacity-75 inline-flex items-center">
                        {title}
                    </Link>
                    {filmsPaginator.data.length > 0 ? (
                        <div className="grid grid-cols-16">
                            {filmsPaginator.data.map((film) => {
                                return (
                                    <FilmReelItem key={film.id} film={film} />
                                )
                            })}
                        </div>
                    ) : (
                        <p className="text-center text-primary text-2xl">No films match your search</p>
                    )}
                </div>
            )}
        </div>
    );
}

FilmReel.propTypes = {
    title: PropTypes.string.isRequired,
    sort: PropTypes.string.isRequired
};


export default FilmReel;
