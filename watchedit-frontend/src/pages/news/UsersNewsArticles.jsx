import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getNewsByUserPaginated } from "../../api/newsApi";
import { toast } from "react-toastify";
import LoadingMessage from "../../components/Loading/LoadingMessage";
import PaginationControls from "../../components/PaginationControls";
import { useParams } from "react-router-dom";
import NewsList from "../../components/News/NewsList";
import { getUserById } from "../../api/usersApi";

function UsersNewsArticles() {
  const { id } = useParams();
  const currentUserId = useSelector((state) =>
    state.tokens ? state.tokens.id : null,
  );
  const userId = id ? id : currentUserId;
  const [user, setUser] = useState(null);
  const [articlesPaginator, setArticlesPaginator] = useState(null);
  const [page, setPage] = useState(1);
  const articlesPerPage = 32;

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
    getNewsByUserPaginated(userId, page, articlesPerPage)
      .then((res) => {
        setArticlesPaginator(res);
      })
      .catch((err) => {
        toast.error(`Error getting users reviews ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }, [page, userId, articlesPerPage]);

  return (
    <div className="user-news-page">
      {!user ? (
        <LoadingMessage message={"Loading user."} />
      ) : (
        <>
          <h1 className="text-center text-primary text-4xl my-4 font-bold">
            News by {user.username}
          </h1>
          {!articlesPaginator ? (
            <LoadingMessage message={"Loading articles."} />
          ) : (
            <div className="mt-4">
              {articlesPaginator.data.length > 0 ? (
                <>
                  <NewsList articles={articlesPaginator.data} gridMode />
                  <PaginationControls
                    currentPage={page}
                    onPageChange={setPage}
                    of={articlesPaginator.of}
                    from={articlesPaginator.from}
                    to={articlesPaginator.to}
                    lastPage={articlesPaginator.lastPage}
                  />
                </>
              ) : (
                <div className="my-16">
                  <p className="text-center text-2xl">
                    No articles have been published.
                  </p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default UsersNewsArticles;