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
    <div className='field'>
      <label
        className='mb-1 block text-xs font-semibold text-primary'
        htmlFor={name}
      >
        {label}
      </label>
      <div className='control'>
        <textarea
          name={name}
          className='focus:shadow-outline min-w-full resize-y rounded border border-gray-500 bg-backgroundOffset2 p-2 focus:border-primary focus:outline-none'
          value={value ? value : ''}
          onChange={onChange}
          required={required}
        ></textarea>
        {error && <div className='mt-2 p-1 text-xs text-red-500'>{error}</div>}
      </div>
    </div>
  );
};

export default TextAreaInput;
