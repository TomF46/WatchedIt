import React from "react";
import PropTypes from "prop-types";

const SelectInput = ({ name, label, defaultText, onChange, value, options, error }) => {
    return (
        <div className="field">
            <label
                className="block mb-1 font-bold text-xs text-primary"
                htmlFor={name}
            >
                {label}
            </label>
            <div className="relative">
                <select
                    name={name}
                    value={value ? value : ''}
                    onChange={onChange}
                    className="block appearance-none focus:outline-none focus:border-primary text-white w-full bg-backgroundOffset2 border border-gray-500 hover:border-gray-500 p-2 pr-8 leading-tight focus:outline-none focus:outline rounded"
                >
                    {defaultText && (
                        <option value={null} >{defaultText}</option>
                    )}
                    {options &&
                        options.map((option) => {
                            return (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            );
                        })
                    }
                </select>
                {error && (
                    <div className="text-red-500 text-xs p-1 mt-2">{error}</div>
                )}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
            </div>
        </div>
    );
};

SelectInput.propTypes = {
    name: PropTypes.string.isRequired,
    defaultText: PropTypes.string,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    defaultOption: PropTypes.string,
    value: PropTypes.any,
    error: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.any),
};

export default SelectInput;
