import { useEffect, useState } from "react";
import {
  setFilmNotWatchedById,
  setFilmWatchedById,
} from "../../../api/watchedFilmsApi";
import { toast } from "react-toastify";
import LoadingMessage from "../../Loading/LoadingMessage";
import { useMutation } from "@tanstack/react-query";
import { Film } from "../../../types/Films";
import ButtonWIcon from "../../Buttons/ButtonWIcon";
import EyeIcon from "../../Icons/EyeIcon";

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
            <ButtonWIcon
              text="Watched"
              onClick={() => setNotWatched.mutate(film)}
              icon={<EyeIcon color="white" height={5} width={5} />}
              bgColor="bg-success"
              additionalClasses="justify-center w-full"
            />
          ) : (
            <ButtonWIcon
              text="Watch"
              onClick={() => setWatched.mutate(film)}
              icon={<EyeIcon color="white" height={5} width={5} />}
              bgColor="bg-primary"
              additionalClasses="justify-center w-full"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default WatchedFilmControls;
