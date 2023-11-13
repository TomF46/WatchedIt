import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getFilmById } from "../../../api/filmsApi";
import PaginationControls from "../../../components/PaginationControls";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import FilmMiniDetail from "../../../components/Films/FilmMiniDetail";
import {
  deleteFilmTrivia,
  getFilmTriviasByFilmId,
} from "../../../api/filmTriviaApi";
import TriviaList from "../../../components/Films/Trivia/TriviaList";
import { confirmAlert } from "react-confirm-alert";

function FilmTrivia() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [filmTriviaPaginator, setFilmTriviaPaginator] = useState(null);
  const [page, setPage] = useState(1);
  const filmTriviaPerPage = 4;

  const getFilmTrivia = useCallback(() => {
    getFilmTriviasByFilmId(id, page, filmTriviaPerPage)
      .then((res) => {
        setFilmTriviaPaginator(res);
      })
      .catch((err) => {
        toast.error(`Error getting film trivia ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }, [id, page, filmTriviaPerPage]);

  useEffect(() => {
    getFilmById(id)
      .then((res) => {
        setFilm(res);
      })
      .catch((err) => {
        toast.error(`Error getting film ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }, [id]);

  useEffect(() => {
    getFilmTrivia();
  }, [id, page, filmTriviaPerPage, getFilmTrivia]);

  function handleDelete(trivia) {
    confirmAlert({
      title: "Confirm removal",
      message: `Are you sure you want to remove this trivia?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteTrivia(trivia),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  }

  function deleteTrivia(trivia) {
    deleteFilmTrivia(film.id, trivia)
      .then(() => {
        toast.success("Trivia removed");
        getFilmTrivia();
      })
      .catch((err) => {
        toast.error(`Error removing film trivia ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }

  return (
    <div className="film-filmTrivia-page">
      {!film ? (
        <LoadingMessage message={"Loading film"} />
      ) : (
        <>
          <h1 className="text-center text-primary text-4xl mt-4 mb-2 font-bold">
            {film.name} trivia
          </h1>
          <div className="filmTrivia-controls bg-backgroundOffset mt-4 rounded-md">
            <div className="bg-backgroundOffset2 rounded-t-md">
              <p className="text-primary font-bold text-lg px-2 py-1">
                Trivia controls
              </p>
            </div>
            <div className="px-2 py-2">
              <Link
                to={`/films/${film.id}/trivia/add`}
                className="bg-backgroundOffset2 text-primary font-bold rounded py-2 px-4 hover:opacity-75 inline-block"
              >
                Add film trivia
              </Link>
            </div>
          </div>
          <div className="mt-4">
            <FilmMiniDetail film={film} />
            {filmTriviaPaginator ? (
              <>
                {filmTriviaPaginator.data.length > 0 ? (
                  <div className="mt-4">
                    <TriviaList
                      trivia={filmTriviaPaginator.data}
                      canControl={true}
                      onRemove={handleDelete}
                    />
                    <PaginationControls
                      currentPage={page}
                      onPageChange={setPage}
                      of={filmTriviaPaginator.of}
                      from={filmTriviaPaginator.from}
                      to={filmTriviaPaginator.to}
                      lastPage={filmTriviaPaginator.lastPage}
                    />
                  </div>
                ) : (
                  <div className="py-16">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-14 h-14 text-primary mx-auto text-center"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                      />
                    </svg>
                    <p className="text-center text-xl">
                      This film currently has no trivia.{" "}
                      <Link
                        to={`/films/${film.id}/trivia/add`}
                        className="text-primary hover:opacity-75"
                      >
                        Add some now.
                      </Link>
                    </p>
                  </div>
                )}
              </>
            ) : (
              <LoadingMessage message={"Loading film trivia"} />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default FilmTrivia;
