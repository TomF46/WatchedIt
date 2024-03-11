import DatePicker from "react-datepicker";
import TextInput from "../../Inputs/TextInput";
import TextAreaInput from "../../Inputs/TextAreaInput";
import PersonPreviewMini from "./PersonPreviewMini";
import { EditablePerson, PersonFormErrors } from "../../../types/People";
import SubmitButtonWIcon from "../../Buttons/SubmitButtonWIcon";
import PersonIcon from "../../Icons/PersonIcon";
import ImageIcon from "../../Icons/ImageIcon";

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
    <form className="mt-4" onSubmit={onSave}>
      {errors.onSave && (
        <div className="text-red-500 text-xs p-1" role="alert">
          {errors.onSave}
        </div>
      )}

      <div className="controls bg-backgroundOffset mt-4 rounded-md shadow mb-4">
        <div className="bg-backgroundOffset2 rounded-t-md">
          <p className="text-primary font-semibold text-center text-2xl px-2 py-1">
            {person.id
              ? `Editing ${person.firstName} ${person.lastName}`
              : "Adding person"}
          </p>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-6 md:pr-2 mb-2">
              <TextInput
                name="firstName"
                label="First name"
                value={person.firstName}
                onChange={onChange}
                error={errors.firstName}
                required={true}
              />
            </div>
            <div className="col-span-12 md:col-span-6 md:pl-2 mb-2">
              <TextInput
                name="lastName"
                label="Last name"
                value={person.lastName}
                onChange={onChange}
                error={errors.lastName}
                required={true}
              />
            </div>
            <div className="col-span-12 md:col-span-6 md:pr-2 mb-2">
              <TextInput
                name="middleNames"
                label="Middle names"
                value={person.middleNames}
                onChange={onChange}
                error={errors.middleNames}
                required={false}
              />
            </div>
            <div className="col-span-12 md:col-span-6 md:pl-2 mb-2">
              <TextInput
                name="stageName"
                label="Stage name"
                value={person.stageName}
                onChange={onChange}
                error={errors.stageName}
                required={false}
              />
            </div>
          </div>

          <div className="mb-2">
            <TextAreaInput
              name="description"
              label="Description"
              value={person.description}
              onChange={onChange}
              error={errors.description}
              required={true}
            />
          </div>

          <div className="mb-2">
            <label className="font-semibold text-xs text-primary">
              Date of birth
            </label>
            <DatePicker
              dateFormat="dd-MM-yyyy"
              selected={person.dateOfBirth}
              onChange={(date) => onDateChange(date)}
              className="border border-gray-500 focus:outline-none focus:border-primary p-2 bg-backgroundOffset2 rounded"
            />
            {errors.dateOfBirth && (
              <div className="text-red-500 text-xs p-1 mt-2">
                {errors.dateOfBirth}
              </div>
            )}
          </div>

          <div className="mb-2">
            <label className="font-semibold text-xs text-primary">
              Headshot image
            </label>
            <br></br>
            {person.imageUrl != null ? (
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
                <button
                  onClick={() => {
                    onUseDefaultImage();
                  }}
                  type="button"
                  className="bg-primary pointer text-white rounded py-2 px-4 hover:opacity-75 shadow inline-flex items-center ml-2"
                >
                  <PersonIcon
                    color="white"
                    height={6}
                    width={6}
                    strokeWidth={1.5}
                  />
                  <label className="pointer ml-1">Use default</label>
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

      {person.imageUrl != null && (
        <div className="mt-4">
          <p className="text-sm font-semibold text-primary">Preview</p>
          <PersonPreviewMini person={person} />
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

export default ManagePersonForm;
