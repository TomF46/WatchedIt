import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import FilmPreview from "./FilmPreview";

const FilmGrid = ({ films, editable, onRemove }) => {
    const navigate = useNavigate();
    return (
        <div className="grid grid-cols-16">
            {films.map((film) => {
                return (
                    <FilmPreview film={film} editable={editable} onRemove={onRemove} />
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
