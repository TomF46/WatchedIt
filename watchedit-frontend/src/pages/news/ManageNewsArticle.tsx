import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import rehypeSanitize from 'rehype-sanitize';
import LoadingMessage from '../../components/Loading/LoadingMessage';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import TextInput from '../../components/Inputs/TextInput';
import { uploadImage } from '../../api/imageApi';
import NewsArticlePreview from '../../components/News/NewsArticlePreview';
import { useMutation } from '@tanstack/react-query';
import { EditableNewsArticle, NewsArticleFormErrors } from '../../types/News';
import ButtonWIcon from '../../components/Buttons/ButtonWIcon';
import NewsIcon from '../../components/Icons/NewsIcon';
import ImageIcon from '../../components/Icons/ImageIcon';

type Props = {
  article: EditableNewsArticle;
  updateArticle: (article: EditableNewsArticle) => void;
  triggerSave: (publish: boolean) => void;
  saving: boolean;
};

function ManageNewsArticle({
  article,
  updateArticle,
  triggerSave,
  saving,
}: Props) {
  const [errors, setErrors] = useState({} as NewsArticleFormErrors);
  const [imageUploading, setImageUploading] = useState(false);
  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState<string | undefined>(
    undefined,
  );

  const uploadThumbnail = useMutation({
    mutationFn: (file: File) => {
      setThumbnailUploading(true);
      return uploadImage(file, 'thumbnails');
    },
    onSuccess: (res) => {
      article.thumbnailUrl = res.url;
      updateArticle({ ...article });
      setThumbnailUploading(false);
    },
    onError: (err) => {
      setThumbnailUploading(false);
      toast.error(`Error uploading thumbnail ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  const uploadArticleImage = useMutation({
    mutationFn: (file: File) => {
      setImageUploading(true);
      return uploadImage(file, 'articles');
    },
    onSuccess: (res) => {
      setGeneratedUrl(res.url);
      setImageUploading(false);
    },
    onError: (err) => {
      setImageUploading(false);
      toast.error(`Error uploading image ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  function setContent(value: string): void {
    const formattedValue = value.replaceAll('\\', '/'); // Fixes formatting that md editor adds that breaks preview and article.
    updateArticle((prevState) => ({
      ...prevState,
      content: formattedValue,
    }));
  }

  function setTitle(event: React.ChangeEvent<HTMLInputElement>): void {
    updateArticle((prevState) => ({
      ...prevState,
      title: event.target.value,
    }));
  }

  function handleThumbnailChange(
    event: React.ChangeEvent<HTMLInputElement> | null,
  ): void {
    if (event == null || event.target.files == null) {
      article.thumbnailUrl = undefined;
      updateArticle({ ...article });
      return;
    }

    const file = event.target.files[0];
    uploadThumbnail.mutate(file);
  }

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>): void {
    if (!event.target.files) return;
    const file = event.target.files[0];
    uploadArticleImage.mutate(file);
  }

  function formIsValid(): boolean {
    const { title, content, thumbnailUrl } = article;
    const errors = {} as NewsArticleFormErrors;
    if (!title || title.length == 0) errors.title = 'Title is required';
    if (title.length > 80)
      errors.title = 'Title cant be longer than 80 characters';
    if (!content || title.length == 0) errors.content = 'Content is required';
    if (content.length > 8000)
      errors.content = 'Article content cant be longer than 8000 characters';
    if (!thumbnailUrl) errors.thumbnailUrl = 'Thumbnail is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(publish: boolean): void {
    if (!formIsValid()) return;
    triggerSave(publish);
  }

  return (
    <div className='news'>
      {!article ? (
        <LoadingMessage message={'Loading article.'} />
      ) : (
        <form className='mt-4'>
          {errors.onSave && (
            <div className='p-1 text-xs text-red-500' role='alert'>
              {errors.onSave}
            </div>
          )}
          <div className='controls mb-4 mt-4 rounded-md bg-backgroundOffset shadow'>
            <div className='rounded-t-md bg-backgroundOffset2'>
              <p className='px-2 py-1 text-center text-2xl font-semibold text-primary'>
                {article.id ? `Editing article` : 'Add article'}
              </p>
            </div>
            <div className='grid grid-cols-12 p-4'>
              <div className='col-span-12 mb-4'>
                <TextInput
                  name='title'
                  label='Title'
                  value={article.title}
                  onChange={setTitle}
                  error={errors.title}
                  required={true}
                />
              </div>
              <div className='col-span-12 mb-4'>
                <label className='text-xs font-semibold text-primary'>
                  Thumbnail image
                </label>
                <br></br>
                {article.thumbnailUrl != null ? (
                  <button
                    type='button'
                    onClick={() => handleThumbnailChange(null)}
                    className='inline-flex items-center rounded bg-red-400 px-4 py-2 text-white shadow hover:bg-red-500'
                  >
                    Remove image
                  </button>
                ) : (
                  <>
                    <button
                      type='button'
                      className='pointer inline-flex items-center rounded bg-primary px-4 py-2 text-white shadow hover:opacity-75'
                    >
                      <ImageIcon color='white' height={6} width={6} />
                      <label className='pointer ml-1'>
                        Add Image
                        <input
                          type='file'
                          name={`thumbnailUrl`}
                          className=' hidden w-full border-gray-500 p-2'
                          onChange={(e) => handleThumbnailChange(e)}
                        />
                      </label>
                    </button>
                    {errors.thumbnailUrl && (
                      <div className='mt-2 p-1 text-xs text-red-500'>
                        {errors.thumbnailUrl}
                      </div>
                    )}
                  </>
                )}
                {!!thumbnailUploading && <p>Uploading...</p>}
              </div>
              <div className='col-span-12'>
                <p className='mb-1 block text-xs font-semibold text-primary'>
                  Content
                </p>
                <p className='mb-1 block text-xs font-semibold'>
                  This uses a markdown editor to find out more view this{' '}
                  <Link
                    className='text-primary underline'
                    to={'https://www.markdownguide.org/'}
                  >
                    markdown guide
                  </Link>
                </p>
                <MDEditor
                  value={article.content}
                  onChange={(value) => setContent(value!)}
                  previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                  }}
                  preview='edit'
                  data-color-mode='dark'
                />
              </div>
              <div className='col-span-12 mt-4 rounded bg-backgroundOffset2 p-1'>
                <div className='flex items-center'>
                  <button
                    type='button'
                    className='pointer inline-flex items-center rounded bg-primary px-4 py-2 text-white shadow hover:opacity-75'
                  >
                    <label className='pointer ml-1'>
                      Generate URL for image
                      <input
                        type='file'
                        name={`imageUrl`}
                        className=' hidden w-full border-gray-400 p-2'
                        onChange={(e) => handleImageUpload(e)}
                      />
                    </label>
                  </button>
                  {!!imageUploading && <p className='ml-4'>Uploading...</p>}
                  {!!generatedUrl && <p className='ml-4'>{generatedUrl}</p>}
                </div>
              </div>
            </div>
          </div>
          <div className='my-4 flex justify-center rounded bg-backgroundOffset p-4 shadow'>
            {!article.published && (
              <ButtonWIcon
                text='Save'
                onClick={() => handleSave(false)}
                disabled={saving}
                icon={<NewsIcon color='white' height={5} width={5} />}
                bgColor='bg-primary'
                additionalClasses='mr-4'
              />
            )}
            <ButtonWIcon
              text='Save & Publish'
              onClick={() => handleSave(true)}
              disabled={saving}
              icon={<NewsIcon color='white' height={5} width={5} />}
              bgColor='bg-primary'
            />
          </div>
          <div className='mt-10'>
            <h2 className='mb-4 text-center text-xl'>Preview</h2>
            {article.thumbnailUrl && (
              <div className='grid grid-cols-20'>
                <NewsArticlePreview article={article} />
              </div>
            )}
            <div className='my-4 rounded bg-backgroundOffset p-4 shadow'>
              <MDEditor.Markdown
                source={article.content}
                rehypePlugins={[rehypeSanitize]}
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default ManageNewsArticle;
