import { useState } from 'react';
import ManageCreditForm from './ManageCreditForm';
import { CreditFormErrors, EditableCredit } from '../../types/Credits';

type Props = {
  onSave: (credit: EditableCredit) => void;
  saving: boolean;
};

const AddCreditForm = ({ onSave, saving }: Props) => {
  const [credit, setCredit] = useState<EditableCredit>({ role: '', type: '' });
  const [errors, setErrors] = useState({});

  function handleChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ): void {
    const { name, value } = event.target;
    setCredit((prevCredit) => ({
      ...prevCredit,
      [name]: value,
    }));
  }

  function formIsValid() {
    const { role, type } = credit;
    const errors = {} as CreditFormErrors;
    if (!role) errors.role = 'Role is required';
    if (role.length > 60)
      errors.role = 'Role cant be longer than 60 characters.';
    if (!type) errors.type = 'Role type is required';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(event: React.SyntheticEvent): void {
    event.preventDefault();
    if (!formIsValid()) return;
    onSave(credit);
  }

  return (
    <ManageCreditForm
      credit={credit}
      onChange={handleChange}
      onSubmit={handleSubmit}
      errors={errors}
      saving={saving}
    />
  );
};

export default AddCreditForm;
