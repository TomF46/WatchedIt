import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import rehypeSanitize from "rehype-sanitize";
import LoadingMessage from "../../components/Loading/LoadingMessage";
import { Link, useNavigate, useParams } from "react-router-dom";
import { newArticle } from "../../tools/obJectShapes";
import { toast } from "react-toastify";
import { getNewsArticlesById, saveNewsArticle } from "../../api/newsApi";
import TextInput from "../../components/Inputs/TextInput";
import { uploadImage } from "../../api/imageApi";

function ManageNewsArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({ ...newArticle });
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [imageUploading, setImageUploading] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState(null);

  useEffect(() => {
    if (id) {
      getNewsArticlesById(id)
        .then((data) => {
          mapForEditing(data);
          setEditing(true);
        })
        .catch((error) => {
          toast.error(`Error fetching article ${error.message}`, {
            autoClose: false,
          });
        });
    } else {
      setArticle({ ...newArticle });
    }
  }, [id]);

  function mapForEditing(data) {
    setArticle({
      id: data.id,
      title: data.title,
      content: data.content,
      publish: data.published,
    });
  }

  function setContent(value) {
    let formattedValue = value.replaceAll("\\", "/"); // Fixes formatting that md editor adds that breaks preview and article.
    setArticle((prevState) => ({
      ...prevState,
      content: formattedValue,
    }));
  }

  function setTitle(event) {
    setArticle((prevState) => ({
      ...prevState,
      title: event.target.value,
    }));
  }

  function handleImageUpload(event) {
    let file = event.target.files[0];
    setImageUploading(true);
    uploadImage(file, "articles")
      .then((res) => {
        console.log(res.url);
        setGeneratedUrl(res.url);
        setImageUploading(false);
      })
      .catch((error) => {
        setImageUploading(false);
        toast.error(`Error uploading image ${error.message}`, {
          autoClose: false,
        });
      });
  }

  function formIsValid() {
    const { title, content } = article;
    const errors = {};
    if (!title || title.length == 0) errors.title = "Title is required";
    if (title.length > 80)
      errors.title = "Title cant be longer than 80 characters";
    if (!content || title.length == 0) errors.content = "Content is required";
    if (content.length > 8000)
      errors.content = "Article content cant be longer than 8000 characters";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(publish) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);

    if (!article.publish) {
      setArticle((prevState) => ({
        ...prevState,
        publish: publish,
      }));
    }

    saveNewsArticle(article)
      .then((res) => {
        toast.success("Article saved");
        navigate(`/news/${res.id}`);
      })
      .catch((err) => {
        setSaving(false);
        toast.error(`Error saving ${err.data.Exception}`, {
          autoClose: false,
        });
      });
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
              <p className="text-primary font-bold text-center text-2xl px-2 py-1">
                {editing ? `Editing article` : "Add article"}
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
              <div className="col-span-12">
                <p className="block mb-1 font-bold text-xs text-primary">
                  Content
                </p>
                <p className="block mb-1 font-bold text-xs">
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
              onClick={() => handleSave(false)}
              disabled={saving}
              className="bg-primary  text-white rounded py-2 px-4 hover:opacity-75 inline-flex items-center"
            >
              Save & Publish
            </button>
          </div>
          <div className="mt-10">
            <h2 className="text-xl text-center mb-4">Preview</h2>
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

export default ManageNewsArticle;
