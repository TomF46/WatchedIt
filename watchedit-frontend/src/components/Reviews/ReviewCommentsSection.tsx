import { useState } from 'react';
import { toast } from 'react-toastify';
import LoadingMessage from '../Loading/LoadingMessage';
import {
  addReviewComment,
  deleteReviewComment,
  getReviewComments,
  updateReviewComment,
} from '../../api/filmReviewApi';
import CommentsSection from '../Comments/CommentsSection';
import { confirmAlert } from 'react-confirm-alert';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { Comment, EditableComment, Review } from '../../types/Reviews';

function ReviewCommentsSection({ review }: { review: Review }) {
  const [page, setPage] = useState(1);
  const commentsPerPage = 20;

  const {
    isLoading,
    data: comments,
    error,
    refetch,
  } = useQuery({
    queryKey: ['review-comments', review.id, page, commentsPerPage],
    queryFn: () => getReviewComments(Number(review.id), page, commentsPerPage),
    placeholderData: keepPreviousData,
  });

  const deleteComment = useMutation({
    mutationFn: (commentToRemove: Comment) =>
      deleteReviewComment(Number(review.id), commentToRemove),
    onSuccess: () => {
      toast.success('Comment removed');
      refetch();
    },
    onError: (err) => {
      toast.error(`Error removing comment ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  function handleAddComment(comment: EditableComment): Promise<Comment> {
    return new Promise((resolve, reject) => {
      addReviewComment(Number(review.id), comment)
        .then((res) => {
          refetch();
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function handleUpdateComment(comment: Comment): Promise<Comment> {
    return new Promise((resolve, reject) => {
      updateReviewComment(Number(review.id), comment)
        .then((res) => {
          refetch();
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function handleDeleteComment(comment: Comment) {
    confirmAlert({
      title: 'Confirm deletion',
      message: `Are you sure you want to remove this comment?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteComment.mutate(comment),
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  }

  if (isLoading) return <LoadingMessage message={'Loading latest comments.'} />;

  if (error) {
    toast.error(`Error getting comments for review ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  if (comments)
    return (
      <div className='review-comments-section'>
        <div className='mt-4'>
          <CommentsSection
            commentsPaginator={comments}
            currentPage={page}
            onAddComment={handleAddComment}
            onDeleteComment={handleDeleteComment}
            onPageChange={setPage}
            onUpdateComment={handleUpdateComment}
          />
        </div>
      </div>
    );
}

export default ReviewCommentsSection;
