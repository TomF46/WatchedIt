import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../Inputs/TextInput";
import TextAreaInput from "../../Inputs/TextAreaInput";
import NumberInput from "../../Inputs/NumberInput";

const PersonManageForm = ({
    person,
    onSave,
    onChange,
    onImageChange,
    saving = false,
    uploadingImage = false,
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

            <div>
                {person.imageUrl != null ? (
                    <button
                        type="button"
                        onClick={() => onImageChange(null)}
                        className="bg-red-400 text-white rounded py-2 px-4 hover:bg-red-500 shadow inline-flex items-center"
                    >Remove image</button>
                ) : (
                    <>
                        <button type="button" className="bg-primary pointer text-white rounded py-2 px-4 hover:opacity-75 shadow inline-flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>

                            <label className="pointer ml-1">
                                Add Image
                                <input
                                    type="file"
                                    name={`imageUrl`}
                                    className=" border-gray-400 p-2 w-full hidden"
                                    onChange={(e) => onImageChange(e)}
                                />
                            </label>
                        </button>
                        {errors.imageUrl && (
                            <div className="text-red-500 text-xs p-1 mt-2">{errors.imageUrl}</div>
                        )}
                    </>
                )}
                {!!uploadingImage && (<p>Uploading...</p>)}
                {person.imageUrl != null && (
                    <img src={person.imageUrl} alt="image-preview" className="image-preview mt-4" />
                )}
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
    onImageChange: PropTypes.func.isRequired,
    saving: PropTypes.bool,
    uploadingImage: PropTypes.bool
};

export default PersonManageForm;
