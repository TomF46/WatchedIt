import { useEffect, useState } from "react";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import { getGuessFilmFromDescriptionLeaderboard }from "../../../api/games/guessFilmFromDescriptionApi";
import { toast } from "react-toastify";
import PaginationControls from "../../../components/PaginationControls";
import GuessFilmFromDescriptionLeaderboardList from "./GuessFilmFromDescriptionLeaderboardList";

function GuessFilmFromDescriptionLeaderboard(){
    const [leaderboardPaginator, setLeaderboardPaginator] = useState(null);
    const [page, setPage] = useState(1);
    const entriesPerPage = 30;
    const [lastPageLoaded, setLastPageLoaded] = useState(null);

    useEffect(() => {
        if (!leaderboardPaginator) {
            getLeaderboard();
        }
    }, [leaderboardPaginator]);

    useEffect(() => {
        if (lastPageLoaded != null) getLeaderboard();
    }, [page]);

    function getLeaderboard(){
        getGuessFilmFromDescriptionLeaderboard(page, entriesPerPage).then(res => {
            setLeaderboardPaginator(res);
            setLastPageLoaded(page);
        }).catch((err) => {
            toast.error(`Error getting leaderboard ${err.data.Exception}`, {
                autoClose: false,
            });
        });
    }

    function handleNextPage() {
        var newPage = page + 1;
        setPage(newPage);
    }

    function handlePreviousPage() {
        var newPage = page - 1;
        setPage(newPage);
    }

    return (
        <div className="leaderboards">
            <h1 className="text-center text-primary text-4xl my-4 font-bold">
                Leaderboard
            </h1>
            {leaderboardPaginator ? (
                <>
                    <GuessFilmFromDescriptionLeaderboardList entries={leaderboardPaginator.data} />
                    <PaginationControls
                        currentPage={page}
                        onNext={handleNextPage}
                        onPrevious={handlePreviousPage}
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
    )
}

export default GuessFilmFromDescriptionLeaderboard;