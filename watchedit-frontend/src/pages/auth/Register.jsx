import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import RegisterForm from "../../components/Auth/RegisterForm";
import { register } from "../../api/authenticationApi";
import { toast } from "react-toastify";
import ReasonsToLoginSection from "../../components/Home/ReasonsToLoginSection";

function Register(){
    const userIsAuthenticated = useSelector((state) => state.tokens != null);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        password_confirmation: ""
    });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    }

    function formIsValid() {
        const { username, email, password, password_confirmation } = user;
        const errors = {};
        if (!username) errors.username = "Username is required";
        if (!email) errors.email = "Email is required";
        if (!password) errors.password = "Password is required";
        if (!password_confirmation)
            errors.password_confirmation = "Confirmation is required";
        if (password_confirmation != password)
            errors.password_confirmation =
                "Password confirmation does not match password";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        register(user)
            .then(() => {
                toast.success("Successfully registered");
                navigate("/login");
            })
            .catch(err => {
                setSaving(false);
                toast.error(`Error registering ${err.data.Exception}`, {
                    autoClose: false,
                });
            });
    }


    return (
        <>
            {userIsAuthenticated && <Navigate to="/" replace />}
            <div className="register-page pb-4">
                <div className="grid grid-cols-12 p-4 my-4">
                    <div className="col-span-12 lg:col-span-4 lg:col-start-5">
                        <div className="controls bg-backgroundOffset mt-4 rounded-md shadow mb-4 shadow">
                            <div className="bg-backgroundOffset2 rounded-t-md">
                                <p className="text-primary font-bold text-center text-xl px-2 py-1">
                                    Register
                                </p>
                            </div>
                            <div className="p-4">
                                <RegisterForm
                                    user={user}
                                    onChange={handleChange}
                                    onSave={handleSave}
                                    errors={errors}
                                    saving={saving} 
                                />
                                <div className="flex justify-center mt-4">
                                    <Link
                                        to={`/login`}
                                        className="text-center text-primary hover:text-gray-600 hover:underline"
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