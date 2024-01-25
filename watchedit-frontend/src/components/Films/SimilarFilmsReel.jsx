import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { getSimilarFilmsPaginated } from "../../api/filmsApi";
import FilmPreview from "./FilmPreview";
import { useQuery } from "@tanstack/react-query";

function SimilarFilmsReel({ filmId }) {
  const page = 1;
  const filmsPerPage = 8;

  const {
    isLoading,
    data: filmsPaginator,
    error,
  } = useQuery({
    queryKey: ["similar-films", filmId, filmsPerPage, page],
    queryFn: () => getSimilarFilmsPaginated(filmId, page, filmsPerPage),
  });

  if (error) {
    toast.error(`Error getting similar films ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  if (!isLoading)
    return (
      <div className="similar-films-reel">
        {filmsPaginator.data.length > 0 && (
          <div className="mt-4">
            <h2 className="text-primary text-2xl hover:opacity-75 inline-flex items-center">
              Similar films
            </h2>
            <div className="grid grid-cols-16">
              {filmsPaginator.data.map((film) => {
                return (
                  <FilmPreview key={film.id} film={film} editable={false} />
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
}

SimilarFilmsReel.propTypes = {
  filmId: PropTypes.number.isRequired,
};

export default SimilarFilmsReel;
