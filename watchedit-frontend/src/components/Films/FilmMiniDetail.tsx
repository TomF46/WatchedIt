import { Link } from "react-router-dom";
import { Film } from "../../types/Films";

const FilmMiniDetail = ({ film }: { film: Film }) => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 md:col-span-6 lg:col-span-6">
        <div className="grid grid-cols-12 bg-backgroundOffset shadow rounded">
          <div className="col-span-6 md:col-span-3 lg:col-span-2">
            <img
              src={film.posterUrl}
              className="h-full poster rounded-l"
              alt={`${film.name} poster.`}
            />
          </div>
          <div className="col-span-6 md:col-span-9 lg:col-span-10 p-2">
            <Link
              to={`/films/${film.id}`}
              className="text-primary font-semibold hover:opacity-75"
            >
              {film.name}
            </Link>
            <p className="text-sm md:text-base">{film.shortDescription}</p>
            {film.averageRating && <p>{`${film.averageRating}/10`}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmMiniDetail;
