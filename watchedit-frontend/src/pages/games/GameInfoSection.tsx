import { format, parseISO } from "date-fns";
import PropTypes from "prop-types";

const GameInfoSection = ({ game, forefeit, startAgain }) => {
  return (
    <div className="grid grid-cols-12 bg-backgroundOffset p-4 shadow rounded text-center">
      {game.clues != null && (
        <div className="col-span-12 mb-4">
          <p className="text-lg">Guesses:</p>
          <p className="text-lg text-primary">{game.clues.length}</p>
        </div>
      )}
      {game.score != null && (
        <div className="col-span-12 mb-4">
          <p className="text-lg">Score:</p>
          <p className="text-lg text-primary">{game.score}</p>
        </div>
      )}
      <div className="col-span-12 mb-4">
        <p className="text-lg">Started:</p>
        <p className="text-lg text-primary">
          {format(parseISO(game.createdDate), "dd/MM/yyyy HH:mm")}
        </p>
      </div>
      <div className="col-span-12 mb-4">
        <p className="text-lg">Status</p>
        <p className="text-lg text-primary">{game.statusText}</p>
      </div>
      <div className="col-span-12">
        <button
          onClick={startAgain}
          className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block mt-4 w-full text-center"
        >
          Start another
        </button>
      </div>
      {game.status == 1 && (
        <div className="col-span-12">
          <button
            onClick={forefeit}
            className="bg-red-400 text-white rounded py-2 px-4 hover:opacity-75 inline-block mt-4 w-full text-center"
          >
            Forefeit
          </button>
        </div>
      )}
    </div>
  );
};

GameInfoSection.propTypes = {
  game: PropTypes.object.isRequired,
  forefeit: PropTypes.func.isRequired,
  startAgain: PropTypes.func.isRequired,
};

export default GameInfoSection;
