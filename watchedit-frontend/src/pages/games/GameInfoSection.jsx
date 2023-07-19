import { format, parseISO } from "date-fns";
import PropTypes from "prop-types";

const GameInfoSection = ({ game }) => {
    return (
        <div className="grid grid-cols-12 bg-backgroundOffset p-4 shadow rounded text-center">
            <div className="col-span-12">
                <p className="text-lg">Guesses:</p>
                <p className="text-lg text-primary">{game.clues.length}</p>
            </div>
            <div className="col-span-6">
                <p className="text-lg">Started:</p>
                <p className="text-lg text-primary">{format(parseISO(game.createdDate), "dd/MM/yyyy HH:mm")}</p>
            </div>
            <div className="col-span-6">
                <p className="text-lg">Status</p>
                <p className="text-lg text-primary">{game.statusText}</p>
            </div>
        </div>
    );
}

GameInfoSection.propTypes = {
    game: PropTypes.object.isRequired,
};

export default GameInfoSection;
