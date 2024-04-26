import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getTags } from '../../api/tagsApi';
import LoadingMessage from '../../components/Loading/LoadingMessage';
import { useQuery } from '@tanstack/react-query';
import useIsAdmin from '../../hooks/useIsAdmin';
import TagList from '../../components/Tags/TagList';

function Tags() {
  const isAdmin = useIsAdmin();

  const { data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: () =>
      getTags().catch((error) => {
        toast.error(`Error getting tags ${error.data.Exception}`, {
          autoClose: false,
        });
        return error;
      }),
  });

  return (
    <div className='tags-page'>
      {isAdmin && (
        <div className='admin-controls mt-4 rounded-md bg-backgroundOffset shadow'>
          <div className='rounded-t-md bg-backgroundOffset2'>
            <p className='px-2 py-1 text-lg font-semibold text-primary'>
              Admin controls
            </p>
          </div>
          <div className='px-2 py-2'>
            <Link
              to={'/tags/add'}
              className='inline-block rounded bg-backgroundOffset2 px-4 py-2 font-semibold text-primary hover:opacity-75'
            >
              Add tag
            </Link>
          </div>
        </div>
      )}
      {!tags ? (
        <LoadingMessage message={'Loading tags.'} />
      ) : (
        <div>
          <h1 className='my-4 text-center text-4xl font-semibold text-primary'>
            Tags
          </h1>
          <TagList tags={tags} />
        </div>
      )}
    </div>
  );
}

export default Tags;
