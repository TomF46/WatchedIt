import MDEditor from "@uiw/react-md-editor";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getNewsArticlesById,
  setNewsArticlePublishedStatusById,
} from "../../api/newsApi";
import { toast } from "react-toastify";
import LoadingMessage from "../../components/Loading/LoadingMessage";
import rehypeSanitize from "rehype-sanitize";

function NewsArticle() {
  const { id } = useParams();
  const isAdmin = useSelector((state) => state.isAdmin);
  const currentUserId = useSelector((state) =>
    state.tokens ? state.tokens.id : null,
  );
  const [article, setArticle] = useState(null);

  const formatArticle = useCallback((article) => {
    article.content = article.content.replaceAll("\\", "/");
    setArticle(article);
  }, []);

  const getArticle = useCallback(() => {
    getNewsArticlesById(id)
      .then((res) => {
        formatArticle(res);
      })
      .catch((err) => {
        toast.error(`Error getting article ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }, [id, formatArticle]);

  useEffect(() => {
    getArticle();
  }, [id, getArticle]);

  function setArticlePublished(publish) {
    setNewsArticlePublishedStatusById(article.id, publish)
      .then(() => {
        toast.success(`Article ${publish ? "published" : "unpublished"}.`);
        getArticle();
      })
      .catch((error) => {
        toast.error(
          `Error ${publish ? "publishing" : "unpublishing"} article. ${
            error.data.Exception
          }`,
          {
            autoClose: false,
          },
        );
      });
  }

  return (
    <div className="article-page">
      {!article ? (
        <LoadingMessage message={"Loading article."} />
      ) : (
        <>
          <h1 className="my-4 text-center text-primary text-4xl font-semibold">
            {article.title}
          </h1>
          {isAdmin && (
            <div className="admin-controls bg-backgroundOffset mt-4 shadow rounded">
              <div className="bg-backgroundOffset2 rounded-t-md">
                <p className="text-primary font-semibold text-lg px-2 py-1">
                  Admin controls
                </p>
              </div>
              <div className="px-2 py-2">
                <button
                  onClick={() => setArticlePublished(!article.published)}
                  className="bg-backgroundOffset2 text-primary font-semibold rounded py-2 px-4 hover:opacity-75 inline-block"
                >
                  {article.published ? "Unpublish" : "Publish"}
                </button>
              </div>
            </div>
          )}
          {currentUserId == article.author.id && (
            <div className="admin-controls bg-backgroundOffset mt-4 shadow rounded">
              <div className="bg-backgroundOffset2 rounded-t-md">
                <p className="text-primary font-semibold text-lg px-2 py-1">
                  Publisher controls
                </p>
              </div>
              <div className="px-2 py-2">
                <Link
                  to={`/news/${id}/edit`}
                  className="bg-backgroundOffset2 text-primary font-semibold rounded py-2 px-4 hover:opacity-75 inline-block"
                >
                  Edit article
                </Link>
                <button
                  onClick={() => setArticlePublished(!article.published)}
                  className="bg-backgroundOffset2 text-primary font-semibold rounded py-2 px-4 ml-2 hover:opacity-75 inline-block"
                >
                  {article.published ? "Unpublish" : "Publish"}
                </button>
              </div>
            </div>
          )}
          <div className="bg-backgroundOffset p-4 my-4 shadow rounded">
            <MDEditor.Markdown
              source={article.content}
              previewOptions={{
                rehypePlugins: [[rehypeSanitize]],
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default NewsArticle;
