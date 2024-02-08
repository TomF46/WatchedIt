import { useState } from "react";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import { getGuessFilmFromDescriptionLeaderboard } from "../../../api/games/guessFilmFromDescriptionApi";
import PaginationControls from "../../../components/PaginationControls";
import GuessFilmFromDescriptionLeaderboardList from "./GuessFilmFromDescriptionLeaderboardList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ErrorMessage from "../../../components/Error/ErrorMessage";

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
    return (
      <ErrorMessage
        message={"Error loading leaderboard."}
        error={error.data.Exception}
      />
    );
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
