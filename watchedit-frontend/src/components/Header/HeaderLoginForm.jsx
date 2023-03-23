import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../redux/actions/authenticationActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EmailInput from "../Inputs/EmailInput";
import PasswordInput from "../Inputs/PasswordInput";

const HeaderLoginForm = ({ login}) => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();


    function handleChange(event) {
        const { name, value} = event.target;
        console.log(value);
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    }

    function formIsValid() {
        const { email, password } = user;
        const errors = {};
        if (!email) errors.email = "Email is required";
        if (!password) errors.password = "Password is required";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        login(user)
            .then(() => {
                navigate("/");
            })
            .catch(err => {
                setSaving(false);
                toast.error(`${err.statusText} please try again.`, {
                    autoClose: false,
                });
            });
    }

    return (
        <>
            <form onSubmit={handleSave}>
            <div className="flex flex-row">
                    <div className="flex-1">
                        <EmailInput name="email" label="Email" value={user.email} onChange={handleChange} error={errors.email} showLabel={false} placeholder={"Email"} />
                    </div>
                    <div className="flex-1 mx-4">
                        <PasswordInput name="password" label="Password" value={user.password} onChange={handleChange} error={errors.password} showLabel={false} placeholder={"Password"} />
                    </div>
                    <div className="flex-1">
                        <button type="submit" disabled={saving} className="bg-primary text-white rounded py-2 px-4 hover:opacity-75">
                            Login
                        </button>
                    </div>
            </div>
            </form>
        </>
    );
};

HeaderLoginForm.propTypes = {
    login: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        userIsAuthenticated: state.tokens != null
    };
};

const mapDispatchToProps = {
    login
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLoginForm);
