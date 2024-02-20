import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import { ConnectionsGame } from "../../../types/Games";

const ConnectionsGamesList = ({ games }: { games: ConnectionsGame[] }) => {
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
            <th>Guesses</th>
            <th>Date Started</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => {
            return (
              <tr className="text-center" key={game.id}>
                <td className="py-4">{game.statusText}</td>
                <td>{game.clues.length}</td>
                <td>
                  {format(
                    parseISO(game.createdDate.toString()),
                    "dd/MM/yyyy HH:mm",
                  )}
                </td>
                <td>
                  <button
                    onClick={() => {
                      navigate(`/games/connections/${game.id}`);
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

export default ConnectionsGamesList;
