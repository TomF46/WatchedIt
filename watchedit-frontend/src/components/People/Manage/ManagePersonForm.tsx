import DatePicker from 'react-datepicker';
import TextInput from '../../Inputs/TextInput';
import TextAreaInput from '../../Inputs/TextAreaInput';
import PersonPreviewMini from './PersonPreviewMini';
import { EditablePerson, PersonFormErrors } from '../../../types/People';
import SubmitButtonWIcon from '../../Buttons/SubmitButtonWIcon';
import PersonIcon from '../../Icons/PersonIcon';
import ImageIcon from '../../Icons/ImageIcon';

type Props = {
  person: EditablePerson;
  errors: PersonFormErrors;
  onSave: (event: React.SyntheticEvent) => void;
  onChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  onDateChange: (date: Date | null) => void;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement> | null) => void;
  onUseDefaultImage: () => void;
  uploadingImage: boolean;
  saving: boolean;
};

const ManagePersonForm = ({
  person,
  onSave,
  onChange,
  onDateChange,
  onImageChange,
  onUseDefaultImage,
  saving = false,
  uploadingImage = false,
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
            {person.id
              ? `Editing ${person.firstName} ${person.lastName}`
              : 'Adding person'}
          </p>
        </div>
        <div className='p-4'>
          <div className='grid grid-cols-12'>
            <div className='col-span-12 mb-2 md:col-span-6 md:pr-2'>
              <TextInput
                name='firstName'
                label='First name'
                value={person.firstName}
                onChange={onChange}
                error={errors.firstName}
                required={true}
              />
            </div>
            <div className='col-span-12 mb-2 md:col-span-6 md:pl-2'>
              <TextInput
                name='lastName'
                label='Last name'
                value={person.lastName}
                onChange={onChange}
                error={errors.lastName}
                required={true}
              />
            </div>
            <div className='col-span-12 mb-2 md:col-span-6 md:pr-2'>
              <TextInput
                name='middleNames'
                label='Middle names'
                value={person.middleNames}
                onChange={onChange}
                error={errors.middleNames}
                required={false}
              />
            </div>
            <div className='col-span-12 mb-2 md:col-span-6 md:pl-2'>
              <TextInput
                name='stageName'
                label='Stage name'
                value={person.stageName}
                onChange={onChange}
                error={errors.stageName}
                required={false}
              />
            </div>
          </div>

          <div className='mb-2'>
            <TextAreaInput
              name='description'
              label='Description'
              value={person.description}
              onChange={onChange}
              error={errors.description}
              maxLength={800}
              required={true}
            />
          </div>

          <div className='mb-2'>
            <label className='text-xs font-semibold text-primary'>
              Date of birth
            </label>
            <DatePicker
              dateFormat='dd-MM-yyyy'
              selected={person.dateOfBirth}
              onChange={(date) => onDateChange(date)}
              className='rounded border border-gray-500 bg-backgroundOffset2 p-2 focus:border-primary focus:outline-none'
            />
            {errors.dateOfBirth && (
              <div className='mt-2 p-1 text-xs text-red-500'>
                {errors.dateOfBirth}
              </div>
            )}
          </div>

          <div className='mb-2'>
            <label className='text-xs font-semibold text-primary'>
              Headshot image
            </label>
            <br></br>
            {person.imageUrl != null ? (
              <button
                type='button'
                onClick={() => onImageChange(null)}
                className='inline-flex items-center rounded bg-red-400 px-4 py-2 text-white shadow hover:bg-red-500'
              >
                Remove image
              </button>
            ) : (
              <>
                <button
                  type='button'
                  className='pointer inline-flex items-center rounded bg-primary px-4 py-2 text-white shadow hover:opacity-75'
                >
                  <ImageIcon color='white' height={6} width={6} />

                  <label className='pointer ml-1'>
                    Add Image
                    <input
                      type='file'
                      name={`imageUrl`}
                      className=' hidden w-full border-gray-500 p-2'
                      onChange={(e) => onImageChange(e)}
                    />
                  </label>
                </button>
                <button
                  onClick={() => {
                    onUseDefaultImage();
                  }}
                  type='button'
                  className='pointer ml-2 inline-flex items-center rounded bg-primary px-4 py-2 text-white shadow hover:opacity-75'
                >
                  <PersonIcon
                    color='white'
                    height={6}
                    width={6}
                    strokeWidth={1.5}
                  />
                  <label className='pointer ml-1'>Use default</label>
                </button>
                {errors.imageUrl && (
                  <div className='mt-2 p-1 text-xs text-red-500'>
                    {errors.imageUrl}
                  </div>
                )}
              </>
            )}
            {!!uploadingImage && <p>Uploading...</p>}
          </div>
        </div>
      </div>

      {person.imageUrl != null && (
        <div className='mt-4'>
          <p className='text-sm font-semibold text-primary'>Preview</p>
          <PersonPreviewMini person={person} />
        </div>
      )}

      <div className='my-4 flex justify-center rounded bg-backgroundOffset p-4 shadow'>
        <SubmitButtonWIcon
          text={saving ? 'Saving...' : 'Save'}
          disabled={saving}
          icon={<PersonIcon color='white' height={5} width={5} />}
          bgColor='bg-primary'
        />
      </div>
    </form>
  );
};

export default ManagePersonForm;
