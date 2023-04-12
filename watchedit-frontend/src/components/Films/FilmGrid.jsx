import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const FilmGrid = ({ films, editable, onRemove }) => {
    const navigate = useNavigate();
    return (
        <div className="grid grid-cols-16">
            {films.map((film) => {
                return (
                    <div key={film.id} className="col-span-16 md:col-span-2 mt-4">
                        <div className="mx-2 bg-backgroundOffset cursor-pointer hover:opacity-75 h-full">
                            <div onClick={() => {navigate(`/films/${film.id}`)}}>
                                <img src={film.posterUrl} className="w-full poster" />
                                <div className="p-2 text-center">
                                    <p className="text-center">{film.name}</p>
                                    <div className="text-center inline-flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                        </svg>
                                        <p className="ml-1">{film.averageRating ? film.averageRating : "No ratings"}</p>
                                    </div>
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
