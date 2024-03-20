import TextAreaInput from '../../Inputs/TextAreaInput';
import UserMiniDetail from '../UserMiniDetail';
import { EditableUser, UserFormErrors } from '../../../types/Auth';
import SubmitButtonWIcon from '../../Buttons/SubmitButtonWIcon';
import PersonIcon from '../../Icons/PersonIcon';
import ImageIcon from '../../Icons/ImageIcon';

type Props = {
  user: EditableUser;
  errors: UserFormErrors;
  onSave: (event: React.SyntheticEvent) => void;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement> | null) => void;
  uploadingImage: boolean;
  saving: boolean;
};

const ManageUserForm = ({
  user,
  onSave,
  onChange,
  onImageChange,
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
            Update profile
          </p>
        </div>
        <div className='p-4'>
          <div className='mb-2'>
            <TextAreaInput
              name='biography'
              label='Biography'
              value={user.biography}
              onChange={onChange}
              error={errors.biography}
              required={false}
            />
          </div>

          <div className='mb-2'>
            <label className='text-xs font-semibold text-primary'>
              Profile image
            </label>
            <br></br>
            {user.imageUrl != null ? (
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

      {user.imageUrl != null && (
        <div className='mt-4'>
          <p className='text-sm font-semibold text-primary'>Preview</p>
          <div className='grid grid-cols-12'>
            <div className='col-span-12 md:col-span-6 lg:col-span-4'>
              <UserMiniDetail user={user} />
            </div>
          </div>
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

export default ManageUserForm;
