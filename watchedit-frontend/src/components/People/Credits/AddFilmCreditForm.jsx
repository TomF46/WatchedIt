import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import SelectInput from "../../Inputs/SelectInput";
import TextInput from "../../Inputs/TextInput";

const AddFilmCreditForm = ({ selectedPerson, onPersonDeselected, onSave, saving }) => {
    const roleTypes = [{value :"Cast", text: "Cast"}, {value :"Crew", text: "Crew"}];
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
        if (!type) errors.type = "Role type is required";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function onSubmit(event){
        event.preventDefault();
        if (!formIsValid()) return;
        onSave(credit);
    }

    return (
        <form className="" onSubmit={onSubmit}>
            {errors.onSave && (
                <div className="text-red-500 text-xs p-1" role="alert">
                    {errors.onSave}
                </div>
            )}

            <div className="mb-2">
                <p>Person: {selectedPerson.firstName} {selectedPerson.lastName}  <span className="cursor-pointer" onClick={() => {onPersonDeselected(null)}}>(Change)</span></p>
            </div>

            <div className="mb-2">
                <TextInput
                    name="role"
                    label="Role"
                    value={credit.role}
                    onChange={handleChange}
                    error={errors.role}
                    required={true}
                />
            </div>
            
            <div className="mb-2">
                <SelectInput 
                    name="type"
                    label="Role type"
                    defaultText="Type"
                    value={credit.type}
                    options={roleTypes}
                    onChange={handleChange}
                /> 
            </div>

            <div className="flex justify-center">
                <button
                    type="submit"
                    disabled={saving}
                    className="bg-primary  text-white rounded py-2 px-4 hover:opacity-75 inline-flex items-center"
                >
                    <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{saving ? "Adding.." : "Add"}</span>
                </button>
            </div>
        </form>
    );
};

AddFilmCreditForm.propTypes = {
    selectedPerson: PropTypes.object.isRequired,
    onPersonDeselected: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    saving: PropTypes.bool,
};

export default AddFilmCreditForm;
