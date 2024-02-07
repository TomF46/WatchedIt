import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserById, getWatchedListByUserId } from "../../api/usersApi";
import FilmGrid from "../../components/Films/FilmGrid";
import PaginationControls from "../../components/PaginationControls";
import { useParams } from "react-router-dom";
import LoadingMessage from "../../components/Loading/LoadingMessage";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ErrorMessage from "../../components/Error/ErrorMessage";
import { RootState } from "../../redux/store";

function WatchedList() {
  const { id } = useParams();
  const currentUserId = useSelector((state : RootState) =>
    state.tokens ? state.tokens.id : null,
  );
  const userId = id ? id : currentUserId;
  const [page, setPage] = useState(1);
  const filmsPerPage = 32;

  const { data: user, error: userLoadError } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
  });

  const { data: filmsPaginator } = useQuery({
    queryKey: ["user-watchedlist", userId, page, filmsPerPage],
    queryFn: () =>
      getWatchedListByUserId(userId, page, filmsPerPage).catch((error) => {
        toast.error(`Error getting films ${error.data.Exception}`, {
          autoClose: false,
        });
        return error;
      }),
    placeholderData: keepPreviousData,
  });

  if (userLoadError) {
    return (
      <ErrorMessage message={"Error loading user."} error={userLoadError} />
    );
  }

  return (
    <div className="watched-films-page">
      {!user ? (
        <LoadingMessage message={"Loading user"} />
      ) : (
        <>
          <div>
            <h1 className="text-center text-primary text-4xl my-4 font-semibold">
              {user.username} watched films
            </h1>
            {filmsPaginator ? (
              <>
                {filmsPaginator.data.length > 0 ? (
                  <>
                    <FilmGrid films={filmsPaginator.data} editable={false} />
                    <PaginationControls
                      currentPage={page}
                      onPageChange={setPage}
                      of={filmsPaginator.of}
                      from={filmsPaginator.from}
                      to={filmsPaginator.to}
                      lastPage={filmsPaginator.lastPage}
                    />
                  </>
                ) : (
                  <p className="text-center text-primary text-2xl">
                    {user.username} has not watched any films.
                  </p>
                )}
              </>
            ) : (
              <LoadingMessage message={"Loading watched films"} />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default WatchedList;
