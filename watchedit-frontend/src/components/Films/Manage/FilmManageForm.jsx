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

            <div>
                {film.posterUrl != null ? (
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
                                    name={`posterUrl`}
                                    className=" border-gray-400 p-2 w-full hidden"
                                    onChange={(e) => onImageChange(e)}
                                />
                            </label>
                        </button>
                        {errors.posterUrl && (
                            <div className="text-red-500 text-xs p-1 mt-2">{errors.posterUrl}</div>
                        )}
                    </>
                )}
                {!!uploadingImage && (<p>Uploading...</p>)}
                {film.posterUrl != null && (
                    <div className="grid grid-cols-12 mt-4">
                        <div className="col-span-12 md:col-span-2">
                            <img src={film.posterUrl} alt="image-preview" className="image-preview poster" />
                        </div>
                    </div>
                )}
            </div>

            <div className="mb-2">
                <label>Release date</label>
                <DatePicker dateFormat="dd-MM-yyyy"  selected={film.releaseDate} onChange={(date) => onDateChange(date)} />
                {errors.releaseDate && (
                    <div className="text-red-500 text-xs p-1 mt-2">{errors.releaseDate}</div>
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

FilmManageForm.propTypes = {
    film: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onDateChange: PropTypes.func.isRequired,
    onImageChange: PropTypes.func.isRequired,
    saving: PropTypes.bool,
    uploadingImage: PropTypes.bool
};

export default FilmManageForm;
