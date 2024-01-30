import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { newCategory } from "../../../tools/obJectShapes";
import ManageCategory from "./ManageCategory";
import { saveCategory } from "../../../api/categoriesApi";
import { useMutation } from "@tanstack/react-query";

function AddCategory() {
  const navigate = useNavigate();
  const [category, setCategory] = useState({ ...newCategory });
  const [saving, setSaving] = useState(false);

  const addCategory = useMutation({
    mutationFn: (newCategory) => {
      setSaving(true);
      return saveCategory(newCategory);
    },
    onSuccess: (res) => {
      toast.success("Category saved");
      navigate(`/categories/${res.id}`);
    },
    onError: (err) => {
      setSaving(false);
      toast.error(`Error saving ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  function handleUpdate(updatedCategory) {
    setCategory(updatedCategory);
  }

  return (
    <div className="Add-category-page">
      <ManageCategory
        category={category}
        updateCategory={handleUpdate}
        triggerSave={() => addCategory.mutate(category)}
        saving={saving}
      ></ManageCategory>
    </div>
  );
}

export default AddCategory;
