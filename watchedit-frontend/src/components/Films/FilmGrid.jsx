import React from "react";
import PropTypes from "prop-types";

const FilmGrid = ({ films }) => {
    return (
        <div className="grid grid-cols-12">
            {films.map((film) => {
                return (
                    <div key={film.id} className="col-span-2">
                        <div className="p-4 mx-2 bg-backgroundOffset">
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
