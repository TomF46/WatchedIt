import EmailInput from '../Inputs/EmailInput';
import PasswordInput from '../Inputs/PasswordInput';
import { LoginCredentials, LoginErrors } from '../../types/Auth';
import SubmitButtonWIcon from '../Buttons/SubmitButtonWIcon';
import EnterIcon from '../Icons/EnterIcon';

type Props = {
  user: LoginCredentials;
  errors: LoginErrors;
  onSave: (event: React.SyntheticEvent) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  saving: boolean;
};

const LoginForm = ({
  user,
  onSave,
  onChange,
  saving = false,
  errors,
}: Props) => {
  return (
    <form className='' onSubmit={onSave}>
      {errors.onSave && (
        <div className='p-1 text-xs text-red-500' role='alert'>
          {errors.onSave}
        </div>
      )}
      <div className='mb-2'>
        <EmailInput
          name='email'
          label='Email'
          value={user.email}
          onChange={onChange}
          error={errors.email}
          showLabel={true}
        />
      </div>
      <div className='mb-2'>
        <PasswordInput
          name='password'
          label='Password'
          value={user.password}
          onChange={onChange}
          error={errors.password}
          showLabel={true}
        />
      </div>
      <div className='mt-4 flex justify-center'>
        <SubmitButtonWIcon
          text={saving ? 'Logging in...' : 'Log in'}
          disabled={saving}
          icon={<EnterIcon color='white' height={5} width={5} />}
          bgColor='bg-primary'
        />
      </div>
    </form>
  );
};

export default LoginForm;
