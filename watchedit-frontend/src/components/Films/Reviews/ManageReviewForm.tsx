import RatingInput from "../../Inputs/RatingInput";
import TextAreaInput from "../../Inputs/TextAreaInput";
import { EditableReview, ReviewFormErrors } from "../../../types/Reviews";
import { Film } from "../../../types/Films";
import SubmitButtonWIcon from "../../Buttons/SubmitButtonWIcon";
import StarIcon from "../../Icons/StarIcon";

type Props = {
  review: EditableReview;
  film: Film;
  errors: ReviewFormErrors;
  onSave: (event: React.SyntheticEvent) => void;
  onChange: (
    event:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => void;
  saving: boolean;
};

const ManageReviewForm = ({
  review,
  film,
  onSave,
  onChange,
  saving = false,
  errors,
}: Props) => {
  return (
    <form className="mt-4" onSubmit={onSave}>
      {errors.onSave && (
        <div className="text-red-500 text-xs p-1" role="alert">
          {errors.onSave}
        </div>
      )}

      <div className="controls bg-backgroundOffset mt-4 rounded-md mb-4 shadow">
        <div className="bg-backgroundOffset2 rounded-t-md">
          <p className="text-primary font-semibold text-center text-2xl px-2 py-1">
            {review.id ? `Editing` : "Adding"} review for {film.name}
          </p>
        </div>
        <div className="p-4">
          <div className="mb-2">
            <RatingInput
              name="rating"
              label="Rating"
              value={review.rating}
              onChange={onChange}
              error={errors.rating}
              required={true}
            />
          </div>
          <div className="mb-2">
            <TextAreaInput
              name="text"
              label="Review text"
              value={review.text}
              onChange={onChange}
              error={errors.text}
              required={true}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center bg-backgroundOffset p-4 my-4 shadow rounded">
        <SubmitButtonWIcon
          text={saving ? "Saving..." : "Save"}
          disabled={saving}
          icon={<StarIcon color="white" height={5} width={5} />}
          bgColor="bg-primary"
        />
      </div>
    </form>
  );
};

export default ManageReviewForm;
