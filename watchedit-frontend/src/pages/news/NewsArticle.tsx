import MDEditor from '@uiw/react-md-editor';
import { Link, useParams } from 'react-router-dom';
import {
  getNewsArticlesById,
  setNewsArticlePublishedStatusById,
} from '../../api/newsApi';
import { toast } from 'react-toastify';
import LoadingMessage from '../../components/Loading/LoadingMessage';
import rehypeSanitize from 'rehype-sanitize';
import { useMutation, useQuery } from '@tanstack/react-query';
import ErrorMessage from '../../components/Error/ErrorMessage';
import { useAppSelector } from '../../redux/store';

function NewsArticle() {
  const { id } = useParams();
  const isAdmin = useAppSelector((state) => state.admin.isAdmin);
  const currentUserId = useAppSelector((state) =>
    state.authentication.tokens ? state.authentication.tokens.id : null,
  );

  const {
    isLoading,
    data: article,
    error,
    refetch,
  } = useQuery({
    queryKey: ['article', id],
    queryFn: () =>
      getNewsArticlesById(Number(id)).then((res) => {
        res.content = res.content.replaceAll('\\', '/');
        return res;
      }),
  });

  const setArticlePublished = useMutation({
    mutationFn: (publish: boolean) => {
      return setNewsArticlePublishedStatusById(Number(article!.id), publish);
    },
    onSuccess: (res) => {
      toast.success(`Article ${res.published ? 'published' : 'unpublished'}.`);
      refetch();
    },
    onError: (err) => {
      toast.error(`Error updating article. ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  if (isLoading) return <LoadingMessage message={'Loading article.'} />;

  if (error) {
    return (
      <ErrorMessage
        message={'Error loading news article.'}
        error={error.data.Exception}
      />
    );
  }

  if (article)
    return (
      <div className='article-page'>
        <h1 className='my-4 text-center text-4xl font-semibold text-primary'>
          {article.title}
        </h1>
        {isAdmin && (
          <div className='admin-controls mt-4 rounded bg-backgroundOffset shadow'>
            <div className='rounded-t-md bg-backgroundOffset2'>
              <p className='px-2 py-1 text-lg font-semibold text-primary'>
                Admin controls
              </p>
            </div>
            <div className='px-2 py-2'>
              <button
                onClick={() => {
                  setArticlePublished.mutate(!article.published);
                }}
                className='inline-block rounded bg-backgroundOffset2 px-4 py-2 font-semibold text-primary hover:opacity-75'
              >
                {article.published ? 'Unpublish' : 'Publish'}
              </button>
            </div>
          </div>
        )}
        {currentUserId == article.author.id && (
          <div className='admin-controls mt-4 rounded bg-backgroundOffset shadow'>
            <div className='rounded-t-md bg-backgroundOffset2'>
              <p className='px-2 py-1 text-lg font-semibold text-primary'>
                Publisher controls
              </p>
            </div>
            <div className='px-2 py-2'>
              <Link
                to={`/news/${id}/edit`}
                className='inline-block rounded bg-backgroundOffset2 px-4 py-2 font-semibold text-primary hover:opacity-75'
              >
                Edit article
              </Link>
              <button
                onClick={() => setArticlePublished.mutate(!article.published)}
                className='ml-2 inline-block rounded bg-backgroundOffset2 px-4 py-2 font-semibold text-primary hover:opacity-75'
              >
                {article.published ? 'Unpublish' : 'Publish'}
              </button>
            </div>
          </div>
        )}
        <div className='my-4 rounded bg-backgroundOffset p-4 shadow'>
          <MDEditor.Markdown
            source={article.content}
            rehypePlugins={[rehypeSanitize]}
          />
        </div>
      </div>
    );
}

export default NewsArticle;
