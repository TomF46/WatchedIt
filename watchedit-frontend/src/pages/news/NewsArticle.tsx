import MDEditor from "@uiw/react-md-editor";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getNewsArticlesById,
  setNewsArticlePublishedStatusById,
} from "../../api/newsApi";
import { toast } from "react-toastify";
import LoadingMessage from "../../components/Loading/LoadingMessage";
import rehypeSanitize from "rehype-sanitize";
import { useMutation, useQuery } from "@tanstack/react-query";
import ErrorMessage from "../../components/Error/ErrorMessage";

function NewsArticle() {
  const { id } = useParams();
  const isAdmin = useSelector((state) => state.isAdmin);
  const currentUserId = useSelector((state) =>
    state.tokens ? state.tokens.id : null,
  );

  const {
    isLoading,
    data: article,
    error,
    refetch,
  } = useQuery({
    queryKey: ["article", id],
    queryFn: () =>
      getNewsArticlesById(id).then((res) => {
        res.content = res.content.replaceAll("\\", "/");
        return res;
      }),
  });

  const setArticlePublished = useMutation({
    mutationFn: (publish) => {
      return setNewsArticlePublishedStatusById(article.id, publish);
    },
    onSuccess: (res) => {
      toast.success(`Article ${res.publish ? "published" : "unpublished"}.`);
      refetch();
    },
    onError: (err) => {
      toast.error(`Error updating article. ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  if (isLoading) return <LoadingMessage message={"Loading article."} />;

  if (error) {
    return (
      <ErrorMessage message={"Error loading news article."} error={error} />
    );
  }

  return (
    <div className="article-page">
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
              onClick={() => {
                setArticlePublished.mutate(!article.published);
              }}
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
              onClick={() => setArticlePublished.mutate(!article.published)}
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
    </div>
  );
}

export default NewsArticle;
