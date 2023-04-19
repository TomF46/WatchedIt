import React from "react";
import PropTypes from "prop-types";

const RatingInput = ({ name, label, onChange, placeholder, value, error }) => {
    return (
        <div className="field">
            {label &&
                <label
                    className="block mb-1 font-bold text-xs text-primary"
                    htmlFor={name}
                >
                    {label}
                </label>
            }
            <div className="control">
                <input
                    type="number"
                    name={name}
                    className="border border-gray-500 p-2 w-full bg-backgroundOffset2"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required
                    max={10}
                    min={0}
                />
                {error && (
                    <div className="text-red-500 text-xs p-1 mt-2">{error}</div>
                )}
            </div>
        </div>
    );
};

RatingInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.number,
    error: PropTypes.string
};

export default RatingInput;
