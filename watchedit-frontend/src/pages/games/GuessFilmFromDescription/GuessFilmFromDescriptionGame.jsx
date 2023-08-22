import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import { forefeitGuessFilmFromDescriptionGameById, getGuessFilmFromDescriptionGameById, makeGuessForGuessFilmFromDescriptionGame }from "../../../api/games/guessFilmFromDescriptionApi";
import { toast } from "react-toastify";
import GameInfoSection from "../GameInfoSection";
import GuessSection from "../GuessSection";
import RoundsSection from "./RoundsSection";
import { confirmAlert } from "react-confirm-alert";

function GuessFilmFromDescriptionGame(){
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const roundsRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!game || game.id != id) {
            getGame();
        }
    }, [id, game]);

    function getGame(){
        getGuessFilmFromDescriptionGameById(id).then(res => {
            setGame(res);
        }).catch((err) => {
            toast.error(`Error getting game ${err.data.Exception}`, {
                autoClose: false,
            });
        });
    }

    function guess(film){
        let round = game.rounds[game.rounds.length - 1];
        makeGuessForGuessFilmFromDescriptionGame(game.id, {roundId: round.id, filmId: film.id}).then(res => {
            setGame(res);
            roundsRef.current.scrollIntoView({ block: 'nearest',  behavior: 'smooth' });
            if(res.status == 1) toast.success("Correct, on to the next round!");
            if(res.status == 3) toast.info(`Incorrect, your final score is ${res.score}.`);
            if(res.status == 5) toast.info(`You've achieved the max score of ${res.score}, as more films get added the max score increases so come back soon.`);
            
        }).catch((err) => {
            toast.error(`Error submitting guess ${err.data.Exception}`, {
                autoClose: false,
            });
        });
    }

    function confirmForefeit(){
        confirmAlert({
            title : "Confirm forefeit",
            message: `Are you sure you want to forefeit this game?`,
            buttons: [
                {
                  label: 'Yes',
                  onClick: () => forefeit()
                },
                {
                  label: 'No',
                  onClick: () => {}
                }
            ]
        })
    }

    function forefeit()
    {
        forefeitGuessFilmFromDescriptionGameById(game.id).then(() => {
            navigate(`/games/filmFromDescription`);
        }).catch((err) => {
            toast.error(`Error forefeiting game ${err.data.Exception}`, {
                autoClose: false,
            });
        });
    }

    function startAgain(){
        navigate(`/games/filmFromDescription`);
    }

    return (
        <div className="game-page">
            {!game ? (
                <LoadingMessage message={"Loading game."} />
            ) : (
                <div className="grid grid-cols-12 mt-4">
                    <div className="col-span-12 md:col-span-2">
                        <GameInfoSection game={game} forefeit={confirmForefeit} startAgain={startAgain} />
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
                                <div className="mt-4" ref={roundsRef}>
                                    <RoundsSection game={game} />
                                </div>
                                <div className="mt-4">
                                    {game.status == 1 && (<GuessSection guess={guess} />)}
                                    {/* {game.status == 2 && (<GuessFilmFailed />)}
                                    {game.status == 3 && (<CorrectGuessFilm game={game} />)} */}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default GuessFilmFromDescriptionGame;