type Props = {
  name: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  required: boolean;
  error?: string;
};

const TextAreaInput = ({
  name,
  label,
  onChange,
  required,
  value,
  error,
}: Props) => {
  return (
    <div className="field">
      <label
        className="block mb-1 font-semibold text-xs text-primary"
        htmlFor={name}
      >
        {label}
      </label>
      <div className="control">
        <textarea
          name={name}
          className="resize-y border border-gray-500 focus:outline-none focus:border-primary min-w-full rounded focus:shadow-outline bg-backgroundOffset2 p-2"
          value={value ? value : ""}
          onChange={onChange}
          required={required}
        ></textarea>
        {error && <div className="text-red-500 text-xs p-1 mt-2">{error}</div>}
      </div>
    </div>
  );
};

export default TextAreaInput;
