import { useEffect, useState } from "react";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import { getGuessFilmFromDescriptionLeaderboard } from "../../../api/games/guessFilmFromDescriptionApi";
import { toast } from "react-toastify";
import PaginationControls from "../../../components/PaginationControls";
import GuessFilmFromDescriptionLeaderboardList from "./GuessFilmFromDescriptionLeaderboardList";

function GuessFilmFromDescriptionLeaderboard() {
  const [leaderboardPaginator, setLeaderboardPaginator] = useState(null);
  const [page, setPage] = useState(1);
  const entriesPerPage = 30;

  useEffect(() => {
    getGuessFilmFromDescriptionLeaderboard(page, entriesPerPage)
      .then((res) => {
        setLeaderboardPaginator(res);
      })
      .catch((err) => {
        toast.error(`Error getting leaderboard ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }, [page]);

  return (
    <div className="leaderboards">
      <h1 className="text-center text-primary text-4xl my-4 font-bold">
        Leaderboard
      </h1>
      {leaderboardPaginator ? (
        <>
          <GuessFilmFromDescriptionLeaderboardList
            entries={leaderboardPaginator.data}
          />
          <PaginationControls
            currentPage={page}
            onPageChange={setPage}
            of={leaderboardPaginator.of}
            from={leaderboardPaginator.from}
            to={leaderboardPaginator.to}
            lastPage={leaderboardPaginator.lastPage}
          />
        </>
      ) : (
        <LoadingMessage message={"Loading leaderboard."} />
      )}
    </div>
  );
}

export default GuessFilmFromDescriptionLeaderboard;
