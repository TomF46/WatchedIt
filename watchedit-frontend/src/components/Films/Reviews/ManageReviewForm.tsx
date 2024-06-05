import RatingInput from '../../Inputs/RatingInput';
import TextAreaInput from '../../Inputs/TextAreaInput';
import { EditableReview, ReviewFormErrors } from '../../../types/Reviews';
import { Film } from '../../../types/Films';
import SubmitButtonWIcon from '../../Buttons/SubmitButtonWIcon';
import StarIcon from '../../Icons/StarIcon';

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
    <form className='mt-4' onSubmit={onSave}>
      {errors.onSave && (
        <div className='p-1 text-xs text-red-500' role='alert'>
          {errors.onSave}
        </div>
      )}

      <div className='controls mb-4 mt-4 rounded-md bg-backgroundOffset shadow'>
        <div className='rounded-t-md bg-backgroundOffset2'>
          <p className='px-2 py-1 text-center text-2xl font-semibold text-primary'>
            {review.id ? `Editing` : 'Adding'} review for {film.name}
          </p>
        </div>
        <div className='p-4'>
          <div className='mb-2'>
            <RatingInput
              name='rating'
              label='Rating'
              value={review.rating}
              onChange={onChange}
              error={errors.rating}
              required={true}
            />
          </div>
          <div className='mb-2'>
            <TextAreaInput
              name='text'
              label='Review text'
              value={review.text}
              onChange={onChange}
              error={errors.text}
              maxLength={8000}
              required={true}
            />
          </div>
        </div>
      </div>

      <div className='my-4 flex justify-center rounded bg-backgroundOffset p-4 shadow'>
        <SubmitButtonWIcon
          text={saving ? 'Saving...' : 'Save'}
          disabled={saving}
          icon={<StarIcon color='white' height={5} width={5} />}
          bgColor='bg-primary'
        />
      </div>
    </form>
  );
};

export default ManageReviewForm;
