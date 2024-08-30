import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { newArticle } from '../../tools/obJectShapes';
import { saveNewsArticle } from '../../api/newsApi';
import ManageNewsArticle from './ManageNewsArticle';
import { useMutation } from '@tanstack/react-query';
import {
  EditableNewsArticle,
  NewsArticleForRequest,
  SaveNewsArticleRequest,
} from '../../types/News';
import { SelectOption } from '../../components/Inputs/InputTypes';

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
      toast.success('Article saved');
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

  function handleSave(publish: boolean): void {
    const articleForRequest = { ...article } as NewsArticleForRequest;
    articleForRequest.categories = article.categories.map(
      (category: SelectOption) => category.id,
    );
    addArticle.mutate({ article: articleForRequest, publish: publish });
  }

  return (
    <div className='Add-article-page'>
      <ManageNewsArticle
        article={article}
        updateArticle={handleUpdate}
        triggerSave={(publish) => handleSave(publish)}
        saving={saving}
      ></ManageNewsArticle>
    </div>
  );
}

export default AddArticle;
