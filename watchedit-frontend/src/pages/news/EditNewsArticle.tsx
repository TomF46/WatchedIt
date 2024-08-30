import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { newArticle } from '../../tools/obJectShapes';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getNewsArticlesById, saveNewsArticle } from '../../api/newsApi';
import ManageNewsArticle from './ManageNewsArticle';
import LoadingMessage from '../../components/Loading/LoadingMessage';
import ErrorMessage from '../../components/Error/ErrorMessage';
import {
  EditableNewsArticle,
  NewsArticleForRequest,
  SaveNewsArticleRequest,
} from '../../types/News';
import { NewsCategory } from '../../types/newsCategories';
import { SelectOption } from '../../components/Inputs/InputTypes';

function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<EditableNewsArticle>({
    ...newArticle,
  });
  const [saving, setSaving] = useState(false);

  const { isLoading, error } = useQuery({
    queryKey: ['article-update', id],
    queryFn: () =>
      getNewsArticlesById(Number(id), false).then((res) => {
        setArticle({
          id: res.id,
          title: res.title,
          content: res.content,
          thumbnailUrl: res.thumbnailUrl,
          published: res.published,
          readCount: res.readCount,
          categories: convertCategoriesToSelectOption(res.categories),
        });
        return res;
      }),
  });

  function convertCategoriesToSelectOption(
    categories: NewsCategory[],
  ): SelectOption[] {
    return categories.map((c) => c as SelectOption);
  }

  const editArticle = useMutation({
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
    editArticle.mutate({ article: articleForRequest, publish: publish });
  }

  if (isLoading) return <LoadingMessage message={'Loading article.'} />;

  if (error) {
    return (
      <ErrorMessage
        message={'Error loading news article for editing.'}
        error={error.data.Exception}
      />
    );
  }

  return (
    <div className='Edit-article-page'>
      <ManageNewsArticle
        article={article}
        updateArticle={handleUpdate}
        triggerSave={(publish) => handleSave(publish)}
        saving={saving}
      ></ManageNewsArticle>
    </div>
  );
}

export default EditArticle;
