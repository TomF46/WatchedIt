import { useState } from "react";
import CommentForm from "./CommentForm";
import { format, parseISO } from "date-fns";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import { CommentFormErrors, Comment as CommentType } from "../../types/Reviews";
import EditIcon from "../Icons/EditIcon";
import DeleteIcon from "../Icons/DeleteIcon";

type Props = {
  comment: CommentType;
  onUpdateComment: (comment: CommentType) => Promise<CommentType>;
  onDeleteComment: (comment: CommentType) => void;
};

const Comment = ({ comment, onUpdateComment, onDeleteComment }: Props) => {
  const userId = useAppSelector((state) =>
    state.authentication.tokens ? state.authentication.tokens.id : null,
  );
  const navigate = useNavigate();
  const [updatedComment, setUpdatedComment] = useState(comment);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    const { name, value } = event.target;
    setUpdatedComment((prevComment) => ({
      ...prevComment,
      [name]: value,
    }));
  }

  function formIsValid(): boolean {
    const { text } = updatedComment;
    const errors = {} as CommentFormErrors;
    if (!text) errors.text = "Comment text is required";
    if (text.length > 600)
      errors.text = "Comment text cant be longer then 600 characters";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(event: React.SyntheticEvent): void {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    onUpdateComment(updatedComment)
      .then(() => {
        toast.success("Comment updated");
        setSaving(false);
        setEditing(false);
      })
      .catch((err) => {
        setSaving(false);
        toast.error(`Error updating comment ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }

  return (
    <div className="grid grid-cols-12 py-4 bg-backgroundOffset shadow rounded my-2">
      <div className="col-span-4 lg:col-span-2">
        <div className="flex flex-row">
          <div className="flex ml-2">
            <div className="flex flex-col">
              <div className="flex">
                <img
                  src={comment.user.imageUrl}
                  alt={`${comment.user.username} profile picture`}
                  className={`rounded-full w-10 h-10 cursor-pointer`}
                  onClick={() => {
                    navigate(`/profile/${comment.user.id}`);
                  }}
                />
              </div>
              <div
                className={`flex text-primary font-semibold cursor-pointer`}
                onClick={() => {
                  navigate(`/profile/${comment.user.id}`);
                }}
              >
                {comment.user.username}
              </div>
              <div className="flex text-xs">
                <p>
                  Posted:{" "}
                  {format(parseISO(comment.createdDate), "dd/MM/yyyy HH:mm")}
                </p>
              </div>
              {format(parseISO(comment.updatedDate), "dd/MM/yyyy HH:mm") !=
                format(parseISO(comment.createdDate), "dd/MM/yyyy HH:mm") && (
                <div className="flex text-xs">
                  <p>
                    Updated:{" "}
                    {format(parseISO(comment.updatedDate), "dd/MM/yyyy HH:mm")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-5 lg:col-span-8 px-4 border-primary border-l">
        {editing ? (
          <CommentForm
            comment={updatedComment}
            onChange={handleChange}
            onSubmit={handleSubmit}
            saving={saving}
            errors={errors}
            editing={true}
          />
        ) : (
          <p className="text-sm md:text-base">{comment.text}</p>
        )}
      </div>
      {comment.user.id == userId && (
        <div className="col-span-3 lg:col-span-2 px-4 border-primary border-l">
          <div className="grid grid-cols-12">
            <div className="col-span-6 md:col-span-12 justify-center md:justify-start">
              <div
                onClick={() => setEditing(!editing)}
                className="inline-flex items-center justify-center cursor-pointer"
              >
                <EditIcon
                  color={editing ? "red-400" : "primary"}
                  height={6}
                  width={6}
                />
                {editing && (
                  <span className="ml-1 text-red-400 font-semibold">
                    Cancel Editing
                  </span>
                )}
              </div>
            </div>
            <div className="col-span-6 md:col-span-12 justify-center md:justify-start">
              <div
                onClick={() => onDeleteComment(comment)}
                className="inline-flex items-center justify-center cursor-pointer"
              >
                <DeleteIcon color="red-400" height={6} width={6} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
