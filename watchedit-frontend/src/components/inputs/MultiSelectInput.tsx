import { Multiselect } from "multiselect-react-dropdown";
import { SelectOption } from "./InputTypes";

type Props = {
  name: string;
  label: string;
  onChange: (selected: any[]) => void;
  defaultOption?: string;
  options: SelectOption[];
  value?: any[];
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
    <div className="field">
      <label
        className="block mb-1 font-semibold text-xs text-primary"
        htmlFor={name}
      >
        {label}
      </label>
      <div>
        <Multiselect
          displayValue="name"
          options={options}
          selectedValues={value}
          onSelect={onChange}
          onRemove={onChange}
          className="border border-gray-500 focus:outline-none focus:border-primary bg-backgroundOffset2 rounded"
        />
        {helpText && <div className="text-xs p-1">{helpText}</div>}
        {error && <div className="text-red-500 text-xs p-1 mt-2">{error}</div>}
      </div>
    </div>
  );
};

export default MultiSelectInput;
