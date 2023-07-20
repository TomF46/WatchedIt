import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
                <div className="grid grid-cols-12 mt-4">
                    <div className="col-span-12 md:col-span-2">
                        <GameInfoSection game={game} />
                    </div>
                    <div className="col-span-12 mt-4 md:col-span-10 md:pl-4 md:mt-0">
                        {game.status == 4 ? (
                            <div className="my-16">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14 text-primary mx-auto text-center">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                </svg>
                                <p className="text-center text-2xl">You have forefeited this game</p>
                            </div>
                        ) : (
                            <>
                                <div className="mt-4">
                                    <ClueSection game={game} />
                                </div>
                                <div className="mt-4">
                                    {game.status == 1 && (<GuessSection guess={guess} />)}
                                    {game.status == 2 && (<GuessFilmFailed />)}
                                    {game.status == 3 && (<CorrectGuessFilm game={game} />)}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default GuessFilmFromCastGame;