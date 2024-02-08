type Props = {
  name: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
  error?: string;
  showLabel: boolean;
};

const EmailInput = ({
  name,
  label,
  onChange,
  placeholder,
  value,
  error,
  showLabel,
}: Props) => {
  return (
    <div className="field">
      {showLabel && (
        <label
          className="block mb-1 font-semibold text-xs text-primary"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className="control">
        <input
          type="email"
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

export default EmailInput;
