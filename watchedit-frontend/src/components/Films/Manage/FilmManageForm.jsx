import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import TextInput from "../../Inputs/TextInput";
import TextAreaInput from "../../Inputs/TextAreaInput";
import NumberInput from "../../Inputs/NumberInput";

const FilmManageForm = ({
    film,
    onSave,
    onChange,
    onDateChange,
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
                    name="name"
                    label="Name"
                    value={film.name}
                    onChange={onChange}
                    error={errors.name}
                    required={true}
                />
            </div>

            <div className="mb-2">
                <TextInput
                    name="shortDescription"
                    label="Short description"
                    value={film.shortDescription}
                    onChange={onChange}
                    error={errors.shortDescription}
                    required={true}
                />
            </div>

            <div className="mb-2">
                <TextAreaInput
                    name="fullDescription"
                    label="Full description"
                    value={film.fullDescription}
                    onChange={onChange}
                    error={errors.fullDescription}
                    required={true}
                />
            </div>

            <div className="mb-2">
                <NumberInput
                    name="runtime"
                    label="Runtime (minutes)"
                    value={film.runtime}
                    onChange={onChange}
                    error={errors.runtime}
                    required={true}
                />
            </div>

            <div className="mb-2">
                <TextInput
                    name="posterUrl"
                    label="Poster URL"
                    value={film.posterUrl}
                    onChange={onChange}
                    error={errors.posterUrl}
                    required={true}
                />
            </div>

            <div className="mb-2">
                <label>Release date</label>
                <DatePicker dateFormat="dd-MM-yyyy"  selected={film.releaseDate} onChange={(date) => onDateChange(date)} />
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

FilmManageForm.propTypes = {
    film: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onDateChange: PropTypes.func.isRequired,
    saving: PropTypes.bool
};

export default FilmManageForm;
