import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getFilmTriviasByFilmId } from "../../../api/filmTriviaApi";
import LoadingMessage from "../../Loading/LoadingMessage";
import TriviaList from "./TriviaList";

function TriviaOverview({ film, totalItems }) {
  const [trivia, setTrivia] = useState(null);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    if (!trivia) {
      getFilmTrivia();
    }
  }, [film]);

  function getFilmTrivia() {
    getFilmTriviasByFilmId(film.id, 1, totalItems)
      .then((res) => {
        setTotal(res.of);
        setTrivia(res.data);
      })
      .catch((err) => {
        toast.error(`Error getting film trivia ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }

  return (
    <div className="film-trivia-overview">
      {!trivia ? (
        <LoadingMessage message={"Loading trivia"} />
      ) : (
        <div className="mt-4">
          <h2 className="text-primary text-xl ">Trivia</h2>
          {trivia.length > 0 ? (
            <>
              <TriviaList trivia={trivia} canControl={false} />
              {total > totalItems && (
                <Link
                  to={`/films/${film.id}/trivia`}
                  className="text-primary hover:opacity-75"
                >
                  View {total - totalItems} more
                </Link>
              )}
            </>
          ) : (
            <p className="text-lg">
              This film currently has no trivia.{" "}
              <Link
                to={`/films/${film.id}/trivia/add`}
                className="text-primary"
              >
                Add some now.
              </Link>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

TriviaOverview.propTypes = {
  film: PropTypes.object.isRequired,
  totalItems: PropTypes.number.isRequired,
};

export default TriviaOverview;
