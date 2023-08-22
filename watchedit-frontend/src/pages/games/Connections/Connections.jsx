import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import PaginationControls from "../../../components/PaginationControls";
import { getConnectionsGames, startConnectionsGame } from "../../../api/games/connectionsGameApi";
import ConnectionsGamesList from "./ConnectionsGamesList.jsx";
import { useNavigate } from "react-router-dom";

function Connections({currentUserId}) {
    const navigate = useNavigate();
    const [gamesPaginator, setGamesPaginator] = useState(null);
    const [page, setPage] = useState(1);
    const gamesPerPage = 20;
    const [lastPageLoaded, setLastPageLoaded] = useState(null);

    useEffect(() => {
        if (!gamesPaginator) {
            getGames();
        }
    }, [currentUserId]);

    useEffect(() => {
        if (lastPageLoaded != null) getGames();
    }, [page]);

    function getGames() {
        getConnectionsGames(page, gamesPerPage)
            .then((res) => {
                setGamesPaginator(res);
                setLastPageLoaded(page);
            })
            .catch((err) => {
                toast.error(`Error getting games ${err.data.Exception}`, {
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

    function startNewGame(){
        startConnectionsGame().then(res => {
            navigate(`/games/connections/${res.id}`)
        }).catch((err) => {
            toast.error(`Error starting new game ${err.data.Exception}`, {
                autoClose: false,
            });
        });
    }

    return (
        <div className="watched-films-page">
            <h1 className="text-center text-primary text-4xl my-4 font-bold">Connections</h1>
            <div className="grid grid-cols-12">
                <div className="col-span-12 md:col-span-8">
                    <div className="bg-backgroundOffset p-4 shadow rounded mb-4">
                        <h3 className="text-center text-primary text-2xl mb-4 font-bold">Game rules</h3>
                        <ul className="list-disc ml-2">
                            <li>When game starts you get the first cast member as a clue.</li>
                            <li>Make your first guess if you are wrong a second cast member is revealed.</li>
                            <li>This continues until you either run out of new clues or guess correctly</li>
                            <li>If you guess correctly you win, and your score is the number of guesses, the lower the better.</li>
                            <li>If you run our of new cast member clues then its game over!</li>
                        </ul>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-4 text-center bg-backgroundOffset p-4 shadow rounded mb-4 ml-1 flex items-center justify-center">
                    <button onClick={() => {startNewGame()}} className="bg-primary text-white text-center rounded py-2 px-4 mb-4 hover:opacity-75">New game</button>
                </div>
            </div>
            {gamesPaginator ? (
                <>
                {gamesPaginator.data.length > 0 ? (
                    <>
                        <ConnectionsGamesList games={gamesPaginator.data} />
                        <PaginationControls
                            currentPage={page}
                            onNext={handleNextPage}
                            onPrevious={handlePreviousPage}
                            of={gamesPaginator.of}
                            from={gamesPaginator.from}
                            to={gamesPaginator.to}
                            lastPage={gamesPaginator.lastPage}
                        />
                    </>
                ) : (
                    <p className="text-center text-primary text-2xl">You have not started any games.</p>
                )}
                </>
            ):(
                <LoadingMessage message={"Loading games."} />
            )}
        </div>
    );
}

Connections.propTypes = {
    currentUserId: PropTypes.any.isRequired
};

const mapStateToProps = (state) => {
    return {
        currentUserId: state.tokens ? state.tokens.id : null
    };
};

export default connect(mapStateToProps)(Connections);
