import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {login} from "../../redux/actions/authenticationActions"
import { toast } from "react-toastify";
import LoginForm from "../../components/Auth/LoginForm";


function Login({userIsAuthenticated, login}){
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
        remember_me: true
    });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    function handleChange(event) {
        const { name, value, checked } = event.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: name == "remember_me" ? Boolean(checked) : value
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
                console.log(err);
                setSaving(false);
                toast.error(`Error logging in ${err.data.Exception}`, {
                    autoClose: false,
                });
            });
    }

    return (
        <>
            {userIsAuthenticated && <Navigate to="/" replace />}
            <div className="login-page">
                <div className="p-4 my-8 bg-backgroundOffset">
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
                            className="text-center hover:text-gray-600 hover:underline"
                        >
                            No account? Click here to register
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};


Login.propTypes = {
    userIsAuthenticated: PropTypes.bool.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
