import PropTypes from "prop-types";

const NumberInput = ({ name, label, onChange, placeholder, value, error }) => {
  return (
    <div className="field">
      {label && (
        <label
          className="block mb-1 font-semibold text-xs text-primary"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className="control">
        <input
          type="number"
          name={name}
          className="border border-gray-500 focus:outline-none focus:border-primary p-2 w-full bg-backgroundOffset2 rounded"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
        />
        {error && <div className="text-red-500 text-xs p-1 mt-2">{error}</div>}
      </div>
    </div>
  );
};

NumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.number,
  error: PropTypes.string,
};

export default NumberInput;
