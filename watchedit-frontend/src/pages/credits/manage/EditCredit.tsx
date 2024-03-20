import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ManageCreditForm from '../../../components/Credits/ManageCreditForm';
import { getCreditById, updateCredit } from '../../../api/creditsApi';
import LoadingMessage from '../../../components/Loading/LoadingMessage';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  Credit,
  CreditFormErrors,
  EditableCredit,
} from '../../../types/Credits';

function EditCredit() {
  const navigate = useNavigate();
  const { creditId } = useParams();
  const [creditUpdate, setCreditUpdate] = useState<EditableCredit>(
    {} as EditableCredit,
  );
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const {
    isLoading,
    data: credit,
    error,
  } = useQuery({
    queryKey: ['credit', creditId],
    queryFn: () =>
      getCreditById(Number(creditId)).then((res) => {
        mapForEditing(res);
        return res;
      }),
  });

  const editCredit = useMutation({
    mutationFn: (updatedCredit: EditableCredit) => {
      setSaving(true);
      return updateCredit(Number(credit!.id), updatedCredit);
    },
    onSuccess: () => {
      navigate(`/films/${credit!.film.id}/credits`);
    },
    onError: (err) => {
      setSaving(false);
      toast.error(`Error updating credit ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  function mapForEditing(data: Credit): void {
    setCreditUpdate({
      role: data.role,
      type: data.type,
    });
  }

  function handleChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ): void {
    const { name, value } = event.target;
    setCreditUpdate((prevCredit) => ({
      ...prevCredit,
      [name]: value,
    }));
  }

  function formIsValId(): boolean {
    const { role, type } = creditUpdate;
    const errors = {} as CreditFormErrors;
    if (!role) errors.role = 'Role is required';
    if (!type) errors.type = 'Role type is required';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(event: React.SyntheticEvent): void {
    event.preventDefault();
    if (!formIsValId()) return;
    editCredit.mutate(creditUpdate);
  }

  if (isLoading) return <LoadingMessage message={'Loading credit.'} />;

  if (error) {
    toast.error(`Error getting credit ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  if (credit)
    return (
      <div className='credit-page'>
        <h1 className='my-4 text-center text-4xl font-semibold text-primary'>
          Edit role {credit.role} - {credit.person.fullName} -{' '}
          {credit.film.name}
        </h1>
        <ManageCreditForm
          credit={creditUpdate}
          onChange={handleChange}
          onSubmit={handleSubmit}
          errors={errors}
          saving={saving}
        />
      </div>
    );
}

export default EditCredit;
