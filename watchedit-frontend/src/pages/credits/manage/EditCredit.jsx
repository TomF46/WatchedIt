import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ManageCreditForm from "../../../components/Credits/ManageCreditForm";
import { getCreditById, updateCredit } from "../../../api/creditsApi";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import { useQuery } from "@tanstack/react-query";

function EditCredit() {
  const navigate = useNavigate();
  const { creditId } = useParams();
  const [creditUpdate, setCreditUpdate] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const {
    isLoading,
    data: credit,
    error,
  } = useQuery({
    queryKey: ["credit", creditId],
    queryFn: () =>
      getCreditById(creditId).then((res) => {
        mapForEditing(res);
        return res;
      }),
  });

  function mapForEditing(data) {
    setCreditUpdate({
      role: data.role,
      type: data.type,
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setCreditUpdate((prevCredit) => ({
      ...prevCredit,
      [name]: value,
    }));
  }

  function formIsValId() {
    const { role, type } = credit;
    const errors = {};
    if (!role) errors.role = "Role is required";
    if (!type) errors.type = "Role type is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValId()) return;
    setSaving(true);

    updateCredit(credit.id, creditUpdate)
      .then(() => {
        navigate(`/films/${credit.film.id}/credits`);
      })
      .catch((err) => {
        toast.error(`Error updating credit ${err.data.Exception}`, {
          autoClose: false,
        });
        setSaving(false);
      });
  }

  if (isLoading) return <LoadingMessage message={"Loading credit."} />;

  if (error) {
    toast.error(`Error getting credit ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  return (
    <div className="credit-page">
      <h1 className="text-center text-primary text-4xl my-4 font-semibold">
        Edit role {credit.role} - {credit.person.fullName} - {credit.film.name}
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
