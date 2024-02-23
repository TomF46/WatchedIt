import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getCategories } from "../../api/categoriesApi";
import CategoryList from "../../components/Categories/CategoryList";
import LoadingMessage from "../../components/Loading/LoadingMessage";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../../redux/store";

function Categories() {
  const isAdmin = useAppSelector((state) => state.admin.isAdmin);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      getCategories().catch((error) => {
        toast.error(`Error getting categories ${error.data.Exception}`, {
          autoClose: false,
        });
        return error;
      }),
  });

  return (
    <div className="categories-page">
      {isAdmin && (
        <div className="admin-controls bg-backgroundOffset mt-4 rounded-md shadow">
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
