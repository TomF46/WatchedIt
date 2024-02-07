import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { newArticle } from "../../tools/obJectShapes";
import { saveNewsArticle } from "../../api/newsApi";
import ManageNewsArticle from "./ManageNewsArticle";
import { useMutation } from "@tanstack/react-query";

function AddArticle() {
  const navigate = useNavigate();
  const [article, setArticle] = useState({ ...newArticle });
  const [saving, setSaving] = useState(false);

  const addArticle = useMutation({
    mutationFn: (newArticle, publish) => {
      setSaving(true);
      return saveNewsArticle(newArticle, publish);
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

  return (
    <div className="Add-article-page">
      <ManageNewsArticle
        article={article}
        updateArticle={handleUpdate}
        triggerSave={(publish) => {
          addArticle.mutate(article, publish);
        }}
        saving={saving}
      ></ManageNewsArticle>
    </div>
  );
}

export default AddArticle;
