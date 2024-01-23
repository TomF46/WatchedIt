import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import LoadingMessage from "../../Loading/LoadingMessage";
import { getFilmsComingSoon } from "../../../api/filmsApi";
import FilmPreview from "../../Films/FilmPreview";

function FilmsComingSoonReel({ title, subtitle, sort }) {
  const [filmsPaginator, setFilmsPaginator] = useState(null);
  const page = 1;
  const filmsPerPage = 8;

  useEffect(() => {
    let currentDate = new Date().toISOString();
    getFilmsComingSoon(page, filmsPerPage, sort, currentDate)
      .then((res) => {
        setFilmsPaginator(res);
      })
      .catch((err) => {
        toast.error(`Error getting films ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }, [page, filmsPerPage, sort]);

  return (
    <div className="films-reel">
      {!filmsPaginator ? (
        <LoadingMessage message={"Loading films."} />
      ) : (
        <>
          {filmsPaginator.data.length > 0 && (
            <div className="mt-4">
              <Link
                to={"/films"}
                className="text-primary text-2xl hover:opacity-75 inline-flex items-center font-semibold"
              >
                {title}
              </Link>
              {subtitle && <p>{subtitle}</p>}
              <div className="grid grid-cols-16">
                {filmsPaginator.data.map((film) => {
                  return (
                    <FilmPreview key={film.id} film={film} editable={false} />
                  );
                })}
              </div>
            </div>
          )}
        </>
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
