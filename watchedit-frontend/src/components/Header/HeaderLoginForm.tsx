import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EmailInput from "../Inputs/EmailInput";
import PasswordInput from "../Inputs/PasswordInput";
import { AppDispatch, useAppDispatch } from "../../redux/store";
import { LoginCredentials, LoginErrors } from "../../types/Auth";
import { login } from "../../redux/reducers/authenticationReducer";
import SubmitButtonWIcon from "../Buttons/SubmitButtonWIcon";
import EnterIcon from "../Icons/EnterIcon";

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
            <SubmitButtonWIcon
              text={saving ? "Logging in..." : "Log in"}
              disabled={saving}
              icon={<EnterIcon />}
              bgColor="bg-primary"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default HeaderLoginForm;
