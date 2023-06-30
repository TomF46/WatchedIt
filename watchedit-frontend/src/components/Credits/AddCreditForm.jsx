import { useState } from "react";
import PropTypes from "prop-types";
import ManageCreditForm from "./ManageCreditForm";

const AddCreditForm = ({ onSave, saving }) => {
    const [credit, setCredit] = useState({role: "", type: null});
    const [errors, setErrors] = useState({});

    function handleChange(event) {
        const { name, value } = event.target;
        setCredit(prevCredit=> ({
            ...prevCredit,
            [name]: value
        }));
    }

    function formIsValid() {
        const { role, type } = credit;
        const errors = {};
        if (!role) errors.role = "Role is required";
        if (role.length > 60) errors.role = "Role cant be longer than 60 characters.";
        if (!type) errors.type = "Role type is required";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSubmit(event){
        event.preventDefault();
        if (!formIsValid()) return;
        onSave(credit);
    }

    return (
        <ManageCreditForm credit={credit} onChange={handleChange} onSubmit={handleSubmit} errors={errors} saving={saving}  />
    );
};

AddCreditForm.propTypes = {
    onSave: PropTypes.func.isRequired,
    saving: PropTypes.bool,
};

export default AddCreditForm;
