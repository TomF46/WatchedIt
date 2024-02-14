type Props = {
  name: string;
  label?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: number;
  required: boolean;
  error?: string;
};

const RatingInput = ({
  name,
  label,
  onChange,
  placeholder,
  value,
  error,
  required,
}: Props) => {
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
          required={required}
          max={10}
          min={0}
        />
        {error && <div className="text-red-500 text-xs p-1 mt-2">{error}</div>}
      </div>
    </div>
  );
};

export default RatingInput;
