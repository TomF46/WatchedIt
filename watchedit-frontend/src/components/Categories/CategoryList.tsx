import { useNavigate } from "react-router-dom";
import { Category } from "../../types/Categories";

const CategoryList = ({ categories }: { categories: Category[] }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-12">
      {categories.map((category) => {
        return (
          <div key={category.id} className="col-span-12 my-2">
            <div
              onClick={() => {
                navigate(`/categories/${category.id}`);
              }}
              className="p-4 mx-2 bg-backgroundOffset cursor-pointer"
            >
              <p>{category.name}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryList;
