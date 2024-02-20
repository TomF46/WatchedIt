import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import {
  forefeitGuessFilmFromDescriptionGameById,
  getGuessFilmFromDescriptionGameById,
  makeGuessForGuessFilmFromDescriptionGame,
} from "../../../api/games/guessFilmFromDescriptionApi";
import { toast } from "react-toastify";
import GameInfoSection from "../GameInfoSection";
import GuessSection from "../GuessSection";
import RoundsSection from "./RoundsSection";
import { confirmAlert } from "react-confirm-alert";
import { useMutation, useQuery } from "@tanstack/react-query";
import ErrorMessage from "../../../components/Error/ErrorMessage";
import { GuessFilmFromDescriptionGame as GuessFilmFromDescriptionGameType } from "../../../types/Games";
import { Film } from "../../../types/Films";

function GuessFilmFromDescriptionGame() {
  const { id } = useParams();
  const [game, setGame] = useState<GuessFilmFromDescriptionGameType | null>(
    null,
  );
  const roundsRef = useRef<null | HTMLDivElement>(null);
  const navigate = useNavigate();

  const { isLoading, error } = useQuery({
    queryKey: ["connections-game", id],
    queryFn: () =>
      getGuessFilmFromDescriptionGameById(Number(id)).then((res) => {
        setGame(res);
        return res;
      }),
  });

  const guess = useMutation({
    mutationFn: (film: Film) => {
      const round = game!.rounds[game!.rounds.length - 1];
      return makeGuessForGuessFilmFromDescriptionGame(game!.id, {
        roundId: round.id,
        filmId: film.id!,
      });
    },
    onSuccess: (res) => {
      setGame(res);
      if (roundsRef.current)
        roundsRef.current.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      if (res.status == 1) toast.success("Correct, on to the next round!");
      if (res.status == 3)
        toast.info(`Incorrect, your final score is ${res.score}.`);
      if (res.status == 5)
        toast.info(
          `You've achieved the max score of ${res.score}, as more films get added the max score increases so come back soon.`,
        );
    },
    onError: (err) => {
      toast.error(`Error submitting guess ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  const forefeit = useMutation({
    mutationFn: (game: GuessFilmFromDescriptionGameType) =>
      forefeitGuessFilmFromDescriptionGameById(game.id),
    onSuccess: () => {
      navigate(`/games/filmFromDescription`);
    },
    onError: (err) => {
      toast.error(`Error forefeiting game ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  function confirmForefeit(): void {
    confirmAlert({
      title: "Confirm forefeit",
      message: `Are you sure you want to forefeit this game?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => forefeit.mutate(game!),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  }

  function startAgain() {
    navigate(`/games/filmFromDescription`);
  }

  if (isLoading) return <LoadingMessage message={"Loading game."} />;

  if (error) {
    return (
      <ErrorMessage
        message={"Error loading game."}
        error={error.data.Exception}
      />
    );
  }

  if (game)
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
                <div className="mt-4" ref={roundsRef}>
                  <RoundsSection game={game} />
                </div>
                <div className="mt-4">
                  {game.status == 1 && (
                    <GuessSection guess={(film) => guess.mutate(film)} />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
}

export default GuessFilmFromDescriptionGame;
