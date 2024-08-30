import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingMessage from '../../../components/Loading/LoadingMessage';
import { useQuery } from '@tanstack/react-query';
import useIsAdmin from '../../../hooks/useIsAdmin';
import { getNewsCategories } from '../../../api/newsCategoriesApi';
import NewsCategoryList from '../../../components/News/Categories/NewsCategoryList';

function NewsCategories() {
  const isAdmin = useIsAdmin();

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      getNewsCategories().catch((error) => {
        toast.error(`Error getting news categories ${error.data.Exception}`, {
          autoClose: false,
        });
        return error;
      }),
  });

  return (
    <div className='news-categories-page'>
      {isAdmin && (
        <div className='admin-controls mt-4 rounded-md bg-backgroundOffset shadow'>
          <div className='rounded-t-md bg-backgroundOffset2'>
            <p className='px-2 py-1 text-lg font-semibold text-primary'>
              Admin controls
            </p>
          </div>
          <div className='px-2 py-2'>
            <Link
              to={'/news/categories/add'}
              className='inline-block rounded bg-backgroundOffset2 px-4 py-2 font-semibold text-primary hover:opacity-75'
            >
              Add category
            </Link>
          </div>
        </div>
      )}
      {!categories ? (
        <LoadingMessage message={'Loading categories.'} />
      ) : (
        <div>
          <h1 className='my-4 text-center text-4xl font-semibold text-primary'>
            Categories
          </h1>
          <NewsCategoryList categories={categories} />
        </div>
      )}
    </div>
  );
}

export default NewsCategories;
