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
    <div className='field'>
      {showLabel && (
        <label
          className='mb-1 block text-xs font-semibold text-primary'
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className='control'>
        <input
          type='email'
          name={name}
          className='w-full rounded border border-gray-500 bg-backgroundOffset2 p-2 focus:border-primary focus:outline-none'
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
        />
        {error && <div className='mt-2 p-1 text-xs text-red-500'>{error}</div>}
      </div>
    </div>
  );
};

export default EmailInput;
