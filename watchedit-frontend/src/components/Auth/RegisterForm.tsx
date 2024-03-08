import EmailInput from "../Inputs/EmailInput";
import PasswordInput from "../Inputs/PasswordInput";
import { Registration, RegistrationErrors } from "../../types/Auth";
import TextInput from "../Inputs/TextInput";
import SubmitButtonWIcon from "../Buttons/SubmitButtonWIcon";
import PersonIcon from "../Icons/PersonIcon";

type Props = {
  user: Registration;
  errors: RegistrationErrors;
  onSave: (event: React.SyntheticEvent) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  saving: boolean;
};

const RegisterForm = ({
  user,
  onSave,
  onChange,
  saving = false,
  errors,
}: Props) => {
  return (
    <form className="" onSubmit={onSave}>
      {errors.onSave && (
        <div className="text-red-500 text-xs p-1" role="alert">
          {errors.onSave}
        </div>
      )}

      <div className="mb-2">
        <TextInput
          name="username"
          label="Username"
          value={user.username}
          onChange={onChange}
          error={errors.username}
          required={true}
        />
      </div>
      <div className="mb-2">
        <EmailInput
          name="email"
          label="Email"
          value={user.email}
          onChange={onChange}
          error={errors.email}
          showLabel={true}
        />
      </div>
      <div className="mb-2">
        <PasswordInput
          name="password"
          label="Password"
          value={user.password}
          onChange={onChange}
          error={errors.password}
          showLabel={true}
        />
      </div>
      <div className="mb-4">
        <PasswordInput
          name="password_confirmation"
          label="Password confirmation"
          value={user.password_confirmation}
          onChange={onChange}
          error={errors.password_confirmation}
          showLabel={true}
        />
      </div>

      <div className="flex justify-center mt-4">
        <SubmitButtonWIcon
          text={saving ? "Registering..." : "Register"}
          disabled={saving}
          icon={<PersonIcon />}
          bgColor="bg-primary"
        />
      </div>
    </form>
  );
};

export default RegisterForm;
