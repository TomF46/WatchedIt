import TextInput from '../../Inputs/TextInput';
import TextAreaInput from '../../Inputs/TextAreaInput';
import { EditableList, ListFormErrors } from '../../../types/Lists';
import SubmitButtonWIcon from '../../Buttons/SubmitButtonWIcon';
import ListIcon from '../../Icons/ListIcon';

type Props = {
  list: EditableList;
  errors: ListFormErrors;
  onSave: (event: React.SyntheticEvent) => void;
  onChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  saving: boolean;
};

const ManageListForm = ({
  list,
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
            {list.id ? `Editing ${list.name}` : 'Adding list'}
          </p>
        </div>
        <div className='p-4'>
          <div className='mb-2'>
            <TextInput
              name='name'
              label='Name'
              value={list.name}
              onChange={onChange}
              error={errors.name}
              required={true}
            />
          </div>
          <div className='mb-2'>
            <TextAreaInput
              name='description'
              label='Description'
              value={list.description}
              onChange={onChange}
              error={errors.description}
              required={true}
            />
          </div>
        </div>
      </div>

      <div className='my-4 flex justify-center rounded bg-backgroundOffset p-4 shadow'>
        <SubmitButtonWIcon
          text={saving ? 'Saving...' : 'Save'}
          disabled={saving}
          icon={<ListIcon color='white' height={5} width={5} />}
          bgColor='bg-primary'
        />
      </div>
    </form>
  );
};

export default ManageListForm;
