import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { newCategory } from "../../../tools/obJectShapes";
import ManageCategory from "./ManageCategory";
import { saveCategory } from "../../../api/categoriesApi";

function AddCategory() {
  const navigate = useNavigate();
  const [category, setCategory] = useState({ ...newCategory });
  const [saving, setSaving] = useState(false);

  function handleUpdate(updatedCategory) {
    setCategory(updatedCategory);
  }

  function handleSave() {
    setSaving(true);
    saveCategory(category)
      .then((res) => {
        toast.success("Category saved");
        navigate(`/categories/${res.id}`);
      })
      .catch((err) => {
        setSaving(false);
        toast.error(`Error saving ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }

  return (
    <div className="Add-category-page">
      <ManageCategory
        category={category}
        updateCategory={handleUpdate}
        triggerSave={handleSave}
        saving={saving}
      ></ManageCategory>
    </div>
  );
}

export default AddCategory;
