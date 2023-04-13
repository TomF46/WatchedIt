import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const FilmMiniDetail = ({ film }) => {
    return (
        <div className="grid grid-cols-12">
           <div className="col-span-12 md:col-span-4">
                <div className="grid grid-cols-12 bg-backgroundOffset">
                    <div className="col-span-2">
                        <img src={film.posterUrl} className="h-full poster" />
                    </div>
                    <div className="col-span-10 p-2">
                        <Link to={`/films/${film.id}`} className="text-primary font-bold hover:opacity-75">{film.name}</Link>
                        <p>{film.shortDescription}</p>
                        {film.averageRating && (<p>{`${film.averageRating}/10`}</p>)}
                    </div>
                </div>
           </div>
        </div>
    );
};

FilmMiniDetail.propTypes = {
    film: PropTypes.object.isRequired,
};

export default FilmMiniDetail;
