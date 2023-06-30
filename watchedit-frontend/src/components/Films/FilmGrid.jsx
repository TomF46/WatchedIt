import PropTypes from "prop-types";
import FilmPreview from "./FilmPreview";

const FilmGrid = ({ films, editable, onRemove }) => {
    return (
        <div className="grid grid-cols-16">
            {films.map((film) => {
                return (
                    <FilmPreview key={film.id} film={film} editable={editable} onRemove={onRemove} />
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
