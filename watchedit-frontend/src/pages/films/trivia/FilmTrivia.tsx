import { useState } from "react";
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
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import ErrorMessage from "../../../components/Error/ErrorMessage";
import { Trivia } from "../../../types/Trivia";
import TriviaIcon from "../../../components/Icons/TriviaIcon";

function FilmTrivia() {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const filmTriviaPerPage = 4;

  const { data: film, error: filmLoadError } = useQuery({
    queryKey: ["film", id],
    queryFn: () => getFilmById(Number(id)),
  });

  const { data: filmTriviaPaginator, refetch } = useQuery({
    queryKey: ["film-trivia", id, page, filmTriviaPerPage],
    queryFn: () =>
      getFilmTriviasByFilmId(Number(id), page, filmTriviaPerPage).catch(
        (error) => {
          toast.error(`Error getting film trivia ${error.data.Exception}`, {
            autoClose: false,
          });
          return error;
        },
      ),
    placeholderData: keepPreviousData,
  });

  const deleteTrivia = useMutation({
    mutationFn: (triviaToRemove: Trivia) =>
      deleteFilmTrivia(Number(id), triviaToRemove),
    onSuccess: () => {
      toast.success("Trivia removed");
      refetch();
    },
    onError: (err) => {
      toast.error(`Error removing film trivia ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  function handleDelete(trivia: Trivia) {
    confirmAlert({
      title: "Confirm removal",
      message: `Are you sure you want to remove this trivia?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteTrivia.mutate(trivia),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  }

  if (filmLoadError) {
    return (
      <ErrorMessage
        message={"Error loading film."}
        error={filmLoadError.data.Exception}
      />
    );
  }

  return (
    <div className="film-filmTrivia-page">
      {!film ? (
        <LoadingMessage message={"Loading film"} />
      ) : (
        <>
          <h1 className="text-center text-primary text-4xl mt-4 mb-2 font-semibold">
            {film.name} trivia
          </h1>
          <div className="filmTrivia-controls bg-backgroundOffset mt-4 rounded-md">
            <div className="bg-backgroundOffset2 rounded-t-md">
              <p className="text-primary font-semibold text-lg px-2 py-1">
                Trivia controls
              </p>
            </div>
            <div className="px-2 py-2">
              <Link
                to={`/films/${film.id}/trivia/add`}
                className="bg-backgroundOffset2 text-primary font-semibold rounded py-2 px-4 hover:opacity-75 inline-block"
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
                  <div className="my-16">
                    <div className="flex justify-center text-center">
                      <TriviaIcon
                        color="primary"
                        height={14}
                        width={14}
                        strokeWidth={1.5}
                      />
                    </div>
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
