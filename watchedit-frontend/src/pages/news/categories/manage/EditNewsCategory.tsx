import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { newCategory } from '../../../../tools/obJectShapes';
import ManageNewsCategory from './ManageNewsCategory';
import { useMutation, useQuery } from '@tanstack/react-query';
import LoadingMessage from '../../../../components/Loading/LoadingMessage';
import {
  getNewsCategoryById,
  saveNewsCategory,
} from '../../../../api/newsCategoriesApi';
import ErrorMessage from '../../../../components/Error/ErrorMessage';
import { NewsCategory } from '../../../../types/newsCategories';

function EditNewsCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState({ ...newCategory } as NewsCategory);
  const [saving, setSaving] = useState(false);

  const editCategory = useMutation({
    mutationFn: (updatedCategory: NewsCategory) => {
      setSaving(true);
      return saveNewsCategory(updatedCategory);
    },
    onSuccess: (res) => {
      toast.success('Category saved');
      navigate(`/categories/${res.id}`);
    },
    onError: (err) => {
      setSaving(false);
      toast.error(`Error saving ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  const { isLoading, error } = useQuery({
    queryKey: ['news-category-update', id],
    queryFn: () =>
      getNewsCategoryById(Number(id)).then((res) => {
        setCategory({
          id: res.id,
          name: res.name,
        });
        return res;
      }),
  });

  function handleUpdate(updatedCategory: NewsCategory): void {
    setCategory(updatedCategory);
  }

  if (isLoading) return <LoadingMessage message={'Loading category.'} />;

  if (error) {
    return (
      <ErrorMessage
        message={'Error loading category for editing.'}
        error={error.data.Exception}
      />
    );
  }

  return (
    <div className='Edit-category-page'>
      <ManageNewsCategory
        category={category}
        updateCategory={handleUpdate}
        triggerSave={() => editCategory.mutate(category)}
        saving={saving}
      ></ManageNewsCategory>
    </div>
  );
}

export default EditNewsCategory;
