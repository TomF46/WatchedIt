import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { newArticle } from "../../tools/obJectShapes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getNewsArticlesById, saveNewsArticle } from "../../api/newsApi";
import ManageNewsArticle from "./ManageNewsArticle";
import LoadingMessage from "../../components/Loading/LoadingMessage";
import ErrorMessage from "../../components/Error/ErrorMessage";

function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({ ...newArticle });
  const [saving, setSaving] = useState(false);

  const { isLoading, error } = useQuery({
    queryKey: ["article-update", id],
    queryFn: () =>
      getNewsArticlesById(id).then((res) => {
        setArticle({
          id: res.id,
          title: res.title,
          content: res.content,
          thumbnailUrl: res.thumbnailUrl,
          publish: res.published,
        });
        return res;
      }),
  });

  const editArticle = useMutation({
    mutationFn: (updatedArticle, publish) => {
      setSaving(true);
      return saveNewsArticle(updatedArticle, publish);
    },
    onSuccess: (res) => {
      toast.success("Article saved");
      navigate(`/news/${res.id}`);
    },
    onError: (err) => {
      setSaving(false);
      toast.error(`Error saving article ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  function handleUpdate(updatedArticle) {
    setArticle(updatedArticle);
  }

  if (isLoading) return <LoadingMessage message={"Loading article."} />;

  if (error) {
    return (
      <ErrorMessage
        message={"Error loading news article for editing."}
        error={error}
      />
    );
  }

  return (
    <div className="Edit-article-page">
      <ManageNewsArticle
        article={article}
        updateArticle={handleUpdate}
        triggerSave={(publish) => {
          editArticle.mutate(article, publish);
        }}
        saving={saving}
      ></ManageNewsArticle>
    </div>
  );
}

export default EditArticle;
