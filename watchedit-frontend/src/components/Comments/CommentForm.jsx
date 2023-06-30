import PropTypes from "prop-types";
import TextAreaInput from "../Inputs/TextAreaInput";

const CommentForm = ({ comment, onChange, onSubmit, errors = {}, saving = false, editing = false }) => {
    return (
        <form className="" onSubmit={onSubmit}>
            {errors.onSubmit && (
                <div className="text-red-500 text-xs p-1" role="alert">
                    {errors.onSubmit}
                </div>
            )}
            <div className={`controls bg-backgroundOffset mt-4 mb-4 p-4 ${!editing && ("shadow rounded")}`}>
                <div>
                    <TextAreaInput
                        name="text"
                        label="Text"
                        value={comment.text}
                        required={true}
                        onChange={onChange}
                        error={errors.comment}
                    />
                </div>
            </div>
            <div className={`flex justify-center bg-backgroundOffset p-4 my-4 ${!editing && ("shadow rounded")}`}>
                <button
                    type="submit"
                    disabled={saving}
                    className="bg-primary  text-white rounded py-2 px-4 hover:opacity-75 inline-flex items-center"
                >
                    <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                    <span className="ml-1">{saving ? "Submitting..." : "Submit"}</span>
                </button>
            </div>
        </form>
    );
};

CommentForm.propTypes = {
    comment: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    saving: PropTypes.bool,
    editing: PropTypes.bool
};

export default CommentForm;
