import DatePicker from "react-datepicker";
import TextInput from "../../Inputs/TextInput";
import TextAreaInput from "../../Inputs/TextAreaInput";
import PersonPreviewMini from "./PersonPreviewMini";
import { EditablePerson, PersonFormErrors } from "../../../types/People";

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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>

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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
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
        <button
          type="submit"
          disabled={saving}
          className="bg-primary  text-white rounded py-2 px-4 hover:opacity-75 inline-flex items-center"
        >
          <svg
            className="text-white h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span>{saving ? "Saving..." : "Save"}</span>
        </button>
      </div>
    </form>
  );
};

export default ManagePersonForm;
