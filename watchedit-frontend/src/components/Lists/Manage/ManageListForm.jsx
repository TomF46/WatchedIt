import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../Inputs/TextInput";
import TextAreaInput from "../../Inputs/TextAreaInput";

const ManageListForm = ({
    list,
    onSave,
    onChange,
    saving = false,
    editing,
    errors = {}
}) => {
    return (
        <form className="mt-4" onSubmit={onSave}>
            {errors.onSave && (
                <div className="text-red-500 text-xs p-1" role="alert">
                    {errors.onSave}
                </div>
            )}
            <div className="controls bg-backgroundOffset mt-4 rounded-md shadow mb-4 shadow">
                <div className="bg-backgroundOffset2 rounded-t-md">
                    <p className="text-primary font-bold text-center text-2xl px-2 py-1">
                        {editing ? `Editing ${list.name}` : "Adding list"}
                    </p>
                </div>
                <div className="p-4">
                    <div className="mb-2">
                        <TextInput
                            name="name"
                            label="Name"
                            value={list.name}
                            onChange={onChange}
                            error={errors.name}
                            required={true}
                        />
                    </div>
                    <div className="mb-2">
                        <TextAreaInput
                            name="description"
                            label="Description"
                            value={list.description}
                            onChange={onChange}
                            error={errors.description}
                            required={true}
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-center bg-backgroundOffset p-4 my-4 shadow rounded">
                <button
                    type="submit"
                    disabled={saving}
                    className="bg-primary  text-white rounded py-2 px-4 hover:opacity-75 inline-flex items-center"
                >
                    <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" strokeWidth={2} stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <span className="ml-1">{saving ? "Saving..." : "Save"}</span>
                </button>
            </div>
        </form>
    );
};

ManageListForm.propTypes = {
    list: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool,
    editing: PropTypes.bool.isRequired
};

export default ManageListForm;
