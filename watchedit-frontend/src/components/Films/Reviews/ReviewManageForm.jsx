import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../Inputs/TextInput";
import RatingInput from "../../Inputs/RatingInput";

const ReviewManageForm = ({
    review,
    onSave,
    onChange,
    saving = false,
    errors = {}
}) => {
    return (
        <form className="bg-backgroundOffset p-4 mt-4" onSubmit={onSave}>
            {errors.onSave && (
                <div className="text-red-500 text-xs p-1" role="alert">
                    {errors.onSave}
                </div>
            )}

            <div className="mb-2">
                <RatingInput
                    name="rating"
                    label="Rating"
                    value={review.rating}
                    onChange={onChange}
                    error={errors.rating}
                    required={true}
                />
            </div>

            <div className="mb-2">
                <TextInput
                    name="text"
                    label="Review text"
                    value={review.text}
                    onChange={onChange}
                    error={errors.text}
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

ReviewManageForm.propTypes = {
    review: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool,
};

export default ReviewManageForm;
