import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import SelectInput from "../Inputs/SelectInput";
import TextInput from "../Inputs/TextInput";

const ManageCreditForm = ({ credit, onChange, errors, onSubmit, saving }) => {
    const roleTypes = [{value :"Cast", text: "Cast"}, {value :"Crew", text: "Crew"}];

    return (
        <form className="bg-backgroundOffset p-4 mt-4" onSubmit={onSubmit}>
            {errors.onSave && (
                <div className="text-red-500 text-xs p-1" role="alert">
                    {errors.onSave}
                </div>
            )}

            <div className="mb-2">
                <TextInput
                    name="role"
                    label="Role"
                    value={credit.role}
                    onChange={onChange}
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
                    onChange={onChange}
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
                    <span className="ml-1">{saving ? "Saving.." : "Save"}</span>
                </button>
            </div>
        </form>
    );
};

ManageCreditForm.propTypes = {
    credit: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    saving: PropTypes.bool,
    errors: PropTypes.object,
};

export default ManageCreditForm;