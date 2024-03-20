import { useState } from 'react';
import CommentForm from './CommentForm';
import { format, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { CommentFormErrors, Comment as CommentType } from '../../types/Reviews';
import EditIcon from '../Icons/EditIcon';
import DeleteIcon from '../Icons/DeleteIcon';
import useCurrentUserId from '../../hooks/useCurrentUserId';

type Props = {
  comment: CommentType;
  onUpdateComment: (comment: CommentType) => Promise<CommentType>;
  onDeleteComment: (comment: CommentType) => void;
};

const Comment = ({ comment, onUpdateComment, onDeleteComment }: Props) => {
  const userId = useCurrentUserId();
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
    if (!text) errors.text = 'Comment text is required';
    if (text.length > 600)
      errors.text = 'Comment text cant be longer then 600 characters';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(event: React.SyntheticEvent): void {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    onUpdateComment(updatedComment)
      .then(() => {
        toast.success('Comment updated');
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
    <div className='my-2 grid grid-cols-12 rounded bg-backgroundOffset py-4 shadow'>
      <div className='col-span-4 lg:col-span-2'>
        <div className='flex flex-row'>
          <div className='ml-2 flex'>
            <div className='flex flex-col'>
              <div className='flex'>
                <img
                  src={comment.user.imageUrl}
                  alt={`${comment.user.username} profile picture`}
                  className={`h-10 w-10 cursor-pointer rounded-full`}
                  onClick={() => {
                    navigate(`/profile/${comment.user.id}`);
                  }}
                />
              </div>
              <div
                className={`flex cursor-pointer font-semibold text-primary`}
                onClick={() => {
                  navigate(`/profile/${comment.user.id}`);
                }}
              >
                {comment.user.username}
              </div>
              <div className='flex text-xs'>
                <p>
                  Posted:{' '}
                  {format(parseISO(comment.createdDate), 'dd/MM/yyyy HH:mm')}
                </p>
              </div>
              {format(parseISO(comment.updatedDate), 'dd/MM/yyyy HH:mm') !=
                format(parseISO(comment.createdDate), 'dd/MM/yyyy HH:mm') && (
                <div className='flex text-xs'>
                  <p>
                    Updated:{' '}
                    {format(parseISO(comment.updatedDate), 'dd/MM/yyyy HH:mm')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-5 border-l border-primary px-4 lg:col-span-8'>
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
          <p className='text-sm md:text-base'>{comment.text}</p>
        )}
      </div>
      {comment.user.id == userId && (
        <div className='col-span-3 border-l border-primary px-4 lg:col-span-2'>
          <div className='grid grid-cols-12'>
            <div className='col-span-6 justify-center md:col-span-12 md:justify-start'>
              <div
                onClick={() => setEditing(!editing)}
                className='inline-flex cursor-pointer items-center justify-center'
              >
                <EditIcon
                  color={editing ? 'red-400' : 'primary'}
                  height={6}
                  width={6}
                />
                {editing && (
                  <span className='ml-1 font-semibold text-red-400'>
                    Cancel Editing
                  </span>
                )}
              </div>
            </div>
            <div className='col-span-6 justify-center md:col-span-12 md:justify-start'>
              <div
                onClick={() => onDeleteComment(comment)}
                className='inline-flex cursor-pointer items-center justify-center'
              >
                <DeleteIcon color='red-400' height={6} width={6} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
