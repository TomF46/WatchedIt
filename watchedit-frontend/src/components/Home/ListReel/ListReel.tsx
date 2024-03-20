import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import LoadingMessage from '../../Loading/LoadingMessage';
import { getFilmListsPaginated } from '../../../api/filmListsApi';
import ListPreview from './ListPreview';
import { useQuery } from '@tanstack/react-query';
import { List } from '../../../types/Lists';
import ListIcon from '../../Icons/ListIcon';

function ListReel() {
  const page = 1;
  const listsPerPage = 8;

  const { isLoading, data, error } = useQuery({
    queryKey: ['lists', listsPerPage, page],
    queryFn: () =>
      getFilmListsPaginated(page, listsPerPage).then((res) => res.data),
  });

  if (isLoading) return <LoadingMessage message={'Loading lists.'} />;

  if (error) {
    toast.error(`Error getting lists ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  return (
    <div className='lists-reel'>
      <div className='mt-4'>
        <Link
          to={'/lists'}
          className='text-2xl font-semibold text-primary hover:opacity-75'
        >
          Lists
        </Link>
        {data.length > 0 ? (
          <div className='grid grid-cols-12'>
            {data.map((list: List) => {
              return <ListPreview key={list.id} list={list} />;
            })}
          </div>
        ) : (
          <div className='my-16'>
            <div className='flex justify-center text-center'>
              <ListIcon color='primary' height={14} width={14} />
            </div>
            <p className='text-center text-2xl'>No lists match your search</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListReel;
