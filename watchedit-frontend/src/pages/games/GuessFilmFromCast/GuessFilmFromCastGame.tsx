import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import {
  forefeitGuessFilmFromCastGameById,
  getGuessFilmFromCastGameById,
  makeGuessForGuessFilmFromCastGame,
} from "../../../api/games/guessFilmFromCastGameApi";
import { toast } from "react-toastify";
import GameInfoSection from "../GameInfoSection";
import ClueSection from "./ClueSection";
import GuessSection from "../GuessSection";
import CorrectGuessFilm from "../CorrectGuessFilm";
import GuessFilmFailed from "../GuessFilmFailed";
import { confirmAlert } from "react-confirm-alert";
import { useMutation, useQuery } from "@tanstack/react-query";
import ErrorMessage from "../../../components/Error/ErrorMessage";

function GuessFilmFromCastGame() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const cluesRef = useRef(null);
  const navigate = useNavigate();

  const { isLoading, error } = useQuery({
    queryKey: ["cast-game", id],
    queryFn: () =>
      getGuessFilmFromCastGameById(id).then((res) => {
        setGame(res);
        return res;
      }),
  });

  const guess = useMutation({
    mutationFn: (film) =>
      makeGuessForGuessFilmFromCastGame(game.id, { filmId: film.id }),
    onSuccess: (res) => {
      setGame(res);
      cluesRef.current.scrollIntoView({ block: "end", behavior: "smooth" });
      if (res.status == 1)
        toast.info("Thats not right, try again with a new clue");
      if (res.status == 2)
        toast.error(
          "Unlucky, you've ran out of clues and still haven't got it correct, you lose!",
        );
      if (res.status == 3)
        toast.success(`Correct the film was ${res.film.name}`);
    },
    onError: (err) => {
      toast.error(`Error submitting guess ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  const forefeit = useMutation({
    mutationFn: (game) => forefeitGuessFilmFromCastGameById(game.id),
    onSuccess: () => {
      navigate(`/games/filmFromCast`);
    },
    onError: (err) => {
      toast.error(`Error forefeiting game ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  function confirmForefeit() {
    confirmAlert({
      title: "Confirm forefeit",
      message: `Are you sure you want to forefeit this game?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => forefeit.mutate(game),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  }

  function startAgain() {
    navigate(`/games/filmFromCast`);
  }

  if (isLoading) return <LoadingMessage message={"Loading game."} />;

  if (error) {
    return <ErrorMessage message={"Error loading game."} error={error} />;
  }

  return (
    <div className="game-page">
      <div className="grid grid-cols-12 mt-4">
        <div className="col-span-12 md:col-span-2">
          <GameInfoSection
            game={game}
            forefeit={confirmForefeit}
            startAgain={startAgain}
          />
        </div>
        <div className="col-span-12 mt-4 md:col-span-10 md:pl-4 md:mt-0">
          {game.status == 4 ? (
            <div className="my-16">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-14 h-14 text-primary mx-auto text-center"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                />
              </svg>
              <p className="text-center text-2xl">
                You have forefeited this game
              </p>
            </div>
          ) : (
            <>
              <div className="mt-4" ref={cluesRef}>
                <ClueSection game={game} />
              </div>
              <div className="mt-4">
                {game.status == 1 && (
                  <GuessSection guess={(film) => guess.mutate(film)} />
                )}
                {game.status == 2 && <GuessFilmFailed />}
                {game.status == 3 && <CorrectGuessFilm game={game} />}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default GuessFilmFromCastGame;
