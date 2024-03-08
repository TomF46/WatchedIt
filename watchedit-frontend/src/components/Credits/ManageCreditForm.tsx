import SelectInput from "../Inputs/SelectInput";
import TextInput from "../Inputs/TextInput";
import { CreditFormErrors, EditableCredit } from "../../types/Credits";
import SubmitButtonWIcon from "../Buttons/SubmitButtonWIcon";
import PersonIcon from "../Icons/PersonIcon";

type Props = {
  credit: EditableCredit;
  errors: CreditFormErrors;
  onChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => void;
  onSubmit: (event: React.SyntheticEvent) => void;
  saving: boolean;
};

const ManageCreditForm = ({
  credit,
  onChange,
  errors,
  onSubmit,
  saving,
}: Props) => {
  const roleTypes = [
    { id: "Cast", name: "Cast" },
    { id: "Crew", name: "Crew" },
  ];

  return (
    <form className="mt-4" onSubmit={onSubmit}>
      {errors.onSave && (
        <div className="text-red-500 text-xs p-1" role="alert">
          {errors.onSave}
        </div>
      )}

      <div className="controls bg-backgroundOffset mt-4 rounded-md shadow mb-4">
        <div className="bg-backgroundOffset2 rounded-t-md">
          <p className="text-primary font-semibold text-center text-2xl px-2 py-1">
            Credit
          </p>
        </div>
        <div className="p-4">
          <div className="mb-2">
            <TextInput
              name="role"
              label="Role"
              value={credit.role}
              onChange={onChange}
              error={errors.role}
              required={true}
            />
          </div>

          <div className="mb-2">
            <SelectInput
              name="type"
              label="Role type"
              defaultText="Type"
              value={credit.type}
              options={roleTypes}
              onChange={onChange}
              error={errors.type}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center bg-backgroundOffset p-4 my-4 shadow rounded">
        <SubmitButtonWIcon
          text={saving ? "Saving.." : "Save"}
          disabled={saving}
          icon={<PersonIcon />}
          bgColor="bg-primary"
        />
      </div>
    </form>
  );
};

export default ManageCreditForm;
