import MDEditor from "@uiw/react-md-editor";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getNewsArticlesById } from "../../api/newsApi";
import { toast } from "react-toastify";
import LoadingMessage from "../../components/Loading/LoadingMessage";

function NewsArticle() {
  const { id } = useParams();
  const currentUserId = useSelector((state) =>
    state.tokens ? state.tokens.id : null,
  );
  const [article, setArticle] = useState(null);

  const getArticle = useCallback(() => {
    getNewsArticlesById(id)
      .then((res) => {
        setArticle(res);
      })
      .catch((err) => {
        toast.error(`Error getting article ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }, [id]);

  useEffect(() => {
    getArticle();
  }, [id, getArticle]);

  return (
    <div className="article-page">
      {!article ? (
        <LoadingMessage message={"Loading article."} />
      ) : (
        <>
          <h1 className="my-4 text-center text-primary text-4xl font-bold">
            {article.title}
          </h1>
          {currentUserId == article.author.id && (
            <div className="admin-controls bg-backgroundOffset mt-4 shadow rounded">
              <div className="bg-backgroundOffset2 rounded-t-md">
                <p className="text-primary font-bold text-lg px-2 py-1">
                  Publisher controls
                </p>
              </div>
              <div className="px-2 py-2">
                <Link
                  to={`/news/${id}/edit`}
                  className="bg-backgroundOffset2 text-primary font-bold rounded py-2 px-4 hover:opacity-75 inline-block"
                >
                  Edit article
                </Link>
              </div>
            </div>
          )}
          <div className="mt-4">
            <MDEditor.Markdown source={article.content} />
          </div>
        </>
      )}
    </div>
  );
}

export default NewsArticle;
