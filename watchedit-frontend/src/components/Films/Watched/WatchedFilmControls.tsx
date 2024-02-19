import { useEffect, useState } from "react";
import {
  setFilmNotWatchedById,
  setFilmWatchedById,
} from "../../../api/watchedFilmsApi";
import { toast } from "react-toastify";
import LoadingMessage from "../../Loading/LoadingMessage";
import { useMutation } from "@tanstack/react-query";
import { Film } from "../../../types/Films";

type Props = {
  film: Film;
  onChange: () => void;
};

const WatchedFilmControls = ({ film, onChange }: Props) => {
  const [hasWatched, setHasWatched] = useState(false);

  useEffect(() => {
    setHasWatched(film.isWatchedByUser);
  }, [film]);

  const setWatched = useMutation({
    mutationFn: (film: Film) => setFilmWatchedById(Number(film.id)),
    onSuccess: (res) => {
      setHasWatched(res.watched);
      onChange();
    },
    onError: (err) => {
      toast.error(`Error setting film watched${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  const setNotWatched = useMutation({
    mutationFn: (film: Film) => setFilmNotWatchedById(Number(film.id)),
    onSuccess: (res) => {
      setHasWatched(res.watched);
      onChange();
    },
    onError: (err) => {
      toast.error(`Error setting film not watched${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  return (
    <div>
      {hasWatched == null ? (
        <LoadingMessage message={"Loading."} />
      ) : (
        <div className="mt-4">
          {hasWatched ? (
            <button
              onClick={() => setNotWatched.mutate(film)}
              className="bg-success text-white rounded py-2 px-4 hover:opacity-75 inline-flex items-center justify-center w-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="text-white h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="ml-1">Watched</span>
            </button>
          ) : (
            <button
              onClick={() => setWatched.mutate(film)}
              className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-flex items-center justify-center w-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="text-white h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="ml-1">Watch</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default WatchedFilmControls;
