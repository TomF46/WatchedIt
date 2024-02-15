import { useState } from "react";
import ManageReviewForm from "../../../components/Films/Reviews/ManageReviewForm";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import { Film } from "../../../types/Films";
import { EditableReview, ReviewFormErrors } from "../../../types/Reviews";

type Props = {
  film: Film;
  review: EditableReview;
  updateReview: (review: EditableReview) => void;
  triggerSave: () => void;
  saving: boolean;
};

function ManageReview({
  film,
  review,
  updateReview,
  triggerSave,
  saving,
}: Props) {
  const [errors, setErrors] = useState({} as ReviewFormErrors);

  function handleChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ): void {
    const { name, value } = event.target;
    if (name == "rating" && (Number(value) < 0 || Number(value) > 10)) return;

    updateReview((prevReview: EditableReview) => ({
      ...prevReview,
      [name]: value,
    }));
  }

  function formIsValid(): boolean {
    const { rating, text } = review;
    const errors = {} as ReviewFormErrors;
    if (!rating) errors.rating = "Rating is required";
    if (rating! < 0 || rating! > 10)
      errors.rating = "Rating must be between 0 and 10";
    if (!text) errors.text = "Review text is required";
    if (text.length > 8000)
      errors.text = "Review text cant be longer than 8000 characters";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event: React.SyntheticEvent): void {
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

export default ManageReview;
