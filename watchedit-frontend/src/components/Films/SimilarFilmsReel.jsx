import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { getSimilarFilmsPaginated } from "../../api/filmsApi";
import FilmPreview from "./FilmPreview";


function SimilarFilmsReel({filmId}) {
    const [filmsPaginator, setFilmsPaginator] = useState(null);
    const [page, setPage] = useState(1);
    const filmsPerPage = 8;

    useEffect(() => {
        if (!filmsPaginator) {
            getFilms();
        }
    }, [filmsPaginator]);

    function getFilms() {
        getSimilarFilmsPaginated(filmId, page, filmsPerPage)
            .then((res) => {
                setFilmsPaginator(res);
            })
            .catch((err) => {
                toast.error(`Error getting similar films ${err.data.Exception}`, {
                    autoClose: false,
                });
            });
    }

    return (
        <div className="similar-films-reel">
            {filmsPaginator && (
                <>
                    {filmsPaginator.data.length > 0 && (
                        <div className="mt-4">
                            <h2 className="text-primary text-2xl hover:opacity-75 inline-flex items-center">
                                Similar films
                            </h2>
                            <div className="grid grid-cols-16">
                                {filmsPaginator.data.map((film) => {
                                    return (
                                        <FilmPreview key={film.id} film={film} editable={false} />
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

SimilarFilmsReel.propTypes = {
    filmId: PropTypes.number.isRequired
};

export default SimilarFilmsReel;
