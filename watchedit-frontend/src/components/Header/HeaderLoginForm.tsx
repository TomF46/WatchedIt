import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EmailInput from "../Inputs/EmailInput";
import PasswordInput from "../Inputs/PasswordInput";
import { AppDispatch, useAppDispatch } from "../../redux/store";
import { LoginCredentials, LoginErrors } from "../../types/Auth";
import { login } from "../../redux/reducers/authenticationReducer";

const HeaderLoginForm = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  } as LoginCredentials);
  const [errors, setErrors] = useState({} as LoginErrors);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
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
      <form onSubmit={handleSave}>
        <div className="flex flex-row my-2 lg:my-0">
          <div className="flex-1">
            <EmailInput
              name="email"
              label="Email"
              value={user.email}
              onChange={handleChange}
              error={errors.email}
              showLabel={false}
              placeholder={"Email"}
            />
          </div>
          <div className="flex-1 mx-4">
            <PasswordInput
              name="password"
              label="Password"
              value={user.password}
              onChange={handleChange}
              error={errors.password}
              showLabel={false}
              placeholder={"Password"}
            />
          </div>
          <div className="flex-1">
            <button
              type="submit"
              disabled={saving}
              className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-flex items-center"
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
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              <span className="ml-1">
                {saving ? "Logging in..." : "Log in"}
              </span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default HeaderLoginForm;
