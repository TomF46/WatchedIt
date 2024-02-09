import { Category, CategoryFormErrors } from "../../../types/Categories";
import TextInput from "../../Inputs/TextInput";

type Props = {
  category: Category;
  errors: CategoryFormErrors;
  onSave: (event: React.SyntheticEvent) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  saving: boolean;
};

const ManageCategoryForm = ({
  category,
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

      <div className="controls bg-backgroundOffset mt-4 rounded-md shadow mb-4">
        <div className="bg-backgroundOffset2 rounded-t-md">
          <p className="text-primary font-semibold text-center text-2xl px-2 py-1">
            {category.id ? `Editing category` : "Adding category"}
          </p>
        </div>
        <div className="p-4">
          <div className="mb-2">
            <TextInput
              name="name"
              label="Name"
              value={category.name}
              onChange={onChange}
              error={errors.name}
              required={true}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center bg-backgroundOffset p-4 my-4 shadow rounded">
        <button
          type="submit"
          disabled={saving}
          className="bg-primary  text-white rounded py-2 px-4 hover:opacity-75 inline-flex items-center"
        >
          <svg
            className="text-white h-5 w-5"
            strokeWidth={1.5}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 6h.008v.008H6V6z"
            />
          </svg>
          <span className="ml-1">{saving ? "Saving..." : "Save"}</span>
        </button>
      </div>
    </form>
  );
};

export default ManageCategoryForm;
