import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { newArticle } from "../../tools/obJectShapes";
import { saveNewsArticle } from "../../api/newsApi";
import ManageNewsArticle from "./ManageNewsArticle";
import { useMutation } from "@tanstack/react-query";
import { EditableNewsArticle, SaveNewsArticleRequest } from "../../types/News";

function AddArticle() {
  const navigate = useNavigate();
  const [article, setArticle] = useState<EditableNewsArticle>({
    ...newArticle,
  });
  const [saving, setSaving] = useState(false);

  const addArticle = useMutation({
    mutationFn: (request: SaveNewsArticleRequest) => {
      setSaving(true);
      return saveNewsArticle(request.article, request.publish);
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

  function handleUpdate(updatedArticle: EditableNewsArticle): void {
    setArticle(updatedArticle);
  }

  return (
    <div className="Add-article-page">
      <ManageNewsArticle
        article={article}
        updateArticle={handleUpdate}
        triggerSave={(publish) => {
          addArticle.mutate({ article: article, publish: publish });
        }}
        saving={saving}
      ></ManageNewsArticle>
    </div>
  );
}

export default AddArticle;
