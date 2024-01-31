import MDEditor from "@uiw/react-md-editor";
import PropTypes from "prop-types";
import { useState } from "react";
import rehypeSanitize from "rehype-sanitize";
import LoadingMessage from "../../components/Loading/LoadingMessage";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import TextInput from "../../components/Inputs/TextInput";
import { uploadImage } from "../../api/imageApi";
import NewsArticlePreview from "../../components/News/NewsArticlePreview";
import { useMutation } from "@tanstack/react-query";

function ManageNewsArticle({ article, updateArticle, triggerSave, saving }) {
  const [errors, setErrors] = useState({});
  const [imageUploading, setImageUploading] = useState(false);
  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState(null);

  const uploadThumbnail = useMutation({
    mutationFn: (file) => {
      setThumbnailUploading(true);
      return uploadImage(file, "thumbnails");
    },
    onSuccess: (res) => {
      article.thumbnailUrl = res.url;
      updateArticle({ ...article });
      setThumbnailUploading(false);
    },
    onError: (err) => {
      setThumbnailUploading(false);
      toast.error(`Error uploading thumbnail ${err.message}`, {
        autoClose: false,
      });
    },
  });

  const uploadArticleImage = useMutation({
    mutationFn: (file) => {
      setImageUploading(true);
      return uploadImage(file, "articles");
    },
    onSuccess: (res) => {
      setGeneratedUrl(res.url);
      setImageUploading(false);
    },
    onError: (err) => {
      setImageUploading(false);
      toast.error(`Error uploading image ${err.message}`, {
        autoClose: false,
      });
    },
  });

  function setContent(value) {
    let formattedValue = value.replaceAll("\\", "/"); // Fixes formatting that md editor adds that breaks preview and article.
    updateArticle((prevState) => ({
      ...prevState,
      content: formattedValue,
    }));
  }

  function setTitle(event) {
    updateArticle((prevState) => ({
      ...prevState,
      title: event.target.value,
    }));
  }

  function handleThumbnailChange(event) {
    if (event == null) {
      article.thumbnailUrl = null;
      updateArticle({ ...article });
      return;
    }

    let file = event.target.files[0];
    uploadThumbnail.mutate(file);
  }

  function handleImageUpload(event) {
    let file = event.target.files[0];
    uploadArticleImage.mutate(file);
  }

  function formIsValid() {
    const { title, content, thumbnailUrl } = article;
    const errors = {};
    if (!title || title.length == 0) errors.title = "Title is required";
    if (title.length > 80)
      errors.title = "Title cant be longer than 80 characters";
    if (!content || title.length == 0) errors.content = "Content is required";
    if (content.length > 8000)
      errors.content = "Article content cant be longer than 8000 characters";
    if (!thumbnailUrl) errors.imageUrl = "Thumbnail is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(publish) {
    event.preventDefault();
    if (!formIsValid()) return;
    triggerSave(publish);
  }

  return (
    <div className="news">
      {!article ? (
        <LoadingMessage message={"Loading article."} />
      ) : (
        <form className="mt-4">
          {errors.onSave && (
            <div className="text-red-500 text-xs p-1" role="alert">
              {errors.onSave}
            </div>
          )}
          <div className="controls bg-backgroundOffset mt-4 rounded-md mb-4 shadow">
            <div className="bg-backgroundOffset2 rounded-t-md">
              <p className="text-primary font-semibold text-center text-2xl px-2 py-1">
                {article.id ? `Editing article` : "Add article"}
              </p>
            </div>
            <div className="grid grid-cols-12 p-4">
              <div className="col-span-12 mb-4">
                <TextInput
                  name="title"
                  label="Title"
                  value={article.title}
                  onChange={setTitle}
                  error={errors.title}
                  required={true}
                />
              </div>
              <div className="col-span-12 mb-4">
                <label className="font-semibold text-xs text-primary">
                  Headshot image
                </label>
                <br></br>
                {article.thumbnailUrl != null ? (
                  <button
                    type="button"
                    onClick={() => handleThumbnailChange(null)}
                    className="bg-red-400 text-white rounded py-2 px-4 hover:bg-red-500 shadow inline-flex items-center"
                  >
                    Remove image
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className="bg-primary pointer text-white rounded py-2 px-4 hover:opacity-75 shadow inline-flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                      </svg>

                      <label className="pointer ml-1">
                        Add Image
                        <input
                          type="file"
                          name={`imageUrl`}
                          className=" border-gray-500 p-2 w-full hidden"
                          onChange={(e) => handleThumbnailChange(e)}
                        />
                      </label>
                    </button>
                    {errors.imageUrl && (
                      <div className="text-red-500 text-xs p-1 mt-2">
                        {errors.imageUrl}
                      </div>
                    )}
                  </>
                )}
                {!!thumbnailUploading && <p>Uploading...</p>}
              </div>
              <div className="col-span-12">
                <p className="block mb-1 font-semibold text-xs text-primary">
                  Content
                </p>
                <p className="block mb-1 font-semibold text-xs">
                  This uses a markdown editor to find out more view this{" "}
                  <Link
                    className="text-primary underline"
                    to={"https://www.markdownguide.org/"}
                  >
                    markdown guide
                  </Link>
                </p>
                <MDEditor
                  value={article.content}
                  onChange={setContent}
                  previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                  }}
                  preview="edit"
                  data-color-mode="dark"
                />
              </div>
              <div className="col-span-12 mt-4 bg-backgroundOffset2 p-1 rounded">
                <div className="flex items-center">
                  <button
                    type="button"
                    className="bg-primary pointer text-white rounded py-2 px-4 hover:opacity-75 shadow inline-flex items-center"
                  >
                    <label className="pointer ml-1">
                      Generate URL for image
                      <input
                        type="file"
                        name={`posterUrl`}
                        className=" border-gray-400 p-2 w-full hidden"
                        onChange={(e) => handleImageUpload(e)}
                      />
                    </label>
                  </button>
                  {!!imageUploading && <p className="ml-4">Uploading...</p>}
                  {!!generatedUrl && <p className="ml-4">{generatedUrl}</p>}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center bg-backgroundOffset p-4 my-4 shadow rounded">
            {!article.publish && (
              <button
                onClick={() => handleSave(false)}
                disabled={saving}
                className="bg-primary  text-white rounded py-2 px-4 hover:opacity-75 inline-flex items-center mr-4"
              >
                Save
              </button>
            )}
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="bg-primary  text-white rounded py-2 px-4 hover:opacity-75 inline-flex items-center"
            >
              Save & Publish
            </button>
          </div>
          <div className="mt-10">
            <h2 className="text-xl text-center mb-4">Preview</h2>
            {article.thumbnailUrl && (
              <div className="grid grid-cols-20">
                <NewsArticlePreview article={article} />
              </div>
            )}
            <div className="bg-backgroundOffset p-4 my-4 shadow rounded">
              <MDEditor.Markdown
                source={article.content}
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]],
                }}
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

ManageNewsArticle.propTypes = {
  article: PropTypes.object.isRequired,
  updateArticle: PropTypes.func.isRequired,
  triggerSave: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default ManageNewsArticle;
