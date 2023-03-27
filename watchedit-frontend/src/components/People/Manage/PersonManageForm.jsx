import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../Inputs/TextInput";
import TextAreaInput from "../../Inputs/TextAreaInput";
import NumberInput from "../../Inputs/NumberInput";

const PersonManageForm = ({
    person,
    onSave,
    onChange,
    saving = false,
    errors = {}
}) => {
    return (
        <form className="" onSubmit={onSave}>
            {errors.onSave && (
                <div className="text-red-500 text-xs p-1" role="alert">
                    {errors.onSave}
                </div>
            )}

            <div className="mb-2">
                <TextInput
                    name="firstName"
                    label="First name"
                    value={person.firstName}
                    onChange={onChange}
                    error={errors.firstName}
                    required={true}
                />
            </div>

            <div className="mb-2">
                <TextInput
                    name="lastName"
                    label="Last name"
                    value={person.lastName}
                    onChange={onChange}
                    error={errors.lastName}
                    required={true}
                />
            </div>

            <div className="mb-2">
                <TextInput
                    name="middleNames"
                    label="Middle names"
                    value={person.middleNames}
                    onChange={onChange}
                    error={errors.middleNames}
                    required={false}
                />
            </div>

            <div className="mb-2">
                <TextInput
                    name="stageName"
                    label="Stage name"
                    value={person.stageName}
                    onChange={onChange}
                    error={errors.stageName}
                    required={false}
                />
            </div>


            <div className="mb-2">
                <TextAreaInput
                    name="description"
                    label="Description"
                    value={person.description}
                    onChange={onChange}
                    error={errors.description}
                    required={true}
                />
            </div>

            <div className="mb-2">
                <NumberInput
                    name="age"
                    label="Age"
                    value={person.age}
                    onChange={onChange}
                    error={errors.age}
                    required={true}
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
                    <span>{saving ? "Saving..." : "Save"}</span>
                </button>
            </div>
        </form>
    );
};

PersonManageForm.propTypes = {
    person: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool
};

export default PersonManageForm;
