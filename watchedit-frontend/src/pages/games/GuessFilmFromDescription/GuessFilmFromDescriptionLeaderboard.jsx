import { useState } from "react";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import { getGuessFilmFromDescriptionLeaderboard } from "../../../api/games/guessFilmFromDescriptionApi";
import { toast } from "react-toastify";
import PaginationControls from "../../../components/PaginationControls";
import GuessFilmFromDescriptionLeaderboardList from "./GuessFilmFromDescriptionLeaderboardList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

function GuessFilmFromDescriptionLeaderboard() {
  const [page, setPage] = useState(1);
  const entriesPerPage = 30;

  const {
    isLoading,
    data: leaderboardPaginator,
    error,
  } = useQuery({
    queryKey: ["description-game-leaderboard", page, entriesPerPage],
    queryFn: () => getGuessFilmFromDescriptionLeaderboard(page, entriesPerPage),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <LoadingMessage message={"Loading leaderboard."} />;

  if (error) {
    toast.error(`Error getting leaderboard ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  return (
    <div className="leaderboards">
      <h1 className="text-center text-primary text-4xl my-4 font-semibold">
        Leaderboard
      </h1>
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
    </div>
  );
}

export default GuessFilmFromDescriptionLeaderboard;
