import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const FilmGrid = ({ films, editable, onRemove }) => {
    const navigate = useNavigate();
    return (
        <div className="grid grid-cols-12">
            {films.map((film) => {
                return (
                    <div key={film.id} className="col-span-12 md:col-span-2 mt-4">
                        <div className="mx-2 bg-backgroundOffset cursor-pointer hover:opacity-75">
                            <div onClick={() => {navigate(`/films/${film.id}`)}}>
                                <img src={film.posterUrl} className="w-full poster" />
                                <div className="p-4">
                                    <p className="text-center">{film.name}</p>
                                </div>
                            </div>
                            {editable && (
                                <button onClick={() => {onRemove(film)}} className="p-2 text-center bg-red-400 w-full">
                                    Remove
                                </button>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

FilmGrid.propTypes = {
    films: PropTypes.array.isRequired,
    editable: PropTypes.bool.isRequired,
    onRemove: PropTypes.func
};

export default FilmGrid;
