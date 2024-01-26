import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { newArticle } from "../../tools/obJectShapes";
import { saveNewsArticle } from "../../api/newsApi";
import ManageNewsArticle from "./ManageNewsArticle";

function AddArticle() {
  const navigate = useNavigate();
  const [article, setArticle] = useState({ ...newArticle });
  const [saving, setSaving] = useState(false);

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

  return (
    <div className="Add-article-page">
      <ManageNewsArticle
        article={article}
        updateArticle={handleUpdate}
        triggerSave={handleSave}
        saving={saving}
      ></ManageNewsArticle>
    </div>
  );
}

export default AddArticle;
