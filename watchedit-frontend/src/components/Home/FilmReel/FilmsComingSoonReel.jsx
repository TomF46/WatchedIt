import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import LoadingMessage from "../../Loading/LoadingMessage";
import { searchFilmsPaginated } from "../../../api/filmsApi";
import FilmPreview from "../../Films/FilmPreview";
import { useQuery } from "@tanstack/react-query";

function FilmsComingSoonReel({ title, subtitle, sort }) {
  const page = 1;
  const filmsPerPage = 8;
  let currentDate = new Date().toISOString();
  let searchParams = { releasedAfterDate: currentDate, sort: sort };

  const { isLoading, data, error } = useQuery({
    queryKey: ["films-coming-soon", sort, filmsPerPage, page],
    queryFn: () =>
      searchFilmsPaginated(searchParams, page, filmsPerPage).then(
        (res) => res.data,
      ),
  });

  if (isLoading) return <LoadingMessage message={"Loading films."} />;

  if (error) {
    toast.error(`Error getting films ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  return (
    <div className="films-reel">
      {data.length > 0 && (
        <div className="mt-4">
          <Link
            to={"/films"}
            className="text-primary text-2xl hover:opacity-75 inline-flex items-center font-semibold"
          >
            {title}
          </Link>
          {subtitle && <p>{subtitle}</p>}
          <div className="grid grid-cols-16">
            {data.map((film) => {
              return <FilmPreview key={film.id} film={film} editable={false} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

FilmsComingSoonReel.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  sort: PropTypes.string.isRequired,
};

export default FilmsComingSoonReel;
