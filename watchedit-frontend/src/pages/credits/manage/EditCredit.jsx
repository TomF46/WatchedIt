import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ManageCreditForm from "../../../components/Credits/ManageCreditForm";
import { getCreditById, updateCredit } from "../../../api/creditsApi";
import LoadingMessage from "../../../components/Loading/LoadingMessage";

function EditCredit() {
  const navigate = useNavigate();
  const { creditId } = useParams();
  const [credit, setCredit] = useState(null);
  const [creditUpdate, setCreditUpdate] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getCreditById(creditId)
      .then((res) => {
        setCredit(res);
        mapForEditing(res);
      })
      .catch((err) => {
        toast.error(`Error getting credit ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }, [creditId]);

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
        toast.error(`Error getting credit ${err.data.Exception}`, {
          autoClose: false,
        });
        setSaving(false);
      });
  }

  return (
    <div className="credit-page">
      {!credit ? (
        <LoadingMessage message={"Loading credit."} />
      ) : (
        <>
          <h1 className="text-center text-primary text-4xl my-4 font-bold">
            Edit role {credit.role} - {credit.person.fullName} -{" "}
            {credit.film.name}
          </h1>
          <ManageCreditForm
            credit={creditUpdate}
            onChange={handleChange}
            onSubmit={handleSubmit}
            errors={errors}
            saving={saving}
          />
        </>
      )}
    </div>
  );
}

export default EditCredit;
