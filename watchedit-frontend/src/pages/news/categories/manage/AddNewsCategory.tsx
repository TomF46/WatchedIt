import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { newCategory } from '../../../../tools/obJectShapes';
import ManageNewsCategory from './ManageNewsCategory';
import { useMutation } from '@tanstack/react-query';
import { NewsCategory } from '../../../../types/newsCategories';
import { saveNewsCategory } from '../../../../api/newsCategoriesApi';

function AddNewsCategory() {
  const navigate = useNavigate();
  const [category, setCategory] = useState({ ...newCategory });
  const [saving, setSaving] = useState(false);

  const addCategory = useMutation({
    mutationFn: (newCategory: NewsCategory) => {
      setSaving(true);
      return saveNewsCategory(newCategory);
    },
    onSuccess: (res) => {
      toast.success('Category saved');
      navigate(`/news/categories/${res.id}`);
    },
    onError: (err) => {
      setSaving(false);
      toast.error(`Error saving ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  function handleUpdate(updatedCategory: NewsCategory): void {
    setCategory(updatedCategory);
  }

  return (
    <div className='Add-news-category-page'>
      <ManageNewsCategory
        category={category}
        updateCategory={handleUpdate}
        triggerSave={() => addCategory.mutate(category)}
        saving={saving}
      ></ManageNewsCategory>
    </div>
  );
}

export default AddNewsCategory;
