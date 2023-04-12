import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import FilmReelItem from "./FilmReelItem";
import LoadingMessage from "../../Loading/LoadingMessage";
import { getFilmsPaginated } from "../../../api/filmsApi";


function FilmReel() {
    const [filmsPaginator, setFilmsPaginator] = useState(null);
    const [page, setPage] = useState(1);
    const filmsPerPage = 8;

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
                    <Link to={"/films"} className="text-primary text-2xl hover:opacity-75 inline-flex items-center">
                        Films
                        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5" alignmentBaseline={true}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg> */}

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

export default FilmReel;
