import { SelectOption } from './InputTypes';

type Props = {
  name: string;
  defaultText?: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  value?: string | number | undefined;
  error?: string;
};

const SelectInput = ({
  name,
  label,
  defaultText,
  onChange,
  value,
  options,
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
      <div className='relative'>
        <select
          name={name}
          value={value ? value : ''}
          onChange={onChange}
          className='block w-full appearance-none rounded border border-gray-500 bg-backgroundOffset2 p-2 pr-8 leading-tight text-white hover:border-gray-500 focus:border-primary focus:outline-none focus:outline'
        >
          {defaultText && <option value={undefined}>{defaultText}</option>}
          {options &&
            options.map((option) => {
              return (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              );
            })}
        </select>
        {error && <div className='mt-2 p-1 text-xs text-red-500'>{error}</div>}
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary'>
          <svg
            className='h-4 w-4 fill-current'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
          >
            <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SelectInput;
