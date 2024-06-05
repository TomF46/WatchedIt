import { Film } from '../../../types/Films';
import { EditableTrivia, TriviaFormErrors } from '../../../types/Trivia';
import SubmitButtonWIcon from '../../Buttons/SubmitButtonWIcon';
import TriviaIcon from '../../Icons/TriviaIcon';
import TextAreaInput from '../../Inputs/TextAreaInput';

type Props = {
  trivia: EditableTrivia;
  film: Film;
  errors: TriviaFormErrors;
  onSave: (event: React.SyntheticEvent) => void;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  saving: boolean;
};

const ManageTriviaForm = ({
  trivia,
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
            {trivia.id ? `Editing` : 'Adding'} trivia for {film.name}
          </p>
        </div>
        <div className='p-4'>
          <div className='mb-2'>
            <TextAreaInput
              name='text'
              label='Trivia text'
              value={trivia.text}
              onChange={onChange}
              error={errors.text}
              maxLength={1000}
              required={true}
            />
          </div>
        </div>
      </div>

      <div className='my-4 flex justify-center rounded bg-backgroundOffset p-4 shadow'>
        <SubmitButtonWIcon
          text={saving ? 'Saving...' : 'Save'}
          disabled={saving}
          icon={<TriviaIcon color='white' height={5} width={5} />}
          bgColor='bg-primary'
        />
      </div>
    </form>
  );
};

export default ManageTriviaForm;
