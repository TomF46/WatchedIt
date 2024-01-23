import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getCategories } from "../../api/categoriesApi";
import CategoryList from "../../components/Categories/CategoryList";
import LoadingMessage from "../../components/Loading/LoadingMessage";

function Categories() {
  const isAdmin = useSelector((state) => state.isAdmin);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    if (!categories) {
      getCategoriesData();
    }
  }, [categories]);

  function getCategoriesData() {
    getCategories()
      .then((res) => {
        setCategories(res);
      })
      .catch((err) => {
        toast.error(`Error getting categories ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }

  return (
    <div className="categories-page">
      {isAdmin && (
        <div className="admin-controls bg-backgroundOffset mt-4 rounded-md shadow rounded">
          <div className="bg-backgroundOffset2 rounded-t-md">
            <p className="text-primary font-semibold text-lg px-2 py-1">
              Admin controls
            </p>
          </div>
          <div className="px-2 py-2">
            <Link
              to={"/categories/add"}
              className="bg-backgroundOffset2 text-primary font-semibold rounded py-2 px-4 hover:opacity-75 inline-block"
            >
              Add category
            </Link>
          </div>
        </div>
      )}
      {!categories ? (
        <LoadingMessage message={"Loading categories."} />
      ) : (
        <div>
          <h1 className="text-center text-primary text-4xl my-4 font-semibold">
            Categories
          </h1>
          <CategoryList categories={categories} />
        </div>
      )}
    </div>
  );
}

export default Categories;
