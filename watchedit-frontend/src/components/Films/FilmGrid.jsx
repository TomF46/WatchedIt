import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const FilmGrid = ({ films }) => {
    const navigate = useNavigate();
    return (
        <div className="grid grid-cols-12">
            {films.map((film) => {
                return (
                    <div key={film.id} className="col-span-2">
                        <div onClick={() => {navigate(`/films/${film.id}`)}} className="mx-2 bg-backgroundOffset cursor-pointer">
                            <img src={film.posterUrl} className="w-full h-auto" />
                            <div className="p-4">
                                <p className="text-center">{film.name}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

FilmGrid.propTypes = {
    films: PropTypes.array.isRequired,
};

export default FilmGrid;
