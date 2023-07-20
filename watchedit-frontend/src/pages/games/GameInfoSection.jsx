import { format, parseISO } from "date-fns";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const GameInfoSection = ({ game }) => {
    return (
        <div className="grid grid-cols-12 bg-backgroundOffset p-4 shadow rounded text-center">
            <div className="col-span-12">
                <p className="text-lg">Guesses:</p>
                <p className="text-lg text-primary">{game.clues.length}</p>
            </div>
            <div className="col-span-12 mt-4">
                <p className="text-lg">Started:</p>
                <p className="text-lg text-primary">{format(parseISO(game.createdDate), "dd/MM/yyyy HH:mm")}</p>
            </div>
            <div className="col-span-12 mt-4">
                <p className="text-lg">Status</p>
                <p className="text-lg text-primary">{game.statusText}</p>
            </div>
            <div className="col-span-12 mt-4">
            <Link
                to={`/games/filmFromCast`}
                className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block mt-4 w-full text-center"
            >
                Start another
            </Link>
            </div>
        </div>
    );
}

GameInfoSection.propTypes = {
    game: PropTypes.object.isRequired,
};

export default GameInfoSection;
