import { useState } from "react";
import { toast } from "react-toastify";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import PaginationControls from "../../../components/PaginationControls";
import {
  getConnectionsGames,
  startConnectionsGame,
} from "../../../api/games/connectionsGameApi";
import ConnectionsGamesList from "./ConnectionsGamesList.jsx";
import { useNavigate } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

function Connections() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const gamesPerPage = 20;

  const { data: gamesPaginator } = useQuery({
    queryKey: ["connections-games", page, gamesPerPage],
    queryFn: () =>
      getConnectionsGames(page, gamesPerPage).catch((error) => {
        toast.error(`Error getting connections games ${error.data.Exception}`, {
          autoClose: false,
        });
        return error;
      }),
    placeholderData: keepPreviousData,
  });

  function startNewGame() {
    startConnectionsGame()
      .then((res) => {
        navigate(`/games/connections/${res.id}`);
      })
      .catch((err) => {
        toast.error(`Error starting new game ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }

  return (
    <div className="connections-page">
      <h1 className="text-center text-primary text-4xl my-4 font-semibold">
        Connections
      </h1>
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-8">
          <div className="bg-backgroundOffset p-4 shadow rounded mb-4">
            <h3 className="text-center text-primary text-2xl mb-4 font-semibold">
              Game rules
            </h3>
            <ul className="list-disc ml-2">
              <li>When game starts you get the first cast member as a clue.</li>
              <li>
                Make your first guess if you are wrong a second cast member is
                revealed.
              </li>
              <li>
                This continues until you either run out of new clues or guess
                correctly
              </li>
              <li>
                If you guess correctly you win, and your score is the number of
                guesses, the lower the better.
              </li>
              <li>
                If you run our of new cast member clues then its game over!
              </li>
            </ul>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 text-center bg-backgroundOffset p-4 shadow rounded mb-4 ml-1 flex items-center justify-center">
          <button
            onClick={() => {
              startNewGame();
            }}
            className="bg-primary text-white text-center rounded py-2 px-4 mb-4 hover:opacity-75"
          >
            New game
          </button>
        </div>
      </div>
      {gamesPaginator ? (
        <>
          {gamesPaginator.data.length > 0 ? (
            <>
              <ConnectionsGamesList games={gamesPaginator.data} />
              <PaginationControls
                currentPage={page}
                onPageChange={setPage}
                of={gamesPaginator.of}
                from={gamesPaginator.from}
                to={gamesPaginator.to}
                lastPage={gamesPaginator.lastPage}
              />
            </>
          ) : (
            <p className="text-center text-primary text-2xl">
              You have not started any games.
            </p>
          )}
        </>
      ) : (
        <LoadingMessage message={"Loading games."} />
      )}
    </div>
  );
}

export default Connections;
