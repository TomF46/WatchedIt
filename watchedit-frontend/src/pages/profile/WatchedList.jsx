import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserById, getWatchedListByUserId } from "../../api/usersApi";
import FilmGrid from "../../components/Films/FilmGrid";
import PaginationControls from "../../components/PaginationControls";
import { useParams } from "react-router-dom";
import LoadingMessage from "../../components/Loading/LoadingMessage";

function WatchedList() {
  const { id } = useParams();
  const currentUserId = useSelector((state) =>
    state.tokens ? state.tokens.id : null,
  );
  const userId = id ? id : currentUserId;
  const [user, setUser] = useState(null);
  const [filmsPaginator, setFilmsPaginator] = useState(null);
  const [page, setPage] = useState(1);
  const filmsPerPage = 32;

  useEffect(() => {
    getUserById(userId)
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        toast.error(`Error getting user ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }, [userId]);

  useEffect(() => {
    getWatchedListByUserId(userId, page, filmsPerPage)
      .then((res) => {
        setFilmsPaginator(res);
      })
      .catch((err) => {
        toast.error(`Error getting films ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }, [page, userId, filmsPerPage]);

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
