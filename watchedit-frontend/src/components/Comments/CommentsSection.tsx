import { useState } from "react";
import PaginationControls from "../PaginationControls";
import { newComment } from "../../tools/obJectShapes";
import CommentForm from "./CommentForm";
import { toast } from "react-toastify";
import { useAppSelector } from "../../redux/store";
import {
  Comment as CommentType,
  CommentFormErrors,
  CommentsPaginationResponse,
  EditableComment,
} from "../../types/Reviews";
import Comment from "./Comment";

type Props = {
  commentsPaginator: CommentsPaginationResponse;
  currentPage: number;
  onPageChange: (amount: number) => void;
  onAddComment: (comment: EditableComment) => Promise<CommentType>;
  onUpdateComment: (comment: CommentType) => Promise<CommentType>;
  onDeleteComment: (comment: CommentType) => void;
};

const CommentsSection = ({
  commentsPaginator,
  currentPage,
  onPageChange,
  onAddComment,
  onUpdateComment,
  onDeleteComment,
}: Props) => {
  const userIsAuthenticated = useAppSelector(
    (state) => state.authentication.tokens != null,
  );
  const [comment, setComment] = useState<EditableComment>({ ...newComment });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    const { name, value } = event.target;
    setComment((prevComment) => ({
      ...prevComment,
      [name]: value,
    }));
  }

  function formIsValid(): boolean {
    const { text } = comment;
    const errors = {} as CommentFormErrors;
    if (!text) errors.text = "Comment text is required";
    if (text!.length > 600)
      errors.text = "Comment text cant be longer then 600 characters";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(event: React.SyntheticEvent): void {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    onAddComment(comment)
      .then(() => {
        toast.success("Comment added");
        setSaving(false);
        setComment({ ...newComment });
      })
      .catch((err) => {
        setSaving(false);
        toast.error(`Error adding comment ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }

  return (
    <div>
      <h2 className="text-primary text-2xl text-center md:text-left my-4 md:my-0">
        Comments
      </h2>
      <div className="mt-2">
        {commentsPaginator.of > 0 ? (
          <div>
            {commentsPaginator.data.map((comment) => {
              return (
                <Comment
                  key={comment.id}
                  comment={comment}
                  onDeleteComment={onDeleteComment}
                  onUpdateComment={onUpdateComment}
                />
              );
            })}
            <PaginationControls
              currentPage={currentPage}
              onPageChange={onPageChange}
              of={commentsPaginator.of}
              from={commentsPaginator.from}
              to={commentsPaginator.to}
              lastPage={commentsPaginator.lastPage}
            />
          </div>
        ) : (
          <>
            <p className="my-4 text-xl">
              {`There are no comments, ${
                userIsAuthenticated
                  ? "why not add one below."
                  : "login to leave a comment."
              }`}
            </p>
          </>
        )}
        {userIsAuthenticated && (
          <CommentForm
            comment={comment}
            onChange={handleChange}
            onSubmit={handleSubmit}
            errors={errors}
            saving={saving}
            editing={false}
          />
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
