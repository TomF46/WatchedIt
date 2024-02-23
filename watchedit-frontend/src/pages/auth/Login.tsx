import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoginForm from "../../components/Auth/LoginForm";
import ReasonsToLoginSection from "../../components/Home/ReasonsToLoginSection";
import { AppDispatch, useAppDispatch, useAppSelector } from "../../redux/store";
import { LoginErrors } from "../../types/Auth";
import { login } from "../../redux/reducers/authenticationReducer";

function Login() {
  const dispatch: AppDispatch = useAppDispatch();
  const userIsAuthenticated = useAppSelector(
    (state) => state.authentication.tokens != null,
  );
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    remember_me: true,
  });
  const [errors, setErrors] = useState({} as LoginErrors);
  const [saving, setSaving] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value, checked } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: name == "remember_me" ? Boolean(checked) : value,
    }));
  }

  function formIsValid(): boolean {
    const { email, password } = user;
    const errors = {} as LoginErrors;
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event: React.SyntheticEvent): void {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    dispatch(login(user))
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setSaving(false);
        toast.error(
          `${err.data.Exception} please check your details and try again.`,
          {
            autoClose: false,
          },
        );
      });
  }

  return (
    <>
      {userIsAuthenticated && <Navigate to="/" replace />}
      <div className="login-page pb-4">
        <div className="grid grid-cols-12 p-4 my-4">
          <div className="col-span-12 lg:col-span-4 lg:col-start-5">
            <div className="controls bg-backgroundOffset mt-4 rounded-md shadow mb-4">
              <div className="bg-backgroundOffset2 rounded-t-md">
                <p className="text-primary font-semibold text-center text-xl px-2 py-1">
                  Login
                </p>
              </div>
              <div className="p-4">
                <LoginForm
                  user={user}
                  onChange={handleChange}
                  onSave={handleSave}
                  errors={errors}
                  saving={saving}
                />
                <div className="flex justify-center mt-4">
                  <Link
                    to={`/register`}
                    className="text-center text-primary hover:text-gray-600 hover:underline"
                  >
                    No account? Click here to register
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

export default Login;
