import PropTypes from "prop-types";
import { useState } from "react";
import ManageReviewForm from "../../../components/Films/Reviews/ManageReviewForm";
import LoadingMessage from "../../../components/Loading/LoadingMessage";

function ManageReview({ film, review, updateReview, triggerSave, saving }) {
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    if (name == "rating" && (value < 0 || value > 10)) return;
    updateReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  }

  function formIsValid() {
    const { rating, text } = review;
    const errors = {};
    if (!rating) errors.rating = "Rating is required";
    if (rating < 0 || rating > 10)
      errors.rating = "Rating must be between 0 and 10";
    if (!text) errors.text = "Review text is required";
    if (text.length > 8000)
      errors.text = "Review text cant be longer than 8000 characters";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    triggerSave();
  }

  return (
    <div className="manage-film-review-page">
      {film && review ? (
        <>
          <ManageReviewForm
            review={review}
            film={film}
            onChange={handleChange}
            onSave={handleSave}
            errors={errors}
            saving={saving}
          />
        </>
      ) : (
        <LoadingMessage message={"Loading form."} />
      )}
    </div>
  );
}

ManageReview.propTypes = {
  film: PropTypes.object.isRequired,
  review: PropTypes.object.isRequired,
  updateReview: PropTypes.func.isRequired,
  triggerSave: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default ManageReview;
