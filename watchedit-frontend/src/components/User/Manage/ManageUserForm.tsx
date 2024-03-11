import TextAreaInput from "../../Inputs/TextAreaInput";
import UserMiniDetail from "../UserMiniDetail";
import { EditableUser, UserFormErrors } from "../../../types/Auth";
import SubmitButtonWIcon from "../../Buttons/SubmitButtonWIcon";
import PersonIcon from "../../Icons/PersonIcon";
import ImageIcon from "../../Icons/ImageIcon";

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
    <form className="mt-4" onSubmit={onSave}>
      {errors.onSave && (
        <div className="text-red-500 text-xs p-1" role="alert">
          {errors.onSave}
        </div>
      )}

      <div className="controls bg-backgroundOffset mt-4 rounded-md shadow mb-4">
        <div className="bg-backgroundOffset2 rounded-t-md">
          <p className="text-primary font-semibold text-center text-2xl px-2 py-1">
            Update profile
          </p>
        </div>
        <div className="p-4">
          <div className="mb-2">
            <TextAreaInput
              name="biography"
              label="Biography"
              value={user.biography}
              onChange={onChange}
              error={errors.biography}
              required={false}
            />
          </div>

          <div className="mb-2">
            <label className="font-semibold text-xs text-primary">
              Profile image
            </label>
            <br></br>
            {user.imageUrl != null ? (
              <button
                type="button"
                onClick={() => onImageChange(null)}
                className="bg-red-400 text-white rounded py-2 px-4 hover:bg-red-500 shadow inline-flex items-center"
              >
                Remove image
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="bg-primary pointer text-white rounded py-2 px-4 hover:opacity-75 shadow inline-flex items-center"
                >
                  <ImageIcon color="white" height={6} width={6} />
                  <label className="pointer ml-1">
                    Add Image
                    <input
                      type="file"
                      name={`imageUrl`}
                      className=" border-gray-500 p-2 w-full hidden"
                      onChange={(e) => onImageChange(e)}
                    />
                  </label>
                </button>
                {errors.imageUrl && (
                  <div className="text-red-500 text-xs p-1 mt-2">
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
        <div className="mt-4">
          <p className="text-sm font-semibold text-primary">Preview</p>
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <UserMiniDetail user={user} />
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center bg-backgroundOffset p-4 my-4 shadow rounded">
        <SubmitButtonWIcon
          text={saving ? "Saving..." : "Save"}
          disabled={saving}
          icon={<PersonIcon color="white" height={5} width={5} />}
          bgColor="bg-primary"
        />
      </div>
    </form>
  );
};

export default ManageUserForm;
