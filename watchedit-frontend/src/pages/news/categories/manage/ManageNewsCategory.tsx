import { useState } from 'react';
import LoadingMessage from '../../../../components/Loading/LoadingMessage';
import {
  NewsCategory,
  NewsCategoryFormErrors,
} from '../../../../types/newsCategories';
import ManageNewsCategoryForm from '../../../../components/News/Categories/Manage/ManageNewsCategoryForm';

type Props = {
  category: NewsCategory;
  updateCategory: (category: NewsCategory) => void;
  triggerSave: () => void;
  saving: boolean;
};

function ManageNewsCategory({
  category,
  updateCategory,
  triggerSave,
  saving,
}: Props) {
  const [errors, setErrors] = useState({} as NewsCategoryFormErrors);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    updateCategory((prevCategory: NewsCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  }

  function formIsValid(): boolean {
    const { name } = category;
    const errors = {} as NewsCategoryFormErrors;
    if (!name) errors.name = 'Name is required';
    if (name.length > 30)
      errors.name = "Name can't be longer than 30 characters.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event: React.SyntheticEvent): void {
    event.preventDefault();
    if (!formIsValid()) return;
    triggerSave();
  }

  return (
    <div className='manage-news-category-page'>
      {category ? (
        <ManageNewsCategoryForm
          category={category}
          onChange={handleChange}
          onSave={handleSave}
          errors={errors}
          saving={saving}
        />
      ) : (
        <LoadingMessage message={'Loading category'} />
      )}
    </div>
  );
}

export default ManageNewsCategory;
