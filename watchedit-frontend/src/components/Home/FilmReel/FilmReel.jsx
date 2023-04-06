import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import FilmReelItem from "./FilmReelItem";
import LoadingMessage from "../../Loading/LoadingMessage";
import { getFilmsPaginated } from "../../../api/filmsApi";


function FilmReel() {
    const [filmsPaginator, setFilmsPaginator] = useState(null);
    const [page, setPage] = useState(1);
    const filmsPerPage = 6;

    useEffect(() => {
        if (!filmsPaginator) {
            getFilms();
        }
    }, [filmsPaginator]);

    function getFilms() {
        getFilmsPaginated(page, filmsPerPage)
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
                    <Link to={"/films"} className="text-primary text-2xl hover:opacity-75">Films</Link>
                    {filmsPaginator.data.length > 0 ? (
                        <div className="grid grid-cols-12">
                            {filmsPaginator.data.map((film) => {
                                return (
                                    <FilmReelItem film={film} />
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

export default FilmReel;
