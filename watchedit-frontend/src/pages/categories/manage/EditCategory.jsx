import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { newCategory } from "../../../tools/obJectShapes";
import ManageCategory from "./ManageCategory";
import { useQuery } from "@tanstack/react-query";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import { getCategoryById, saveCategory } from "../../../api/categoriesApi";

function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState({ ...newCategory });
  const [saving, setSaving] = useState(false);

  const { isLoading, error } = useQuery({
    queryKey: ["category-update", id],
    queryFn: () =>
      getCategoryById(id).then((res) => {
        setCategory({
          id: res.id,
          name: res.name,
        });
        return res;
      }),
  });

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

  if (isLoading) return <LoadingMessage message={"Loading category."} />;

  if (error) {
    toast.error(`Error getting category ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  return (
    <div className="Edit-category-page">
      <ManageCategory
        category={category}
        updateCategory={handleUpdate}
        triggerSave={handleSave}
        saving={saving}
      ></ManageCategory>
    </div>
  );
}

export default EditCategory;
