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
                        <div onClick={() => {navigate(`/films/${film.id}`)}} className="p-4 mx-2 bg-backgroundOffset cursor-pointer">
                            <p>{film.name}</p>
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
