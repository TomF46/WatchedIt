import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getNewsPaginated } from "../../api/newsApi";
import { toast } from "react-toastify";
import LoadingMessage from "../../components/Loading/LoadingMessage";
import PaginationControls from "../../components/PaginationControls";
import { Link } from "react-router-dom";
import NewsList from "../../components/News/NewsList";

function News() {
  const userIsAuthenticated = useSelector((state) => state.tokens != null);
  const [articlesPaginator, setArticlesPaginator] = useState(null);
  const [page, setPage] = useState(1);
  const articlesPerPage = 32;

  const getNews = useCallback(() => {
    getNewsPaginated(page, articlesPerPage)
      .then((res) => {
        setArticlesPaginator(res);
      })
      .catch((err) => {
        toast.error(`Error getting articles ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }, [page, articlesPerPage]);

  useEffect(() => {
    console.log("Here");
    getNews();
  }, [page, articlesPerPage, getNews]);

  return (
    <div className="films-page">
      <h1 className="text-center text-primary text-4xl my-4 font-bold">News</h1>
      {userIsAuthenticated && (
        <div className="admin-controls bg-backgroundOffset mt-4 shadow rounded">
          <div className="bg-backgroundOffset2 rounded-t-md">
            <p className="text-primary font-bold text-lg px-2 py-1">
              Publisher controls
            </p>
          </div>
          <div className="px-2 py-2">
            <Link
              to={"/articles/add"}
              className="bg-backgroundOffset2 text-primary font-bold rounded py-2 px-4 hover:opacity-75 inline-block"
            >
              Add article
            </Link>
          </div>
        </div>
      )}
      {!articlesPaginator ? (
        <LoadingMessage message={"Loading articles."} />
      ) : (
        <div className="mt-4">
          {articlesPaginator.data.length > 0 ? (
            <>
              <NewsList articles={articlesPaginator.data} />
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
    </div>
  );
}

export default News;
