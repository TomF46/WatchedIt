import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import LoadingMessage from "../Loading/LoadingMessage";
import {
  addReviewComment,
  deleteReviewComment,
  getReviewComments,
  updateReviewComment,
} from "../../api/filmReviewApi";
import CommentsSection from "../Comments/CommentsSection";
import { confirmAlert } from "react-confirm-alert";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

function ReviewCommentsSection({ review }) {
  const [page, setPage] = useState(1);
  const commentsPerPage = 20;

  const {
    isLoading,
    data: comments,
    error,
    refetch,
  } = useQuery({
    queryKey: ["review-comments", review.id.page, commentsPerPage],
    queryFn: () => getReviewComments(review.id, page, commentsPerPage),
    placeholderData: keepPreviousData,
  });

  function handleAddComment(comment) {
    return new Promise((resolve, reject) => {
      addReviewComment(review.id, comment)
        .then((res) => {
          refetch();
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function handleUpdateComment(comment) {
    return new Promise((resolve, reject) => {
      updateReviewComment(review.id, comment)
        .then((res) => {
          refetch();
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function handleDeleteComment(comment) {
    confirmAlert({
      title: "Confirm deletion",
      message: `Are you sure you want to remove this comment?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteComment(comment),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  }

  function deleteComment(comment) {
    deleteReviewComment(review.id, comment)
      .then(() => {
        toast.success("Comment removed");
        refetch();
      })
      .catch((err) => {
        toast.error(`Error removing comment ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }

  if (isLoading) return <LoadingMessage message={"Loading latest comments."} />;

  if (error) {
    toast.error(`Error getting comments for review ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  return (
    <div className="review-comments-section">
      <div className="mt-4">
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

ReviewCommentsSection.propTypes = {
  review: PropTypes.object.isRequired,
};

export default ReviewCommentsSection;
