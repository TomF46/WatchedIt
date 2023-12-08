import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import PaginationControls from "../../../components/PaginationControls";
import {
  getGuessFilmFromDescriptionGames,
  startGuessFilmFromDescriptionGame,
} from "../../../api/games/guessFilmFromDescriptionApi";
import GuessFilmFromDescriptionGamesList from "./GuessFilmFromDescriptionGamesList";
import { Link, useNavigate } from "react-router-dom";

function GuessFilmFromDescription() {
  const navigate = useNavigate();
  const [gamesPaginator, setGamesPaginator] = useState(null);
  const [page, setPage] = useState(1);
  const gamesPerPage = 20;

  useEffect(() => {
    getGuessFilmFromDescriptionGames(page, gamesPerPage)
      .then((res) => {
        setGamesPaginator(res);
      })
      .catch((err) => {
        toast.error(`Error getting games ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }, [page, gamesPerPage]);

  function startNewGame() {
    startGuessFilmFromDescriptionGame()
      .then((res) => {
        navigate(`/games/filmFromDescription/${res.id}`);
      })
      .catch((err) => {
        toast.error(`Error starting new game ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }

  return (
    <div className="films-from-description-page">
      <h1 className="text-center text-primary text-4xl my-4 font-bold">
        Guess the film from its description
      </h1>
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-8">
          <div className="bg-backgroundOffset p-4 shadow rounded mb-4">
            <h3 className="text-center text-primary text-2xl mb-4 font-bold">
              Game rules
            </h3>
            <ul className="list-disc ml-2">
              <li>When game starts you get the first description.</li>
              <li>
                Every time you guess correctly you gain a point and a new
                description is added.
              </li>
              <li>
                If you get one wrong the game is over and your score is how many
                you got correct.
              </li>
              <li>Score as high as possible to climb the leaderboard.</li>
            </ul>
          </div>
        </div>
        <div className="col-span-12 md:col-span-2 text-center bg-backgroundOffset p-4 shadow rounded mb-4 ml-1 flex items-center justify-center">
          <button
            onClick={() => {
              startNewGame();
            }}
            className="bg-primary text-white text-center rounded py-2 px-4 mb-4 hover:opacity-75"
          >
            New game
          </button>
        </div>
        <div className="col-span-12 md:col-span-2 text-center bg-backgroundOffset p-4 shadow rounded mb-4 ml-1 flex items-center justify-center">
          <Link
            to={`/games/filmFromDescription/leaderboard`}
            className="bg-primary text-white text-center rounded py-2 px-4 mb-4 hover:opacity-75"
          >
            Leaderboard
          </Link>
        </div>
      </div>
      {gamesPaginator ? (
        <>
          {gamesPaginator.data.length > 0 ? (
            <>
              <GuessFilmFromDescriptionGamesList games={gamesPaginator.data} />
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

export default GuessFilmFromDescription;
