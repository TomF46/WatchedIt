import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CorrectGuessFilm = ({ game }) => {
    return (
        <div>
            <h3 className="text-primary text-2xl text-center">Well done! You guessed the correct film</h3>
            <div className="grid grid-cols-12 my-4">
           <div className="col-span-12 md:col-span-6 md:col-start-4 lg:col-span-4 lg:col-start-5">
                <div className="grid grid-cols-12 bg-backgroundOffset shadow rounded">
                    <div className="col-span-6">
                        <img src={game.film.posterUrl} className="h-full poster rounded-l" alt={`${game.film.name} poster.`} />
                    </div>
                    <div className="col-span-6 p-2 text-center">
                        <Link to={`/films/${game.film.id}`} className="text-primary text-2xl font-bold hover:opacity-75">{game.film.name}</Link>
                    </div>
                </div>
           </div>
        </div>
        </div>
    );
}

CorrectGuessFilm.propTypes = {
    game: PropTypes.object.isRequired,
};

export default CorrectGuessFilm;
