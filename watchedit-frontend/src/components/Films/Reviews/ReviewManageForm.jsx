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
                    <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" strokeWidth={2} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                    <span className="ml-1">{saving ? "Saving..." : "Save"}</span>
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
