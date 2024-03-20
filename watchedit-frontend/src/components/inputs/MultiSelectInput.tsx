import { Multiselect } from 'multiselect-react-dropdown';
import { SelectOption } from './InputTypes';

type Props = {
  name: string;
  label: string;
  onChange: (selected: SelectOption[]) => void;
  defaultOption?: string;
  options: SelectOption[];
  value?: SelectOption[];
  helpText?: string;
  error?: string;
};

const MultiSelectInput = ({
  name,
  label,
  onChange,
  value,
  options,
  error,
  helpText,
}: Props) => {
  return (
    <div className='field'>
      <label
        className='mb-1 block text-xs font-semibold text-primary'
        htmlFor={name}
      >
        {label}
      </label>
      <div>
        <Multiselect
          displayValue='name'
          options={options}
          selectedValues={value}
          onSelect={onChange}
          onRemove={onChange}
          className='rounded border border-gray-500 bg-backgroundOffset2 focus:border-primary focus:outline-none'
        />
        {helpText && <div className='p-1 text-xs'>{helpText}</div>}
        {error && <div className='mt-2 p-1 text-xs text-red-500'>{error}</div>}
      </div>
    </div>
  );
};

export default MultiSelectInput;
