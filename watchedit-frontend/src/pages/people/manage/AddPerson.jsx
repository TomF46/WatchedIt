import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { newPerson } from "../../../tools/obJectShapes";
import ManagePerson from "./ManagePerson";
import { savePerson } from "../../../api/peopleApi";

function AddPerson() {
  const navigate = useNavigate();
  const [person, setPerson] = useState({ ...newPerson });
  const [saving, setSaving] = useState(false);

  function handleUpdate(updatedPerson) {
    setPerson(updatedPerson);
  }

  function handleSave() {
    setSaving(true);
    savePerson(person)
      .then((res) => {
        toast.success("Person saved");
        navigate(`/people/${res.id}`);
      })
      .catch((err) => {
        setSaving(false);
        toast.error(`Error saving ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }

  return (
    <div className="Add-person-page">
      <ManagePerson
        person={person}
        updatePerson={handleUpdate}
        triggerSave={handleSave}
        saving={saving}
      ></ManagePerson>
    </div>
  );
}

export default AddPerson;
