import { Link, useParams } from 'react-router-dom';
import { getTagById } from '../../api/tagsApi';
import LoadingMessage from '../../components/Loading/LoadingMessage';
import { useQuery } from '@tanstack/react-query';
import ErrorMessage from '../../components/Error/ErrorMessage';
import useIsAdmin from '../../hooks/useIsAdmin';

function Tag() {
  const { id } = useParams();
  const isAdmin = useIsAdmin();

  const { data: tag, error: tagLoadError } = useQuery({
    queryKey: ['tag', id],
    queryFn: () => getTagById(Number(id)),
  });

  if (tagLoadError) {
    return (
      <ErrorMessage
        message={'Error loading tag'}
        error={tagLoadError.data.Exception}
      />
    );
  }

  return (
    <div className='tag-page'>
      {!tag ? (
        <LoadingMessage message={'Loading tag'} />
      ) : (
        <div>
          <h1 className='my-4 text-center text-4xl font-semibold text-primary'>
            {tag.name}
          </h1>
          {isAdmin && (
            <div className='admin-controls mt-4 rounded bg-backgroundOffset shadow'>
              <div className='rounded-t-md bg-backgroundOffset2'>
                <p className='px-2 py-1 text-lg font-semibold text-primary'>
                  Admin controls
                </p>
              </div>
              <div className='px-2 py-2'>
                <Link
                  to={`/tags/${id}/edit`}
                  className='inline-block rounded bg-backgroundOffset2 px-4 py-2 font-semibold text-primary hover:opacity-75'
                >
                  Edit tag
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Tag;
