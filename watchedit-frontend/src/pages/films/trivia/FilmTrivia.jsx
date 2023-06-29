import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getFilmById } from "../../../api/filmsApi";
import PaginationControls from "../../../components/PaginationControls";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import FilmMiniDetail from "../../../components/Films/FilmMiniDetail";
import { deleteFilmTrivia, getFilmTriviasByFilmId } from "../../../api/filmTriviaApi";
import TriviaList from "../../../components/Films/Trivia/TriviaList";
import { confirmAlert } from "react-confirm-alert";

function FilmTrivia() {
    const { id } = useParams();
    const [film, setFilm] = useState(null);
    const [filmTriviaPaginator, setFilmTriviaPaginator] = useState(null);
    const [page, setPage] = useState(1);
    const filmTriviaPerPage = 20;
    const [lastPageLoaded, setLastPageLoaded] = useState(null);

    useEffect(() => {
        if (!film) {
            getFilm();
            getFilmTrivia();
        }
    }, [id, film]);

    useEffect(() => {
        if (lastPageLoaded != null) getFilmTrivia();
    }, [page]);

    function getFilm() {
        getFilmById(id)
            .then((res) => {
                setFilm(res);
            })
            .catch((err) => {
                toast.error(`Error getting film ${err.data.Exception}`, {
                    autoClose: false,
                });
            });
    }

    function getFilmTrivia() {
        getFilmTriviasByFilmId(id, page, filmTriviaPerPage)
            .then((res) => {
                setFilmTriviaPaginator(res);
                setLastPageLoaded(page);
            })
            .catch((err) => {
                toast.error(`Error getting film trivia ${err.data.Exception}`, {
                    autoClose: false,
                });
            });
    }

    function handleDelete(trivia){
        confirmAlert({
            title : "Confirm removal",
            message: `Are you sure you want to remove this trivia?`,
            buttons: [
                {
                  label: 'Yes',
                  onClick: () => deleteTrivia(trivia)
                },
                {
                  label: 'No',
                  onClick: () => {}
                }
            ]
        })
    }

    function deleteTrivia(trivia){
        deleteFilmTrivia(film.id, trivia).then(() => {
            toast.success("Trivia removed");
            getFilmTrivia();
        }).catch((err) => {
            toast.error(`Error removing film trivia ${err.data.Exception}`, {
                autoClose: false,
            });
        });
    }

    function handleNextPage() {
        var newPage = page + 1;
        setPage(newPage);
    }

    function handlePreviousPage() {
        var newPage = page - 1;
        setPage(newPage);
    }

    return (
        <div className="film-filmTrivia-page">
            {!film ? (
                <LoadingMessage message={"Loading film"} />
            ) : (
                <>
                    <h1 className="text-center text-primary text-4xl mt-4 mb-2 font-bold">{film.name} trivia</h1>
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
                                        <TriviaList trivia={filmTriviaPaginator.data} canControl={true} onRemove={handleDelete} />
                                        <PaginationControls
                                            currentPage={page}
                                            onNext={handleNextPage}
                                            onPrevious={handlePreviousPage}
                                            of={filmTriviaPaginator.of}
                                            from={filmTriviaPaginator.from}
                                            to={filmTriviaPaginator.to}
                                            lastPage={filmTriviaPaginator.lastPage}
                                        />
                                    </div>
                                ) : (
                                    <div className="py-16">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14 text-primary mx-auto text-center">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                        </svg>
                                        <p className="text-center text-xl">This film currently has no trivia. <Link to={`/films/${film.id}/trivia/add`} className="text-primary hover:opacity-75">Add some now.</Link></p>
                                    </div>
                                )}
                            </>
                        ):(
                            <LoadingMessage message={"Loading film trivia"} />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default FilmTrivia;

