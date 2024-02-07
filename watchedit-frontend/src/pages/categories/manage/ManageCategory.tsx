import PropTypes from "prop-types";
import { useState } from "react";
import ManageCategoryForm from "../../../components/Categories/Manage/ManageCategoryForm";
import LoadingMessage from "../../../components/Loading/LoadingMessage";

function ManageCategory({ category, updateCategory, triggerSave, saving }) {
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    updateCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  }

  function formIsValid() {
    const { name } = category;
    const errors = {};
    if (!name) errors.name = "Name is required";
    if (name.length > 30)
      errors.name = "Name can't be longer than 30 characters.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
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

ManageCategory.propTypes = {
  category: PropTypes.object.isRequired,
  updateCategory: PropTypes.func.isRequired,
  triggerSave: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default ManageCategory;
