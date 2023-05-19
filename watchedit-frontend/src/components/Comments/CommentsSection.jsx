import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PaginationControls from "../PaginationControls";
import { newComment } from "../../tools/obJectShapes";
import CommentForm from "./CommentForm";
import { toast } from "react-toastify";
import Comment from "./Comment";

const CommentsSection = ({userIsAuthenticated, commentsPaginator, currentPage, onPageChange, onAddComment, onUpdateComment, onDeleteComment}) => {
    const [comment, setComment] = useState({ ...newComment });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setComment(prevComment => ({
            ...prevComment,
            [name]: value
        }));
    }

    function formIsValid(){
        const { text } = comment;
        const errors = {};
        if(!text) errors.text = "Comment text is required";
        if(text.length > 600) errors.name = "Comment text cant be longer then 600 characters";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSubmit(){
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        onAddComment(comment).then(res => {
            toast.success("Comment added");
            setSaving(false);
            setComment({ ...newComment });
        }).catch(err => {
            setSaving(false);
            toast.error(`Error adding comment ${err.message}`, {
                autoClose: false
            });
        });
    }

    function handleNextPage() {
        var newPage = page + 1;
        onPageChange(newPage);
    }

    function handlePreviousPage() {
        var newPage = page - 1;
        onPageChange(newPage);
    }

    return (
        <div>
            <h2 className="text-primary text-2xl text-center md:text-left my-4 md:my-0">Comments</h2>
            <div className="mt-2">
                {commentsPaginator.of > 0 ? (
                    <div>
                        {commentsPaginator.data.map((comment) => {
                            return (
                                <Comment key={comment.id} comment={comment} onDeleteComment={onDeleteComment} onUpdateComment={onUpdateComment}  />
                            )
                        })}
                        <PaginationControls
                            currentPage={currentPage}
                            onNext={handleNextPage}
                            onPrevious={handlePreviousPage}
                            of={commentsPaginator.of}
                            from={commentsPaginator.from}
                            to={commentsPaginator.to}
                            lastPage={commentsPaginator.lastPage}
                        />
                    </div>
                ) : (
                    <>
                        <p className="my-4 text-xl">
                            {`There are no comments, ${userIsAuthenticated ? "why not add one below." : "login to leave a comment." }`}
                        </p>
                    </>
                )}
                {userIsAuthenticated && (
                    <CommentForm comment={comment} onChange={handleChange} onSubmit={handleSubmit} errors={errors} saving={saving}  />
                )}
            </div>
        </div>
    )
};

CommentsSection.propTypes = {
    userIsAuthenticated: PropTypes.bool.isRequired,
    commentsPaginator: PropTypes.object.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onAddComment: PropTypes.func.isRequired,
    onUpdateComment: PropTypes.func.isRequired,
    onDeleteComment: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        userIsAuthenticated: state.tokens != null
    };
};

export default connect(mapStateToProps)(CommentsSection);

