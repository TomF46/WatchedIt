import { Tag, TagFormErrors } from '../../../types/Tags';
import SubmitButtonWIcon from '../../Buttons/SubmitButtonWIcon';
import TagIcon from '../../Icons/TagIcon';
import SelectInput from '../../Inputs/SelectInput';
import TextInput from '../../Inputs/TextInput';

type Props = {
  tag: Tag;
  errors: TagFormErrors;
  onSave: (event: React.SyntheticEvent) => void;
  onChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => void;
  saving: boolean;
};

const ManageTagForm = ({
  tag,
  onSave,
  onChange,
  saving = false,
  errors,
}: Props) => {
  const types = [
    { id: 1, name: 'Recommended' },
    { id: 2, name: 'Age rating' },
    { id: 3, name: 'Language' },
  ];
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
            {tag.id ? `Editing tag` : 'Adding tag'}
          </p>
        </div>
        <div className='p-4'>
          <div className='mb-2'>
            <TextInput
              name='name'
              label='Name'
              value={tag.name}
              onChange={onChange}
              error={errors.name}
              required={true}
            />
          </div>
          <div className='mb-2'>
            <SelectInput
              name='type'
              label='Tag type'
              value={tag.type}
              options={types}
              onChange={onChange}
              error={errors.type}
            />
          </div>
        </div>
      </div>

      <div className='my-4 flex justify-center rounded bg-backgroundOffset p-4 shadow'>
        <SubmitButtonWIcon
          text={saving ? 'Saving...' : 'Save'}
          disabled={saving}
          icon={<TagIcon color='white' height={5} width={5} />}
          bgColor='bg-primary'
        />
      </div>
    </form>
  );
};

export default ManageTagForm;
