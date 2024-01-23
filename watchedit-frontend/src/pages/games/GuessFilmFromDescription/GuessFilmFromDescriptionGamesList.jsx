import { format, parseISO } from "date-fns";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const GuessFilmFromDescriptionGamesList = ({ games }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-backgroundOffset p-4 shadow rounded">
      <h3 className="text-center text-primary text-2xl mb-4 font-semibold">
        Your games
      </h3>
      <table className="table-auto w-full">
        <thead className="text-primary">
          <tr>
            <th>Status</th>
            <th>Score</th>
            <th>Date Started</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => {
            return (
              <tr className="text-center" key={game.id}>
                <td className="py-4">{game.statusText}</td>
                <td>{game.score}</td>
                <td>
                  {format(parseISO(game.createdDate), "dd/MM/yyyy HH:mm")}
                </td>
                <td>
                  <button
                    onClick={() => {
                      navigate(`/games/filmFromDescription/${game.id}`);
                    }}
                    className="h-full w-full px-4 py-2 bg-primary hover:opacity-75 rounded"
                  >
                    {game.status == 1 ? "Play" : "View"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

GuessFilmFromDescriptionGamesList.propTypes = {
  games: PropTypes.array.isRequired,
};

export default GuessFilmFromDescriptionGamesList;
