import { useNavigate } from 'react-router-dom';
import { NewsCategory } from '../../../types/newsCategories';

const NewsCategoryList = ({ categories }: { categories: NewsCategory[] }) => {
  const navigate = useNavigate();
  return (
    <div className='grid grid-cols-12'>
      {categories.map((category) => {
        return (
          <div key={category.id} className='col-span-12 my-2'>
            <div
              onClick={() => {
                navigate(`/news/categories/${category.id}`);
              }}
              className='mx-2 cursor-pointer bg-backgroundOffset p-4'
            >
              <p>{category.name}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NewsCategoryList;
