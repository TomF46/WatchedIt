import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getFilmTriviasByFilmId } from "../../../api/filmTriviaApi";
import LoadingMessage from "../../Loading/LoadingMessage";
import TriviaList from "./TriviaList";
import { useQuery } from "@tanstack/react-query";

function TriviaOverview({ film, totalItems }) {
  const {
    isLoading,
    data: triviaPaginator,
    error,
  } = useQuery({
    queryKey: ["film-trivia", film.Id, totalItems],
    queryFn: () => getFilmTriviasByFilmId(film.id, 1, totalItems),
  });

  if (isLoading) return <LoadingMessage message={"Loading trivia."} />;

  if (error) {
    toast.error(`Error getting film trivia ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  return (
    <div className="film-trivia-overview">
      <div className="mt-4">
        <h2 className="text-primary text-xl ">Trivia</h2>
        {triviaPaginator.data.length > 0 ? (
          <>
            <TriviaList trivia={triviaPaginator.data} canControl={false} />
            {triviaPaginator.of > totalItems && (
              <Link
                to={`/films/${film.id}/trivia`}
                className="text-primary hover:opacity-75"
              >
                View {triviaPaginator.of - totalItems} more
              </Link>
            )}
          </>
        ) : (
          <p className="text-lg">
            This film currently has no trivia.{" "}
            <Link to={`/films/${film.id}/trivia/add`} className="text-primary">
              Add some now.
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

TriviaOverview.propTypes = {
  film: PropTypes.object.isRequired,
  totalItems: PropTypes.number.isRequired,
};

export default TriviaOverview;
