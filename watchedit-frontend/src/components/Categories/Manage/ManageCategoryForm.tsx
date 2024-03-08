import { Category, CategoryFormErrors } from "../../../types/Categories";
import SubmitButtonWIcon from "../../Buttons/SubmitButtonWIcon";
import TagIcon from "../../Icons/TagIcon";
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
        <SubmitButtonWIcon
          text={saving ? "Saving..." : "Save"}
          disabled={saving}
          icon={<TagIcon color="white" height={5} width={5} />}
          bgColor="bg-primary"
        />
      </div>
    </form>
  );
};

export default ManageCategoryForm;
