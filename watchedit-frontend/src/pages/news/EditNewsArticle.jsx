import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { newArticle } from "../../tools/obJectShapes";
import { useQuery } from "@tanstack/react-query";
import { getNewsArticlesById, saveNewsArticle } from "../../api/newsApi";
import ManageNewsArticle from "./ManageNewsArticle";
import LoadingMessage from "../../components/Loading/LoadingMessage";

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

  function handleUpdate(updatedArticle) {
    setArticle(updatedArticle);
  }

  function handleSave(publish) {
    setSaving(true);
    saveNewsArticle(article, publish)
      .then((res) => {
        toast.success("Article saved");
        navigate(`/news/${res.id}`);
      })
      .catch((err) => {
        setSaving(false);
        toast.error(`Error saving ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }

  if (isLoading) return <LoadingMessage message={"Loading article."} />;

  if (error) {
    toast.error(`Error getting article ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  return (
    <div className="Edit-article-page">
      <ManageNewsArticle
        article={article}
        updateArticle={handleUpdate}
        triggerSave={handleSave}
        saving={saving}
      ></ManageNewsArticle>
    </div>
  );
}

export default EditArticle;
