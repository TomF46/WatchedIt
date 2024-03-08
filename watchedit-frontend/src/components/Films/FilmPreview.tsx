import { useNavigate } from "react-router-dom";
import { Film } from "../../types/Films";
import StarIcon from "../Icons/StarIcon";
import EyeIcon from "../Icons/EyeIcon";

type Props = {
  film: Film;
  editable: boolean;
  onRemove?: (film: Film) => void;
};

const FilmPreview = ({ film, editable, onRemove }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="col-span-8 md:col-span-4 lg:col-span-2 my-2">
      <div className="mx-2 bg-backgroundOffset cursor-pointer h-full shadow rounded group">
        {editable && onRemove && (
          <button
            onClick={() => {
              onRemove(film);
            }}
            className="p-2 text-center bg-red-400 w-full hover:opacity-75 rounded-t"
          >
            Remove
          </button>
        )}
        <div
          onClick={() => {
            navigate(`/films/${film.id}`);
          }}
          className="hover:opacity-75 relative"
        >
          <div className="relative">
            <img
              src={film.posterUrl}
              className={`w-full poster ${editable ? "" : "rounded-t"}`}
              alt={`${film.name} poster.`}
            />
            <div className="absolute bottom-0 invisible p-1 group-hover:visible bg-backgroundOffset2 w-full">
              <p className="text-center text-primary">{film.name}</p>
            </div>
          </div>
          <div className="p-2">
            <div className="grid grid-cols-12">
              <div className="col-span-6 relative">
                <div className="text-center inline-flex items-center">
                  <StarIcon
                    color="rating"
                    height={5}
                    width={5}
                    strokeWidth={1.5}
                  />
                  <p className="ml-1">
                    {film.averageRating ? film.averageRating : "- -"}
                  </p>
                </div>
              </div>
              <div className="col-span-6 relative">
                <div className="text-center inline-flex items-center absolute right-0 top-0">
                  <EyeIcon color="success" height={5} width={5} />
                  <p className="ml-1">{film.watchedByCount}</p>
                </div>
              </div>
              <div className="col-span-12 lg:hidden">
                <h3 className="text-center text-primary">{film.name}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmPreview;
