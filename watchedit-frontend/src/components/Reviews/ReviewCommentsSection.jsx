import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import LoadingMessage from "../Loading/LoadingMessage";
import { addReviewComment, deleteReviewComment, getReviewComments, updateReviewComment} from "../../api/filmReviewApi";
import CommentsSection from "../Comments/CommentsSection";
import { confirmAlert } from "react-confirm-alert";

function ReviewCommentsSection({review}) {
    const [comments, setComments] = useState(null);
    const [page, setPage] = useState(1);
    const commentsPerPage = 3;
    const [lastPageLoaded, setLastPageLoaded] = useState(null);


    useEffect(() => {
        if (!comments) {
            getComments();
        }
    }, [review]);

    useEffect(() => {
        if (lastPageLoaded != null) getComments();
    }, [page]);


    function getComments() {
        getReviewComments(review.id, page, commentsPerPage)
            .then((res) => {
               setComments(res);
               setLastPageLoaded(page);
            })
            .catch((err) => {
                toast.error(`Error getting comments for review ${err.data.Exception}`, {
                    autoClose: false,
                });
            });
    }

    function handleAddComment(comment){
        return new Promise((resolve, reject) => {
            addReviewComment(review.id, comment).then(res => {
                getComments();
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    }

    function handleUpdateComment(comment){
        return new Promise((resolve, reject) => {
            updateReviewComment(review.id, comment).then(res => {
                getComments();
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    }

    function handleDeleteComment(comment){
        confirmAlert({
            title : "Confirm deletion",
            message: `Are you sure you want to remove this comment?`,
            buttons: [
                {
                  label: 'Yes',
                  onClick: () => deleteComment(comment)
                },
                {
                  label: 'No',
                  onClick: () => {}
                }
            ]
        })
    }

    function deleteComment(comment){
        deleteReviewComment(review.id, comment).then(() => {
            toast.success("Comment removed");
            getComments();
        }).catch((err) => {
            toast.error(`Error removing comment ${err.data.Exception}`, {
                autoClose: false,
            });
        });
    }

    function handlePageChange(newPage) {
        setPage(newPage);
    }

    return (
        <div className="review-comments-section">
            {!comments ? (
                <LoadingMessage message={"Loading latest comments"} />
            ) : (
                <div className="mt-4">
                    <CommentsSection commentsPaginator={comments} currentPage={page} onAddComment={handleAddComment} onDeleteComment={handleDeleteComment} onPageChange={handlePageChange} onUpdateComment={handleUpdateComment} />
                </div>
            )}
        </div>
    );
}

ReviewCommentsSection.propTypes = {
    review: PropTypes.object.isRequired,
};

export default ReviewCommentsSection;

