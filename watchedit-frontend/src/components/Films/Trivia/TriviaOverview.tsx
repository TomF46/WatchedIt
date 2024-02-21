import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getFilmTriviasByFilmId } from "../../../api/filmTriviaApi";
import LoadingMessage from "../../Loading/LoadingMessage";
import TriviaList from "./TriviaList";
import { useQuery } from "@tanstack/react-query";
import { Film } from "../../../types/Films";

type Props = {
  film: Film;
  totalItems: number;
};

function TriviaOverview({ film, totalItems }: Props) {
  const {
    isLoading,
    data: triviaPaginator,
    error,
  } = useQuery({
    queryKey: ["film-trivia", film.id, totalItems],
    queryFn: () => getFilmTriviasByFilmId(Number(film.id), 1, totalItems),
  });

  if (isLoading) return <LoadingMessage message={"Loading trivia."} />;

  if (error) {
    toast.error(`Error getting film trivia ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  if (triviaPaginator)
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
              <Link
                to={`/films/${film.id}/trivia/add`}
                className="text-primary"
              >
                Add some now.
              </Link>
            </p>
          )}
        </div>
      </div>
    );
}

export default TriviaOverview;
