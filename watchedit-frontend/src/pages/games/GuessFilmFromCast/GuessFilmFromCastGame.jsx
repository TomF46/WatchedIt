import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import { getGuessFilmFromCastGameById, makeGuessForGuessFilmFromCastGame } from "../../../api/gamesApi";
import { toast } from "react-toastify";
import GameInfoSection from "../GameInfoSection";
import ClueSection from "./ClueSection";
import GuessSection from "./GuessSection";
import CorrectGuessFilm from "../CorrectGuessFilm";
import GuessFilmFailed from "../GuessFilmFailed";

function GuessFilmFromCastGame(){
    const { id } = useParams();
    const [game, setGame] = useState(null);

    useEffect(() => {
        if (!game || game.id != id) {
            getGame();
        }
    }, [id, game]);

    function getGame(){
        getGuessFilmFromCastGameById(id).then(res => {
            setGame(res);
        }).catch((err) => {
            toast.error(`Error getting game ${err.data.Exception}`, {
                autoClose: false,
            });
        });
    }

    function guess(film){
        makeGuessForGuessFilmFromCastGame(game.id, {filmId: film.id}).then(res => {
            setGame(res);
            if(res.status == 1) toast.info("Thats not right, try again with a new clue");
            if(res.status == 2) toast.error("Unlucky, you've ran out of clues and still haven't got it correct, you lose!");
            if(res.status == 3) toast.success(`Correct the film was ${film.name}`);
        }).catch((err) => {
            toast.error(`Error submitting guess ${err.data.Exception}`, {
                autoClose: false,
            });
        });
    }

    return (
        <div className="game-page">
            {!game ? (
                <LoadingMessage message={"Loading game."} />
            ) : (
                <div>
                    <div className="mt-4">
                        <GameInfoSection game={game} />
                    </div>
                    <div className="mt-4">
                        <ClueSection game={game} />
                    </div>
                    <div className="mt-4">
                        {game.status == 1 && (<GuessSection guess={guess} />)}
                        {game.status == 2 && (<GuessFilmFailed />)}
                        {game.status == 3 && (<CorrectGuessFilm game={game} />)}
                    </div>
                </div>
            )}
        </div>
    )
}

export default GuessFilmFromCastGame;