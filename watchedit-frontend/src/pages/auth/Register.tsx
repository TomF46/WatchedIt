import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import RegisterForm from '../../components/Auth/RegisterForm';
import { register } from '../../api/authenticationApi';
import { toast } from 'react-toastify';
import ReasonsToLoginSection from '../../components/Home/ReasonsToLoginSection';
import { useMutation } from '@tanstack/react-query';
import { Registration, RegistrationErrors } from '../../types/Auth';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';

function Register() {
  const userIsAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [errors, setErrors] = useState({} as RegistrationErrors);
  const [saving, setSaving] = useState(false);

  const registerUser = useMutation({
    mutationFn: (newUser: Registration) => {
      setSaving(true);
      return register(newUser);
    },
    onSuccess: () => {
      toast.success('Successfully registered');
      navigate('/login');
    },
    onError: (err) => {
      setSaving(false);
      toast.error(`Error registering ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  function formIsValid(): boolean {
    const { username, email, password, password_confirmation } = user;
    const errors = {} as RegistrationErrors;
    if (!username) errors.username = 'Username is required';
    if (!email) errors.email = 'Email is required';
    if (!password) errors.password = 'Password is required';
    if (!password_confirmation)
      errors.password_confirmation = 'Confirmation is required';
    if (password_confirmation != password)
      errors.password_confirmation =
        'Password confirmation does not match password';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event: React.SyntheticEvent): void {
    event.preventDefault();
    if (!formIsValid()) return;
    registerUser.mutate(user);
  }

  return (
    <>
      {userIsAuthenticated && <Navigate to='/' replace />}
      <div className='register-page pb-4'>
        <div className='my-4 grid grid-cols-12 p-4'>
          <div className='col-span-12 lg:col-span-4 lg:col-start-5'>
            <div className='controls mb-4 mt-4 rounded-md bg-backgroundOffset shadow'>
              <div className='rounded-t-md bg-backgroundOffset2'>
                <p className='px-2 py-1 text-center text-xl font-semibold text-primary'>
                  Register
                </p>
              </div>
              <div className='p-4'>
                <RegisterForm
                  user={user}
                  onChange={handleChange}
                  onSave={handleSave}
                  errors={errors}
                  saving={saving}
                />
                <div className='mt-4 flex justify-center'>
                  <Link
                    to={`/login`}
                    className='text-center text-primary hover:text-gray-600 hover:underline'
                  >
                    Already registered? Login now!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ReasonsToLoginSection />
      </div>
    </>
  );
}

export default Register;
