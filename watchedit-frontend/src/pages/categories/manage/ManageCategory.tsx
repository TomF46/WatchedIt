import { useState } from "react";
import ManageCategoryForm from "../../../components/Categories/Manage/ManageCategoryForm";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import { Category, CategoryFormErrors } from "../../../types/Categories";

type Props = {
  category: Category;
  updateCategory: (category: Category) => void;
  triggerSave: () => void;
  saving: boolean;
};

function ManageCategory({
  category,
  updateCategory,
  triggerSave,
  saving,
}: Props) {
  const [errors, setErrors] = useState({} as CategoryFormErrors);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    updateCategory((prevCategory: Category) => ({
      ...prevCategory,
      [name]: value,
    }));
  }

  function formIsValid(): boolean {
    const { name } = category;
    const errors = {} as CategoryFormErrors;
    if (!name) errors.name = "Name is required";
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
    <div className="manage-category-page">
      {category ? (
        <ManageCategoryForm
          category={category}
          onChange={handleChange}
          onSave={handleSave}
          errors={errors}
          saving={saving}
        />
      ) : (
        <LoadingMessage message={"Loading category"} />
      )}
    </div>
  );
}

export default ManageCategory;
